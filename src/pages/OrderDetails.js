import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Truck, 
  CreditCard, 
  Download, 
  
  RefreshCw, 
  X,
  CheckCircle,
  Clock,
  Package,
  User
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Get real order data from localStorage
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
  
  if (!order) {
    return (
      <div className="min-h-screen bg-brand-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-brand-black mb-4">
              Order not found
            </h1>
            <Link to="/account" className="btn-secondary">
              <ArrowLeft className="mr-2" size={20} />
              Back to Account
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate totals from actual order data
  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const shipping = order.shipping || 0;
  const discount = order.discount || 0;
  const tax = order.tax || 0;
  const total = subtotal + shipping - discount + tax;
  
  // Ensure items array exists
  const orderItems = order.items || [];
  
  // Format order date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = orderDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Cancelled': return <X size={16} />;
      default: return <Package size={16} />;
    }
  };

  // Download invoice function
  const downloadInvoice = () => {
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
      doc.text(formattedDate, 60, 80);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Invoice Time:', 20, 90);
      doc.setFont('helvetica', 'bold');
      doc.text(formattedTime, 60, 90);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Payment Method:', 20, 100);
      doc.setFont('helvetica', 'bold');
      doc.text(order.paymentMethod || 'Not specified', 60, 100);
      
      // Right column
      doc.setFont('helvetica', 'normal');
      doc.text('Order ID:', 120, 80);
      doc.setFont('helvetica', 'bold');
      doc.text(order.id, 150, 80);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Order Date:', 120, 90);
      doc.setFont('helvetica', 'bold');
      doc.text(formattedDate, 150, 90);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Payment Status:', 120, 100);
      doc.setFont('helvetica', 'bold');
      doc.text(order.paymentStatus || 'Paid', 150, 100);
      
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
      doc.text(`₹${subtotal.toLocaleString()}`, 170, yPosition);
      yPosition += 8;
      
      doc.text('Discount:', 120, yPosition);
      doc.setTextColor(0, 128, 0);
      doc.text(`-₹${discount.toLocaleString()}`, 170, yPosition);
      yPosition += 8;
      doc.setTextColor(0, 0, 0);
      
      doc.text('Shipping:', 120, yPosition);
      doc.text(`₹${shipping.toLocaleString()}`, 170, yPosition);
      yPosition += 8;
      
      doc.text('Tax:', 120, yPosition);
      doc.text(`₹${tax.toLocaleString()}`, 170, yPosition);
      yPosition += 8;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Total Amount:', 120, yPosition);
      doc.text(`₹${total.toLocaleString()}`, 170, yPosition);
      
      // Footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Thank you for your purchase!', pageWidth/2, pageHeight - 30, { align: 'center' });
      doc.text('BLACK & WHITE FASHION', pageWidth/2, pageHeight - 25, { align: 'center' });
      doc.text('Premium Black and White Clothing', pageWidth/2, pageHeight - 20, { align: 'center' });
      doc.text('For any queries, please contact our customer support', pageWidth/2, pageHeight - 15, { align: 'center' });
      
      // Save the PDF
      doc.save(`invoice-${order.id}.pdf`);
      
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

  const handleReorder = () => {
    if (orderItems && orderItems.length > 0) {
      orderItems.forEach(product => {
        addToCart(product, product.quantity, product.size || 'M', product.color || 'Black');
      });
      toast.success('Items added to cart for reorder!');
    } else {
      toast.error('No items found in this order');
    }
  };

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-16 sm:pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                to="/account"
                className="flex items-center text-brand-gray-600 hover:text-brand-black transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Account
              </Link>
            </div>
            <div className="text-right">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-black">
                Order Details
              </h1>
              <p className="text-brand-gray-600">{order.orderNumber}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-brand-black mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Order ID</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-lg text-brand-black">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Payment Method:</span> {order.paymentMethod || 'Not specified'}</p>
                <p><span className="font-medium">Payment Status:</span> 
                  <span className={`ml-1 ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus || 'Paid'}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Products Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-brand-black mb-6">Products Ordered</h2>
              <div className="space-y-4">
                {orderItems.length > 0 ? (
                  orderItems.map((product) => (
                    <Link key={product.cartId || product.id} to={`/product/${product.id}`}>
                      <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <img 
                          src={product.images?.[0] || product.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-brand-black hover:text-brand-gray-700">{product.name}</h3>
                          <p className="text-sm text-brand-gray-600">
                            Size: {product.size} | Color: {product.color}
                          </p>
                          <p className="text-sm text-brand-gray-600">Quantity: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-brand-black">₹{product.price?.toLocaleString() || '0'}</p>
                          <p className="text-sm text-brand-gray-600">Total: ₹{(product.price * product.quantity)?.toLocaleString() || '0'}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-brand-gray-600">No items found in this order</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Shipping & Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-brand-black mb-6">Shipping & Delivery</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center">
                    <MapPin size={20} className="mr-2" />
                    Shipping Address
                  </h3>
                  <div className="text-sm text-brand-gray-600 space-y-1">
                    {order.shippingAddress ? (
                      <>
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </>
                    ) : (
                      <p>No shipping address available</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center">
                    <Truck size={20} className="mr-2" />
                    Shipping Details
                  </h3>
                  <div className="text-sm text-brand-gray-600 space-y-2">
                    <p><span className="font-medium">Method:</span> {order.shippingMethod || 'Standard Shipping'}</p>
                    <p><span className="font-medium">Carrier:</span> {order.carrier || 'Standard Delivery'}</p>
                    <p><span className="font-medium">Tracking:</span> 
                      {order.trackingNumber ? (
                        <a 
                          href={`https://www.fedex.com/tracking?trknbr=${order.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-black hover:underline ml-1"
                        >
                          {order.trackingNumber}
                        </a>
                      ) : (
                        <span className="ml-1">Not available yet</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-brand-black mb-6">Customer Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center">
                    <User size={20} className="mr-2" />
                    Contact Details
                  </h3>
                  <div className="text-sm text-brand-gray-600 space-y-2">
                    {order.customerInfo ? (
                      <>
                        <p><span className="font-medium">Name:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                        <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
                        <p><span className="font-medium">Phone:</span> {order.customerInfo.phone}</p>
                      </>
                    ) : (
                      <p>No customer information available</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center">
                    <CreditCard size={20} className="mr-2" />
                    Billing Address
                  </h3>
                  <div className="text-sm text-brand-gray-600 space-y-1">
                    {order.billingAddress ? (
                      <>
                        <p>{order.billingAddress.name}</p>
                        <p>{order.billingAddress.street}</p>
                        <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</p>
                        <p>{order.billingAddress.country}</p>
                      </>
                    ) : (
                      <p>No billing address available</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            
            {/* Financial Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-brand-black mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-lg text-brand-black">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Payment Method:</span> {order.paymentMethod || 'Not specified'}</p>
                <p><span className="font-medium">Payment Status:</span> 
                  <span className="text-green-600 ml-1">{order.paymentStatus || 'Paid'}</span>
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-brand-black mb-6">Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={handleReorder}
                  className="w-full bg-brand-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw size={18} />
                  <span>Reorder</span>
                </button>
                
                <button 
                  onClick={downloadInvoice}
                  className="w-full bg-white text-brand-black border border-brand-black py-3 px-4 rounded-lg hover:bg-brand-black hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download Invoice</span>
                </button>
                
                <a href="/contact" className="w-full bg-white text-brand-black border border-brand-black py-3 px-4 rounded-lg hover:bg-brand-black hover:text-white transition-colors flex items-center justify-center space-x-2 text-center">
                  <span>Contact Support</span>
                </a>
                
                <button className="w-full bg-white text-brand-black border border-brand-black py-3 px-4 rounded-lg hover:bg-brand-black hover:text-white transition-colors flex items-center justify-center space-x-2">
                  <span>Return/Exchange</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
