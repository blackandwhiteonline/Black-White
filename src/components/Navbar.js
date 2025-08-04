import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Context hooks
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search query
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-brand-white/90 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14 md:h-16 lg:h-20">
            
            {/* Mobile Menu Button - Left Side */}
            <div className="lg:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>

            {/* Logo - Centered on Mobile, Left on Desktop */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-premium font-bold text-brand-black"
                >
                  Black&White
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-modern font-medium transition-all duration-300 hover:text-brand-gray-600 ${
                    location.pathname === item.path ? 'text-brand-black' : 'text-brand-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

                          {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
              >
                <Search size={20} />
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
                >
                  <Heart size={20} />
                  {getWishlistCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-brand-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {getWishlistCount()}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
                >
                  <ShoppingBag size={20} />
                  {getCartItemCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-brand-black text-brand-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {getCartItemCount()}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* User Account */}
              {user ? (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium">{user.name}</span>
                  </motion.button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-brand-white shadow-lg border border-brand-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/account" className="block px-4 py-2 text-sm hover:bg-brand-gray-50">
                      My Account
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-brand-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">Login</span>
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Actions - Right Side */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
              >
                <Search size={20} />
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
                >
                  <Heart size={20} />
                  {getWishlistCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-brand-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {getWishlistCount()}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-brand-gray-800 hover:text-brand-black transition-colors duration-300"
                >
                  <ShoppingBag size={20} />
                  {getCartItemCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-brand-black text-brand-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {getCartItemCount()}
                    </motion.span>
                  )}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-brand-gray-200 bg-brand-white"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearch} className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="flex-1 input-premium"
                    autoFocus
                  />
                  <button type="submit" className="btn-primary">
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="fixed top-16 lg:hidden left-0 w-64 h-full bg-brand-white shadow-xl z-40"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Navigation */}
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block text-lg font-medium transition-colors duration-300 ${
                      location.pathname === item.path 
                        ? 'text-brand-black' 
                        : 'text-brand-gray-700 hover:text-brand-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-4 pt-6 border-t border-brand-gray-200">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center space-x-3 w-full p-3 text-left hover:bg-brand-gray-50 rounded"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>
                
                <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-brand-gray-50 rounded">
                  <Heart size={20} />
                  <span>Wishlist</span>
                </button>
                
                <Link to="/cart" className="flex items-center space-x-3 w-full p-3 text-left hover:bg-brand-gray-50 rounded">
                  <ShoppingBag size={20} />
                  <span>Cart ({getCartItemCount()})</span>
                </Link>
                
                {user ? (
                  <div className="space-y-2">
                    <Link to="/account" className="flex items-center space-x-3 w-full p-3 text-left hover:bg-brand-gray-50 rounded">
                      <User size={20} />
                      <span>My Account</span>
                    </Link>
                    <button 
                      onClick={logout}
                      className="flex items-center space-x-3 w-full p-3 text-left hover:bg-brand-gray-50 rounded text-red-600"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center space-x-3 w-full p-3 text-left hover:bg-brand-gray-50 rounded">
                    <User size={20} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 