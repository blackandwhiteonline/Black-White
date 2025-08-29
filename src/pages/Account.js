import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  Shield,
  LogOut,
  Search,
  Star,
  ShoppingBag,
  
  RefreshCw,
  Share2,
  Lock,
  Smartphone,
  Mail,
  Home,
  Building
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const Account = () => {
  const { user, updateProfile, logout } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  
  // Handle URL parameters for tab navigation
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['dashboard', 'orders', 'addresses', 'payments', 'wishlist', 'profile'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);
  
  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+91 98765 43210'
  });
  
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    isDefault: false
  });
  
  const [newPayment, setNewPayment] = useState({
    type: 'credit',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    isDefault: false
  });

  // Get real order history from localStorage
  const getOrderHistory = () => {
    try {
      const savedOrders = localStorage.getItem('blackwhite_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  };

  const allOrders = getOrderHistory();
  const recentOrders = allOrders.slice(0, 2); // Get last 2 orders

  const savedAddresses = [
    {
      id: 1,
      type: 'home',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India',
      isDefault: true
    },
    {
      id: 2,
      type: 'office',
      name: 'John Doe',
      street: '456 Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400002',
      country: 'India',
      isDefault: false
    }
  ];

  const savedPayments = [
    {
      id: 1,
      type: 'credit',
      last4: '1234',
      expiry: '12/25',
      cardholderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'debit',
      last4: '5678',
      expiry: '06/26',
      cardholderName: 'John Doe',
      isDefault: false
    }
  ];

  const wishlistItems = wishlist; // Use real wishlist from context

  const loginHistory = [
    {
      date: '2024-01-15',
      time: '14:30',
      device: 'Chrome on Windows',
      location: 'Mumbai, India'
    },
    {
      date: '2024-01-14',
      time: '09:15',
      device: 'Safari on iPhone',
      location: 'Mumbai, India'
    }
  ];

  // Handlers
  const handleProfileUpdate = () => {
    updateProfile(profileForm);
    setIsEditingProfile(false);
    // Toast is handled by the context
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city) {
      savedAddresses.push({ ...newAddress, id: Date.now() });
      setNewAddress({
        type: 'home',
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        isDefault: false
      });
      setIsAddingAddress(false);
      toast.success('Address added successfully!');
    }
  };

  const handleAddPayment = () => {
    if (newPayment.cardholderName && newPayment.cardNumber) {
      savedPayments.push({ ...newPayment, id: Date.now(), last4: newPayment.cardNumber.slice(-4) });
      setNewPayment({
        type: 'credit',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardholderName: '',
        isDefault: false
      });
      setIsAddingPayment(false);
      toast.success('Payment method added successfully!');
    }
  };

  const handleReorder = (order) => {
    // Add items from order to cart
    toast.success('Items added to cart for reorder!');
  };

  const handleWishlistToggle = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
      // Toast is handled by WishlistContext
    } else {
      addToWishlist(item);
      // Toast is handled by WishlistContext
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Processing': return <Clock size={16} />;
      case 'Cancelled': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-premium font-bold text-brand-black">
            My Account
          </h1>
              <p className="text-brand-gray-600 mt-2">
                Welcome back, {user?.name || 'John Doe'}!
              </p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'orders', label: 'Your Orders', icon: Calendar },
            { id: 'addresses', label: 'Address Book', icon: MapPin },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard },
            { id: 'settings', label: 'Profile & Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
              className={`w-full sm:w-auto text-left flex items-center space-x-2 px-5 py-3 rounded-lg transition-all duration-300 text-base font-medium ${
                activeTab === tab.id
                  ? 'bg-brand-black text-white shadow-lg'
                  : 'bg-white text-brand-gray-700 hover:bg-brand-gray-100 hover:shadow-md'
              }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
            </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-gray-600">Total Orders</p>
                    <p className="text-xl font-bold text-brand-black">{allOrders.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-gray-600">Completed</p>
                    <p className="text-xl font-bold text-brand-black">
                      {allOrders.filter(o => o.status === 'Delivered').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Truck size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-gray-600">In Transit</p>
                    <p className="text-xl font-bold text-brand-black">
                      {allOrders.filter(o => o.status === 'Shipped').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart size={20} className="text-red-600" />
                  </div>
                <div>
                    <p className="text-sm text-brand-gray-600">Wishlist</p>
                    <p className="text-xl font-bold text-brand-black">{wishlistItems.length}</p>
                  </div>
                </div>
              </div>
                  </div>
                  
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brand-black">Recent Orders</h2>
                <Link to="/account?tab=orders" className="text-brand-black hover:underline">
                  View All Orders
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-brand-gray-100 rounded-full flex items-center justify-center">
                        <Calendar size={20} className="text-brand-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-black">{order.id}</p>
                        <p className="text-sm text-brand-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                      <p className="text-sm text-brand-gray-600 mt-1">₹{order.total?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link to="/account?tab=orders" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-brand-black transition-colors" onClick={() => window.scrollTo(0,0)}>
                  <Truck size={24} className="text-brand-black mb-2" />
                  <span className="text-sm font-medium text-center">Track Order</span>
                </Link>
                <Link to="/account?tab=addresses" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-brand-black transition-colors" onClick={() => window.scrollTo(0,0)}>
                  <MapPin size={24} className="text-brand-black mb-2" />
                  <span className="text-sm font-medium text-center">Update Address</span>
                </Link>
                <Link to="/account?tab=payments" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-brand-black transition-colors" onClick={() => window.scrollTo(0,0)}>
                  <CreditCard size={24} className="text-brand-black mb-2" />
                  <span className="text-sm font-medium text-center">Payment Methods</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-brand-black transition-colors" onClick={() => window.scrollTo(0,0)}>
                  <Heart size={24} className="text-brand-black mb-2" />
                  <span className="text-sm font-medium text-center">View Wishlist</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                        <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={18} />
                          <input
                            type="text"
                      placeholder="Search orders by order number..."
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black"
                    />
                  </div>
                </div>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black"
                >
                  <option value="all">All Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-6">Order History</h2>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-base font-semibold text-brand-black break-all">{order.id}</p>
                        <p className="text-sm text-brand-gray-600 mt-1">{new Date(order.date).toLocaleDateString()} • {order.items?.length || 0} items</p>
                        <span className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}<span className="ml-1">{order.status}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-brand-black">₹{order.total?.toLocaleString() || '0'}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Link to={`/order/${order.id}`} className="w-full inline-flex justify-center items-center btn-primary py-2 text-sm">
                        <Eye size={14} className="mr-2" /> View Details
                      </Link>
                      <button onClick={() => handleReorder(order)} className="w-full inline-flex justify-center items-center border border-brand-black text-brand-black rounded-lg py-2 text-sm hover:bg-brand-black hover:text-white transition-colors">
                        <RefreshCw size={14} className="mr-2" /> Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center">
              <h2 className="text-xl font-semibold text-brand-black">Saved Addresses</h2>
              <button
                onClick={() => setIsAddingAddress(true)}
                className="btn-primary text-sm px-4 py-2 ml-4"
              >
                <Plus size={16} className="mr-2" />
                Add New Address
              </button>
                    </div>
                    
            {/* Addresses List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedAddresses.map((address) => (
                <div key={address.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        address.type === 'home' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {address.type === 'home' ? <Home size={16} /> : <Building size={16} />}
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-black capitalize">{address.type} Address</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-brand-black text-white px-2 py-1 rounded-full">Default</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-brand-gray-600 hover:text-brand-black transition-colors" onClick={() => setIsAddingAddress(true)}>
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-brand-gray-600 hover:text-red-600 transition-colors" onClick={() => toast.success('Address removed')}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-brand-gray-600">
                    <p className="font-medium text-brand-black">{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Address Form */}
            {isAddingAddress && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-black mb-4">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                    className="input-premium"
                  >
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="other">Other</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="input-premium"
                  />
                  
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="input-premium md:col-span-2"
                  />
                  
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="input-premium"
                  />
                  
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="input-premium"
                  />
                  
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    className="input-premium"
                  />
                  
                          <input
                            type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className="input-premium"
                          />
                        </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Set as default address</span>
                  </label>
                    </div>
                    
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleAddAddress}
                        className="btn-primary"
                      >
                    Save Address
                  </button>
                  <button
                    onClick={() => setIsAddingAddress(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center">
              <h2 className="text-xl font-semibold text-brand-black">Payment Methods</h2>
              <button
                onClick={() => setIsAddingPayment(true)}
                className="btn-primary text-sm px-4 py-2 ml-4"
              >
                <Plus size={16} className="mr-2" />
                Add Payment Method
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPayments.map((payment) => (
                <div key={payment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        payment.type === 'credit' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        <CreditCard size={20} />
                      </div>
                          <div>
                        <h3 className="font-medium text-brand-black capitalize">{payment.type} Card</h3>
                        {payment.isDefault && (
                          <span className="text-xs bg-brand-black text-white px-2 py-1 rounded-full">Default</span>
                        )}
                      </div>
                          </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-brand-gray-600 hover:text-brand-black transition-colors" onClick={() => setIsAddingPayment(true)}>
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-brand-gray-600 hover:text-red-600 transition-colors" onClick={() => toast.success('Payment method removed')}>
                        <Trash2 size={16} />
                      </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                    <p className="text-lg font-medium text-brand-black">•••• •••• •••• {payment.last4}</p>
                    <p className="text-sm text-brand-gray-600">{payment.cardholderName}</p>
                    <p className="text-sm text-brand-gray-600">Expires {payment.expiry}</p>
                  </div>
                            </div>
                          ))}
                        </div>

            {/* Add Payment Form */}
            {isAddingPayment && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-black mb-4">Add Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newPayment.type}
                    onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}
                    className="input-premium"
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={newPayment.cardholderName}
                    onChange={(e) => setNewPayment({ ...newPayment, cardholderName: e.target.value })}
                    className="input-premium"
                  />
                  
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={newPayment.cardNumber}
                    onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                    className="input-premium md:col-span-2"
                  />
                  
                  <select
                    value={newPayment.expiryMonth}
                    onChange={(e) => setNewPayment({ ...newPayment, expiryMonth: e.target.value })}
                    className="input-premium"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={newPayment.expiryYear}
                    onChange={(e) => setNewPayment({ ...newPayment, expiryYear: e.target.value })}
                    className="input-premium"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={String(new Date().getFullYear() + i)}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="text"
                    placeholder="CVV"
                    value={newPayment.cvv}
                    onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                    className="input-premium"
                    maxLength="4"
                  />
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newPayment.isDefault}
                      onChange={(e) => setNewPayment({ ...newPayment, isDefault: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Set as default payment method</span>
                  </label>
                  </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleAddPayment}
                    className="btn-primary"
                  >
                    Save Payment Method
                  </button>
                  <button
                    onClick={() => setIsAddingPayment(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center">
              <h2 className="text-xl font-semibold text-brand-black">My Wishlist</h2>
              <button className="btn-secondary text-sm px-4 py-2 ml-4">
                <Share2 size={16} className="mr-2" />
                Share Wishlist
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={item.images?.[0] || item.image || 'https://via.placeholder.com/200x200?text=No+Image'}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleWishlistToggle(item)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Heart size={16} className="text-red-500 fill-current" />
                      </button>
                    </div>
                    
                    {/* Discount Badge */}
                    {item.originalPrice > item.price && (
                      <div className="absolute top-4 left-4 bg-brand-black text-white px-2 py-1 text-sm font-medium rounded">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-brand-gray-500 uppercase tracking-wide">
                        {item.category?.replace('-', ' ').replace('mens', 'Men\'s').replace('womens', 'Women\'s') || 'Product'}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-brand-black mb-2 line-clamp-2">{item.name}</h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(item.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-brand-gray-500">
                        ({item.reviews || 0})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-brand-black">₹{item.price?.toLocaleString() || '0'}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-brand-gray-500 line-through">
                            ₹{item.originalPrice?.toLocaleString() || '0'}
                          </span>
                        )}
                      </div>
                            </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(item, 1, 'M', 'Black')}
                        className="btn-primary flex-1 text-sm px-3 py-2"
                      >
                        <ShoppingBag size={16} className="mr-2" />
                        Add to Cart
                      </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-brand-black">Profile Information</h2>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  )}
                </div>

              {isEditingProfile ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="input-premium"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="input-premium"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleProfileUpdate}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <User size={20} className="text-brand-gray-600" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Full Name</p>
                      <p className="font-medium text-brand-black">{profileForm.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-brand-gray-600" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Email Address</p>
                      <p className="font-medium text-brand-black">{profileForm.email}</p>
                      </div>
                    </div>

                  <div className="flex items-center space-x-3">
                    <Smartphone size={20} className="text-brand-gray-600" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Phone Number</p>
                      <p className="font-medium text-brand-black">{profileForm.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-6">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock size={20} className="text-brand-gray-600" />
                <div>
                      <p className="font-medium text-brand-black">Change Password</p>
                      <p className="text-sm text-brand-gray-600">Update your account password</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm px-4 py-2">
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield size={20} className="text-brand-gray-600" />
                    <div>
                      <p className="font-medium text-brand-black">Two-Factor Authentication</p>
                      <p className="text-sm text-brand-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm px-4 py-2">
                    Enable
                  </button>
                </div>
                      </div>
                    </div>
                    
            {/* Login History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-brand-black mb-6">Recent Login Activity</h2>
                      <div className="space-y-3">
                {loginHistory.map((login, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-gray-100 rounded-full flex items-center justify-center">
                        <Smartphone size={16} className="text-brand-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-black">{login.device}</p>
                        <p className="text-sm text-brand-gray-600">{login.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-brand-black">{login.date}</p>
                      <p className="text-xs text-brand-gray-600">{login.time}</p>
                    </div>
                  </div>
                ))}
                  </div>
                </div>

            {/* Account Deletion */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
              <p className="text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Account; 