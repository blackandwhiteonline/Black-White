import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  // State management
  const [isUpdating, setIsUpdating] = useState(null);
  
  // Context hooks
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  // Handle quantity update
  const handleQuantityUpdate = async (cartId, newQuantity) => {
    setIsUpdating(cartId);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      updateQuantity(cartId, newQuantity);
    } finally {
      setIsUpdating(null);
    }
  };

  // Calculate subtotal
  const subtotal = getCartTotal();
  const total = subtotal;

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-2">
                Shopping Cart
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray-600">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2" size={18} />
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="mb-8">
              <ShoppingBag size={80} className="mx-auto text-brand-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-brand-black mb-2">
                Your cart is empty
              </h2>
              <p className="text-brand-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card-premium p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-brand-black">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 transition-colors duration-300 text-sm"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.cartId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 border border-brand-gray-200 rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-brand-black mb-1">
                            {item.name}
                          </h3>
                          <p className="text-brand-gray-600 text-sm mb-2">
                            Color: {item.color} | Size: {item.size}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-brand-black">
                              ₹{item.price.toLocaleString()}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityUpdate(item.cartId, item.quantity - 1)}
                                disabled={isUpdating === item.cartId}
                                className="p-1 hover:bg-brand-gray-100 rounded disabled:opacity-50"
                              >
                                <Minus size={16} />
                              </motion.button>
                              
                              <span className="w-12 text-center font-medium">
                                {isUpdating === item.cartId ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-black mx-auto"></div>
                                ) : (
                                  item.quantity
                                )}
                              </span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityUpdate(item.cartId, item.quantity + 1)}
                                disabled={isUpdating === item.cartId}
                                className="p-1 hover:bg-brand-gray-100 rounded disabled:opacity-50"
                              >
                                <Plus size={16} />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.cartId)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-300"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="card-premium p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-brand-black mb-6">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-brand-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-brand-black">Total</span>
                      <span className="text-lg font-bold text-brand-black">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                {/* Additional Info */}
                <div className="mt-6 text-sm text-brand-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Fast delivery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 