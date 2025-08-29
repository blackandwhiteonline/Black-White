import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  // Intersection observer for animations
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-premium font-bold text-brand-black mb-6"
            >
              About Black&White
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-brand-gray-600 max-w-3xl mx-auto"
            >
              We are passionate about creating timeless fashion that celebrates the elegance of black and white, 
              blending traditional Indian craftsmanship with contemporary design.
            </motion.p>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl lg:text-4xl font-premium font-bold text-brand-black mb-6"
              >
                Our Mission
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-brand-gray-600 mb-6"
              >
                At Black&White, we believe in the power of simplicity and elegance. Our mission is to provide 
                premium quality clothing that transcends trends and celebrates the timeless beauty of monochromatic fashion.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-brand-gray-600 mb-6"
              >
                We source the finest materials and work with skilled artisans to create pieces that not only look 
                beautiful but also feel comfortable and last for years to come.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-brand-gray-600"
              >
                Every garment tells a story of craftsmanship, tradition, and modern sensibility - a perfect blend 
                that defines the Black&White experience.
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop" 
                  alt="Crafting Excellence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-brand-white p-8">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={missionInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-2xl font-premium font-bold mb-4"
                    >
                      Crafting Excellence
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={missionInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-brand-gray-200"
                    >
                      Every piece is carefully crafted with attention to detail and quality that speaks for itself.
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '10K+', label: 'Happy Customers', icon: Users },
              { number: '500+', label: 'Products', icon: Award },
              { number: '98%', label: 'Satisfaction Rate', icon: Heart },
              { number: '24/7', label: 'Support', icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.1}}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon size={40} className="text-brand-black" />
                </div>
                <div className="text-3xl font-bold text-brand-black mb-2">{stat.number}</div>
                <div className="text-brand-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-premium font-bold text-brand-black mb-6">
              Our Values
            </h2>
            <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Black&White
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Quality",
                description: "We never compromise on quality. Every piece meets our high standards of craftsmanship and materials."
              },
              {
                icon: Heart,
                title: "Passion",
                description: "Our love for fashion drives us to create pieces that inspire confidence and elegance."
              },
              {
                icon: Users,
                title: "Community",
                description: "We celebrate diversity and create clothing that makes everyone feel beautiful and confident."
              },
              {
                icon: Shield,
                title: "Integrity",
                description: "We operate with transparency and honesty in all our business practices and relationships."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 card-premium hover-lift"
              >
                <div className="w-16 h-16 bg-brand-black text-brand-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-brand-black mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" 
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-brand-white p-8">
                    <h3 className="text-2xl font-premium font-bold mb-4">
                      Our Story
                    </h3>
                    <p className="text-brand-gray-200">
                      Founded in 2024, Black&White began with a simple vision: to create clothing that celebrates 
                      the timeless elegance of black and white fashion.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-premium font-bold text-brand-black mb-6">
                The Black&White Story
              </h2>
              <div className="space-y-4 text-lg text-brand-gray-600">
                <p>
                  What started as a small boutique in Mumbai has grown into a beloved brand that celebrates 
                  the beauty of monochromatic fashion. Our journey has been driven by a deep appreciation 
                  for both traditional Indian craftsmanship and contemporary design.
                </p>
                <p>
                  We believe that black and white are not just colors - they are statements of elegance, 
                  sophistication, and timeless style. Every piece in our collection is designed to make 
                  you feel confident, beautiful, and uniquely you.
                </p>
                <p>
                  Today, we continue to innovate while staying true to our roots, creating clothing that 
                  bridges the gap between tradition and modernity, comfort and style.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-premium p-12"
          >
            <h2 className="text-3xl lg:text-4xl font-premium font-bold text-brand-black mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-brand-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about our products or want to learn more about Black&White? 
              We'd love to hear from you.
            </p>
            <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="btn-primary text-lg px-8 py-4"
            >
              Contact Us
            </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About; 