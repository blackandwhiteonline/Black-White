import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, ArrowLeft, ZoomIn, ZoomOut, Check, X, Share2 } from 'lucide-react';
import { getProductById, getSimilarProducts } from '../data/products-enhanced';
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showReviews, setShowReviews] = useState(false);
  
  // Hooks
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Get product data
  const product = getProductById(id);
  const similarProducts = product ? getSimilarProducts(product, 4) : [];

  // Mock reviews data - in real app, this would come from backend
  const reviews = [
    {
      id: 1,
      user: 'Rahul S.',
      rating: 5,
      title: 'Excellent quality and fit!',
      comment: 'The fabric is premium and the fit is perfect. Highly recommended!',
      date: '2024-01-20',
      verified: true
    },
    {
      id: 2,
      user: 'Priya M.',
      rating: 4,
      title: 'Great product, fast delivery',
      comment: 'Love the design and the delivery was super fast. Will buy again!',
      date: '2024-01-18',
      verified: true
    },
    {
      id: 3,
      user: 'Amit K.',
      rating: 5,
      title: 'Perfect for formal occasions',
      comment: 'Wore this to a business meeting and received many compliments.',
      date: '2024-01-15',
      verified: true
    }
  ];

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
    // Toast is handled by CartContext
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      // Toast is handled by WishlistContext
    } else {
      addToWishlist(product);
      // Toast is handled by WishlistContext
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Product link copied to clipboard');
      }
    } catch (e) {
      // ignore
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

  // Handle image zoom
  const handleImageZoom = (e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

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
              {/* Main Image with Zoom */}
              <div className="relative aspect-square bg-brand-white rounded-lg overflow-hidden">
                <div
                  className={`relative w-full h-full ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onMouseMove={handleImageZoom}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={{
                      transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
                    }}
                  />
                  
                  {/* Zoom Overlay */}
                  {isZoomed && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <ZoomOut size={32} className="text-white" />
                    </div>
                  )}
                  
                  {/* Zoom Toggle Button */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300"
                  >
                    {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                  </button>
                </div>
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
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-brand-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
                <button
                  onClick={() => setShowReviews(!showReviews)}
                  className="text-brand-black hover:text-brand-gray-600 transition-colors duration-300 text-sm underline"
                >
                  View all reviews
                </button>
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

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-brand-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.inStock && (
                  <span className="text-sm text-green-600 font-medium">
                    • Ready to ship
                  </span>
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
                    <Check size={16} className="text-green-500 flex-shrink-0" />
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

            {/* Size Selection with Stock */}
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSizeInStock = Math.random() > 0.2;
                  return (
                    <button
                      key={size}
                      onClick={() => isSizeInStock && setSelectedSize(size)}
                      disabled={!isSizeInStock}
                      className={`px-3 py-2 border-2 rounded-md text-sm transition-all duration-300 relative ${
                        selectedSize === size
                          ? 'border-brand-black bg-brand-black text-brand-white'
                          : isSizeInStock
                          ? 'border-brand-gray-300 hover:border-brand-black'
                          : 'border-brand-gray-200 bg-brand-gray-100 text-brand-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {size}
                      {!isSizeInStock && (
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-red-600">Out of Stock</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Section */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brand-black mb-2 sm:mb-3">Quantity</h3>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-gray-200 text-brand-black rounded-lg hover:bg-brand-gray-300 transition-colors duration-300 flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 sm:w-20 h-8 sm:h-10 text-center border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent text-sm sm:text-base"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-gray-200 text-brand-black rounded-lg hover:bg-brand-gray-300 transition-colors duration-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brand-black mb-2 sm:mb-3">Delivery Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent text-sm sm:text-base"
                  />
                  <button
                    onClick={handlePincodeCheck}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-black text-brand-white rounded-lg hover:bg-brand-gray-800 transition-colors duration-300 text-sm sm:text-base"
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
            <div className="flex flex-col space-y-3 pt-4 sm:pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || !product.inStock}
                className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="mr-2" size={16} />
                {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  className={`flex-1 p-2 sm:p-3 border-2 transition-all duration-300 rounded-lg ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-brand-black hover:bg-brand-black hover:text-white'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart 
                    size={16} 
                    className={isInWishlist(product.id) ? 'fill-white text-white' : ''}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex-1 p-2 sm:p-3 border-2 transition-all duration-300 rounded-lg border-brand-black hover:bg-brand-black hover:text-white"
                  title="Share"
                >
                  <Share2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-3 sm:pt-4 border-t border-brand-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-brand-gray-600">SKU:</span>
                  <span className="ml-2 font-medium">{product.id}</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Category:</span>
                  <span className="ml-2 font-medium capitalize">{product.category.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Material:</span>
                  <span className="ml-2 font-medium">Premium Cotton</span>
                </div>
                <div>
                  <span className="text-brand-gray-600">Care:</span>
                  <span className="ml-2 font-medium">Machine Washable</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        {showReviews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-premium font-bold text-brand-black">
                  Customer Reviews
                </h2>
                <button
                  onClick={() => setShowReviews(false)}
                  className="p-2 hover:bg-brand-gray-100 rounded-full transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-brand-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-brand-black font-medium">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-black">{review.user}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-brand-gray-500">{review.date}</span>
                        {review.verified && (
                          <div className="text-xs text-green-600 font-medium">✓ Verified Purchase</div>
                        )}
        </div>
      </div>
                    
                    <h5 className="font-semibold text-brand-black mb-2">{review.title}</h5>
                    <p className="text-brand-gray-600">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

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
    </div>
  );
};

export default ProductDetail; 