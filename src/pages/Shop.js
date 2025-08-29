import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  X, 
  ShoppingBag, 
  Heart, 
  Star,
  Grid,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { categories, products } from '../data/products-enhanced';
import toast from 'react-hot-toast';

const Shop = () => {
  // URL search params
  const [searchParams] = useSearchParams();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;
  
  // Context hooks
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Convert categories object to array for mapping
  const categoriesArray = Object.entries(categories || {}).map(([key, category]) => ({
    key,
    ...category
  }));

  // Get available types and colors based on selected category - memoized for performance
  const availableTypes = useMemo(() => {
    if (!products) return ['all'];
    if (selectedCategory === 'all') {
      return ['all', ...Array.from(new Set(products.map(p => p.subcategory).filter(Boolean)))];
    }
    return ['all', ...Array.from(new Set(products.filter(p => p.category === selectedCategory).map(p => p.subcategory).filter(Boolean)))];
  }, [selectedCategory]);

  const availableColors = useMemo(() => {
    if (!products) return ['all'];
    if (selectedCategory === 'all') {
      return ['all', ...Array.from(new Set(products.flatMap(p => p.colors || []).filter(Boolean)))];
    }
    return ['all', ...Array.from(new Set(products.filter(p => p.category === selectedCategory).flatMap(p => p.colors || []).filter(Boolean)))];
  }, [selectedCategory]);

  // Update selected type and color when category changes
  useEffect(() => {
    if (selectedCategory !== 'all' && products) {
      const categoryProducts = products.filter(p => p.category === selectedCategory);
      const categoryTypes = Array.from(new Set(categoryProducts.map(p => p.subcategory).filter(Boolean)));
      const categoryColors = Array.from(new Set(categoryProducts.flatMap(p => p.colors || []).filter(Boolean)));
      
      // Reset type if current selection is not available in new category
      if (!categoryTypes.includes(selectedType) && selectedType !== 'all') {
        setSelectedType('all');
      }
      
      // Reset color if current selection is not available in new category
      if (!categoryColors.includes(selectedColor) && selectedColor !== 'all') {
        setSelectedColor('all');
      }
    }
  }, [selectedCategory, selectedType, selectedColor]);

  // Debounce search query for better performance - reduced delay for more responsive search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Optimized filtering and sorting with useMemo
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    // Create a single filter function for better performance
    const filtered = products.filter(product => {
      // Category filter - ensure exact match
      if (selectedCategory !== 'all') {
        if (!product.category || product.category !== selectedCategory) {
          return false;
        }
      }
      
      // Type filter - ensure exact match
      if (selectedType !== 'all') {
        if (!product.subcategory || product.subcategory !== selectedType) {
          return false;
        }
      }
      
      // Color filter - check if product has the selected color
      if (selectedColor !== 'all') {
        if (!product.colors || !Array.isArray(product.colors) || !product.colors.includes(selectedColor)) {
          return false;
        }
      }
      
      // Price filter - check if product price is within range
      if (priceRange[0] !== 0 || priceRange[1] !== 10000) {
        const productPrice = product.price || 0;
        if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
      return false;
        }
      }
      
      // Search filter - restrict to name/category/subcategory for precision
      if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
        const query = debouncedSearchQuery.toLowerCase().trim();
        const name = (product.name || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        const subcategory = (product.subcategory || '').toLowerCase();

        const queryWords = query.split(' ').filter(Boolean);

        const matches = queryWords.every(word =>
          name.includes(word) ||
          category.includes(word) ||
          subcategory.includes(word)
        );

        if (!matches) return false;
      }
    
    return true;
  });

  // Sort products
    const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
          return (b.rating || 0) - (a.rating || 0);
      case 'newest':
          return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
      default:
        return 0;
    }
  });

    return sorted;
  }, [products, selectedCategory, selectedType, selectedColor, priceRange, debouncedSearchQuery, sortBy]);

  // Pagination logic (clamp page to available range so grid matches count)
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages || 1));
  const startIndex = (safeCurrentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset page when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedType, selectedColor, priceRange, debouncedSearchQuery, sortBy]);

  // If current page exceeds total pages after a filter change, clamp it
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Set page loaded state for synchronized animation
  useEffect(() => {
    // Animation is handled by CSS transitions
  }, []);

  // Handle URL search parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setDebouncedSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Helper functions
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Auto-scroll to products on mobile
    setTimeout(() => {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/#/product/${product.id}`;
    toast.success('Please check your measurements on the product page!', { duration: 3000, icon: '📏' });
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedColor('all');
    setPriceRange([0, 10000]);
    setSortBy('newest');
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-50 to-white pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 md:py-8">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-premium font-bold text-brand-black mb-4 sm:mb-6">
            Shop
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-brand-gray-600 max-w-3xl mx-auto">
            Discover our premium black and white collection
          </p>
        </div>

        {/* Mobile Category Cards */}
        <div className="md:hidden mb-8">
          <div>
            <h2 className="text-xl font-semibold text-brand-black mb-6 text-center">
              All Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {categoriesArray.map((category, index) => (
                <div
                  key={category.key}
                  onClick={() => handleCategorySelect(category.key)}
                  className={`relative p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                    selectedCategory === category.key
                      ? 'ring-2 ring-brand-black bg-brand-black text-white transform scale-105'
                      : 'bg-white hover:bg-brand-gray-50'
                  }`}
                >
                  <div className="aspect-square mb-3 sm:mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-center">
                    {category.name}
                  </h3>
                  <p className="text-xs text-center opacity-75 mt-2 hidden sm:block">
                    {category.description}
                  </p>
                  {selectedCategory === category.key && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-brand-black rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Category Banner */}
          {selectedCategory !== 'all' && (
            <div className="bg-gradient-to-r from-brand-black to-brand-gray-800 text-white p-4 sm:p-5 rounded-xl mb-6 flex items-center justify-between shadow-lg">
              <span className="font-medium text-base sm:text-lg">
                {categories[selectedCategory]?.name || selectedCategory}
              </span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-brand-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent text-base sm:text-lg transition-all duration-300 hover:border-brand-gray-300"
              />
            </div>

          {/* View Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                viewMode === 'grid' ? 'bg-brand-black text-white' : 'bg-white text-brand-gray-600 hover:bg-brand-gray-100'
              }`}
            >
              <Grid size={20} />
            </button>

            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-3 rounded-xl bg-gradient-to-r from-brand-black to-brand-gray-800 text-white hover:from-brand-gray-800 hover:to-brand-black transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 lg:flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="filter-section bg-white border-2 border-brand-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-black flex items-center">
                  <Filter className="mr-3 text-brand-black" size={22} />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-brand-gray-600 hover:text-brand-black transition-colors duration-300 font-medium underline hover:scale-105"
                >
                  Clear All
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-brand-black mb-4 sm:mb-5 text-base sm:text-lg">Categories</h3>
                <div className="space-y-2 sm:space-y-3">
                  {categoriesArray.map((category, index) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`filter-option w-full text-left p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category.key 
                          ? 'bg-gradient-to-r from-brand-black to-brand-gray-800 text-white shadow-lg scale-105' 
                          : 'bg-brand-gray-50 hover:bg-brand-gray-100 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <img
                          src={category.image}
                          alt={category.name}
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image'; }}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-sm sm:text-base">{category.name}</span>
                      </div>
                      </button>
                    ))}
                  </div>
                </div>

              {/* Type Filter */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-brand-black mb-4 sm:mb-5 text-base sm:text-lg">Type</h3>
                <div className="space-y-2 sm:space-y-3">
                  {availableTypes.map((type, index) => (
                      <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`filter-option w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        selectedType === type 
                          ? 'bg-gradient-to-r from-brand-black to-brand-gray-800 text-white shadow-lg scale-105' 
                          : 'bg-brand-gray-50 hover:bg-brand-gray-100 hover:shadow-md'
                      }`}
                    >
                      <span className="font-medium text-sm sm:text-base">{type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                {/* Color Filter */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-brand-black mb-4 sm:mb-5 text-base sm:text-lg">Color</h3>
                <div className="space-y-2 sm:space-y-3">
                  {availableColors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`filter-option w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        selectedColor === color 
                          ? 'bg-gradient-to-r from-brand-black to-brand-gray-800 text-white shadow-lg scale-105' 
                          : 'bg-brand-gray-50 hover:bg-brand-gray-100 hover:shadow-md'
                      }`}
                    >
                      <span className="font-medium text-sm sm:text-base">{color === 'all' ? 'All Colors' : color.charAt(0).toUpperCase() + color.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-brand-black mb-4 sm:mb-5 text-base sm:text-lg">Price Range</h3>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between text-sm sm:text-base font-medium">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        setPriceRange([priceRange[0], newMax]);
                      }}
                      className="w-full h-2 bg-brand-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        setPriceRange([newMin, priceRange[1]]);
                      }}
                      className="w-full h-2 bg-brand-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  </div>
                </div>

              {/* Sort Filter */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-brand-black mb-4 sm:mb-5 text-base sm:text-lg">Sort By</h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rated' }
                  ].map((option) => (
                <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`filter-option w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        sortBy === option.value 
                          ? 'bg-gradient-to-r from-brand-black to-brand-gray-800 text-white shadow-lg scale-105' 
                          : 'bg-brand-gray-50 hover:bg-brand-gray-100 hover:shadow-md'
                      }`}
                    >
                      <span className="font-medium text-sm sm:text-base">{option.label}</span>
                </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0" id="products-section">
            {/* Results Summary */}
            <div className="mb-6 text-center">
              <div className="inline-block">
                <p className="text-base sm:text-lg font-medium text-brand-black">
                  {filteredAndSortedProducts.length} Products
                </p>
                <p className="text-xs text-brand-gray-600 mt-1">
                  {debouncedSearchQuery && debouncedSearchQuery.trim() && (
                    <span className="text-brand-black font-medium">
                      Search: &quot;{debouncedSearchQuery}&quot; •{' '}
                </span>
                  )}
                  {selectedCategory !== 'all' && `in ${categories[selectedCategory]?.name || selectedCategory}`}
                  {debouncedSearchQuery && debouncedSearchQuery.trim() && selectedCategory !== 'all' && ' • '}
                  {selectedType !== 'all' && `Type: ${selectedType}`}
                </p>
                {debouncedSearchQuery && debouncedSearchQuery.trim() && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs text-brand-gray-500 hover:text-brand-black underline transition-colors duration-300"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {isFiltering ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-brand-black" />
                  <p className="text-brand-gray-600">Filtering products...</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {productsToShow.map((product, index) => (
                  <div
                    key={product.id}
                    className="group transition-all duration-700 opacity-100 translate-y-0"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                            <Link to={`/product/${product.id}`}>
                      <div className="product-card bg-white border border-brand-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                        <div className="relative overflow-hidden aspect-square">
                              <img
                            src={product.images?.[0] || 'https://via.placeholder.com/200x200?text=No+Image'}
                                alt={product.name}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image'; }}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Enhanced Overlay Actions */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product, e);
                              }}
                              className="p-3 bg-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-all duration-300 shadow-lg hover:scale-110"
                              title="View Details"
                              >
                                <ShoppingBag size={20} />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleWishlistToggle(product);
                              }}
                              className="p-3 bg-white text-brand-black rounded-full hover:bg-red-100 transition-all duration-300 shadow-lg hover:scale-110"
                                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                              >
                                <Heart 
                                  size={20} 
                                  className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                                />
                            </button>
                            </div>

                          {/* Enhanced Discount Badge */}
                            {product.originalPrice > product.price && (
                            <div className="absolute top-3 left-3 bg-brand-black text-white px-2 py-1 text-xs font-bold rounded-lg">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                              </div>
                            )}
                          </div>

                        <div className="p-4 flex-1 flex flex-col"> 
                          <h3 className="text-base font-semibold text-brand-black mb-2 line-clamp-2 hover:text-brand-gray-700 transition-colors">
                                {product.name}
                              </h3>
                            
                          <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                  size={14}
                                  className={`${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-brand-gray-500">
                              ({product.reviews || 0})
                              </span>
                            </div>

                          <p className="text-sm text-brand-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>

                          <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-brand-black">
                                ₹{product.price?.toLocaleString() || '0'}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-sm text-brand-gray-500 line-through">
                                  ₹{product.originalPrice?.toLocaleString() || '0'}
                                  </span>
                                )}
                              </div>
                              
                                <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product, e);
                              }}
                              className="bg-brand-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-800 transition-all duration-300 hover:scale-105"
                                >
                                  View Details
                                </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Fallback Message */}
            {(!products || products.length === 0) && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-gray-200 to-brand-gray-300 rounded-full flex items-center justify-center shadow-lg">
                  <Search size={40} className="text-brand-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-brand-black mb-4">
                  No products available
                </h3>
                <p className="text-brand-gray-600 mb-8">
                  Please check back later or contact support
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isFiltering && (
              <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
                {/* Previous Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-brand-black text-white hover:bg-brand-gray-800'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                          currentPage === pageNum
                            ? 'bg-brand-black text-white'
                            : 'bg-white text-brand-black border border-brand-gray-200 hover:bg-brand-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-brand-black text-white hover:bg-brand-gray-800'
                  }`}
                >
                  Next
                </button>
                </div>
              )}

            {/* Results Summary */}
            {!isFiltering && (
              <div className="text-center mb-8">
                <p className="text-brand-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                  {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                </p>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 