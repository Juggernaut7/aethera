import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sun, Cloud, Sparkles, Palette, Image } from 'lucide-react';
import { useMood } from '../../contexts/MoodContext';
import Slider from '../ui/Slider';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const CanvasControls = ({ onGenerate }) => {
  const {
    energy,
    temperature,
    theme,
    keywords,
    isGenerating,
    setEnergy,
    setTemperature,
    setTheme,
    setKeywords,
  } = useMood();

  const themes = [
    { value: 'Nature', label: 'Nature', icon: '🌿' },
    { value: 'Tech', label: 'Tech', icon: '💻' },
    { value: 'Vintage', label: 'Vintage', icon: '📷' },
    { value: 'Futuristic', label: 'Futuristic', icon: '🚀' },
  ];

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <motion.div
      className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.h2
          className="text-2xl font-bold text-gradient mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Aetherial Canvas
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Craft your perfect mood board
        </motion.p>
      </div>

      {/* Energy Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Slider
          label="Energy"
          value={energy}
          onChange={setEnergy}
          icon={Zap}
          min={0}
          max={100}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Calm</span>
          <span>Dynamic</span>
        </div>
      </motion.div>

      {/* Temperature Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Slider
          label="Temperature"
          value={temperature}
          onChange={setTemperature}
          icon={temperature > 50 ? Sun : Cloud}
          min={0}
          max={100}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Cool</span>
          <span>Warm</span>
        </div>
      </motion.div>

      {/* Theme Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Theme
        </label>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((themeOption) => (
            <motion.button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                ${theme === themeOption.value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{themeOption.icon}</span>
                <span>{themeOption.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Keywords Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <InputField
          label="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g., cozy autumn, cyberpunk city..."
          icon={Palette}
        />
      </motion.div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          onClick={handleGenerate}
          loading={isGenerating}
          disabled={isGenerating}
          icon={Sparkles}
          className="w-full"
          size="lg"
        >
          {isGenerating ? 'Generating Vibe...' : 'Generate Vibe'}
        </Button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="pt-4 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            icon={Image}
          >
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            icon={Palette}
          >
            Export
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CanvasControls; 