import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';
import { useGenerativeEngine } from '../hooks/useGenerativeEngine';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import ColorPaletteDisplay from '../components/canvas/ColorPaletteDisplay';
import MoodBoardGrid from '../components/canvas/MoodBoardGrid';
import SmartSuggestions from '../components/canvas/SmartSuggestions';
import CollaborationPanel from '../components/canvas/CollaborationPanel';
import AIChatbot from '../components/chat/AIChatbot';
import Button from '../components/ui/Button';

const HomePage = () => {
  const { generateVibe, isGenerating } = useGenerativeEngine();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      await generateVibe();
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div
      className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <Sidebar onGenerate={handleGenerate} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                Aetherial Canvas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                AI-Powered Generative Mood Board Studio
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Status Indicator */}
              <motion.div
                className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                <span>{isGenerating ? 'Generating...' : 'Ready to create'}</span>
              </motion.div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    {currentUser?.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="hidden md:block">{currentUser?.name || 'User'}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Settings}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <span className="hidden md:block ml-2">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.header>
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Color Palette & AI Suggestions */}
          <motion.div
            className="w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-6">
              <ColorPaletteDisplay />
              <SmartSuggestions />
              <AIChatbot />
              <CollaborationPanel />
            </div>
          </motion.div>
          
          {/* Right Panel - Mood Board */}
          <motion.div
            className="flex-1 p-6 overflow-y-auto"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MoodBoardGrid />
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
};

export default HomePage; 