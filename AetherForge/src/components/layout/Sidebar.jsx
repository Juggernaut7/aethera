import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import CanvasControls from '../canvas/CanvasControls';

const Sidebar = ({ onGenerate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
        isCollapsed ? 'w-16' : 'w-80'
      } transition-all duration-300 ease-in-out`}
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toggle button */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-shadow z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              key="expand"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.div>
          ) : (
            <motion.div
              key="collapse"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar content */}
      <div className="h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              key="collapsed"
              className="h-full flex flex-col items-center justify-center space-y-4 p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Settings className="w-5 h-5 text-white" />
              </motion.div>
              
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Aetherial
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Canvas
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="h-full overflow-y-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CanvasControls onGenerate={onGenerate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient overlay for collapsed state */}
      {isCollapsed && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-gray-800/50 to-white dark:to-gray-800 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default Sidebar; 