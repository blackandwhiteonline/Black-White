import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft, CheckCircle, Truck, Shield, Gift, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

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
    cvv: '',
    upiId: '',
    bank: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderStep, setOrderStep] = useState('shipping'); // shipping, payment, confirmation
  const [orderId, setOrderId] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  
  // Context hooks
  const { cartItems, getCartTotal, processCheckout, clearCart } = useCart();

  // Available coupons
  const availableCoupons = [
    { code: 'WELCOME10', discount: 10, minAmount: 1000, discountType: 'percentage', description: '10% off on orders above ₹1,000' },
    { code: 'BLACKWHITE20', discount: 20, minAmount: 2000, discountType: 'percentage', description: '20% off on orders above ₹2,000' },
    { code: 'PREMIUM15', discount: 15, minAmount: 1500, discountType: 'percentage', description: '15% off on orders above ₹1,500' },
    { code: 'FIRST50', discount: 50, minAmount: 500, discountType: 'fixed', description: '₹50 off on orders above ₹500' }
  ];

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = shippingInfo ? shippingInfo.shippingCharge : 0;
  
  // Calculate discount
  const discount = appliedCoupon ? 
    (appliedCoupon.discountType === 'percentage' ? 
      Math.round((subtotal * appliedCoupon.discount) / 100) : 
      appliedCoupon.discount) : 0;
  
  const total = subtotal + shipping - discount;

  // Check if applied coupon is still valid
  React.useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.minAmount) {
      setAppliedCoupon(null);
      toast.error(`Coupon ${appliedCoupon.code} removed - minimum order amount not met`);
    }
  }, [subtotal, appliedCoupon]);

  // Close coupon dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCouponDropdown && !event.target.closest('.coupon-dropdown')) {
        setShowCouponDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCouponDropdown]);

  // Apply coupon
  const applyCoupon = (coupon) => {
    if (subtotal < coupon.minAmount) {
      toast.error(`Minimum order amount of ₹${coupon.minAmount} required for this coupon`);
      return;
    }
    
    setAppliedCoupon(coupon);
    setShowCouponDropdown(false);
    toast.success(`Coupon ${coupon.code} applied successfully!`);
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  // Download invoice function
  const downloadInvoice = (orderId) => {
    // Get the actual order data from localStorage to ensure accuracy
    const getOrderById = (id) => {
      try {
        const savedOrders = localStorage.getItem('blackwhite_orders');
        const orders = savedOrders ? JSON.parse(savedOrders) : [];
        return orders.find(order => order.id === id);
      } catch (error) {
        console.error('Error loading order:', error);
        return null;
      }
    };
    
    const order = getOrderById(orderId);
    const orderSubtotal = order?.subtotal || subtotal;
    const orderShipping = order?.shipping || shipping;
    const orderDiscount = order?.discount || discount;
    const orderTotal = order?.total || total;
    const orderItems = order?.items || cartItems;
    
    // Import jsPDF dynamically
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      // Set font
      doc.setFont('helvetica');
      
      // Add luxury styling
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      
      // Header with gradient effect
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      // Company logo/name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('BLACK & WHITE FASHION', pageWidth/2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Premium Black and White Clothing', pageWidth/2, 30, { align: 'center' });
      
      // Invoice title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', pageWidth/2, 60, { align: 'center' });
      
      // Invoice details
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Left column
      doc.text('Invoice Date:', 20, 80);
      doc.setFont('helvetica', 'bold');
      doc.text(new Date().toLocaleDateString('en-IN'), 60, 80);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Invoice Time:', 20, 90);
      doc.setFont('helvetica', 'bold');
      doc.text(new Date().toLocaleTimeString('en-IN'), 60, 90);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Payment Method:', 20, 100);
      doc.setFont('helvetica', 'bold');
      doc.text(selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : selectedPaymentMethod.toUpperCase(), 60, 100);
      
      // Right column
      doc.setFont('helvetica', 'normal');
      doc.text('Order ID:', 120, 80);
      doc.setFont('helvetica', 'bold');
      doc.text(orderId, 150, 80);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Order Date:', 120, 90);
      doc.setFont('helvetica', 'bold');
      doc.text(new Date().toLocaleDateString('en-IN'), 150, 90);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Payment Status:', 120, 100);
      doc.setFont('helvetica', 'bold');
      doc.text(selectedPaymentMethod === 'cod' ? 'Pending' : 'Paid', 150, 100);
      
      // Items table header
      doc.setFillColor(0, 0, 0);
      doc.rect(20, 120, pageWidth - 40, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Item', 25, 127);
      doc.text('Color', 80, 127);
      doc.text('Size', 110, 127);
      doc.text('Qty', 130, 127);
      doc.text('Price', 150, 127);
      doc.text('Total', 170, 127);
      
      // Items
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      let yPosition = 140;
      
      orderItems.forEach((item, index) => {
        if (yPosition > pageHeight - 80) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.text(item.name.substring(0, 25), 25, yPosition);
        doc.text(item.color || 'N/A', 80, yPosition);
        doc.text(item.size || 'N/A', 110, yPosition);
        doc.text(item.quantity.toString(), 130, yPosition);
        doc.text(`₹${item.price.toLocaleString()}`, 150, yPosition);
        doc.text(`₹${(item.price * item.quantity).toLocaleString()}`, 170, yPosition);
        
        yPosition += 8;
      });
      
      // Totals section
      yPosition += 10;
      doc.setDrawColor(0, 0, 0);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'bold');
      doc.text('Subtotal:', 120, yPosition);
      doc.text(`₹${orderSubtotal.toLocaleString()}`, 170, yPosition);
      yPosition += 8;
      
      doc.text('Shipping:', 120, yPosition);
      doc.text(orderShipping === 0 ? 'Free' : `₹${orderShipping.toLocaleString()}`, 170, yPosition);
      yPosition += 8;
      
      if (orderDiscount > 0) {
        doc.setTextColor(0, 128, 0);
        doc.text('Discount:', 120, yPosition);
        doc.text(`-₹${orderDiscount.toLocaleString()}`, 170, yPosition);
        yPosition += 8;
        doc.setTextColor(0, 0, 0);
      }
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Total Amount:', 120, yPosition);
      doc.text(`₹${orderTotal.toLocaleString()}`, 170, yPosition);
      
      // Footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Thank you for your purchase!', pageWidth/2, pageHeight - 30, { align: 'center' });
      doc.text('BLACK & WHITE FASHION', pageWidth/2, pageHeight - 25, { align: 'center' });
      doc.text('Premium Black and White Clothing', pageWidth/2, pageHeight - 20, { align: 'center' });
      doc.text('For any queries, please contact our customer support', pageWidth/2, pageHeight - 15, { align: 'center' });
      
      // Save the PDF
      doc.save(`invoice-${orderId}.pdf`);
      
      // Show success message with auto-dismiss
      toast.success('Invoice downloaded successfully!', {
        duration: 3000,
        icon: '📄'
      });
    }).catch(error => {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    });
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

  // Handle shipping form submission
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!shippingInfo) {
      toast.error('Please enter a valid pincode to calculate shipping');
      return;
    }

    setOrderStep('payment');
    setShowPaymentForm(true);
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPaymentMethod === 'card') {
      const requiredFields = ['cardNumber', 'expiryDate', 'cvv'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
    } else if (selectedPaymentMethod === 'upi') {
      if (!formData.upiId) {
        toast.error('Please enter your UPI ID');
        return;
      }
    } else if (selectedPaymentMethod === 'netbanking') {
      if (!formData.bank) {
        toast.error('Please select your bank');
        return;
      }
    }

    try {
      setIsProcessing(true);
      
      const result = await processCheckout({
        ...formData,
        total: total, // Pass the final total after discount
        shipping,
        discount,
        paymentMethod: selectedPaymentMethod
      });
      
      if (result.success) {
        setOrderId(result.orderId);
        setOrderStep('confirmation');
        // Scroll to top when order is confirmed
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Toast is handled by CartContext
        // Cart clearing is handled by CartContext
      } else {
        toast.error('Order placement failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle back to shipping
  const handleBackToShipping = () => {
    setOrderStep('shipping');
    setShowPaymentForm(false);
    // Scroll to top when going back
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cartItems.length === 0 && orderStep !== 'confirmation') {
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

  // Order confirmation view
  if (orderStep === 'confirmation') {
    // Get the actual order data from localStorage to ensure accuracy
    const getOrderById = (id) => {
      try {
        const savedOrders = localStorage.getItem('blackwhite_orders');
        const orders = savedOrders ? JSON.parse(savedOrders) : [];
        return orders.find(order => order.id === id);
      } catch (error) {
        console.error('Error loading order:', error);
        return null;
      }
    };
    
    const order = getOrderById(orderId);
    const orderSubtotal = order?.subtotal || subtotal;
    const orderShipping = order?.shipping || shipping;
    const orderDiscount = order?.discount || discount;
    const orderTotal = order?.total || total;
    
    return (
      <div className="min-h-screen bg-brand-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Celebration Animation */}
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
                className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <CheckCircle size={64} className="text-white" />
              </motion.div>
              
              {/* Confetti Animation */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20, x: Math.random() * 100 - 50 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    y: [0, -100], 
                    x: Math.random() * 200 - 100,
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 100}%`,
                    top: `${50 + (Math.random() - 0.5) * 100}%`
                  }}
                />
              ))}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl font-premium font-bold text-brand-black mb-4"
            >
              Order Confirmed! 🎉
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-brand-gray-600 mb-8"
            >
              Thank you for your purchase. Your order has been successfully placed.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray-200 mb-8"
            >
              <h2 className="text-2xl font-semibold text-brand-black mb-4">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-brand-gray-600">Order ID:</span>
                  <span className="ml-2 font-medium">{orderId}</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Order Date:</span>
                  <span className="ml-2 font-medium">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Subtotal:</span>
                  <span className="ml-2 font-medium">₹{orderSubtotal.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Shipping:</span>
                  <span className="ml-2 font-medium">{orderShipping === 0 ? 'Free' : `₹${orderShipping.toLocaleString()}`}</span>
                </div>
                {orderDiscount > 0 && (
                  <div>
                    <span className="text-brand-gray-600">Discount:</span>
                    <span className="ml-2 font-medium text-green-600">-₹{orderDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div>
                  <span className="text-brand-gray-600">Total Amount:</span>
                  <span className="ml-2 font-medium font-bold text-lg">₹{orderTotal.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Payment Method:</span>
                  <span className="ml-2 font-medium capitalize">{selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : selectedPaymentMethod}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = `/#/order/${orderId}`}
                className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              >
                View Order Status
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadInvoice(orderId)}
                className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              >
                Download Invoice
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/#/shop'}
                className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
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

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${orderStep === 'shipping' ? 'text-brand-black' : 'text-brand-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStep === 'shipping' ? 'bg-brand-black text-white' : 'bg-brand-gray-200'
              }`}>
                1
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            
            <div className="w-16 h-0.5 bg-brand-gray-200"></div>
            
            <div className={`flex items-center space-x-2 ${orderStep === 'payment' ? 'text-brand-black' : 'text-brand-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStep === 'payment' ? 'bg-brand-black text-white' : 'bg-brand-gray-200'
              }`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
            
            <div className="w-16 h-0.5 bg-brand-gray-200"></div>
            
            <div className={`flex items-center space-x-2 ${orderStep === 'confirmation' ? 'text-brand-black' : 'text-brand-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStep === 'confirmation' ? 'bg-brand-black text-white' : 'bg-brand-gray-200'
              }`}>
                3
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card-premium p-8">
              {orderStep === 'shipping' ? (
                <>
              <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                Shipping Information
              </h2>
              
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
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

                    {/* Continue to Payment Button */}
                <motion.button
                      type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-black text-brand-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-brand-gray-800 transition-colors duration-300"
                >
                      Continue to Payment
                </motion.button>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-premium font-bold text-brand-black">
                      Payment Information
                    </h2>
                    <button
                      onClick={handleBackToShipping}
                      className="text-brand-gray-600 hover:text-brand-black transition-colors duration-300 text-sm underline"
                    >
                      ← Back to Shipping
                    </button>
                  </div>
                  
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Methods */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-brand-black mb-4">Select Payment Method</h3>
                      
                      <label className="flex items-center space-x-3 cursor-pointer p-4 border border-brand-gray-200 rounded-lg hover:border-brand-black transition-colors duration-300">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={selectedPaymentMethod === 'card'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                        <CreditCard size={20} className="text-brand-gray-600" />
                          <span className="font-medium">Credit or Debit Card</span>
                        </label>
                        
                      <label className="flex items-center space-x-3 cursor-pointer p-4 border border-brand-gray-200 rounded-lg hover:border-brand-black transition-colors duration-300">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="netbanking"
                            checked={selectedPaymentMethod === 'netbanking'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                        <CreditCard size={20} className="text-brand-gray-600" />
                          <span className="font-medium">Net Banking</span>
                        </label>
                        
                      <label className="flex items-center space-x-3 cursor-pointer p-4 border border-brand-gray-200 rounded-lg hover:border-brand-black transition-colors duration-300">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={selectedPaymentMethod === 'upi'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                        <CreditCard size={20} className="text-brand-gray-600" />
                          <span className="font-medium">Other UPI Apps</span>
                        </label>
                        
                      <label className="flex items-center space-x-3 cursor-pointer p-4 border border-brand-gray-200 rounded-lg hover:border-brand-black transition-colors duration-300">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={selectedPaymentMethod === 'cod'}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-brand-black focus:ring-brand-black"
                          />
                        <Gift size={20} className="text-brand-gray-600" />
                        <span className="font-medium">Cash on Delivery</span>
                        </label>
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
                            value={formData.upiId}
                            onChange={handleInputChange}
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
                          <select 
                            name="bank"
                            value={formData.bank}
                            onChange={handleInputChange}
                            className="input-premium"
                          >
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
                      className="w-full bg-brand-black text-brand-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-brand-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {selectedPaymentMethod === 'cod' ? 'Placing Order...' : 'Processing Payment...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                          {selectedPaymentMethod === 'cod' ? (
                            <>
                              <CheckCircle className="mr-2" size={20} />
                              Place Order - ₹{total.toLocaleString()}
                            </>
                          ) : (
                            <>
                      <Lock className="mr-2" size={20} />
                      Pay ₹{total.toLocaleString()}
                            </>
                          )}
                    </div>
                  )}
                </motion.button>
              </form>
                </>
              )}
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
                
                {/* Coupon Section */}
                <div className="space-y-3">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Gift size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-green-800">{appliedCoupon.code}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600">
                          -₹{discount.toLocaleString()}
                        </span>
                        <button
                          onClick={removeCoupon}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                        className="w-full flex items-center justify-between p-3 border border-brand-gray-300 rounded-lg hover:border-brand-black transition-colors"
                      >
                        <span className="text-sm text-brand-gray-600">Have a coupon?</span>
                        <ChevronDown size={16} className={`transition-transform ${showCouponDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showCouponDropdown && (
                        <div className="coupon-dropdown absolute top-full left-0 right-0 mt-1 bg-white border border-brand-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {availableCoupons.map((coupon) => (
                            <div key={coupon.code} className="p-3 border-b border-brand-gray-100 last:border-b-0">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-brand-black">{coupon.code}</span>
                                    <span className="text-xs bg-brand-black text-white px-2 py-1 rounded">
                                      {coupon.discount <= 50 ? `₹${coupon.discount} OFF` : `${coupon.discount}% OFF`}
                                    </span>
                                  </div>
                                  <p className="text-xs text-brand-gray-600 mt-1">{coupon.description}</p>
                                </div>
                                <button
                                  onClick={() => applyCoupon(coupon)}
                                  className="btn-primary text-xs px-3 py-1"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
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
                  <Shield size={16} />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </div>

              {/* Shipping Info */}
              {shippingInfo && (
                <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-brand-gray-600 mb-2">
                    <Truck size={16} />
                    <span>Shipping Information</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Expected Delivery: {shippingInfo.deliveryDate}</div>
                    <div>Shipping Charge: ₹{shippingInfo.shippingCharge}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 