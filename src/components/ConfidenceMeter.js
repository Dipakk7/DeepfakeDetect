import React from 'react';
import { motion } from 'framer-motion';

const ConfidenceMeter = ({ 
  confidence, 
  label = 'Confidence', 
  size = 'md',
  showPercentage = true,
  animated = true 
}) => {
  const getColor = (confidence) => {
    if (confidence >= 80) return 'from-green-500 to-green-600';
    if (confidence >= 60) return 'from-yellow-500 to-yellow-600';
    if (confidence >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getTextColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (confidence >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
        </span>
        {showPercentage && (
          <span className={`text-sm font-semibold ${getTextColor(confidence)}`}>
            {confidence}%
          </span>
        )}
      </div>
      <div className={`w-full bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${getColor(confidence)} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ 
            duration: animated ? 1.5 : 0,
            ease: "easeOut",
            delay: animated ? 0.3 : 0
          }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;
