import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Lock, 
  Eye, 
  ArrowRight,
  Settings,
  Trash2,
  Download
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import FileUpload from '../components/FileUpload';
import ProgressBar from '../components/ProgressBar';

const UploadPage = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [autoDelete, setAutoDelete] = useState(true);

  const handleFileSelect = (files) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadProgress(30);

    try {
      // Call backend API directly; adjust if you configured a CRA proxy
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Upload failed with status ${response.status}`);
      }

      setUploadProgress(70);
      const data = await response.json();
      
      // Debug: Log the raw backend response
      console.log('Raw backend response:', data);

      // Map backend response (PredictionResponse) to UI schema
      // Backend fields: video_name, prediction ("FAKE"|"REAL"), confidence (0..1), is_fake (bool), frames_analyzed
      const mapped = [{
        id: `${Date.now()}`,
        fileName: data.video_name || file.name,
        type: file.type && file.type.startsWith('image/') ? 'image' : 'video',
        isReal: !data.is_fake, // Fix: is_fake=true means it's fake (not real), so isReal should be !data.is_fake
        confidence: Math.round(((data.confidence ?? 0) * 100)),
        analysis: {
          facialConsistency: 80,
          lightingAnalysis: 78,
          temporalConsistency: file.type?.startsWith('video/') ? 74 : null,
          textureAnalysis: 82,
          metadataCheck: 90
        },
        suspiciousAreas: [
          { x: 120, y: 140, width: 40, height: 40, confidence: 0.7 }
        ],
        suspiciousFrames: file.type?.startsWith('video/') ? [
          { timestamp: 2.5, confidence: 0.72 }
        ] : [],
        timestamp: new Date().toISOString()
      }];

      setUploadProgress(100);
      setIsUploading(false);
      setIsAnalyzing(false);

      navigate('/results', {
        state: {
          files: [file],
          results: mapped
        }
      });
    } catch (e) {
      console.error(e);
      setIsUploading(false);
      alert(e.message || 'Upload failed');
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Advanced AI Detection',
      description: 'State-of-the-art neural networks trained on millions of samples'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get results in seconds with our optimized detection pipeline'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Files are automatically deleted after processing'
    },
    {
      icon: Eye,
      title: 'Visual Analysis',
      description: 'See exactly where manipulations occur with detailed heatmaps'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Analyze Media for Deepfakes
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Upload images or videos to detect AI-generated content with our advanced detection algorithms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                Upload Your Media
              </h2>
              
              <FileUpload
                onFileSelect={handleFileSelect}
                onRemove={handleFileRemove}
                selectedFiles={selectedFiles}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                maxFiles={5}
              />

              {/* Analysis Progress */}
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Analyzing facial features, lighting, and temporal consistency...
                    </p>
                  </div>
                  <ProgressBar
                    progress={analysisProgress}
                    label="Processing files..."
                    color="primary"
                    size="lg"
                  />
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading || isAnalyzing}
                  loading={isUploading || isAnalyzing}
                  icon={<Shield className="w-5 h-5" />}
                  className="flex-1"
                >
                  {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                </Button>
                
                {selectedFiles.length > 0 && (
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<Trash2 className="w-5 h-5" />}
                    onClick={() => setSelectedFiles([])}
                    disabled={isUploading || isAnalyzing}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </Card>

            {/* Settings */}
            <Card>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Analysis Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-secondary-900 dark:text-white">
                      Auto-delete files after processing
                    </h4>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Files will be automatically removed from our servers after analysis
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoDelete(!autoDelete)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoDelete ? 'bg-primary-600' : 'bg-secondary-300 dark:bg-secondary-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoDelete ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Why Choose Our Platform?
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-secondary-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-secondary-600 dark:text-secondary-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Platform Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">
                    Files Analyzed Today
                  </span>
                  <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                    1,247
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">
                    Average Accuracy
                  </span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    95.2%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">
                    Processing Time
                  </span>
                  <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                    3.2s avg
                  </span>
                </div>
              </div>
            </Card>

            {/* Help */}
            <Card>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                Check out our help center for detailed guides and FAQs.
              </p>
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full"
              >
                Visit Help Center
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
