import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  // State management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Intersection observer for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Show success message (you can use toast here)
      alert('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      link: "tel:+919876543210"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@blackwhiteclothing.com", "support@blackwhiteclothing.com"],
      link: "mailto:info@blackwhiteclothing.com"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Fashion Street", "Mumbai, Maharashtra 400001", "India"],
      link: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: Closed"],
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-brand-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-8">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop" 
                  alt="Contact Us"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-brand-white">
                    <h1 className="text-4xl lg:text-6xl font-premium font-bold mb-6">
                      Get in Touch
                    </h1>
                    <p className="text-xl text-brand-gray-200 max-w-3xl mx-auto">
                      Have questions about our products or need assistance? We're here to help. 
                      Reach out to us and we'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="card-premium p-8">
              <h2 className="text-2xl font-premium font-bold text-brand-black mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-premium"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
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
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-black mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input-premium"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input-premium resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="mr-2" size={20} />
                      Send Message
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-black text-brand-white rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-brand-black mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-brand-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {info.link && (
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-brand-black hover:text-brand-gray-600 transition-colors duration-300 text-sm font-medium mt-2 inline-block"
                      >
                        Contact via {info.title.toLowerCase()}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-premium p-8"
          >
            <h2 className="text-2xl font-premium font-bold text-brand-black mb-6 text-center">
              Visit Our Store
            </h2>
            
            <div className="aspect-video bg-gradient-to-br from-brand-gray-100 to-brand-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-brand-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-brand-black mb-2">
                  Black&White Store
                </h3>
                <p className="text-brand-gray-600 mb-4">
                  123 Fashion Street, Mumbai, Maharashtra 400001, India
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Get Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-premium p-8"
          >
            <h2 className="text-2xl font-premium font-bold text-brand-black mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "What are your shipping options?",
                  answer: "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Free shipping on orders above ₹5,000."
                },
                {
                  question: "Do you offer international shipping?",
                  answer: "Currently, we ship within India only. We're working on expanding our international shipping options."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for all unused items in their original packaging. Return shipping is free for defective items."
                },
                {
                  question: "How can I track my order?",
                  answer: "You'll receive a tracking number via email once your order ships. You can also track your order in your account dashboard."
                },
                {
                  question: "Do you have a physical store?",
                  answer: "Yes! Visit us at 123 Fashion Street, Mumbai. We're open Monday to Friday 9 AM - 8 PM, Saturday 10 AM - 6 PM."
                },
                {
                  question: "Can I customize my order?",
                  answer: "We offer basic customization options for certain products. Contact us for specific customization requests."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 border border-brand-gray-200 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-brand-black mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-brand-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Contact; 