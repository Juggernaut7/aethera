import axios from 'axios';

// Get images from Unsplash API
export const getUnsplashImages = async (req, res) => {
  try {
    const { query = 'nature', page = 1, per_page = 20 } = req.query;
    
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    
    if (!UNSPLASH_ACCESS_KEY) {
      return res.status(500).json({ message: 'Unsplash API key not configured' });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        page,
        per_page,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    const images = response.data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html
    }));

    res.json({
      images,
      total: response.data.total,
      total_pages: response.data.total_pages
    });

  } catch (error) {
    console.error('Unsplash API error:', error);
    
    // Fallback to placeholder images if API fails
    const fallbackImages = generatePlaceholderImages(query, 20);
    res.json({
      images: fallbackImages,
      total: fallbackImages.length,
      total_pages: 1
    });
  }
};

// Get random images from Unsplash
export const getRandomImages = async (req, res) => {
  try {
    const { count = 20 } = req.query;
    
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    
    if (!UNSPLASH_ACCESS_KEY) {
      return res.status(500).json({ message: 'Unsplash API key not configured' });
    }

    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        count,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    const images = response.data.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || 'Random image',
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html
    }));

    res.json({ images });

  } catch (error) {
    console.error('Unsplash random images error:', error);
    
    // Fallback to placeholder images if API fails
    const fallbackImages = generatePlaceholderImages('nature', count);
    res.json({ images: fallbackImages });
  }
};

// Generate placeholder images as fallback
const generatePlaceholderImages = (query, count) => {
  const categories = ['nature', 'architecture', 'abstract', 'minimal', 'vintage', 'modern'];
  const selectedCategory = categories.includes(query) ? query : 'nature';
  
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    url: `https://source.unsplash.com/800x600/?${selectedCategory}&sig=${i}`,
    thumb: `https://source.unsplash.com/300x200/?${selectedCategory}&sig=${i}`,
    alt: `${selectedCategory} image ${i + 1}`,
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com'
  }));
}; 