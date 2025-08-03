// Unsplash API service for fetching mood board images
// Now using backend proxy to protect API keys

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch images from backend proxy
export const fetchImages = async (query = 'nature', page = 1) => {
  console.log('🖼️ fetchImages called with:', { query, page });
  
  try {
    console.log('📡 Making request to:', `${API_BASE_URL}/images/unsplash`);
    const response = await axios.get(`${API_BASE_URL}/images/unsplash`, {
      params: { query, page, per_page: 20 }
    });
    
    console.log('✅ Backend response:', response.data);
    return response.data.images;
  } catch (error) {
    console.error('❌ Error fetching images from backend:', error);
    console.log('🔄 Falling back to placeholder images...');
    
    // Fallback to placeholder images
    return generatePlaceholderImages(query, 20);
  }
};

// Fetch random images from backend proxy
export const fetchRandomImages = async (count = 20) => {
  console.log('🎲 fetchRandomImages called with count:', count);
  
  try {
    const response = await axios.get(`${API_BASE_URL}/images/random`, {
      params: { count }
    });
    console.log('✅ Random images response:', response.data);
    return response.data.images;
  } catch (error) {
    console.error('❌ Error fetching random images:', error);
    console.log('🔄 Falling back to placeholder images...');
    
    // Fallback to placeholder images
    return generatePlaceholderImages('nature', count);
  }
};

// Generate placeholder images as fallback
const generatePlaceholderImages = (query, count) => {
  console.log('🎨 Generating placeholder images for:', query, 'count:', count);
  
  const categories = ['nature', 'architecture', 'abstract', 'minimal', 'vintage', 'modern'];
  const selectedCategory = categories.includes(query) ? query : 'nature';
  
  const images = Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    url: `https://source.unsplash.com/800x600/?${selectedCategory}&sig=${i}`,
    thumb: `https://source.unsplash.com/300x200/?${selectedCategory}&sig=${i}`,
    alt: `${selectedCategory} image ${i + 1}`,
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com'
  }));
  
  console.log('✅ Generated placeholder images:', images.length);
  return images;
};

// Generate a search query based on mood parameters
export const generateImageQuery = (moodParams, keywords) => {
  const { energy, temperature, theme } = moodParams;
  
  // Build query based on theme
  let query = theme.toLowerCase();
  
  // Add energy-based modifiers
  if (energy > 70) {
    query += ' vibrant dynamic';
  } else if (energy < 30) {
    query += ' calm peaceful';
  }
  
  // Add temperature-based modifiers
  if (temperature > 70) {
    query += ' warm golden';
  } else if (temperature < 30) {
    query += ' cool blue';
  }
  
  // Add user keywords
  if (keywords && keywords.trim()) {
    query += ` ${keywords.trim()}`;
  }
  
  // Add aesthetic modifiers based on theme
  switch (theme) {
    case 'Nature':
      query += ' landscape natural';
      break;
    case 'Tech':
      query += ' technology futuristic';
      break;
    case 'Vintage':
      query += ' retro nostalgic';
      break;
    case 'Futuristic':
      query += ' sci-fi modern';
      break;
    default:
      query += ' aesthetic';
  }
  
  const finalQuery = query.trim();
  console.log('🔍 Generated image query:', finalQuery);
  return finalQuery;
}; 