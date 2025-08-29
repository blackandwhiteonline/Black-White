import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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
        toast.error(`${product.name} is already in your wishlist`, { duration: 3000 });
        return prevWishlist; // Item already in wishlist
      }
      toast.success(`${product.name} added to wishlist`, { duration: 3000 });
      return [...prevWishlist, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => {
      const product = prevWishlist.find(item => item.id === productId);
      const newWishlist = prevWishlist.filter(item => item.id !== productId);
      if (product) {
        toast.success(`${product.name} removed from wishlist`, { duration: 3000 });
      }
      return newWishlist;
    });
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
    toast.success('Wishlist cleared successfully', { duration: 3000 });
  };

  // Move item from wishlist to cart
  const moveToCart = (productId, addToCart) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1, product.sizes?.[0] || 'M', product.colors?.[0] || 'Black');
      removeFromWishlist(productId);
      toast.success(`${product.name} moved to cart`, { duration: 3000 });
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