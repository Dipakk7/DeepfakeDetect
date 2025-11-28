import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeatmapOverlay = ({ 
  suspiciousAreas = [], 
  imageUrl, 
  className = '' 
}) => {
  const [opacity, setOpacity] = useState(0.7);

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={imageUrl} 
          alt="Analysis preview" 
          className="w-full h-auto"
        />
        
        {/* Heatmap Overlay */}
        <div className="absolute inset-0">
          {suspiciousAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: opacity, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute border-2 border-red-500 bg-red-500/20 rounded"
              style={{
                left: `${area.x}px`,
                top: `${area.y}px`,
                width: `${area.width}px`,
                height: `${area.height}px`,
              }}
            >
              <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {Math.round(area.confidence * 100)}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Opacity Control */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          Heatmap Opacity: {Math.round(opacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-full h-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HeatmapOverlay;
