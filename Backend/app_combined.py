# app_combined.py
import io
import os
import cv2
import torch
import torch.nn as nn
import torchvision.transforms as T
import tempfile
import logging
import time
import requests
import threading
import streamlit as st
from PIL import Image
from pathlib import Path
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from torchvision import models

# ---------------- FaceNet optional ---------------- #
try:
    from facenet_pytorch import MTCNN
    _FACENET_AVAILABLE = True
except Exception:
    MTCNN = None
    _FACENET_AVAILABLE = False

# ==================================================
#                 MODEL DEFINITION
# ==================================================
class ResNet50BiLSTM(nn.Module):
    def __init__(self, hidden=256):
        super().__init__()
        base = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V2)
        self.cnn = nn.Sequential(*list(base.children())[:-1])
        self.lstm = nn.LSTM(2048, hidden, batch_first=True, bidirectional=True)
        self.head = nn.Sequential(
            nn.Linear(hidden * 2, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(128, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        B, T, C, H, W = x.shape
        x = x.view(B * T, C, H, W)
        feats = self.cnn(x).view(B, T, -1)
        lstm_out, _ = self.lstm(feats)
        out = self.head(lstm_out[:, -1, :])
        return out

# ==================================================
#                 INITIALIZATION
# ==================================================
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = ResNet50BiLSTM().to(DEVICE)

try:
    MODEL_PATH = (Path(__file__).resolve().parent / "model_epoch_47.pth").resolve()
    state_dict = torch.load(str(MODEL_PATH), map_location=DEVICE)
    model.load_state_dict(state_dict)
    model.eval()
except Exception as e:
    raise RuntimeError(f"❌ Failed to load model: {e}")

# ==================================================
#                 FACE DETECTION
# ==================================================
mtcnn = None
haar_detector = None
if _FACENET_AVAILABLE:
    try:
        mtcnn = MTCNN(image_size=224, margin=20, keep_all=False, device=DEVICE)
    except Exception:
        mtcnn = None

if mtcnn is None:
    haar_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    haar_detector = cv2.CascadeClassifier(haar_path)

# ==================================================
#                 TRANSFORMS
# ==================================================
transform = T.Compose([
    T.Resize((224, 224)),
    T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406],
                [0.229, 0.224, 0.225])
])

# ==================================================
#                 FASTAPI SETUP
# ==================================================
app = FastAPI(title="Deepfake Detection API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("deepfake-backend")

# ==================================================
#                 HELPER FUNCTION
# ==================================================
def extract_faces_from_video(video_path, num_frames=16):
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open video: {video_path}")

    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 1
    step = max(total // num_frames, 1)
    faces = []

    for i in range(num_frames):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i * step)
        ret, frame = cap.read()
        if not ret:
            break
        img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        face_tensor = None

        if mtcnn is not None:
            try:
                mtcnn_face = mtcnn(img)
                if mtcnn_face is not None:
                    face_tensor = mtcnn_face
            except Exception:
                pass

        if face_tensor is None and haar_detector is not None:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            detections = haar_detector.detectMultiScale(gray, 1.1, 5, minSize=(60, 60))
            if len(detections) > 0:
                x, y, w, h = sorted(detections, key=lambda r: r[2]*r[3], reverse=True)[0]
                face = frame[y:y+h, x:x+w]
                img_face = Image.fromarray(cv2.cvtColor(face, cv2.COLOR_BGR2RGB))
                face_tensor = T.ToTensor()(img_face)

        if face_tensor is None:
            w, h = img.size
            crop = img.crop(((w - h)//2, 0, (w + h)//2, h))
            face_tensor = T.ToTensor()(crop)

        faces.append(transform(T.ToPILImage()(face_tensor)))

    cap.release()
    if len(faces) == 0:
        raise ValueError("No faces extracted from video.")
    return torch.stack(faces, dim=0).unsqueeze(0)

# ==================================================
#                 PREDICT ENDPOINT
# ==================================================
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    tmp_path = None
    try:
        if not str(file.content_type).startswith("video/"):
            return JSONResponse(status_code=400, content={"error": "Please upload a video file."})

        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
            tmp.write(await file.read())
            tmp_path = Path(tmp.name)

        frames = extract_faces_from_video(tmp_path)
        frames = frames.to(DEVICE)
        with torch.no_grad():
            pred = model(frames).item()

        label = "FAKE" if pred > 0.5 else "REAL"
        return JSONResponse({
            "filename": file.filename,
            "prediction_score": float(pred),
            "label": label
        })

    except Exception as e:
        logger.exception("Prediction failed: %s", e)
        return JSONResponse(status_code=500, content={"error": str(e)})

    finally:
        if tmp_path:
            tmp_path.unlink(missing_ok=True)

@app.get("/")
def home():
    return {"message": "Deepfake Detection API is running 🚀"}

# ==================================================
#                 STREAMLIT UI
# ==================================================
def run_fastapi():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Start FastAPI in a background thread
threading.Thread(target=run_fastapi, daemon=True).start()

# ---------------- Streamlit UI ---------------- #
st.set_page_config(page_title="Deepfake Detection", layout="centered")
st.title("🧠 Deepfake Video Detection")
st.write("Upload a short video (MP4/AVI) to check if it’s **REAL** or **FAKE**.")

uploaded_file = st.file_uploader("🎥 Upload your video file", type=["mp4", "avi", "mov"])

if uploaded_file:
    st.video(uploaded_file)
    if st.button("🔍 Analyze Video"):
        with st.spinner("Analyzing the video... please wait ⏳"):
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
                tmp.write(uploaded_file.read())
                tmp_path = tmp.name

            try:
                url = "http://localhost:8000/predict"
                with open(tmp_path, "rb") as f:
                    files = {"file": (uploaded_file.name, f, "video/mp4")}
                    response = requests.post(url, files=files)

                if response.status_code == 200:
                    result = response.json()
                    st.success(f"✅ **{result['label']}** detected!")
                    st.metric("Prediction Score", f"{result['prediction_score']:.4f}")
                else:
                    st.error(f"❌ Error: {response.text}")

            except Exception as e:
                st.error(f"Failed to connect to backend: {e}")
