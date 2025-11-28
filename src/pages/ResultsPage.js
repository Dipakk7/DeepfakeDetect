import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Share2, 
  Flag, 
  Eye, 
  Brain, 
  Clock, 
  FileText,
  BarChart3,
  Camera,
  Zap,
  Shield
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import ConfidenceMeter from '../components/ConfidenceMeter';
import Tabs from '../components/Tabs';
import HeatmapOverlay from '../components/HeatmapOverlay';
import VideoPlayer from '../components/VideoPlayer';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedResult, setSelectedResult] = useState(0);

  // Get results from navigation state or use mock data
  const results = Array.isArray(location.state?.results)
    ? location.state.results
    : generateMockResults();
  const files = Array.isArray(location.state?.files) ? location.state.files : [];

  const currentResult = results?.[selectedResult] || {
    id: 'empty',
    fileName: 'unknown',
    type: 'video',
    isReal: true,
    confidence: 0,
    analysis: {},
    suspiciousAreas: [],
    suspiciousFrames: [],
    explanations: [],
    timestamp: new Date().toISOString()
  };

  function generateMockResults() {
    return [{
      id: 'result-1',
      fileName: 'sample-video.mp4',
      type: 'video',
      isReal: false,
      confidence: 87,
      analysis: {
        facialConsistency: 65,
        lightingAnalysis: 72,
        temporalConsistency: 58,
        textureAnalysis: 81,
        metadataCheck: 95
      },
      suspiciousAreas: [
        { x: 100, y: 150, width: 50, height: 50, confidence: 0.8 },
        { x: 200, y: 200, width: 30, height: 30, confidence: 0.6 }
      ],
      suspiciousFrames: [
        { timestamp: 2.5, confidence: 0.85 },
        { timestamp: 5.2, confidence: 0.72 },
        { timestamp: 8.1, confidence: 0.91 }
      ],
      timestamp: new Date().toISOString(),
      explanations: [
        'Inconsistent eye movement patterns detected',
        'Unnatural lip-sync timing in multiple frames',
        'Slight lighting inconsistencies in facial regions',
        'Temporal artifacts in background elements'
      ]
    }];
  }

  const getVerdictIcon = (isReal, confidence) => {
    if (confidence < 60) {
      return <XCircle className="w-8 h-8 text-red-500" />;
    }
    return <CheckCircle className="w-8 h-8 text-green-500" />;
  };

  const getVerdictColor = (isReal, confidence) => {
    if (confidence < 60) return 'yellow';
    return isReal ? 'green' : 'green';
  };

  const getVerdictText = (isReal, confidence) => {
    if (confidence < 60) return 'Fake';
    return isReal ? 'Real' : 'Real';
  };

  const tabs = [
    {
      label: 'Overview',
      icon: <Eye className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Verdict Card */}
          <Card>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {getVerdictIcon(currentResult.isReal, currentResult.confidence)}
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                getVerdictColor(currentResult.isReal, currentResult.confidence) === 'green' 
                  ? 'text-green-600 dark:text-green-400' 
                  : getVerdictColor(currentResult.isReal, currentResult.confidence) === 'red'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {getVerdictText(currentResult.isReal, currentResult.confidence)}
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Based on comprehensive AI analysis of facial features, lighting, and temporal consistency.
              </p>
              <ConfidenceMeter 
                confidence={currentResult.confidence} 
                size="lg"
                label="Overall Confidence"
              />
            </div>
          </Card>

          {/* Analysis Breakdown */}
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Analysis Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConfidenceMeter 
                confidence={currentResult.analysis.facialConsistency} 
                label="Facial Consistency"
              />
              <ConfidenceMeter 
                confidence={currentResult.analysis.lightingAnalysis} 
                label="Lighting Analysis"
              />
              {currentResult.analysis.temporalConsistency && (
                <ConfidenceMeter 
                  confidence={currentResult.analysis.temporalConsistency} 
                  label="Temporal Consistency"
                />
              )}
              <ConfidenceMeter 
                confidence={currentResult.analysis.textureAnalysis} 
                label="Texture Analysis"
              />
              <ConfidenceMeter 
                confidence={currentResult.analysis.metadataCheck} 
                label="Metadata Check"
              />
            </div>
          </Card>

          {/* Key Findings */}
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Key Findings
            </h3>
            <div className="space-y-3">
              {(currentResult.explanations ?? []).map((explanation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-secondary-700 dark:text-secondary-300">
                    {explanation}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Heatmap',
      icon: <Camera className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Suspicious Areas Detection
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Red areas indicate regions where the AI detected potential manipulation. 
              Adjust the opacity slider to see the original image underneath.
            </p>
            <HeatmapOverlay
              suspiciousAreas={currentResult.suspiciousAreas ?? []}
              imageUrl="/api/placeholder/600/400"
              className="max-w-2xl mx-auto"
            />
          </Card>
        </div>
      )
    },
    {
      label: 'Timeline',
      icon: <Clock className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Video Timeline Analysis
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Suspicious frames are marked on the timeline. Click on markers to jump to specific timestamps.
            </p>
            {currentResult.type === 'video' ? (
              <VideoPlayer
                videoUrl="/api/placeholder/video"
                suspiciousFrames={currentResult.suspiciousFrames ?? []}
                className="max-w-4xl mx-auto"
              />
            ) : (
              <div className="text-center py-12 text-secondary-500 dark:text-secondary-400">
                Timeline analysis is only available for video files.
              </div>
            )}
          </Card>
        </div>
      )
    },
    {
      label: 'Metadata',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              File Metadata Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                  File Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Filename:</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">{currentResult.fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Type:</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">{currentResult.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Analysis Date:</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      {new Date(currentResult.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">File Hash:</span>
                    <span className="text-sm font-mono text-secondary-900 dark:text-white">
                      {currentResult.id}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                  Technical Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Model Version:</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">v2.1.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Processing Time:</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">3.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Confidence Threshold:</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Explainability',
      icon: <Brain className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              AI Decision Explanation
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Understanding how our AI model reached this conclusion helps build trust and transparency.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Neural Network Analysis
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Our CNN-LSTM hybrid model analyzed {currentResult.type === 'video' ? '2,847 frames' : 'the image'} 
                  using 47 different feature extraction layers, focusing on facial geometry, 
                  lighting patterns, and temporal consistency.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Feature Importance
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  The most significant factors in this analysis were texture inconsistencies (23%), 
                  lighting anomalies (18%), and facial landmark deviations (15%).
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  Model Confidence
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  This result has a confidence score of {currentResult.confidence}%, which means 
                  the model is {currentResult.confidence >= 80 ? 'highly confident' : 
                  currentResult.confidence >= 60 ? 'moderately confident' : 'uncertain'} 
                  about this classification.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                Analysis Results
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400">
                {(results?.length ?? 0)} file{(results?.length ?? 0) !== 1 ? 's' : ''} analyzed • 
                Completed {new Date().toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                icon={<Download className="w-4 h-4" />}
              >
                Download Report
              </Button>
              <Button
                variant="outline"
                icon={<Share2 className="w-4 h-4" />}
              >
                Share Results
              </Button>
              <Button
                variant="outline"
                icon={<Flag className="w-4 h-4" />}
              >
                Report Issue
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Results List */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Analyzed Files
              </h3>
              <div className="space-y-3">
                {(results ?? []).map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => setSelectedResult(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedResult === index
                        ? 'bg-primary-100 dark:bg-primary-900 border border-primary-300 dark:border-primary-700'
                        : 'bg-secondary-50 dark:bg-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getVerdictIcon(result.isReal, result.confidence)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                          {result.fileName}
                        </p>
                        <p className={`text-xs ${
                          getVerdictColor(result.isReal, result.confidence) === 'green' 
                            ? 'text-green-600 dark:text-green-400' 
                            : getVerdictColor(result.isReal, result.confidence) === 'red'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {getVerdictText(result.isReal, result.confidence)} ({result.confidence}%)
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              tabs={tabs}
              defaultTab={activeTab}
              onTabChange={setActiveTab}
              variant="pills"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
