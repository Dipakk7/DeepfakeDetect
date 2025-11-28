# frontend.py
import tempfile
import requests
import streamlit as st

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
