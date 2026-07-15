<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=DeepfakeDetect&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Manipulated%20Video%20Detection&descAlignY=58&descSize=20" width="100%"/>

<br/>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=800&color=EE4C2C&center=true&vCenter=true&width=680&lines=Detect+deepfakes+with+ResNet50+%2B+LSTM;Upload+a+video%2C+get+a+verdict+in+seconds;Face-level+analysis+with+confidence+scoring;Full-stack%3A+FastAPI+backend+%2B+React+frontend" alt="Typing SVG" />

<br/><br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React_18-black?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=1000" width="100%"/>

<br/>

<a href="#-overview"><img src="https://img.shields.io/badge/Overview-black?style=flat-square&logo=googledocs&logoColor=white" /></a>
<a href="#-key-features"><img src="https://img.shields.io/badge/Features-black?style=flat-square&logo=sparkfun&logoColor=white" /></a>
<a href="#%EF%B8%8F-technology-stack"><img src="https://img.shields.io/badge/Tech%20Stack-black?style=flat-square&logo=techcrunch&logoColor=white" /></a>
<a href="#-model-architecture"><img src="https://img.shields.io/badge/Model-black?style=flat-square&logo=pytorch&logoColor=white" /></a>
<a href="#%EF%B8%8F-installation--setup"><img src="https://img.shields.io/badge/Setup-black?style=flat-square&logo=gitbook&logoColor=white" /></a>
<a href="#-api-endpoints"><img src="https://img.shields.io/badge/API-black?style=flat-square&logo=fastapi&logoColor=white" /></a>

</div>

<br/>

## 📌 Overview

> **DeepfakeDetect** is a full-stack application that detects manipulated ("deepfake") videos using a hybrid **ResNet50 + LSTM** deep learning pipeline. Faces are extracted frame-by-frame with MTCNN, passed through a pretrained ResNet50 for spatial feature extraction, then fed into a bidirectional LSTM to model temporal inconsistencies across frames — the kind of subtle motion artifacts that give deepfakes away.
>
> The model is served through a FastAPI backend with a documented REST API, and consumed by a polished React frontend where a user can drag-and-drop a video and get a real/fake verdict with a confidence score in seconds.

<div align="center">

| | |
|:---:|:---|
| 🎥 | **Real-time inference** — upload a video, get a verdict in ~3–5 seconds |
| 🧠 | **Hybrid architecture** — ResNet50 spatial features + BiLSTM temporal modeling |
| 🔒 | **Privacy-conscious** — uploaded files are processed and discarded, not retained |
| ⚡ | **Full-stack delivery** — FastAPI REST API + React UI with dark mode & live charts |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 🚀 Key Features

<table>
<tr>
<td width="50%" valign="top">

### 🎥 Video Upload & Analysis
Drag-and-drop or click-to-browse upload, with support for MP4, AVI, MKV, MOV, and WEBM.

### 🧩 Face-Level Detection
MTCNN-based face detection and alignment run before classification, so the model reasons over faces rather than raw frames.

### 📊 Confidence Scoring
Sigmoid-based probability output gives a calibrated confidence score alongside the real/fake label — not just a binary guess.

### 🔄 Batch Processing
Analyze multiple videos in a single request via the `/predict/batch` endpoint.

</td>
<td width="50%" valign="top">

### 🎨 Modern React UI
Tailwind CSS + Framer Motion for a smooth, responsive interface with dark mode support.

### 📈 Visual Results
Interactive confidence meters and analytics charts (Recharts) on the results page.

### 📡 Documented REST API
FastAPI backend with interactive Swagger docs at `/docs`, plus a health-check endpoint for monitoring.

### 📱 Responsive Design
Works across desktop, tablet, and mobile out of the box.

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 🛠️ Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=python,pytorch,fastapi,react,tailwind,opencv" />

</div>

| Layer | Technology | Purpose |
|:--|:--|:--|
| **Deep Learning** | PyTorch, TorchVision | Model architecture, training, and inference |
| **Face Detection** | facenet-pytorch (MTCNN) | Face detection and alignment prior to classification |
| **Video Processing** | OpenCV, Pillow | Frame extraction and preprocessing |
| **Backend** | FastAPI, Uvicorn, Python 3.10+ | REST API server and async inference pipeline |
| **Frontend** | React 18.2, React Router DOM | UI framework and client-side routing |
| **Styling & Animation** | Tailwind CSS, Framer Motion, Lucide React | Utility-first styling, transitions, and icons |
| **Data Viz** | Recharts | Confidence meters and result visualizations |
| **File Upload** | React Dropzone | Drag-and-drop video upload handling |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 🧠 Model Architecture

