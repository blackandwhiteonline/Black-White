import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
 

const Cart = () => {
  // State management
  const [isUpdating, setIsUpdating] = useState(null);
  const [pincode, setPincode] = useState('');
  const [shippingInfo, setShippingInfo] = useState(null);
  
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
    if (newQuantity < 1) {
      // Remove product from cart if quantity is 0 or less
      removeFromCart(cartId);
      return;
    }
    
    setIsUpdating(cartId);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      updateQuantity(cartId, newQuantity);
    } finally {
      setIsUpdating(null);
    }
  };

  // Calculate shipping based on pincode
  const calculateShipping = (pincode) => {
    if (!pincode || pincode.length !== 6) return null;
    
    const delhiPincode = 110001;
    const distance = Math.abs(parseInt(pincode) - delhiPincode);
    let deliveryDays = 3;
    let shippingCharge = 0;

    if (distance < 1000) {
      deliveryDays = 2;
      shippingCharge = 50;
    } else if (distance < 2000) {
      deliveryDays = 3;
      shippingCharge = 100;
    } else if (distance < 3000) {
      deliveryDays = 4;
      shippingCharge = 150;
    } else {
      deliveryDays = 5;
      shippingCharge = 200;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    return {
      pincode,
      deliveryDays,
      deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
      shippingCharge
    };
  };

  // Handle pincode change
  const handlePincodeChange = (e) => {
    const pincode = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(pincode);
    
    if (pincode.length === 6) {
      const shipping = calculateShipping(pincode);
      setShippingInfo(shipping);
    } else {
      setShippingInfo(null);
    }
  };

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = shippingInfo ? 
    (shippingInfo.shippingCharge) : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-12 sm:pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 md:py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-1 sm:mb-2">
                Shopping Cart
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-gray-600">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            {/* move continue shopping to summary section on mobile; keep here hidden on small screens */}
            <Link to="/shop" className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Shopping
              </motion.button>
              </div>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            
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
                        <Link to={`/product/${item.id}`} className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity duration-300"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="text-lg font-semibold text-brand-black mb-1 hover:text-brand-gray-600 transition-colors duration-300 cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>
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

              {/* Shipping Estimate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card-premium p-6 mt-6"
              >
                <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center">
                  <Truck className="mr-2" size={20} />
                  Shipping Estimate
                </h3>
                
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter pincode for shipping estimate"
                    value={pincode}
                    onChange={handlePincodeChange}
                    className="flex-1 px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent"
                  />
                </div>
                
                {shippingInfo && (
                  <div className="mt-4 bg-brand-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-brand-gray-600">Expected Delivery:</span>
                      <span className="font-medium text-green-600">{shippingInfo.deliveryDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-gray-600">Shipping Charge:</span>
                      <span className="font-medium">
                        {shippingInfo.shippingCharge === 0 ? 'Free' : `₹${shippingInfo.shippingCharge}`}
                      </span>
                    </div>
                  </div>
                )}
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
                  
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-sm text-brand-gray-500">
                      Free shipping on orders above ₹5,000
                    </div>
                  )}
                  
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

                {/* Continue Shopping (mobile placement) */}
                <Link to="/shop" className="block lg:hidden mt-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-secondary py-3"
                  >
                    <ArrowLeft className="mr-2" size={16} />
                    Continue Shopping
                  </motion.button>
                </Link>

                {/* Additional Info */}
                <div className="mt-6 text-sm text-brand-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield size={16} className="text-green-500" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck size={16} className="text-green-500" />
                    <span>Free returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw size={16} className="text-green-500" />
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