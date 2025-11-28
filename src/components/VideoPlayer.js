import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  AlertTriangle
} from 'lucide-react';

const VideoPlayer = ({ 
  videoUrl, 
  suspiciousFrames = [], 
  className = '' 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSuspiciousFrameAtTime = (time) => {
    return suspiciousFrames.find(frame => 
      Math.abs(frame.timestamp - time) < 0.5
    );
  };

  const currentSuspiciousFrame = getSuspiciousFrameAtTime(currentTime);

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />

      {/* Suspicious Frame Indicator */}
      {currentSuspiciousFrame && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-2"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">
            Suspicious Frame ({Math.round(currentSuspiciousFrame.confidence * 100)}%)
          </span>
        </motion.div>
      )}

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="relative h-1 bg-white/30 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            
            {/* Suspicious Frame Markers */}
            {suspiciousFrames.map((frame, index) => (
              <div
                key={index}
                className="absolute top-0 w-2 h-2 bg-red-500 rounded-full transform -translate-y-0.5"
                style={{ left: `${(frame.timestamp / duration) * 100}%` }}
                title={`Suspicious frame at ${formatTime(frame.timestamp)}`}
              />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary-400 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  video.currentTime = Math.max(0, video.currentTime - 10);
                }
              }}
              className="text-white hover:text-primary-400 transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  video.currentTime = Math.min(duration, video.currentTime + 10);
                }
              }}
              className="text-white hover:text-primary-400 transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(parseFloat(e.target.value) === 0);
                }}
                className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button className="text-white hover:text-primary-400 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