### ResNet50 + LSTM Hybrid

```
Input Video → Frame Extraction → Face Detection (MTCNN) → ResNet50 Feature Extraction
→ Bidirectional LSTM (Temporal Modeling) → Classification Head → Real / Fake + Confidence
```

| Detail | Value |
|:--|:--|
| **Spatial extractor** | ResNet50, pretrained on ImageNet |
| **Temporal model** | Bidirectional LSTM, 256 hidden units |
| **Input** | 12 frames per video, 224×224 resolution |
| **Output** | Binary classification with confidence score |
| **Training dataset** | Deepfake Detection Challenge (DFDC) — Meta |
| **Class imbalance handling** | Weighted loss + oversampling |
| **Optimizer** | Adam, with learning rate scheduling |
| **Validation** | 5-fold cross-validation |

### 📊 Performance Metrics

| Metric | Value |
|:--|:--:|
| **Accuracy** | 80% |
| **Precision** | 74% |
| **Recall** | 54% |
| **F1-Score** | 51% |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📂 Project Structure

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

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## ⚙️ Installation & Setup

<details open>
<summary><b>Prerequisites</b></summary>
<br/>

- Python 3.10+
- Node.js 16+ & npm
- CUDA-capable GPU (optional, for faster inference)

</details>

<details open>
<summary><b>1. Clone the repository</b></summary>
<br/>

```bash
git clone https://github.com/Dipakk7/DeepfakeDetect.git
cd DeepfakeDetect
```

</details>

<details>
<summary><b>2. Backend setup</b></summary>
<br/>

```bash
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

</details>

<details>
<summary><b>3. Frontend setup</b></summary>
<br/>

```bash
npm install
```

</details>

<details>
<summary><b>4. Download model weights</b></summary>
<br/>

Pretrained weights aren't tracked in-repo due to file size limits.

👉 **[Download from Google Drive](https://drive.google.com/file/d/1ZSp7lvbaQhoN51nsaO8Oi0WA1cMFYnb6/view?usp=sharing)**

Or via CLI:

```bash
pip install gdown
gdown 1ZSp7lvbaQhoN51nsaO8Oi0WA1cMFYnb6 -O model_epoch_30.pth
```

</details>

<details open>
<summary><b>5. Run locally</b></summary>
<br/>

**Terminal 1 — Backend:**

```bash
python backend.py
```

✅ Runs at `http://localhost:8000`

**Terminal 2 — Frontend:**

```bash
npm start
```

✅ Runs at `http://localhost:3000`

> 💡 Both servers need to run simultaneously — the frontend proxies API requests to the backend.

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📡 API Endpoints

| Method | Endpoint | Description |
|:--|:--|:--|
| `GET` | `/` | Basic health check |
| `GET` | `/health` | Detailed system + model status |
| `POST` | `/predict` | Single video prediction |
| `POST` | `/predict/batch` | Batch video analysis |
| `GET` | `/info` | Model architecture & config details |
| `GET` | `/docs` | Interactive Swagger UI |

**Example request:**

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@path/to/your/video.mp4"
```

**Example response:**

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

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📊 Dataset

Trained on the **Deepfake Detection Challenge (DFDC)** dataset, released by Meta — thousands of real and manipulated videos spanning diverse generation techniques, qualities, and real-world conditions.

- [Kaggle Competition Page](https://www.kaggle.com/competitions/deepfake-detection-challenge/data)
- CLI: `kaggle competitions download -c deepfake-detection-challenge`

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

<br/>

<div align="center">

## 👨‍💻 Contributors

[![Dipak Khandagale](https://img.shields.io/badge/Dipak%20Khandagale-khandagaledipak47%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:khandagaledipak47@gmail.com)
[![Sayali More](https://img.shields.io/badge/Sayali%20More-Sayalimore2003%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:Sayalimore2003@gmail.com)
[![Priya Marmat](https://img.shields.io/badge/Priya%20Marmat-priyamarmt%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:priyamarmt@gmail.com)

[![GitHub](https://img.shields.io/badge/GitHub-Dipakk7-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dipakk7)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dipak%20Khandagale-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dipakkhandagale/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Site-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dipakkhandagale.vercel.app/)

<br/>

### ⭐ If you find this project useful, consider starring the repo!

[![Star on GitHub](https://img.shields.io/github/stars/Dipakk7/DeepfakeDetect?style=for-the-badge&color=gold&logo=github)](https://github.com/Dipakk7/DeepfakeDetect/stargazers)

<br/><br/>

<a href="#-deepfake-detection-platform">
  <img src="https://img.shields.io/badge/⬆-Back%20to%20Top-black?style=for-the-badge" />
</a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>
