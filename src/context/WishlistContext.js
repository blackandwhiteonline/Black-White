import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('blackWhiteWishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('blackWhiteWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const isAlreadyInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isAlreadyInWishlist) {
        return prevWishlist; // Item already in wishlist
      }
      return [...prevWishlist, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlist.length;
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Move item from wishlist to cart
  const moveToCart = (productId, addToCart) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1, product.sizes[0] || 'M', product.colors[0] || 'Black');
      removeFromWishlist(productId);
    }
  };

  // Get wishlist items with additional info
  const getWishlistItems = () => {
    return wishlist.map(item => ({
      ...item,
      isInWishlist: true
    }));
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    clearWishlist,
    moveToCart,
    getWishlistItems
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 