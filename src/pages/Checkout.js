import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  // State management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  
  // Context hooks
  const { cartItems, getCartTotal, processCheckout } = useCart();

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = shippingInfo ? shippingInfo.shippingCharge : (subtotal > 5000 ? 0 : 299);
  const total = subtotal + shipping;

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
    setFormData(prev => ({ ...prev, pincode }));
    
    if (pincode.length === 6) {
      const shipping = calculateShipping(pincode);
      setShippingInfo(shipping);
    } else {
      setShippingInfo(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await processCheckout(formData);
      // Redirect to success page or show success message
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-brand-black mb-4">
              Your cart is empty
            </h1>
            <p className="text-brand-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-4">
            Checkout
          </h1>
          <p className="text-xl text-brand-gray-600">
            Complete your purchase securely
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card-premium p-8">
              <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                Shipping Information
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-brand-black mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-brand-black mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-brand-black mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="input-premium resize-none"
                    placeholder="Enter your full address"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-brand-black mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter city"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-brand-black mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter state"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-brand-black mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handlePincodeChange}
                      required
                      className="input-premium"
                      placeholder="Enter pincode"
                    />
                    {shippingInfo && (
                      <div className="mt-2 text-sm text-green-600">
                        Expected delivery: {shippingInfo.deliveryDate} | Shipping: ₹{shippingInfo.shippingCharge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  type="button"
                  onClick={() => setShowPaymentForm(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-black text-brand-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-brand-gray-800 transition-colors duration-300"
                >
                  Place Order
                </motion.button>

                {/* Payment Methods */}
                {showPaymentForm && (
                  <div className="border-t border-brand-gray-200 pt-6">
                    <h3 className="text-xl font-semibold text-brand-black mb-6">
                      Payment Information
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={selectedPaymentMethod === 'card'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                          <span className="font-medium">Credit or Debit Card</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="netbanking"
                            checked={selectedPaymentMethod === 'netbanking'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                          <span className="font-medium">Net Banking</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={selectedPaymentMethod === 'upi'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                          <span className="font-medium">Other UPI Apps</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="emi"
                            checked={selectedPaymentMethod === 'emi'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                          <span className="font-medium">EMI Options</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={selectedPaymentMethod === 'cod'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                          <span className="font-medium">Cash on Delivery/Pay on Delivery</span>
                        </label>
                      </div>
                      
                      <div className="bg-brand-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-brand-gray-600">
                          Cash, UPI and Cards accepted. <span className="text-brand-black font-medium cursor-pointer">Know more.</span>
                        </p>
                      </div>
                    </div>

                    {/* Payment Form based on selected method */}
                    {selectedPaymentMethod === 'card' && (
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-brand-black mb-2">
                            Card Number *
                          </label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                              className="input-premium pl-10"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-brand-black mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                              className="input-premium"
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-brand-black mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              className="input-premium"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="upiId" className="block text-sm font-medium text-brand-black mb-2">
                            UPI ID *
                          </label>
                          <input
                            type="text"
                            id="upiId"
                            name="upiId"
                            className="input-premium"
                            placeholder="example@upi"
                          />
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'netbanking' && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="bank" className="block text-sm font-medium text-brand-black mb-2">
                            Select Bank *
                          </label>
                          <select className="input-premium">
                            <option value="">Choose your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Final Payment Button */}
                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-brand-black text-brand-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-brand-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                    </motion.button>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isProcessing}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Lock className="mr-2" size={20} />
                      Pay ₹{total.toLocaleString()}
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card-premium p-8 sticky top-24">
              <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                Order Summary
              </h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-brand-black truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-brand-gray-500">
                        {item.color} | {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-brand-black">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Summary Details */}
              <div className="space-y-4 border-t border-brand-gray-200 pt-6">
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

              {/* Security Info */}
              <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-brand-gray-600">
                  <Lock size={16} />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 