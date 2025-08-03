import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  icon: Icon,
  className = '',
  disabled = false,
  showValue = true,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleChange = (e) => {
    if (!disabled) {
      onChange(parseInt(e.target.value));
    }
  };
  
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
        </div>
        {showValue && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {value}
          </span>
        )}
      </div>
      
      <div className="relative">
        <motion.div
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700"
          onClick={(e) => {
            if (disabled) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            const newValue = Math.round((percentage / 100) * (max - min) + min);
            onChange(Math.max(min, Math.min(max, newValue)));
          }}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Track background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600" />
          
          {/* Filled track */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Slider thumb */}
          <motion.div
            className="absolute top-1/2 w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${percentage}%` }}
            initial={{ left: 0 }}
            animate={{ left: `${percentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: disabled ? 1 : 1.2 }}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={(e, info) => {
              if (disabled) return;
              const container = e.target.parentElement;
              const rect = container.getBoundingClientRect();
              const dragX = info.point.x - rect.left;
              const percentage = Math.max(0, Math.min(100, (dragX / rect.width) * 100));
              const newValue = Math.round((percentage / 100) * (max - min) + min);
              onChange(Math.max(min, Math.min(max, newValue)));
            }}
          />
        </motion.div>
        
        {/* Hidden input for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
      </div>
    </div>
  );
};

export default Slider; 