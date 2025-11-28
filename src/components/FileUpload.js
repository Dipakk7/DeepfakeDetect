import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  X, 
  Camera, 
  Link as LinkIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Button from './Button';
import ProgressBar from './ProgressBar';

const FileUpload = ({ 
  onFileSelect, 
  onRemove, 
  selectedFiles = [], 
  isUploading = false,
  uploadProgress = 0,
  maxFiles = 1,
  acceptedTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv']
  }
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.error('Some files were rejected:', rejectedFiles);
    }
    
    if (acceptedFiles.length > 0) {
      const newFiles = acceptedFiles.slice(0, maxFiles - selectedFiles.length);
      onFileSelect(newFiles);
    }
  }, [onFileSelect, selectedFiles.length, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: maxFiles - selectedFiles.length,
    disabled: isUploading || selectedFiles.length >= maxFiles
  });

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      // Simulate file from URL
      const urlFile = {
        name: urlInput.split('/').pop() || 'url-file',
        size: 0,
        type: 'url',
        url: urlInput,
        isUrl: true
      };
      onFileSelect([urlFile]);
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const handleWebcamCapture = () => {
    // This would open webcam interface
    console.log('Webcam capture not implemented yet');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.isUrl) return <LinkIcon className="w-8 h-8" />;
    if (file.type.startsWith('image/')) return <Image className="w-8 h-8" />;
    if (file.type.startsWith('video/')) return <Video className="w-8 h-8" />;
    return <File className="w-8 h-8" />;
  };

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <motion.div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragActive || dragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500'
        } ${isUploading || selectedFiles.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
        onMouseEnter={() => setDragActive(true)}
        onMouseLeave={() => setDragActive(false)}
        whileHover={{ scale: isUploading ? 1 : 1.02 }}
        whileTap={{ scale: isUploading ? 1 : 0.98 }}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <motion.div
            animate={{ 
              scale: isDragActive ? 1.1 : 1,
              rotate: isDragActive ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="w-12 h-12 mx-auto text-secondary-400 dark:text-secondary-500" />
          </motion.div>
          
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              {isDragActive ? 'Drop files here' : 'Upload Media Files'}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              Supports: JPG, PNG, GIF, MP4, MOV, AVI (Max 100MB)
            </p>
          </div>

          {/* Alternative upload methods */}
          <div className="flex flex-wrap 
          
          
          
          center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Camera className="w-4 h-4" />}
              onClick={(e) => {
                e.stopPropagation();
                handleWebcamCapture();
              }}
              disabled={isUploading}
            >
              Webcam
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<LinkIcon className="w-4 h-4" />}
              onClick={(e) => {
                e.stopPropagation();
                setShowUrlInput(!showUrlInput);
              }}
              disabled={isUploading}
            >
              From URL
            </Button>
          </div>
        </div>

        {/* URL Input */}
        <AnimatePresence>
          {showUrlInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
            >
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste image or video URL here..."
                  className="flex-1 px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <Button
                  size="sm"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                >
                  Add
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Upload Progress */}
      {isUploading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <ProgressBar
            progress={uploadProgress}
            label="Uploading files..."
            color="primary"
            size="lg"
          />
        </motion.div>
      )}

      {/* Selected Files */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 space-y-3"
          >
            <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Selected Files ({selectedFiles.length}/{maxFiles})
            </h4>
            {selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-primary-600 dark:text-primary-400">
                    {getFileIcon(file)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {file.isUrl ? 'URL' : formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<X className="w-4 h-4" />}
                    onClick={() => onRemove(index)}
                    disabled={isUploading}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
              Privacy & Security
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your files are processed securely and automatically deleted after analysis. 
              We never store or share your content.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;
