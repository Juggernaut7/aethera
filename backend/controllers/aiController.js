import axios from 'axios';

// Generate palette based on mood parameters
export const generatePalette = async (req, res) => {
  try {
    const { energy, temperature, theme, keywords } = req.body;
    
    // For now, return a simulated palette based on mood parameters
    const palettes = {
      energetic: {
        primaryColor: '#FF6B6B',
        secondaryColor: '#4ECDC4',
        accentColor: '#FFE66D',
        neutralColors: ['#2C3E50', '#34495E', '#7F8C8D']
      },
      calm: {
        primaryColor: '#74B9FF',
        secondaryColor: '#A29BFE',
        accentColor: '#FD79A8',
        neutralColors: ['#2D3436', '#636E72', '#B2BEC3']
      },
      warm: {
        primaryColor: '#FF7675',
        secondaryColor: '#FDCB6E',
        accentColor: '#E17055',
        neutralColors: ['#2D3436', '#636E72', '#B2BEC3']
      },
      cool: {
        primaryColor: '#6C5CE7',
        secondaryColor: '#A29BFE',
        accentColor: '#74B9FF',
        neutralColors: ['#2D3436', '#636E72', '#B2BEC3']
      }
    };

    // Determine palette based on energy and temperature
    let paletteKey = 'calm';
    if (energy === 'high') paletteKey = 'energetic';
    else if (temperature === 'warm') paletteKey = 'warm';
    else if (temperature === 'cool') paletteKey = 'cool';

    res.json({ palette: palettes[paletteKey] });
  } catch (error) {
    console.error('Palette generation error:', error);
    res.status(500).json({ message: 'Failed to generate palette' });
  }
};

// Generate image query based on mood parameters
export const generateImageQuery = async (req, res) => {
  try {
    const { energy, temperature, theme, keywords } = req.body;
    
    // Generate a creative image query based on mood parameters
    const queries = [
      `${theme} ${temperature} ${energy} mood`,
      `${keywords.join(' ')} ${temperature} lighting`,
      `${theme} aesthetic ${energy} energy`,
      `${keywords.join(' ')} ${temperature} atmosphere`
    ];

    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    
    res.json({ query: randomQuery });
  } catch (error) {
    console.error('Image query generation error:', error);
    res.status(500).json({ message: 'Failed to generate image query' });
  }
};

// Chat with Hugging Face AI using Inference Router
export const proxyHuggingFace = async (req, res) => {
  try {
    const { message } = req.body;
    
    console.log('🤖 AI Chat Request:', { message });
    
    if (!message) {
      console.log('❌ No message provided');
      return res.status(400).json({ message: 'Message is required' });
    }

    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    console.log('🔑 API Key present:', !!HUGGINGFACE_API_KEY);
    
    if (!HUGGINGFACE_API_KEY) {
      console.log('❌ No Hugging Face API key found');
      return res.status(500).json({ message: 'AI service not configured' });
    }

    // Use the working Hugging Face Inference Router
    const HF_ROUTER_BASE_URL = 'https://router.huggingface.co/v1';
    const HF_CHAT_MODEL = 'zai-org/GLM-4.5:novita';
    
    console.log('🎯 Using Hugging Face Inference Router');
    console.log('📡 Making request to:', `${HF_ROUTER_BASE_URL}/chat/completions`);

    const response = await axios.post(`${HF_ROUTER_BASE_URL}/chat/completions`, {
      model: HF_CHAT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant specialized in creative design, mood boards, and artistic inspiration. Provide helpful, creative advice for design projects."
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    }, {
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log('✅ Hugging Face response status:', response.status);
    console.log('📄 Response data:', response.data);

    // The response structure is OpenAI-compatible
    if (response.data && response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message?.content) {
      const aiResponse = response.data.choices[0].message.content.trim();
      console.log('🤖 AI Response:', aiResponse);
      res.json({ response: aiResponse });
    } else {
      console.log('⚠️ Unexpected response format, using fallback');
      res.json({ 
        response: "I'm here to help you with your creative projects! How can I assist you today?" 
      });
    }

  } catch (error) {
    console.error('❌ Hugging Face API error:', error.message);
    console.error('🔍 Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    // Try a different model as fallback
    try {
      console.log('🔄 Trying fallback model...');
      const FALLBACK_MODEL = "gpt2";
      
      const fallbackResponse = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
        inputs: message,
        parameters: {
          max_new_tokens: 50,
          temperature: 0.7
        }
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });

      console.log('✅ Fallback model response:', fallbackResponse.data);
      
      if (fallbackResponse.data && fallbackResponse.data[0]) {
        const fallbackText = fallbackResponse.data[0].generated_text || "I understand your question!";
        res.json({ response: fallbackText });
      } else {
        throw new Error('Fallback model also failed');
      }
      
    } catch (fallbackError) {
      console.error('❌ Fallback model also failed:', fallbackError.message);
      
      // Final fallback with creative responses
      const creativeResponses = [
        "That's a fascinating question! I'd love to help you explore that topic further.",
        "Great question! Let me think about that... What specific aspect interests you most?",
        "I find that really interesting! Could you tell me more about what you're working on?",
        "That's a wonderful inquiry! How does this relate to your creative project?",
        "I'm excited to help with that! What's your current creative focus?"
      ];
      
      const randomResponse = creativeResponses[Math.floor(Math.random() * creativeResponses.length)];
      console.log('🎲 Using random fallback response:', randomResponse);
      
      res.json({ response: randomResponse });
    }
  }
}; 