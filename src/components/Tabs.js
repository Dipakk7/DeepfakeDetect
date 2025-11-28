import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ 
  tabs, 
  defaultTab = 0, 
  onTabChange,
  className = '',
  variant = 'default' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index]);
    }
  };

  const variants = {
    default: 'border-b border-secondary-200 dark:border-secondary-700',
    pills: 'bg-secondary-100 dark:bg-secondary-800 rounded-lg p-1',
    underline: 'border-b-2 border-secondary-200 dark:border-secondary-700',
  };

  const tabVariants = {
    default: {
      active: 'text-primary-600 dark:text-primary-400 border-primary-500',
      inactive: 'text-secondary-600 dark:text-secondary-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400',
    },
    pills: {
      active: 'bg-white dark:bg-secondary-700 text-primary-600 dark:text-primary-400 shadow-sm',
      inactive: 'text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400',
    },
    underline: {
      active: 'text-primary-600 dark:text-primary-400 border-primary-500',
      inactive: 'text-secondary-600 dark:text-secondary-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400',
    },
  };

  return (
    <div className={className}>
      <div className={`flex ${variants[variant]}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              variant === 'pills' 
                ? `rounded-md ${tabVariants.pills[activeTab === index ? 'active' : 'inactive']}`
                : `border-b-2 ${tabVariants[variant][activeTab === index ? 'active' : 'inactive']}`
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
