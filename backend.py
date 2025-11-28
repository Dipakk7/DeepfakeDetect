"""
Deepfake Detection FastAPI Backend
Combined single-file implementation based on ResNet50+BiLSTM model
Updated with proper handling for class-imbalanced trained models
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import tempfile
import os
from pathlib import Path
import torch
import torch.nn as nn
from torchvision import models
import torchvision.transforms as T
import cv2
from PIL import Image
from facenet_pytorch import MTCNN


# ============================================================================
# SCHEMAS
# ============================================================================

class PredictionResponse(BaseModel):
    video_name: str
    prediction: str
    confidence: float
    is_fake: bool
    frames_analyzed: int
    raw_score: float


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    device: str


class BatchPredictionItem(BaseModel):
    video_name: str
    prediction: Optional[str] = None
    confidence: Optional[float] = None
    is_fake: Optional[bool] = None
    frames_analyzed: Optional[int] = None
    error: Optional[str] = None


# ============================================================================
# MODEL ARCHITECTURE
# ============================================================================

class ResNet50BiLSTM(nn.Module):
    """
    ResNet50 feature extractor + BiLSTM temporal model for deepfake detection
    Note: No sigmoid in forward pass when using BCEWithLogitsLoss during training
    """

    def __init__(self, hidden=256):
        super().__init__()
        # ResNet50 as feature extractor
        base = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V2)
        self.cnn = nn.Sequential(*list(base.children())[:-1])

        # BiLSTM for temporal modeling
        self.lstm = nn.LSTM(2048, hidden, batch_first=True, bidirectional=True)

        # Classification head (no sigmoid - applied separately)
        self.head = nn.Sequential(
            nn.Linear(hidden * 2, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(128, 1)
        )

    def forward(self, x):
        # x shape: (batch, num_frames, 3, 224, 224)
        B, T, C, H, W = x.shape

        # Extract features for each frame
        x = x.view(B * T, C, H, W)
        feats = self.cnn(x)  # (B*T, 2048, 1, 1)
        feats = feats.view(B, T, -1)  # (B, T, 2048)

        # Temporal modeling with BiLSTM
        lstm_out, _ = self.lstm(feats)

        # Use last hidden state for classification
        out = self.head(lstm_out[:, -1, :])
        return out


# ============================================================================
# VIDEO PREPROCESSING
# ============================================================================

class VideoPreprocessor:
    """Extracts and preprocesses faces from video frames"""

    def __init__(self, device='cuda', num_frames=12, image_size=224):
        self.device = torch.device(device if torch.cuda.is_available() else 'cpu')
        self.num_frames = num_frames
        self.image_size = image_size

        # Face detector
        try:
            self.mtcnn = MTCNN(
                image_size=image_size,
                margin=20,
                keep_all=False,
                device=self.device,
                post_process=False
            )
            self.face_detection_enabled = True
        except Exception as e:
            print(f"⚠️ Face detection disabled: {e}")
            self.face_detection_enabled = False

        # Image transforms
        self.transform = T.Compose([
            T.Resize((image_size, image_size)),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], 
                       std=[0.229, 0.224, 0.225])
        ])

    def extract_frames(self, video_path: str):
        """Extract evenly-spaced frames from video with face detection"""
        frames = []
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            raise ValueError(f"Cannot open video file: {video_path}")

        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 1
        step = max(total_frames // self.num_frames, 1)

        for i in range(self.num_frames):
            cap.set(cv2.CAP_PROP_POS_FRAMES, i * step)
            ret, frame = cap.read()

            if not ret:
                break

            # Convert BGR to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(frame_rgb)

            # Try face detection if enabled
            if self.face_detection_enabled:
                try:
                    face = self.mtcnn(pil_img)

                    if face is not None:
                        # Face detected, use it
                        frames.append(self.transform(T.ToPILImage()(face)))
                    else:
                        # No face, use center crop
                        resized = T.Resize((self.image_size, self.image_size))(pil_img)
                        frames.append(self.transform(resized))
                except Exception:
                    # Fallback on any error
                    resized = T.Resize((self.image_size, self.image_size))(pil_img)
                    frames.append(self.transform(resized))
            else:
                # Face detection disabled, use full frame
                resized = T.Resize((self.image_size, self.image_size))(pil_img)
                frames.append(self.transform(resized))

        cap.release()

        # Pad if needed (in case video is shorter than expected)
        while len(frames) < self.num_frames:
            if frames:
                frames.append(frames[-1].clone())  # Duplicate last frame
            else:
                frames.append(torch.zeros(3, self.image_size, self.image_size))

        return torch.stack(frames)  # (T, 3, H, W)


# ============================================================================
# MODEL MANAGER
# ============================================================================

class ModelManager:
    """Manages model loading and inference"""

    def __init__(self, model_path: str, device='cuda', threshold=0.5):
        self.device = torch.device(device if torch.cuda.is_available() else 'cpu')
        self.model = None
        self.preprocessor = VideoPreprocessor(device=str(self.device))
        self.threshold = threshold
        self.load_model(model_path)

    def load_model(self, model_path: str):
        """Load trained model weights"""
        self.model = ResNet50BiLSTM(hidden=256).to(self.device)

        if Path(model_path).exists():
            try:
                checkpoint = torch.load(model_path, map_location=self.device)

                # Handle different checkpoint formats
                if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['model_state_dict'])
                elif isinstance(checkpoint, dict) and 'state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['state_dict'])
                else:
                    self.model.load_state_dict(checkpoint)

                self.model.eval()
                print(f"✅ Model loaded from {model_path}")
            except Exception as e:
                print(f"⚠️ Error loading model: {e}. Using untrained model.")
                self.model.eval()
        else:
            print(f"⚠️ Model path not found: {model_path}. Using untrained model.")
            self.model.eval()

    @torch.no_grad()
    def predict(self, video_path: str):
        """
        Run inference on video
        Returns prediction with proper sigmoid activation
        """
        # Extract and preprocess frames
        frames = self.preprocessor.extract_frames(video_path)
        frames = frames.unsqueeze(0).to(self.device)  # Add batch dimension

        # Get raw logit output
        logits = self.model(frames)

        # Apply sigmoid to get probability
        confidence = torch.sigmoid(logits).item()

        # Threshold for classification
        is_fake = confidence > self.threshold
        prediction = "FAKE" if is_fake else "REAL"

        return {
            "prediction": prediction,
            "confidence": float(confidence),
            "is_fake": bool(is_fake),
            "frames_analyzed": self.preprocessor.num_frames,
            "raw_score": float(logits.item())
        }


# ============================================================================
# FASTAPI APPLICATION
# ============================================================================

app = FastAPI(
    title="Deepfake Detection API",
    description="API for detecting deepfake videos using ResNet50+BiLSTM architecture. "
                "Trained with class-imbalanced data handling (weighted loss + oversampling).",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model manager
MODEL_PATH = os.getenv("MODEL_PATH", "model_epoch_30.pth")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
THRESHOLD = float(os.getenv("PREDICTION_THRESHOLD", "0.5"))

model_manager = None


@app.on_event("startup")
async def startup_event():
    """Initialize model on startup"""
    global model_manager
    try:
        model_manager = ModelManager(MODEL_PATH, device=DEVICE, threshold=THRESHOLD)
        print(f"✅ API started successfully")
        print(f"   Device: {DEVICE}")
        print(f"   Model Path: {MODEL_PATH}")
        print(f"   Prediction Threshold: {THRESHOLD}")
    except Exception as e:
        print(f"❌ Failed to initialize API: {e}")
        raise


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint - basic health check"""
    return HealthResponse(
        status="online",
        model_loaded=model_manager is not None,
        device=DEVICE
    )


