import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, ShoppingBag, Heart, Truck, Shield, RefreshCw, Award, Users, Clock } from 'lucide-react';
import { products } from '../data/products-enhanced';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
 

const Home = () => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
 
  
  // Context hooks
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Scroll animations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Intersection observer for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [productsRef, productsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Hero slides data with video and real images
  const heroSlides = [
    {
      title: "Timeless Elegance",
      subtitle: "Discover our premium black and white collection",
      description: "Sophisticated designs that transcend trends",
      type: "video",
      video: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=1000&fit=crop",
      cta: "Shop Now",
      link: "/shop"
    },
    {
      title: "Indian Heritage",
      subtitle: "Traditional wear reimagined",
      description: "Celebrate culture with modern elegance",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=800&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=1000&fit=crop",
      cta: "Explore Traditional",
      link: "/shop?category=mens-indian-festive"
    },
    {
      title: "Contemporary Style",
      subtitle: "Western wear with Indian sensibility",
      description: "Where comfort meets sophistication",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=800&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=1000&fit=crop",
      cta: "View Collection",
      link: "/shop?category=mens-topwear"
    }
  ];

  // Auto-slide for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Reset auto-slide timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }, [prevSlide, nextSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  // Handle add to cart
  const handleAddToCart = (product) => {
    // Redirect to product details page instead of adding to cart
    window.location.href = `/#/product/${product.id}`;
  };

  const handleWishlistToggle = (product, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Features data
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders above ₹5,000",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handpicked premium fabrics",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round the clock customer support",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick delivery across India",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] sm:h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          {/* Background Image or Video */}
          {heroSlides[currentSlide].type === 'video' ? (
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                poster={heroSlides[currentSlide].mobileImage}
                className="hidden sm:block w-full h-full object-cover"
              >
                <source src={heroSlides[currentSlide].video} type="video/mp4" />
              </video>
              <img
                src={heroSlides[currentSlide].mobileImage}
                alt={heroSlides[currentSlide].title}
                className="sm:hidden w-full h-full object-cover"
              />
            </div>
          ) : (
            <img
              src={window.innerWidth < 640 ? heroSlides[currentSlide].mobileImage : heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex items-center justify-center h-full text-center text-white px-3 sm:px-4 lg:px-8"
        >
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-premium font-bold mb-3 sm:mb-4 md:mb-6"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-3 sm:mb-4 md:mb-6 text-brand-gray-200"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 text-brand-gray-300 max-w-2xl mx-auto"
            >
              {heroSlides[currentSlide].description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to={heroSlides[currentSlide].link}>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-hero"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2" size={24} />
                </motion.button>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white z-20 cursor-pointer"
          aria-label="Previous slide"
        >
          <ArrowRight className="rotate-180" size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white z-20 cursor-pointer"
          aria-label="Next slide"
        >
          <ArrowRight size={24} />
        </button>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-premium font-bold text-brand-black mb-3 sm:mb-4 md:mb-6">
              Why Choose Black&White?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${feature.color}`} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-black mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-brand-gray-600">
                  {feature.description}
                </p>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={productsRef} className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-brand-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-premium font-bold text-brand-black mb-3 sm:mb-4 md:mb-6">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-gray-600 max-w-3xl mx-auto">
              Discover our most popular black and white clothing items
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-premium overflow-hidden">
                  <div className="relative overflow-hidden aspect-square">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>
                      
                      {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(product)}
                        className="p-2 sm:p-2 md:p-3 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-colors duration-300"
                        title="View Details"
                      >
                        <ShoppingBag size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-2 md:p-3 bg-brand-white text-brand-black rounded-full hover:bg-red-100 transition-colors duration-300"
                        title="Add to Wishlist"
                          onClick={(e) => handleWishlistToggle(product, e)}
                        >
                        <Heart size={16} className={`sm:w-5 sm:h-5 md:w-6 md:h-6 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </motion.button>
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice > product.price && (
                      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-brand-black text-brand-white px-1.5 sm:px-2 md:px-2 py-0.5 sm:py-1 md:py-1 text-xs sm:text-sm font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                  <div className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-brand-black mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                            size={12}
                            className={`${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} sm:w-4 sm:h-4`}
                            />
                          ))}
                        </div>
                      <span className="text-xs sm:text-sm text-brand-gray-500">
                        ({product.reviews || 0})
                        </span>
                      </div>

                    <p className="text-xs sm:text-sm md:text-base text-brand-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg md:text-xl font-bold text-brand-black">
                          ₹{product.price?.toLocaleString() || '0'}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs sm:text-sm md:text-base text-brand-gray-500 line-through">
                            ₹{product.originalPrice?.toLocaleString() || '0'}
                            </span>
                          )}
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-action text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link to="/shop">
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5"
              >
                View All Products
                <ArrowRight className="ml-2" size={24} />
              </motion.button>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-brand-black">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-premium font-bold text-brand-white mb-3 sm:mb-4 md:mb-6">
              Stay Updated
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-gray-300 mb-6 sm:mb-8 md:mb-10">
              Subscribe to our newsletter for exclusive offers and latest updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-white text-brand-black text-sm sm:text-base"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 