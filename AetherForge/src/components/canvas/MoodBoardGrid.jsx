import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Heart, Download, ExternalLink } from 'lucide-react';
import { fetchImages, generateImageQuery } from '../../services/unsplashService';
import { useMood } from '../../contexts/MoodContext';
import Button from '../ui/Button';

const MoodBoardGridItem = ({ image, onPin, isPinned }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // Still set to true to show placeholder
  };

  return (
    <motion.div
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Image */}
      <div className="relative aspect-square">
        <img
          src={image.url}
          alt={image.alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 animate-pulse" />
        )}
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Pin button */}
        <motion.button
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            isPinned
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onPin(image);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered || isPinned ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
        </motion.button>
        
        {/* Hover actions */}
        <motion.div
          className="absolute bottom-2 left-2 right-2 flex justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-white text-sm font-medium truncate">
            {image.alt}
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
              icon={Heart}
            />
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
              icon={Download}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Photographer credit */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white text-xs opacity-75">
          Photo by{' '}
          <a
            href={image.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-100 transition-opacity"
          >
            {image.photographer}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MoodBoardGrid = () => {
  const { energy, temperature, theme, keywords, isGenerating } = useMood();
  const [images, setImages] = useState([]);
  const [pinnedImages, setPinnedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImages = async () => {
    console.log('🖼️ Generating images...', { energy, temperature, theme, keywords });
    setLoading(true);
    try {
      // Use theme or default to 'nature' if no theme is set
      const currentTheme = theme || 'nature';
      const query = generateImageQuery({ energy, temperature, theme: currentTheme }, keywords);
      console.log('🔍 Search query:', query);
      const fetchedImages = await fetchImages(query, 12);
      console.log('📸 Fetched images:', fetchedImages);
      setImages(fetchedImages);
    } catch (error) {
      console.error('❌ Error generating images:', error);
      // Fallback to placeholder images
      const fallbackImages = Array.from({ length: 12 }, (_, i) => ({
        id: `placeholder-${i}`,
        url: `https://source.unsplash.com/random/800x600/?${encodeURIComponent((theme || 'nature').toLowerCase())}&sig=${i}`,
        alt: `${theme || 'nature'} mood board image ${i + 1}`,
        photographer: 'Unsplash',
        photographerUrl: 'https://unsplash.com',
      }));
      console.log('🔄 Using fallback images:', fallbackImages);
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const handlePinImage = (image) => {
    setPinnedImages(prev => {
      const isAlreadyPinned = prev.some(pinned => pinned.id === image.id);
      if (isAlreadyPinned) {
        return prev.filter(pinned => pinned.id !== image.id);
      } else {
        return [...prev, image];
      }
    });
  };

  const isImagePinned = (image) => {
    return pinnedImages.some(pinned => pinned.id === image.id);
  };

  // Generate images when mood parameters change or when generating starts
  useEffect(() => {
    if (isGenerating) {
      console.log('🚀 Generation triggered, fetching images...');
      generateImages();
    }
  }, [isGenerating]);

  // Generate default images on component mount
  useEffect(() => {
    if (images.length === 0) {
      console.log('🎨 Loading default images...');
      generateImages();
    }
  }, []);

  // Also generate images when parameters change
  useEffect(() => {
    if (energy && temperature && theme && images.length > 0) {
      console.log('🎨 Mood parameters changed, generating new images...');
      generateImages();
    }
  }, [energy, temperature, theme, keywords]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mood Board
        </h3>
        <div className="flex items-center space-x-2">
          {pinnedImages.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {pinnedImages.length} pinned
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            disabled={images.length === 0}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </motion.div>
      )}

      {/* Images grid */}
      <AnimatePresence mode="wait">
        {!loading && images.length > 0 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MoodBoardGridItem
                  image={image}
                  onPin={handlePinImage}
                  isPinned={isImagePinned(image)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!loading && images.length === 0 && !isGenerating && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <ExternalLink className="w-16 h-16 mx-auto" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No images yet
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Adjust your mood settings and click "Generate Vibe" to create your mood board
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoodBoardGrid; 