@app.get("/health", response_model=HealthResponse)
async def health():
    """Detailed health check endpoint"""
    return HealthResponse(
        status="healthy" if model_manager and model_manager.model else "unhealthy",
        model_loaded=model_manager is not None and model_manager.model is not None,
        device=DEVICE
    )


@app.post("/predict", response_model=PredictionResponse)
async def predict_video(file: UploadFile = File(...)):
    """
    Analyze uploaded video for deepfake detection

    Args:
        file: Video file (MP4, AVI, MOV, MKV formats supported)

    Returns:
        PredictionResponse with:
        - prediction: "REAL" or "FAKE"
        - confidence: Probability score (0-1)
        - is_fake: Boolean classification result
        - frames_analyzed: Number of frames processed
        - raw_score: Raw model logit output

    The model applies sigmoid activation to convert logits to probabilities.
    Default threshold is 0.5 (can be adjusted via PREDICTION_THRESHOLD env var).
    """
    if model_manager is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # Validate file type
    allowed_extensions = {".mp4", ".avi", ".mov", ".mkv", ".webm"}
    file_ext = Path(file.filename).suffix.lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{file_ext}'. Allowed: {', '.join(allowed_extensions)}"
        )

    # Save uploaded file temporarily
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Run prediction
        result = model_manager.predict(tmp_path)

        return PredictionResponse(
            video_name=file.filename,
            **result
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    finally:
        # Clean up temporary file
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except Exception:
                pass


@app.post("/predict/batch", response_model=dict)
async def predict_batch(files: list[UploadFile] = File(...)):
    """
    Analyze multiple videos in batch

    Args:
        files: List of video files

    Returns:
        Dictionary with 'predictions' list containing results for each video
    """
    if model_manager is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    if len(files) > 10:
        raise HTTPException(
            status_code=400,
            detail="Maximum 10 videos allowed per batch request"
        )

    results = []

    for file in files:
        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as tmp:
                content = await file.read()
                tmp.write(content)
                tmp_path = tmp.name

            result = model_manager.predict(tmp_path)

            results.append(
                BatchPredictionItem(
                    video_name=file.filename,
                    **result
                )
            )

        except Exception as e:
            results.append(
                BatchPredictionItem(
                    video_name=file.filename,
                    error=str(e)
                )
            )

        finally:
            if tmp_path and os.path.exists(tmp_path):
                try:
                    os.unlink(tmp_path)
                except Exception:
                    pass

    return {"predictions": [r.dict() for r in results]}


@app.get("/info")
async def get_info():
    """Get API and model information"""
    return {
        "api_version": "2.0.0",
        "model_architecture": "ResNet50 + BiLSTM",
        "input_frames": 12,
        "image_size": 224,
        "device": DEVICE,
        "threshold": THRESHOLD,
        "model_path": MODEL_PATH,
        "features": [
            "Face detection with MTCNN",
            "Temporal modeling with BiLSTM",
            "Sigmoid activation for probability",
            "Configurable threshold"
        ]
    }


# ============================================================================
# MAIN ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")

    print(f"Starting Deepfake Detection API on {host}:{port}")

    uvicorn.run(
        app,
        host=host,
        port=port,
        log_level="info"
    )
