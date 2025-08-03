import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

const Account = () => {
  // State management
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Fashion Street, Mumbai, Maharashtra 400001'
  });
  
  // Context hooks
  const { user, logout } = useAuth();
  const { getWishlistItems } = useWishlist();

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Implement profile update API call
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Mock order history
  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 8999,
      items: [
        { name: 'White Sherwani', quantity: 1, price: 8999 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 3499,
      items: [
        { name: 'Black Pathani Suit', quantity: 1, price: 3499 }
      ]
    }
  ];

  // Get wishlist items
  const wishlist = getWishlistItems();

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-brand-black mb-4">
              Please log in to access your account
            </h1>
            <p className="text-brand-gray-600 mb-8">
              You need to be logged in to view your account information.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-2 -right-2 bg-brand-black text-brand-white p-2 rounded-full shadow-lg"
              >
                <User size={16} />
              </motion.button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl lg:text-5xl font-premium font-bold text-brand-black mb-4">
                My Account
              </h1>
              <p className="text-xl text-brand-gray-600">
                Welcome back, {user.name}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="card-premium p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-brand-black">{user.name}</h3>
                  <p className="text-sm text-brand-gray-600">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'orders', label: 'Your Orders', icon: Package },
                  { id: 'addresses', label: 'Addresses', icon: MapPin },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'bg-brand-black text-brand-white'
                        : 'hover:bg-brand-gray-100'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded text-red-600 hover:bg-red-50 transition-colors duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card-premium p-8">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-premium font-bold text-brand-black">
                      Profile Information
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn-secondary"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </motion.button>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-brand-black mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-premium pl-10 disabled:bg-brand-gray-100"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-black mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-premium pl-10 disabled:bg-brand-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-brand-black mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-premium pl-10 disabled:bg-brand-gray-100"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-black mb-2">
                          Address
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400" size={20} />
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="input-premium pl-10 disabled:bg-brand-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary"
                      >
                        Save Changes
                      </motion.button>
                    )}
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                    Order History
                  </h2>
                  
                  <div className="space-y-6">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border border-brand-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-brand-black">{order.id}</h3>
                            <p className="text-sm text-brand-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-brand-black">
                              ₹{order.total.toLocaleString()}
                            </span>
                            <div className="text-sm text-brand-gray-600">{order.status}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{item.name} (Qty: {item.quantity})</span>
                              <span>₹{item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                    My Wishlist
                  </h2>
                  
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-6 bg-brand-gray-200 rounded-full flex items-center justify-center">
                        <Heart size={40} className="text-brand-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-black mb-4">
                        Your wishlist is empty
                      </h3>
                      <p className="text-brand-gray-600 mb-8">
                        Start adding items to your wishlist to save them for later.
                      </p>
                      <Link to="/shop" className="btn-primary">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <div key={item.id} className="card-premium overflow-hidden">
                          <Link to={`/product/${item.id}`}>
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              />
                            </div>
                          </Link>
                          <div className="p-4">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-semibold text-brand-black mb-2 hover:text-brand-gray-600 transition-colors duration-300">
                                {item.name}
                              </h3>
                            </Link>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-brand-black">
                                ₹{item.price.toLocaleString()}
                              </span>
                              <Link to={`/product/${item.id}`}>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="btn-primary text-sm px-4 py-2"
                                >
                                  View Details
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-premium font-bold text-brand-black">
                      Saved Addresses
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary"
                    >
                      Add New Address
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Default Address */}
                    <div className="p-6 border-2 border-brand-black rounded-lg relative">
                      <div className="absolute top-4 right-4">
                        <span className="bg-brand-black text-brand-white px-2 py-1 text-xs rounded">Default</span>
                      </div>
                      <h3 className="font-semibold text-brand-black mb-2">Home Address</h3>
                      <p className="text-brand-gray-600 mb-4">
                        123 Fashion Street<br />
                        Andheri West, Mumbai<br />
                        Maharashtra 400058<br />
                        India
                      </p>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-sm text-brand-black hover:text-brand-gray-600 transition-colors duration-300"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-sm text-red-600 hover:text-red-700 transition-colors duration-300"
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>

                    {/* Office Address */}
                    <div className="p-6 border border-brand-gray-200 rounded-lg">
                      <h3 className="font-semibold text-brand-black mb-2">Office Address</h3>
                      <p className="text-brand-gray-600 mb-4">
                        456 Business Park<br />
                        Bandra Kurla Complex<br />
                        Mumbai, Maharashtra 400051<br />
                        India
                      </p>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-sm text-brand-black hover:text-brand-gray-600 transition-colors duration-300"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-sm text-red-600 hover:text-red-700 transition-colors duration-300"
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 border border-brand-gray-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-brand-black mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Email notifications for orders</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Newsletter and promotions</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded" />
                          <span>SMS notifications</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-6 border border-brand-gray-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-brand-black mb-4">
                        Privacy Settings
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Share order history for better recommendations</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded" />
                          <span>Allow personalized ads</span>
                        </label>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                    >
                      Save Settings
                    </motion.button>
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

export default Account; 