import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, ShoppingBag, Trash2, X, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();
  
  // Intersection observer for animations
  const [wishlistRef, wishlistInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Handle move to cart
  const handleMoveToCart = (product) => {
    moveToCart(product.id, addToCart);
    toast.success(`${product.name} moved to cart!`);
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product.id);
    toast.success(`${product.name} removed from wishlist`);
  };

  // Handle clear wishlist
  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Wishlist cleared!');
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-4">
                My Wishlist
              </h1>
              <p className="text-xl text-brand-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            
            {wishlist.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearWishlist}
                className="btn-secondary flex items-center space-x-2"
              >
                <Trash2 size={20} />
                <span>Clear All</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <div ref={wishlistRef}>
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={wishlistInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-brand-gray-200 rounded-full flex items-center justify-center">
                  <Heart size={40} className="text-brand-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-brand-black mb-4">
                  Your wishlist is empty
                </h3>
                <p className="text-brand-gray-600 mb-8">
                  Start adding items to your wishlist to save them for later.
                </p>
                <Link to="/shop" className="btn-primary">
                  Start Shopping
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={wishlistInView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="card-premium overflow-hidden relative">
                      
                      {/* Product Image */}
                      <div className="relative overflow-hidden aspect-square">
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
                            onClick={() => handleMoveToCart(product)}
                            className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-colors duration-300"
                            title="Move to Cart"
                          >
                            <ShoppingBag size={20} />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveFromWishlist(product)}
                            className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-red-100 transition-colors duration-300"
                            title="Remove from Wishlist"
                          >
                            <X size={20} />
                          </motion.button>
                        </div>

                        {/* Discount Badge */}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 left-4 bg-brand-black text-brand-white px-2 py-1 text-sm font-medium">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </div>
                        )}

                        {/* Wishlist Badge */}
                        <div className="absolute top-4 right-4 bg-red-500 text-brand-white p-2 rounded-full">
                          <Heart size={16} className="fill-current" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-brand-gray-500 uppercase tracking-wide">
                            {product.category.replace('-', ' ').replace('mens', 'Men\'s').replace('womens', 'Women\'s')}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-brand-black mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-brand-gray-500">
                            ({product.reviews})
                          </span>
                        </div>

                        <p className="text-brand-gray-600 mb-4 line-clamp-2 text-sm">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
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

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleMoveToCart(product)}
                            className="flex-1 btn-primary flex items-center justify-center space-x-2"
                          >
                            <ShoppingBag size={16} />
                            <span>Move to Cart</span>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRemoveFromWishlist(product)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded transition-colors duration-300"
                            title="Remove from Wishlist"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>

                        {/* View Details Link */}
                        <Link
                          to={`/product/${product.id}`}
                          className="block text-center text-brand-black hover:text-brand-gray-600 transition-colors duration-300 font-medium mt-3"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Continue Shopping */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link to="/shop" className="btn-secondary">
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 