import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { getProductById, getSimilarProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  
  // Hooks
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Get product data
  const product = getProductById(id);
  const similarProducts = product ? getSimilarProducts(product, 4) : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-brand-black mb-4">
              Product not found
            </h1>
            <Link to="/shop" className="btn-secondary">
              <ArrowLeft className="mr-2" size={20} />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  // Handle pincode check
  const handlePincodeCheck = () => {
    if (!pincode || pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    // Mock delivery calculation based on distance from Delhi
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

    setDeliveryInfo({
      pincode,
      deliveryDays,
      deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
      shippingCharge
    });

    toast.success(`Delivery available! Expected delivery: ${deliveryDate.toLocaleDateString('en-IN')}`);
  };

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <nav className="flex items-center space-x-2 text-sm text-brand-gray-600">
            <Link to="/" className="hover:text-brand-black transition-colors duration-300">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-brand-black transition-colors duration-300">
              Shop
            </Link>
            <span>/</span>
            <span className="text-brand-black">{product.name}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-brand-white rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-brand-black' 
                          : 'border-transparent hover:border-brand-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-premium font-bold text-brand-black mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-brand-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-brand-black">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-brand-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Description</h3>
              <p className="text-brand-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-black rounded-full"></div>
                    <span className="text-brand-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded transition-all duration-300 ${
                      selectedColor === color
                        ? 'border-brand-black bg-brand-black text-brand-white'
                        : 'border-brand-gray-300 hover:border-brand-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-brand-black bg-brand-black text-brand-white'
                        : 'border-brand-gray-300 hover:border-brand-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-brand-gray-300 rounded flex items-center justify-center hover:border-brand-black transition-colors duration-300"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-brand-gray-300 rounded flex items-center justify-center hover:border-brand-black transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Delivery Information</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="flex-1 px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent"
                  />
                  <button
                    onClick={handlePincodeCheck}
                    className="px-6 py-3 bg-brand-black text-brand-white rounded-lg hover:bg-brand-gray-800 transition-colors duration-300"
                  >
                    Check
                  </button>
                </div>
                
                {deliveryInfo && (
                  <div className="bg-brand-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-brand-gray-600">Pincode:</span>
                      <span className="font-medium">{deliveryInfo.pincode}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-brand-gray-600">Expected Delivery:</span>
                      <span className="font-medium text-green-600">{deliveryInfo.deliveryDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-gray-600">Shipping Charge:</span>
                      <span className="font-medium">₹{deliveryInfo.shippingCharge}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-3 text-base"
              >
                <ShoppingBag className="mr-2" size={18} />
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`p-3 border-2 transition-all duration-300 rounded-lg ${
                  isInWishlist(product.id)
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-brand-black hover:bg-brand-black hover:text-brand-white'
                }`}
                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart 
                  size={18} 
                  className={isInWishlist(product.id) ? 'fill-white text-white' : ''}
                />
              </motion.button>
            </div>

            {/* Stock Status */}
            <div className="pt-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-brand-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <h2 className="text-3xl font-premium font-bold text-brand-black mb-8">
                Similar Products
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarProducts.map((similarProduct) => (
                    <motion.div
                      key={similarProduct.id}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Link to={`/product/${similarProduct.id}`}>
                        <div className="card-premium overflow-hidden">
                          <div className="relative overflow-hidden aspect-square">
                            <img
                              src={similarProduct.images[0]}
                              alt={similarProduct.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Discount Badge */}
                            {similarProduct.originalPrice > similarProduct.price && (
                              <div className="absolute top-4 left-4 bg-brand-black text-brand-white px-2 py-1 text-sm font-medium">
                                {Math.round(((similarProduct.originalPrice - similarProduct.price) / similarProduct.originalPrice) * 100)}% OFF
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-brand-black mb-2 line-clamp-2">
                              {similarProduct.name}
                            </h3>
                            
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(similarProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-brand-gray-500">
                                ({similarProduct.reviews})
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-brand-black">
                                  ₹{similarProduct.price.toLocaleString()}
                                </span>
                                {similarProduct.originalPrice > similarProduct.price && (
                                  <span className="text-sm text-brand-gray-500 line-through">
                                    ₹{similarProduct.originalPrice.toLocaleString()}
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
            </motion.div>
          </div>
        )}
    </div>
  );
};

export default ProductDetail; 