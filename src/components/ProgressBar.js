import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress, 
  label, 
  color = 'primary',
  size = 'md',
  showPercentage = true,
  animated = true 
}) => {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: animated ? 0.8 : 0,
            ease: "easeOut"
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
