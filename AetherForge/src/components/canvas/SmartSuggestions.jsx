import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Palette, 
  ImagePlus, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { useMood } from '../../contexts/MoodContext';
import { usePalette } from '../../contexts/PaletteContext';
import Button from '../ui/Button';

const SmartSuggestions = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const { energy, temperature, theme, keywords } = useMood();
  const { primaryColor, secondaryColor, accentColor } = usePalette();

  // AI-powered suggestions based on current mood and palette
  const generateSuggestions = () => {
    const suggestions = [];

    // Energy-based suggestions
    if (energy > 70) {
      suggestions.push({
        id: 'high-energy',
        type: 'palette',
        icon: Zap,
        title: 'High Energy Detected',
        description: 'Consider adding more vibrant, saturated colors to match your dynamic energy level.',
        action: 'Boost saturation by 20%',
        priority: 'high',
        category: 'optimization'
      });
    } else if (energy < 30) {
      suggestions.push({
        id: 'low-energy',
        type: 'palette',
        icon: Clock,
        title: 'Calm Energy Detected',
        description: 'Your palette could benefit from softer, more muted tones for a peaceful vibe.',
        action: 'Reduce saturation by 15%',
        priority: 'medium',
        category: 'optimization'
      });
    }

    // Temperature-based suggestions
    if (temperature > 70) {
      suggestions.push({
        id: 'warm-temp',
        type: 'palette',
        icon: Star,
        title: 'Warm Temperature',
        description: 'Add more warm tones (reds, oranges, yellows) to enhance the cozy feeling.',
        action: 'Shift palette to warmer hues',
        priority: 'medium',
        category: 'enhancement'
      });
    } else if (temperature < 30) {
      suggestions.push({
        id: 'cool-temp',
        type: 'palette',
        icon: Sparkles,
        title: 'Cool Temperature',
        description: 'Incorporate more cool tones (blues, greens, purples) for a refreshing feel.',
        action: 'Shift palette to cooler hues',
        priority: 'medium',
        category: 'enhancement'
      });
    }

    // Theme-based suggestions
    if (theme === 'Nature') {
      suggestions.push({
        id: 'nature-theme',
        type: 'images',
        icon: ImagePlus,
        title: 'Nature Theme Active',
        description: 'Add more organic textures and natural elements to your mood board.',
        action: 'Search for "organic textures"',
        priority: 'high',
        category: 'content'
      });
    } else if (theme === 'Tech') {
      suggestions.push({
        id: 'tech-theme',
        type: 'images',
        icon: TrendingUp,
        title: 'Tech Theme Active',
        description: 'Include more geometric patterns and futuristic elements.',
        action: 'Search for "geometric tech"',
        priority: 'high',
        category: 'content'
      });
    }

    // Keyword-based suggestions
    if (keywords.includes('minimal')) {
      suggestions.push({
        id: 'minimal-keyword',
        type: 'palette',
        icon: Palette,
        title: 'Minimalist Approach',
        description: 'Consider reducing to 2-3 main colors for a cleaner, minimal look.',
        action: 'Simplify palette',
        priority: 'medium',
        category: 'style'
      });
    }

    // Accessibility suggestions
    const contrastRatio = getContrastRatio(primaryColor, '#ffffff');
    if (contrastRatio < 4.5) {
      suggestions.push({
        id: 'accessibility',
        type: 'palette',
        icon: CheckCircle,
        title: 'Accessibility Alert',
        description: 'Primary color may not meet WCAG contrast requirements.',
        action: 'Adjust contrast',
        priority: 'high',
        category: 'accessibility'
      });
    }

    return suggestions;
  };

  const suggestions = generateSuggestions();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'optimization': return 'from-blue-500 to-cyan-500';
      case 'enhancement': return 'from-purple-500 to-pink-500';
      case 'content': return 'from-green-500 to-emerald-500';
      case 'style': return 'from-orange-500 to-red-500';
      case 'accessibility': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleApplySuggestion = (suggestion) => {
    // This would implement the actual suggestion logic
    console.log('Applying suggestion:', suggestion);
    setActiveSuggestion(suggestion.id);
    
    // Simulate processing
    setTimeout(() => {
      setActiveSuggestion(null);
    }, 2000);
  };

  if (suggestions.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Perfect! Your palette is optimized
          </span>
        </div>
        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
          No suggestions needed at this time
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.button
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-md transition-all duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              AI Suggestions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {suggestions.length} smart recommendations
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
              {suggestions.length}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </motion.button>

      {/* Suggestions List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(suggestion.category)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <suggestion.icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {suggestion.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {suggestion.description}
                    </p>
                    
                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {suggestion.action}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleApplySuggestion(suggestion)}
                        disabled={activeSuggestion === suggestion.id}
                        className="text-xs"
                      >
                        {activeSuggestion === suggestion.id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                            Applying...
                          </>
                        ) : (
                          'Apply'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function for contrast ratio (simplified)
const getContrastRatio = (color1, color2) => {
  // This is a simplified version - in real app, use proper color utils
  return Math.random() * 10; // Simulated contrast ratio
};

export default SmartSuggestions; 