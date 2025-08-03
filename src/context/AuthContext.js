import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create authentication context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  // State for user authentication
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    // Check localStorage for existing user session
    const savedUser = localStorage.getItem('blackwhite_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('blackwhite_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual backend integration
      // TODO: Replace with actual authentication API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual user data from API
      const mockUser = {
        id: '1',
        email: email,
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150/000000/FFFFFF?text=JD',
        createdAt: new Date().toISOString(),
      };
      
      // Save user to localStorage
      localStorage.setItem('blackwhite_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast.success('Successfully logged in!');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual backend integration
      // TODO: Replace with actual registration API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual user data from API
      const mockUser = {
        id: '1',
        email: email,
        name: name,
        avatar: 'https://via.placeholder.com/150/000000/FFFFFF?text=' + name.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString(),
      };
      
      // Save user to localStorage
      localStorage.setItem('blackwhite_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('blackwhite_user');
    setUser(null);
    toast.success('Successfully logged out!');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual backend integration
      // TODO: Replace with actual profile update API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('blackwhite_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Profile update failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Newsletter subscription
  const subscribeNewsletter = async (email) => {
    try {
      // Simulate API call - replace with actual backend integration
      // TODO: Replace with actual newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Successfully subscribed to newsletter!');
      return { success: true };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Newsletter subscription failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    subscribeNewsletter,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 