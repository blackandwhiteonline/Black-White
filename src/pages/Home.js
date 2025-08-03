import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, ShoppingBag, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';


const Home = () => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isWishlistHovered, setIsWishlistHovered] = useState(null);
  
  // Context hooks
  const { addToCart } = useCart();
  
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
      cta: "Shop Now",
      link: "/shop"
    },
    {
      title: "Indian Heritage",
      subtitle: "Traditional wear reimagined",
      description: "Celebrate culture with modern elegance",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=800&fit=crop",
      cta: "Explore Traditional",
      link: "/shop?category=mens-traditional"
    },
    {
      title: "Contemporary Style",
      subtitle: "Western wear with Indian sensibility",
      description: "Where comfort meets sophistication",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=800&fit=crop",
      cta: "View Collection",
      link: "/shop?category=mens-western"
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
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product, 1, 'M', product.colors[0]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen sm:h-screen overflow-hidden">
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
                className="w-full h-full object-cover"
                poster={heroSlides[currentSlide].image}
              >
                <source src={heroSlides[currentSlide].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          )}
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex items-center justify-center h-full text-center text-brand-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-premium font-bold mb-4"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl font-modern mb-6"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-brand-gray-200 mb-8 max-w-2xl mx-auto"
            >
              {heroSlides[currentSlide].description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to={heroSlides[currentSlide].link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 inline" size={20} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-brand-black/50 hover:bg-brand-black/70 text-brand-white p-3 rounded-full transition-all duration-300 z-20"
        >
          <ArrowRight className="rotate-180" size={24} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-brand-black/50 hover:bg-brand-black/70 text-brand-white p-3 rounded-full transition-all duration-300 z-20"
        >
          <ArrowRight size={24} />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-brand-white' : 'bg-brand-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-6">
              Why Choose Black&White?
            </h2>
            <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
              Premium quality, timeless design, and exceptional craftsmanship in every piece.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Handcrafted with the finest materials and attention to detail",
                icon: "✨"
              },
              {
                title: "Timeless Design",
                description: "Classic black and white pieces that never go out of style",
                icon: "🎨"
              },
              {
                title: "Indian Heritage",
                description: "Celebrating traditional craftsmanship with modern sensibilities",
                icon: "🇮🇳"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                className="text-center p-8 card-premium hover-lift"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-brand-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-brand-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-brand-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-6">
              Explore Our Collections
            </h2>
            <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
              From traditional Indian wear to contemporary western styles, discover your perfect look.
            </p>
          </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  key: 'mens-topwear',
                  name: "Men's Topwear",
                  description: "T-Shirts, Shirts, Jackets & More",
                  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop"
                },
                {
                  key: 'mens-traditional',
                  name: "Men's Traditional",
                  description: "Kurtas, Sherwanis & Festive Wear",
                  image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop"
                },
                {
                  key: 'mens-bottomwear',
                  name: "Men's Bottomwear",
                  description: "Jeans, Trousers & More",
                  image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"
                },
                {
                  key: 'womens-topwear',
                  name: "Women's Topwear",
                  description: "Tops, Shirts, Jackets & More",
                  image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=600&fit=crop"
                },
                {
                  key: 'womens-traditional',
                  name: "Women's Traditional",
                  description: "Sarees, Salwar Kameez & More",
                  image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop"
                },
                {
                  key: 'womens-bottomwear',
                  name: "Women's Bottomwear",
                  description: "Jeans, Trousers & More",
                  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                }
              ].map((category, index) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link to={`/shop?category=${category.key}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden card-premium group aspect-square"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/40 to-brand-black/20"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-brand-white">
                        <div className="text-center">
                          <h3 className="text-2xl font-premium font-bold mb-2">
                            {category.name}
                          </h3>
                          <p className="text-brand-gray-200 mb-4 text-sm">
                            {category.description}
                          </p>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-center space-x-2 bg-brand-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                          >
                            <span className="text-sm font-medium">Explore</span>
                            <ArrowRight size={16} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={productsRef} className="py-20 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
              Discover our most popular pieces, crafted with premium materials and timeless design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="card-premium overflow-hidden cursor-pointer group">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-colors duration-300"
                        >
                          <ShoppingBag size={20} />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setIsWishlistHovered(product.id)}
                          onMouseLeave={() => setIsWishlistHovered(null)}
                          className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-colors duration-300"
                        >
                          <Heart 
                            size={20} 
                            className={isWishlistHovered === product.id ? 'fill-red-500 text-red-500' : ''}
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
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-brand-black mb-2">
                        {product.name}
                      </h3>
                      
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
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                View All Products
                <ArrowRight className="ml-2 inline" size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 