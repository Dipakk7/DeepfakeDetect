<div align="center">

# 🧠 Deepfake Detection Platform

### A Full-Stack AI-Powered Solution for Detecting Manipulated Videos

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Installation](#-installation--setup) • [Usage](#-usage) • [API Documentation](#-api-endpoints) • [Model Details](#-model-architecture)

</div>

---

## 📖 Overview

**Deepfake Detection Platform** is a comprehensive full-stack application that leverages state-of-the-art deep learning to identify manipulated videos in real-time. Built with a hybrid **ResNet50 + LSTM** architecture, the platform combines spatial feature extraction with temporal sequence modeling to achieve high accuracy in detecting deepfake content.

### 🎯 Key Highlights

- 🎥 **Real-time Video Analysis** - Upload and analyze videos instantly
- 🧠 **Advanced AI Model** - ResNet50 + LSTM architecture with 80%+ accuracy
- 🎨 **Modern Web Interface** - Beautiful, responsive React frontend with dark mode
- ⚡ **RESTful API** - FastAPI backend with comprehensive endpoints
- 🔒 **Privacy-First** - Files processed securely and deleted after analysis
- 📊 **Detailed Analytics** - Confidence scores and visual feedback

---

## ✨ Features

### 🖥️ Frontend (React Web Application)
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Framer Motion animations
- 🌙 **Dark Mode** - Comfortable viewing in any lighting condition
- 📤 **Drag & Drop Upload** - Intuitive file upload with progress tracking
- 📈 **Visual Results** - Interactive confidence meters and analytics charts
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 📚 **Help & Documentation** - Comprehensive guides and FAQ sections
- 🎭 **Smooth Animations** - Polished user experience with Framer Motion

### ⚙️ Backend (FastAPI REST API)
- 🎥 **Video Processing** - Supports multiple formats (MP4, AVI, MKV, MOV, WEBM)
- 🧩 **Face Detection** - MTCNN-based face extraction before analysis
- ⚡ **High Performance** - Optimized inference pipeline with GPU support
- 📊 **Confidence Scoring** - Sigmoid-based probability outputs
- 🔄 **Batch Processing** - Analyze multiple videos simultaneously
- 📡 **RESTful Endpoints** - Well-documented API with OpenAPI/Swagger docs
- 🏥 **Health Monitoring** - System health and model status endpoints

---

## 🛠️ Tech Stack

### Backend Technologies
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Deep Learning** | PyTorch, TorchVision | Model architecture and inference |
| **API Framework** | FastAPI, Uvicorn | REST API server |
| **Video Processing** | OpenCV, Pillow | Video frame extraction and preprocessing |
| **Face Detection** | facenet-pytorch (MTCNN) | Face detection and alignment |
| **Language** | Python 3.10+ | Backend development |

### Frontend Technologies
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 18.2 | UI framework |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Routing** | React Router DOM | Client-side routing |
| **Animations** | Framer Motion | Smooth UI animations |
| **Icons** | Lucide React | Icon library |
| **Charts** | Recharts | Data visualization |
| **File Upload** | React Dropzone | Drag-and-drop file handling |

---

## 📦 Installation & Setup

### Prerequisites
- Python 3.10 or higher
- Node.js 16+ and npm
- CUDA-capable GPU (optional, for faster inference)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Dipakk7/DeepfakeDetect.git
cd DeepfakeDetect
```

### Step 2: Backend Setup

Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Step 3: Frontend Setup

Install Node.js dependencies:
```bash
npm install
```

### Step 4: Download Model Weights

The pretrained model weights are required for inference. Download them from:

👉 **[Google Drive Link](https://drive.google.com/file/d/1ZSp7lvbaQhoN51nsaO8Oi0WA1cMFYnb6/view?usp=sharing)**

Or use command line:
```bash
pip install gdown
gdown 1ZSp7lvbaQhoN51nsaO8Oi0WA1cMFYnb6 -O model_epoch_30.pth
```

Set the model path (optional, defaults to `model_epoch_30.pth`):
```bash
# Windows
set MODEL_PATH=model_epoch_30.pth

# Linux/Mac
export MODEL_PATH=model_epoch_30.pth
```

### Step 5: Run the Application

**Terminal 1 - Start Backend Server:**
```bash
python backend.py
```
✅ Backend API running at `http://localhost:8000`

**Terminal 2 - Start Frontend Development Server:**
```bash
npm start
```
✅ Frontend app running at `http://localhost:3000`

> 💡 **Tip:** Make sure both servers are running simultaneously. The frontend is configured to proxy API requests to the backend.

---

## 🚀 Usage

### Web Interface

1. Navigate to `http://localhost:3000` in your browser
2. Click **"Analyze Now"** or go to the Upload page
3. Drag and drop a video file or click to browse
4. Wait for the analysis to complete (typically 3-5 seconds)
5. View detailed results with confidence scores and visualizations

### API Usage

#### Single Video Prediction
```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@path/to/your/video.mp4"
```

**Response:**
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

#### Batch Prediction
```bash
curl -X POST "http://localhost:8000/predict/batch" \
  -F "files=@video1.mp4" \
  -F "files=@video2.mp4"
```

#### Health Check
```bash
curl http://localhost:8000/health
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/` | Basic health check | Status and device info |
| `GET` | `/health` | Detailed system health | Model status and configuration |
| `POST` | `/predict` | Single video prediction | Prediction results with confidence |
| `POST` | `/predict/batch` | Batch video analysis | Array of prediction results |
| `GET` | `/info` | Model information | Architecture and configuration details |
| `GET` | `/docs` | API documentation | Interactive Swagger UI |

### Interactive API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

---

## 🧠 Model Architecture

### ResNet50 + LSTM Hybrid Model

The detection model combines the strengths of convolutional and recurrent neural networks:

```
Input Video → Frame Extraction → Face Detection (MTCNN) → ResNet50 Feature Extraction 
→ LSTM Temporal Modeling → Classification Head → Output (Real/Fake + Confidence)
```

**Architecture Details:**
- **Spatial Feature Extractor**: ResNet50 (pretrained on ImageNet)
- **Temporal Model**: Bidirectional LSTM (256 hidden units)
- **Input**: 12 frames per video, 224×224 resolution
- **Output**: Binary classification (Real/Fake) with confidence score

### Training Details
- **Dataset**: Deepfake Detection Challenge (DFDC) by Meta
- **Training Strategy**: Class-imbalance handling (weighted loss + oversampling)
- **Optimization**: Adam optimizer with learning rate scheduling
- **Validation**: 5-fold cross-validation

### Performance Metrics

| Metric | Value |
|--------|-------|
| **Accuracy** | 80.% |
| **Precision** | 74.% |
| **Recall** | 54.% |
| **F1-Score** | 51.% |

---

## 📂 Project Structure

```
DeepfakeDetect/
├── backend.py                 # FastAPI backend server
├── requirements.txt           # Python dependencies
├── package.json              # Node.js dependencies
├── .gitignore                # Git ignore rules
│
├── src/                      # React frontend source
│   ├── components/          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── FileUpload.js
│   │   ├── VideoPlayer.js
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── LandingPage.js
│   │   ├── UploadPage.js
│   │   ├── ResultsPage.js
│   │   ├── AboutPage.js
│   │   └── HelpPage.js
│   ├── context/             # React context providers
│   │   └── DarkModeContext.js
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
│
├── public/                  # Static assets
│   ├── index.html
│   └── images/
│
├── Backend/                 # Additional backend files
│   └── ...
│
└── model_epoch_30.pth      # Pretrained model weights (download separately)
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MODEL_PATH` | Path to model weights file | `model_epoch_30.pth` |
| `PREDICTION_THRESHOLD` | Classification threshold (0-1) | `0.5` |
| `HOST` | Backend server host | `0.0.0.0` |
| `PORT` | Backend server port | `8000` |

### Example Configuration
```bash
# Windows
set MODEL_PATH=model_epoch_30.pth
set PREDICTION_THRESHOLD=0.5
set PORT=8000

# Linux/Mac
export MODEL_PATH=model_epoch_30.pth
export PREDICTION_THRESHOLD=0.5
export PORT=8000
```

---

## 📊 Dataset Information

The model was trained on the **Deepfake Detection Challenge (DFDC)** dataset, released by Meta (Facebook) and partners. This dataset contains:

- Thousands of real and manipulated videos
- Diverse deepfake generation techniques
- Various video qualities and resolutions
- Real-world scenarios and conditions

**Dataset Access:**
- [Kaggle Competition](https://www.kaggle.com/competitions/deepfake-detection-challenge/data)
- Download using Kaggle API: `kaggle competitions download -c deepfake-detection-challenge`

---

## 🧪 Development

### Running Tests
```bash
# Backend tests (if available)
python -m pytest tests/

# Frontend tests
npm test
```

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
The FastAPI server can be deployed using:
- Docker
- Gunicorn with Uvicorn workers
- Cloud platforms (AWS, GCP, Azure)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Here's how you can help:

1. 🐛 **Report Bugs** - Open an issue describing the bug
2. 💡 **Suggest Features** - Share your ideas for improvements
3. 🔧 **Submit Pull Requests** - Fix bugs or add new features
4. 📝 **Improve Documentation** - Help make the docs better

### Contribution Guidelines
- Fork the repository
- Create a feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

---

## 🐛 Known Issues

- Model weights need to be downloaded separately (due to GitHub file size limits)
- GPU recommended for faster inference (CPU works but slower)
- Large video files may take longer to process

---

## 🔮 Future Enhancements

- [ ] Real-time video stream analysis
- [ ] Image deepfake detection
- [ ] Model explainability features
- [ ] User authentication and history
- [ ] API rate limiting and usage analytics
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---


## 👨‍💻 Author

<div align="center">

### Sayali More
### Dipak Khandagale
### Priya Marmat

</div>

---

## 🙏 Acknowledgments

- **Meta (Facebook)** for the Deepfake Detection Challenge dataset
- **PyTorch** team for the excellent deep learning framework
- **FastAPI** creators for the modern Python web framework
- **React** team for the powerful UI library
- All open-source contributors whose libraries made this project possible

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ using FastAPI, PyTorch, React, and OpenCV to ensure digital media authenticity.**

[⬆ Back to Top](#-deepfake-detection-platform)

</div>
