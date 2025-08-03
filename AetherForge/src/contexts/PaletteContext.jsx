import React, { createContext, useContext, useReducer } from 'react';

const PaletteContext = createContext();

const initialState = {
  primaryColor: '#667eea',
  secondaryColor: '#764ba2',
  accentColor: '#f093fb',
  neutralColors: ['#f8fafc', '#e2e8f0', '#cbd5e1', '#64748b', '#334155'],
  isGenerating: false,
};

const paletteReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRIMARY_COLOR':
      return { ...state, primaryColor: action.payload };
    case 'SET_SECONDARY_COLOR':
      return { ...state, secondaryColor: action.payload };
    case 'SET_ACCENT_COLOR':
      return { ...state, accentColor: action.payload };
    case 'SET_NEUTRAL_COLORS':
      return { ...state, neutralColors: action.payload };
    case 'SET_PALETTE':
      return { ...state, ...action.payload };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };
    case 'RESET_PALETTE':
      return initialState;
    default:
      return state;
  }
};

export const PaletteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paletteReducer, initialState);

  const setPrimaryColor = (color) => {
    dispatch({ type: 'SET_PRIMARY_COLOR', payload: color });
  };

  const setSecondaryColor = (color) => {
    dispatch({ type: 'SET_SECONDARY_COLOR', payload: color });
  };

  const setAccentColor = (color) => {
    dispatch({ type: 'SET_ACCENT_COLOR', payload: color });
  };

  const setNeutralColors = (colors) => {
    dispatch({ type: 'SET_NEUTRAL_COLORS', payload: colors });
  };

  const setPalette = (palette) => {
    dispatch({ type: 'SET_PALETTE', payload: palette });
  };

  const setGenerating = (isGenerating) => {
    dispatch({ type: 'SET_GENERATING', payload: isGenerating });
  };

  const resetPalette = () => {
    dispatch({ type: 'RESET_PALETTE' });
  };

  const value = {
    ...state,
    setPrimaryColor,
    setSecondaryColor,
    setAccentColor,
    setNeutralColors,
    setPalette,
    setGenerating,
    resetPalette,
  };

  return (
    <PaletteContext.Provider value={value}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
}; 