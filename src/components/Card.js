import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-secondary-800 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
