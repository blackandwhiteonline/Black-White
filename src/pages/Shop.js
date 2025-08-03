import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Filter, Grid, List, Star, ShoppingBag, Heart, ChevronDown, Search } from 'lucide-react';
import { products, categories, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const Shop = () => {
  // State management
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  
  // Context hooks
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Intersection observer for animations
  const [productsRef, productsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Get category and search from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (search) {
      setSearchQuery(search);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory && product.category !== selectedCategory) return false;
    
    // Subcategory filter
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
    
    // Color filter
    if (selectedColor && !product.colors.includes(selectedColor)) return false;
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product, 1, 'M', product.colors[0]);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedColor('');
    setPriceRange([0, 20000]);
    setSortBy('featured');
    setSearchQuery('');
  };

  // Get available colors - always include Black and White for Black&White brand
  const availableColors = ['Black', 'White'];

  // Get available subcategories for selected category
  const availableSubcategories = selectedCategory 
    ? [...new Set(getProductsByCategory(selectedCategory).map(p => p.subcategory))]
    : [];

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-4">
            Shop Collection
          </h1>
          <p className="text-xl text-brand-gray-600 mb-6">
            Discover our premium black and white clothing collection
          </p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80 order-2 lg:order-1"
          >
            <div className="card-premium p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-brand-black">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-brand-gray-100 rounded transition-colors duration-300"
                >
                  <Filter size={20} />
                </button>
              </div>

              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-brand-black mb-3">Category</h3>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-2 rounded transition-colors duration-300 ${
                        selectedCategory === '' 
                          ? 'bg-brand-black text-brand-white' 
                          : 'hover:bg-brand-gray-100'
                      }`}
                    >
                      All Categories
                    </motion.button>
                    {Object.entries(categories).map(([key, category]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedCategory(key)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors duration-300 ${
                          selectedCategory === key 
                            ? 'bg-brand-black text-brand-white' 
                            : 'hover:bg-brand-gray-100'
                        }`}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Subcategory Filter */}
                {selectedCategory && availableSubcategories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-brand-black mb-3">Type</h3>
                    <div className="space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedSubcategory('')}
                        className={`w-full text-left px-3 py-2 rounded transition-colors duration-300 ${
                          selectedSubcategory === '' 
                            ? 'bg-brand-black text-brand-white' 
                            : 'hover:bg-brand-gray-100'
                        }`}
                      >
                        All Types
                      </motion.button>
                      {availableSubcategories.map((subcategory) => (
                        <motion.button
                          key={subcategory}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedSubcategory(subcategory)}
                          className={`w-full text-left px-3 py-2 rounded transition-colors duration-300 ${
                            selectedSubcategory === subcategory 
                              ? 'bg-brand-black text-brand-white' 
                              : 'hover:bg-brand-gray-100'
                          }`}
                        >
                          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('-', ' ')}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-brand-black mb-3">Color</h3>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedColor('')}
                      className={`w-full text-left px-3 py-2 rounded transition-colors duration-300 ${
                        selectedColor === '' 
                          ? 'bg-brand-black text-brand-white' 
                          : 'hover:bg-brand-gray-100'
                      }`}
                    >
                      All Colors
                    </motion.button>
                    {availableColors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedColor(color)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors duration-300 ${
                          selectedColor === color 
                            ? 'bg-brand-black text-brand-white' 
                            : 'hover:bg-brand-gray-100'
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-brand-black mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-brand-gray-600">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-brand-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={clearFilters}
                  className="w-full btn-secondary"
                >
                  Clear All Filters
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
            >
              <div className="flex items-center space-x-4">
                <span className="text-brand-gray-600">
                  {sortedProducts.length} products found
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-brand-white border border-brand-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:border-brand-black transition-colors duration-300"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={16} />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-brand-gray-300 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-brand-black text-brand-white' 
                        : 'hover:bg-brand-gray-100'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-brand-black text-brand-white' 
                        : 'hover:bg-brand-gray-100'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div ref={productsRef}>
              {sortedProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={productsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12"
                >
                  <h3 className="text-xl font-semibold text-brand-black mb-2">
                    No products found
                  </h3>
                  <p className="text-brand-gray-600 mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <div className={`grid gap-4 sm:gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  <AnimatePresence>
                    {sortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group"
                      >
                        <div className={`card-premium overflow-hidden ${
                          viewMode === 'list' ? 'flex' : ''
                        }`}>
                          
                          {/* Product Image */}
                          <div className={`relative overflow-hidden ${
                            viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                          }`}>
                            <Link to={`/product/${product.id}`}>
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover cursor-pointer"
                              />
                            </Link>
                            
                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleAddToCart(product)}
                                className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-colors duration-300"
                                title="Add to Cart"
                              >
                                <ShoppingBag size={20} />
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleWishlistToggle(product)}
                                className={`p-3 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-colors duration-300 ${
                                  isInWishlist(product.id) ? 'bg-red-50' : ''
                                }`}
                                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                              >
                                <Heart 
                                  size={20} 
                                  className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                                />
                              </motion.button>
                            </div>

                            {/* Discount Badge */}
                            {product.originalPrice > product.price && (
                              <div className="absolute top-4 left-4 bg-brand-black text-brand-white px-2 py-1 text-sm font-medium">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="text-lg font-semibold text-brand-black mb-2 hover:text-brand-gray-600 transition-colors duration-300 cursor-pointer">
                                {product.name}
                              </h3>
                            </Link>
                            
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-brand-gray-500">
                                ({product.reviews})
                              </span>
                            </div>

                            <p className="text-brand-gray-600 mb-4 line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-brand-black">
                                  ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-sm text-brand-gray-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              
                              <Link to={`/product/${product.id}`}>
                                <button
                                  className="text-brand-black hover:text-brand-gray-600 transition-colors duration-300 font-medium"
                                >
                                  View Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 