import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  // State for newsletter subscription
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // Context hook
  const { subscribeNewsletter } = useAuth();

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      await subscribeNewsletter(email);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Footer sections data
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: "Men's Traditional", path: '/shop?category=mens-traditional' },
        { name: "Women's Traditional", path: '/shop?category=womens-traditional' },
        { name: "Men's Western", path: '/shop?category=mens-western' },
        { name: "Women's Western", path: '/shop?category=womens-western' },
        { name: 'Accessories', path: '/shop?category=accessories' },
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Sustainability', path: '/sustainability' },
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-brand-black text-brand-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-premium font-bold mb-4">
                Black&White
              </h3>
              <p className="text-brand-gray-300 mb-6 max-w-md">
                Premium clothing store specializing in black and white fashion for men and women. 
                Discover elegant, timeless pieces that define your style.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-brand-gray-400" />
                  <span className="text-brand-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-brand-gray-400" />
                  <span className="text-brand-gray-300">info@blackwhiteclothing.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-brand-gray-400" />
                  <span className="text-brand-gray-300">Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-brand-gray-300 hover:text-brand-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-brand-gray-800"
        >
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h4>
            <p className="text-brand-gray-300 mb-4 text-sm">
              Get updates about new collections, exclusive offers, and fashion tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-brand-gray-800 border border-brand-gray-700 text-brand-white placeholder-brand-gray-400 focus:outline-none focus:border-brand-white transition-colors duration-300"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 bg-brand-white text-brand-black font-medium hover:bg-brand-gray-100 transition-colors duration-300 disabled:opacity-50"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-brand-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-brand-gray-400 text-sm">
              © 2024 Black&White. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-brand-gray-400 hover:text-brand-white transition-colors duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 text-brand-gray-400 text-sm">
              <span>Secure payments:</span>
              <div className="flex items-center space-x-1">
                <span className="px-2 py-1 bg-brand-gray-800 rounded text-xs">Visa</span>
                <span className="px-2 py-1 bg-brand-gray-800 rounded text-xs">Mastercard</span>
                <span className="px-2 py-1 bg-brand-gray-800 rounded text-xs">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 