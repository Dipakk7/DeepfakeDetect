<div align="center">

# DeepfakeDetect

**AI-powered detection of manipulated videos, built on a ResNet50 + LSTM pipeline.**

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [Model](#model-architecture) · [Setup](#installation) · [API](#api-endpoints)

</div>

---

## Overview

DeepfakeDetect is a full-stack application that detects manipulated ("deepfake") videos using a hybrid **ResNet50 + LSTM** architecture. Faces are extracted frame-by-frame with MTCNN, passed through a pretrained ResNet50 for spatial feature extraction, then fed into a bidirectional LSTM to model temporal inconsistencies across frames — the kind of subtle motion artifacts that give deepfakes away.

The model is served through a FastAPI backend with a documented REST API, and consumed by a React frontend where a user can upload a video and get a real/fake verdict with a confidence score in seconds.

- **Real-time inference** — upload a video, get a verdict in ~3–5 seconds
- **Hybrid architecture** — ResNet50 spatial features + BiLSTM temporal modeling
- **Privacy-conscious** — uploaded files are processed and discarded, not retained
- **Full-stack delivery** — FastAPI REST API + React UI with dark mode and live charts

---

## Features

**Frontend**
- Drag-and-drop video upload with progress tracking (MP4, AVI, MKV, MOV, WEBM)
- Interactive confidence meters and result charts (Recharts)
- Dark mode, responsive layout, smooth transitions (Framer Motion)

**Backend**
- MTCNN-based face detection prior to classification
- Sigmoid-based confidence scoring, not just a binary label
- Batch prediction endpoint for analyzing multiple videos at once
- Interactive Swagger docs and health-check endpoint

---

## Tech Stack

| Layer | Technology |
|---|---|
| Deep Learning | PyTorch, TorchVision |
| Face Detection | facenet-pytorch (MTCNN) |
| Video Processing | OpenCV, Pillow |
| Backend | FastAPI, Uvicorn, Python 3.10+ |
| Frontend | React 18.2, React Router DOM |
| Styling | Tailwind CSS, Framer Motion, Lucide React |
| Data Viz | Recharts |
| File Upload | React Dropzone |

---

## Model Architecture

```
Input Video → Frame Extraction → Face Detection (MTCNN) → ResNet50 Feature Extraction
→ Bidirectional LSTM (Temporal Modeling) → Classification Head → Real / Fake + Confidence
```

| Detail | Value |
|---|---|
| Spatial extractor | ResNet50, pretrained on ImageNet |
| Temporal model | Bidirectional LSTM, 256 hidden units |
| Input | 12 frames per video, 224×224 resolution |
| Output | Binary classification with confidence score |
| Training dataset | Deepfake Detection Challenge (DFDC) — Meta |
| Class imbalance handling | Weighted loss + oversampling |
| Optimizer | Adam, with learning rate scheduling |
| Validation | 5-fold cross-validation |

**Performance**

| Metric | Value |
|---|---|
| Accuracy | 80% |
| Precision | 74% |
| Recall | 54% |
| F1-Score | 51% |

---

## Project Structure

```
DeepfakeDetect/
├── backend.py                 # FastAPI backend server
├── requirements.txt           # Python dependencies
├── package.json               # Node.js dependencies
├── src/                       # React frontend source
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Landing, Upload, Results, About, Help pages
│   └── context/                # Dark mode context provider
├── public/                    # Static assets
├── Backend/                   # Additional backend files
└── model_epoch_30.pth         # Pretrained model weights (downloaded separately)
```

---

## Installation

**Prerequisites**: Python 3.10+, Node.js 16+, npm, and a CUDA-capable GPU (optional, for faster inference).

```bash
# 1. Clone the repository
git clone https://github.com/Dipakk7/DeepfakeDetect.git
cd DeepfakeDetect

# 2. Backend setup
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3. Frontend setup
npm install
```

**Download model weights** — pretrained weights aren't tracked in-repo due to file size limits.

```bash
pip install gdown
gdown 1ZSp7lvbaQhoN51nsaO8Oi0WA1cMFYnb6 -O model_epoch_30.pth
```

Or download manually from [Google Drive](https://drive.google.com/file/d/1ZSp7lvbaQhoN51nsaO8Oi0WA1cMFYnb6/view?usp=sharing).

**Run locally**

```bash
# Terminal 1 — Backend (http://localhost:8000)
python backend.py

# Terminal 2 — Frontend (http://localhost:3000)
npm start
```

> Both servers need to run simultaneously — the frontend proxies API requests to the backend.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Basic health check |
| `GET` | `/health` | Detailed system + model status |
| `POST` | `/predict` | Single video prediction |
| `POST` | `/predict/batch` | Batch video analysis |
| `GET` | `/info` | Model architecture & config details |
| `GET` | `/docs` | Interactive Swagger UI |

**Example**

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@path/to/your/video.mp4"
```

```json
{
  "video_name": "video.mp4",
  "prediction": "REAL",
  "confidence": 0.87,
  "is_fake": false,
  "frames_analyzed": 12,
  "raw_score": 1.95
}
```

---

## Dataset

Trained on the **Deepfake Detection Challenge (DFDC)** dataset, released by Meta — thousands of real and manipulated videos spanning diverse generation techniques, qualities, and real-world conditions.

- [Kaggle Competition Page](https://www.kaggle.com/competitions/deepfake-detection-challenge/data)
- CLI: `kaggle competitions download -c deepfake-detection-challenge`

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contributors

**Dipak Khandagale** &nbsp;[![Email](https://img.shields.io/badge/Email-333333?logo=gmail&logoColor=white)](mailto:khandagaledipak47@gmail.com)

**Sayali More** &nbsp;[![Email](https://img.shields.io/badge/Email-333333?logo=gmail&logoColor=white)](mailto:Sayalimore2003@gmail.com)

**Priya Marmat** &nbsp;[![Email](https://img.shields.io/badge/Email-333333?logo=gmail&logoColor=white)](mailto:priyamarmt@gmail.com)

<div align="center">

<br/>

⭐ **Star this repo if you find it useful.**

</div>
