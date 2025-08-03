import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <motion.label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50' : 'bg-white'}
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            dark:focus:ring-purple-400 dark:placeholder-gray-400
          `}
          {...props}
        />
      </motion.div>
      
      {error && (
        <motion.p
          className="text-sm text-red-600 dark:text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField; 