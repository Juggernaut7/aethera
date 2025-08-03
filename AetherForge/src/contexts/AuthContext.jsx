import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthContext = createContext();

// Configure axios defaults
const API_BASE_URL = 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set up axios interceptor to include auth token
  useEffect(() => {
    const token = localStorage.getItem('aetherforge_auth_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('aetherforge_auth_token');
      
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/auth/profile');
          setCurrentUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('aetherforge_auth_token');
          localStorage.removeItem('aetherforge_user');
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('aetherforge_auth_token', token);
      localStorage.setItem('aetherforge_user', JSON.stringify(user));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update state
      setIsAuthenticated(true);
      setCurrentUser(user);
      
      toast.success(`Welcome back, ${user.username}! ✨`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('aetherforge_auth_token', token);
      localStorage.setItem('aetherforge_user', JSON.stringify(user));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update state
      setIsAuthenticated(true);
      setCurrentUser(user);
      
      toast.success(`Welcome to AetherForge, ${user.username}! 🎨`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('aetherforge_auth_token');
    localStorage.removeItem('aetherforge_user');
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
    
    // Update state
    setIsAuthenticated(false);
    setCurrentUser(null);
    
    toast.info('You have been logged out. See you soon! 👋', {
      position: "top-right",
      autoClose: 3000,
    });
    
    return true;
  };

  const updateProfile = async (updates) => {
    try {
      const response = await axios.put('/auth/profile', updates);
      const updatedUser = response.data.user;
      
      // Update localStorage
      localStorage.setItem('aetherforge_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      toast.success('Profile updated successfully! ✨', {
        position: "top-right",
        autoClose: 3000,
      });
      
      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed. Please try again.';
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: false, error: message };
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 