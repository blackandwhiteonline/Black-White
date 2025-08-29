import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create cart context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  // State for cart items
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('blackwhite_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('blackwhite_cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('blackwhite_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1, size = 'M', color = 'Black') => {
    try {
      const existingItemIndex = cartItems.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += quantity;
        setCartItems(updatedCart);
        // Don't show toast for quantity updates to avoid duplicate notifications
      } else {
        // Add new item to cart
        const newItem = {
          ...product,
          quantity,
          size,
          color,
          cartId: `${product.id}-${size}-${color}`,
        };
        setCartItems([...cartItems, newItem]);
        toast.success(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  // Remove item from cart
  const removeFromCart = (cartId) => {
    try {
      const updatedCart = cartItems.filter(item => item.cartId !== cartId);
      setCartItems(updatedCart);
      toast.success('Item removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart. Please try again.');
    }
  };

  // Update item quantity
  const updateQuantity = (cartId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(cartId);
        return;
      }

      const updatedCart = cartItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity. Please try again.');
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared!');
  };

  // Calculate cart totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Process checkout
  const processCheckout = async (paymentData) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual backend integration
      // TODO: Replace with actual checkout API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
      const orderId = `ORD-${timestamp}-${randomString}`;
      
      // Extract customer info from form data
      const customerInfo = {
        firstName: paymentData.firstName,
        lastName: paymentData.lastName,
        email: paymentData.email,
        phone: paymentData.phone
      };
      
      // Create shipping address
      const shippingAddress = {
        name: `${paymentData.firstName} ${paymentData.lastName}`,
        street: paymentData.address,
        city: paymentData.city,
        state: paymentData.state,
        zipCode: paymentData.pincode,
        country: 'India'
      };
      
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        status: 'Processing',
        items: cartItems,
        subtotal: getCartTotal(),
        shipping: paymentData.shipping || 0,
        discount: paymentData.discount || 0,
        tax: 0, // Can be calculated based on location
        total: paymentData.total || getCartTotal(),
        paymentMethod: paymentData.paymentMethod,
        customerInfo,
        shippingAddress,
        billingAddress: shippingAddress, // Using same as shipping for now
        shippingMethod: 'Standard Shipping',
        carrier: 'Standard Delivery',
        trackingNumber: null,
        paymentStatus: paymentData.paymentMethod === 'cod' ? 'Pending' : 'Paid'
      };
      
      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('blackwhite_orders') || '[]');
      existingOrders.unshift(order); // Add new order at the beginning
      localStorage.setItem('blackwhite_orders', JSON.stringify(existingOrders));
      
      // Clear cart after successful checkout
      setCartItems([]);
      
      toast.success('Order placed successfully!');
      return { success: true, orderId };
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Checkout failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Apply discount code
  const applyDiscount = async (discountCode) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual backend integration
      // TODO: Replace with actual discount validation API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock discount validation
      const validDiscounts = {
        'WELCOME10': 10,
        'BLACKWHITE20': 20,
        'PREMIUM15': 15,
      };
      
      if (validDiscounts[discountCode]) {
        toast.success(`Discount applied! ${validDiscounts[discountCode]}% off`);
        return { success: true, discount: validDiscounts[discountCode] };
      } else {
        toast.error('Invalid discount code');
        return { success: false, error: 'Invalid discount code' };
      }
    } catch (error) {
      console.error('Discount application error:', error);
      toast.error('Failed to apply discount. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    processCheckout,
    applyDiscount,
    isCartEmpty: cartItems.length === 0,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 