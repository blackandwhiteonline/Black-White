import React from 'react';
import { Heart, ShoppingBag, Trash2, X, Star, Share2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();

  // Handle move to cart
  const handleMoveToCart = (product) => {
    moveToCart(product.id, addToCart);
    // Toast is handled by WishlistContext
  };

  // Handle view details (same as shop/home pages)
  const handleViewDetails = (product) => {
    window.location.href = `/#/product/${product.id}`;
    toast.success('Please check your measurements on the product page!', { duration: 3000, icon: '📏' });
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product.id);
    // Toast is handled by WishlistContext
  };

  // Handle clear wishlist
  const handleClearWishlist = () => {
    clearWishlist();
    // Toast is handled by WishlistContext
  };

  const handleShareWishlist = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My Wishlist', text: 'Check out my wishlist on Black & White', url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Wishlist link copied to clipboard');
      }
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
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
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShareWishlist}
                  className="btn-secondary flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="btn-secondary flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Trash2 size={20} />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        <div>
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
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
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((product, index) => (
                <div
                  key={product.id}
                  className="group"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="product-card bg-white border border-brand-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={product.images?.[0] || 'https://via.placeholder.com/200x200?text=No+Image'}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Enhanced Overlay Actions */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(product);
                            }}
                            className="p-3 bg-white text-brand-black rounded-full hover:bg-brand-gray-100 transition-all duration-300 shadow-lg hover:scale-110"
                            title="View Details"
                          >
                            <ShoppingBag size={20} />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleRemoveFromWishlist(product);
                            }}
                            className="p-3 bg-white text-brand-black rounded-full hover:bg-red-100 transition-all duration-300 shadow-lg hover:scale-110"
                            title="Remove from Wishlist"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {/* Enhanced Discount Badge */}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-3 left-3 bg-brand-black text-white px-2 py-1 text-xs font-bold rounded-lg">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col"> 
                        <h3 className="text-base font-semibold text-brand-black mb-2 line-clamp-2 hover:text-brand-gray-700 transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-brand-gray-500">
                            ({product.reviews || 0})
                          </span>
                        </div>

                        <p className="text-sm text-brand-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-brand-black">
                              ₹{product.price?.toLocaleString() || '0'}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-brand-gray-500 line-through">
                                ₹{product.originalPrice?.toLocaleString() || '0'}
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(product);
                            }}
                            className="bg-brand-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-gray-800 transition-all duration-300 hover:scale-105"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Continue Shopping */}
        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/shop" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 