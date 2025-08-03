// Generative AI service for creating color palettes and AI chat
// Now using backend API for secure AI interactions

import axios from 'axios';

// Configure axios base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Generate palette using backend
export const generatePalette = async (moodParams) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/generate-palette`, moodParams);
    return response.data.palette;
  } catch (error) {
    console.error('Palette generation error:', error);
    // Fallback palette
    return {
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6',
      accentColor: '#EC4899',
      neutralColors: ['#1F2937', '#374151', '#6B7280']
    };
  }
};

// Generate image query using backend
export const generateImageQuery = async (moodParams) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/generate-image-query`, moodParams);
    return response.data.query;
  } catch (error) {
    console.error('Image query generation error:', error);
    // Fallback query
    return `${moodParams.theme || 'nature'} ${moodParams.temperature || 'neutral'} mood`;
  }
};

// Chat with AI using backend
export const chatWithAI = async (message) => {
  console.log('🤖 chatWithAI called with message:', message);
  
  try {
    console.log('📡 Making request to:', `${API_BASE_URL}/ai/chatbot`);
    console.log('📤 Request payload:', { message });
    
    const response = await axios.post(`${API_BASE_URL}/ai/chatbot`, { message });
    
    console.log('✅ Backend response status:', response.status);
    console.log('📄 Backend response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ chatWithAI error:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    throw error;
  }
};

// Export as service object
export const generativeService = {
  generatePalette,
  generateImageQuery,
  chatWithAI
};

// Generate CSS variables string
export const generateCSSVariables = (palette) => {
  const { primaryColor, secondaryColor, accentColor, neutralColors } = palette;
  
  return `/* Aetherial Canvas Generated Palette */
:root {
  --brand-primary: ${primaryColor};
  --brand-secondary: ${secondaryColor};
  --brand-accent: ${accentColor};
  --neutral-50: ${neutralColors[0]};
  --neutral-100: ${neutralColors[1]};
  --neutral-200: ${neutralColors[2]};
  --neutral-300: ${neutralColors[3]};
  --neutral-400: ${neutralColors[4]};
}`;
};

// Analyze mood from keywords (simple keyword analysis)
export const analyzeKeywords = (keywords) => {
  const words = keywords.toLowerCase().split(' ');
  let energyBonus = 0;
  let temperatureBonus = 0;
  
  // Energy keywords
  const highEnergyWords = ['vibrant', 'dynamic', 'energetic', 'bold', 'bright', 'loud'];
  const lowEnergyWords = ['calm', 'peaceful', 'soft', 'muted', 'quiet', 'gentle'];
  
  // Temperature keywords
  const warmWords = ['warm', 'golden', 'sunset', 'fire', 'orange', 'red'];
  const coolWords = ['cool', 'blue', 'icy', 'winter', 'ocean', 'sky'];
  
  words.forEach(word => {
    if (highEnergyWords.includes(word)) energyBonus += 20;
    if (lowEnergyWords.includes(word)) energyBonus -= 20;
    if (warmWords.includes(word)) temperatureBonus += 20;
    if (coolWords.includes(word)) temperatureBonus -= 20;
  });
  
  return { energyBonus, temperatureBonus };
}; 