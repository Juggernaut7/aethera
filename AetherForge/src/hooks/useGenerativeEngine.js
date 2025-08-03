import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMood } from '../contexts/MoodContext';
import { usePalette } from '../contexts/PaletteContext';
import { generatePalette, analyzeKeywords } from '../services/generativeService';
import { fetchImages, generateImageQuery } from '../services/unsplashService';

export const useGenerativeEngine = () => {
  const {
    energy,
    temperature,
    theme,
    keywords,
    isGenerating,
    setGenerating,
  } = useMood();
  
  const { setPalette } = usePalette();

  const generateVibe = useCallback(async () => {
    if (isGenerating) return;

    try {
      setGenerating(true);
      
      // Analyze keywords for additional mood influence
      const keywordAnalysis = analyzeKeywords(keywords);
      
      // Create enhanced mood parameters
      const enhancedMoodParams = {
        energy: Math.max(0, Math.min(100, energy + keywordAnalysis.energyBonus)),
        temperature: Math.max(0, Math.min(100, temperature + keywordAnalysis.temperatureBonus)),
        theme,
      };
      
      // Generate new color palette
      const newPalette = generatePalette(enhancedMoodParams, keywords);
      setPalette(newPalette);
      
      // Generate image query
      const imageQuery = generateImageQuery(enhancedMoodParams, keywords);
      
      // Fetch images (this will be handled by the MoodBoardGrid component)
      // We just need to trigger the generation state
      
      // Show success message
      toast.success('✨ New vibe generated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      return {
        palette: newPalette,
        imageQuery,
        moodParams: enhancedMoodParams,
      };
      
    } catch (error) {
      console.error('Error generating vibe:', error);
      
      toast.error('❌ Failed to generate vibe. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      throw error;
    } finally {
      setGenerating(false);
    }
  }, [energy, temperature, theme, keywords, isGenerating, setGenerating, setPalette]);

  const generateImages = useCallback(async (query, count = 12) => {
    try {
      const images = await fetchImages(query, count);
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }, []);

  const saveProject = useCallback(() => {
    try {
      const projectData = {
        mood: {
          energy,
          temperature,
          theme,
          keywords,
        },
        palette: {
          primaryColor: '#667eea', // Get from context
          secondaryColor: '#764ba2',
          accentColor: '#f093fb',
          neutralColors: ['#f8fafc', '#e2e8f0', '#cbd5e1', '#64748b', '#334155'],
        },
        timestamp: new Date().toISOString(),
        id: `project_${Date.now()}`,
      };
      
      const projects = JSON.parse(localStorage.getItem('aetherial_projects') || '[]');
      projects.push(projectData);
      localStorage.setItem('aetherial_projects', JSON.stringify(projects));
      
      toast.success('💾 Project saved successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return projectData.id;
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('❌ Failed to save project.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [energy, temperature, theme, keywords]);

  const loadProject = useCallback((projectId) => {
    try {
      const projects = JSON.parse(localStorage.getItem('aetherial_projects') || '[]');
      const project = projects.find(p => p.id === projectId);
      
      if (project) {
        // Update mood context
        // Update palette context
        toast.success('📂 Project loaded successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        return project;
      } else {
        throw new Error('Project not found');
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('❌ Failed to load project.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  return {
    generateVibe,
    generateImages,
    saveProject,
    loadProject,
    isGenerating,
  };
}; 