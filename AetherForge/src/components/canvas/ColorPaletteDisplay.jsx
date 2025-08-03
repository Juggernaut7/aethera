import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Download, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Palette, 
  Contrast, 
  CheckCircle, 
  AlertTriangle,
  Sparkles,
  Shuffle,
  Heart,
  Share2,
  Settings
} from 'lucide-react';
import { usePalette } from '../../contexts/PaletteContext';
import { copyToClipboard, formatColorValues, getContrastRatio, isLightColor } from '../../utils/colorUtils';
import { generateCSSVariables } from '../../services/generativeService';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const ColorSwatch = ({ color, label, onClick, isLocked, onToggleLock, size = 'large' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLight = isLightColor(color);
  const textColor = isLight ? '#000000' : '#ffffff';

  return (
    <motion.div
      className={`relative group cursor-pointer rounded-xl overflow-hidden ${
        size === 'large' ? 'h-24' : 'h-16'
      }`}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Color overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Lock button */}
      <motion.button
        className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all duration-200 ${
          isLight ? 'bg-black/20 hover:bg-black/30' : 'bg-white/20 hover:bg-white/30'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: 1 }}
      >
        {isLocked ? (
          <Lock className="w-3 h-3" style={{ color: textColor }} />
        ) : (
          <Unlock className="w-3 h-3" style={{ color: textColor }} />
        )}
      </motion.button>

      {/* Color label */}
      <div className="absolute bottom-2 left-2">
        <div 
          className="text-xs font-medium"
          style={{ color: textColor }}
        >
          {label}
        </div>
        <div 
          className="text-xs opacity-75"
          style={{ color: textColor }}
        >
          {color.toUpperCase()}
        </div>
      </div>

      {/* Lock indicator */}
      {isLocked && (
        <div className="absolute top-2 left-2">
          <Lock className="w-3 h-3" style={{ color: textColor }} />
        </div>
      )}
    </motion.div>
  );
};

const ColorPaletteDisplay = () => {
  const { 
    primaryColor, 
    secondaryColor, 
    accentColor, 
    neutralColors,
    setPrimaryColor,
    setSecondaryColor,
    setAccentColor,
    setNeutralColors
  } = usePalette();
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [lockedColors, setLockedColors] = useState({
    primary: false,
    secondary: false,
    accent: false,
    neutrals: Array(5).fill(false)
  });

  const handleColorClick = (color, label) => {
    setSelectedColor({ color, label });
  };

  const handleToggleLock = (colorType, index = null) => {
    setLockedColors(prev => {
      if (index !== null) {
        // Toggle neutral color lock
        const newNeutrals = [...prev.neutrals];
        newNeutrals[index] = !newNeutrals[index];
        return { ...prev, neutrals: newNeutrals };
      } else {
        // Toggle main color lock
        return { ...prev, [colorType]: !prev[colorType] };
      }
    });
  };

  const handleCopyCSS = async () => {
    const cssVariables = generateCSSVariables({
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColors
    });
    
    const success = await copyToClipboard(cssVariables);
    if (success) {
      toast.success('CSS variables copied to clipboard! 🎨', {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error('Failed to copy to clipboard', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleShufflePalette = () => {
    // This would trigger a new palette generation while keeping locked colors
    toast.info('Shuffle feature coming soon! 🔄', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleExportPalette = () => {
    const paletteData = {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
      neutrals: neutralColors,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(paletteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aetherforge-palette-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Palette exported successfully! 📁', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const getAccessibilityScore = (color1, color2) => {
    const ratio = getContrastRatio(color1, color2);
    if (ratio >= 7) return { score: 'AAA', color: 'text-green-500', icon: CheckCircle };
    if (ratio >= 4.5) return { score: 'AA', color: 'text-yellow-500', icon: CheckCircle };
    return { score: 'Fail', color: 'text-red-500', icon: AlertTriangle };
  };

  const accessibilityScore = getAccessibilityScore(primaryColor, neutralColors[4]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Generated Palette
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Shuffle}
            onClick={handleShufflePalette}
            className="text-gray-500 hover:text-purple-600"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Download}
            onClick={handleExportPalette}
            className="text-gray-500 hover:text-purple-600"
          />
        </div>
      </div>

      {/* Accessibility Score */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Contrast className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Accessibility Score
            </span>
          </div>
          <div className={`flex items-center space-x-1 ${accessibilityScore.color}`}>
            <accessibilityScore.icon className="w-4 h-4" />
            <span className="text-sm font-bold">{accessibilityScore.score}</span>
          </div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Primary vs Dark Neutral contrast ratio
        </div>
      </div>

      {/* Main Colors */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>Main Colors</span>
        </h4>
        
        <div className="grid grid-cols-1 gap-3">
          <ColorSwatch
            color={primaryColor}
            label="Primary"
            onClick={() => handleColorClick(primaryColor, 'Primary')}
            isLocked={lockedColors.primary}
            onToggleLock={() => handleToggleLock('primary')}
          />
          <ColorSwatch
            color={secondaryColor}
            label="Secondary"
            onClick={() => handleColorClick(secondaryColor, 'Secondary')}
            isLocked={lockedColors.secondary}
            onToggleLock={() => handleToggleLock('secondary')}
          />
          <ColorSwatch
            color={accentColor}
            label="Accent"
            onClick={() => handleColorClick(accentColor, 'Accent')}
            isLocked={lockedColors.accent}
            onToggleLock={() => handleToggleLock('accent')}
          />
        </div>
      </div>

      {/* Neutral Colors */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Neutral Colors
        </h4>
        
        <div className="grid grid-cols-5 gap-2">
          {neutralColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              label={`N${index + 1}`}
              size="small"
              onClick={() => handleColorClick(color, `Neutral ${index + 1}`)}
              isLocked={lockedColors.neutrals[index]}
              onToggleLock={() => handleToggleLock('neutrals', index)}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={handleCopyCSS}
          className="w-full"
          icon={Copy}
        >
          Copy CSS Variables
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Heart}
            className="text-gray-600 hover:text-red-500"
          >
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Share2}
            className="text-gray-600 hover:text-blue-500"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Color Details Modal */}
      <AnimatePresence>
        {selectedColor && (
          <Modal
            isOpen={!!selectedColor}
            onClose={() => setSelectedColor(null)}
            title={`${selectedColor.label} Color Details`}
          >
            <div className="space-y-4">
              {/* Color Preview */}
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-lg"
                  style={{ backgroundColor: selectedColor.color }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {selectedColor.color.toUpperCase()}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedColor.label} Color
                  </p>
                </div>
              </div>

              {/* Color Values */}
              <div className="space-y-3">
                {(() => {
                  const values = formatColorValues(selectedColor.color);
                  return Object.entries(values).map(([format, value]) => (
                    <div key={format} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {format}
                      </span>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm bg-white dark:bg-gray-700 px-2 py-1 rounded">
                          {value}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Copy}
                          onClick={() => copyToClipboard(value)}
                          className="text-gray-500 hover:text-purple-600"
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>

              {/* Accessibility Info */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  Accessibility Information
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Light Text:</span>
                    <span className={isLightColor(selectedColor.color) ? 'text-red-500' : 'text-green-500'}>
                      {isLightColor(selectedColor.color) ? 'Poor' : 'Good'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dark Text:</span>
                    <span className={isLightColor(selectedColor.color) ? 'text-green-500' : 'text-red-500'}>
                      {isLightColor(selectedColor.color) ? 'Good' : 'Poor'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPaletteDisplay; 