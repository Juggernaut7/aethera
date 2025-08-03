import React, { createContext, useContext, useReducer } from 'react';

const MoodContext = createContext();

const initialState = {
  energy: 50, // 0-100, Calm to Dynamic
  temperature: 50, // 0-100, Cool to Warm
  theme: 'Nature', // Nature, Tech, Vintage, Futuristic
  keywords: '', // User input keywords
  isGenerating: false, // Loading state for generation
};

const moodReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ENERGY':
      return { ...state, energy: action.payload };
    case 'SET_TEMPERATURE':
      return { ...state, temperature: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_KEYWORDS':
      return { ...state, keywords: action.payload };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };
    case 'RESET_MOOD':
      return initialState;
    default:
      return state;
  }
};

export const MoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moodReducer, initialState);

  const setEnergy = (energy) => {
    dispatch({ type: 'SET_ENERGY', payload: energy });
  };

  const setTemperature = (temperature) => {
    dispatch({ type: 'SET_TEMPERATURE', payload: temperature });
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setKeywords = (keywords) => {
    dispatch({ type: 'SET_KEYWORDS', payload: keywords });
  };

  const setGenerating = (isGenerating) => {
    dispatch({ type: 'SET_GENERATING', payload: isGenerating });
  };

  const resetMood = () => {
    dispatch({ type: 'RESET_MOOD' });
  };

  const value = {
    ...state,
    setEnergy,
    setTemperature,
    setTheme,
    setKeywords,
    setGenerating,
    resetMood,
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}; 