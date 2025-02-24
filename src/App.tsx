import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Clock, Users, Brain, ArrowRight, X } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import ParticlesBackground from './components/ParticlesBackground';
import Chatbot from './components/Chatbot';
import CursorGlow from './components/CursorGlow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-violet-600" />,
      title: "24/7 Availability",
      description: "Access trusted medical advice and support anytime, anywhere."
    },
    {
      icon: <Users className="w-6 h-6 text-violet-600" />,
      title: "Real Doctors",
      description: "Backed by experienced healthcare professionals for reliable guidance."
    },
    {
      icon: <Brain className="w-6 h-6 text-violet-600" />,
      title: "AI-Powered",
      description: "Advanced AI technology for quick, accurate medical assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      <CursorGlow />
      <ParticlesBackground />
      <AnimatedBackground />
      
      {/* Content wrapper with proper z-index */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img src="https://i.imgur.com/RqUtrRX.png" alt="MediSync Logo" className="h-12 w-12" />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 bg-clip-text text-transparent">MediSync</span>
            </motion.div>
            <nav>
              <ul className="flex items-center gap-8">
                <li>
                  <motion.a 
                    href="#features" 
                    className="text-gray-600 hover:text-violet-600 transition-colors button-hover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Features
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#about" 
                    className="text-gray-600 hover:text-violet-600 transition-colors button-hover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    About
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#contact" 
                    className="text-gray-600 hover:text-violet-600 transition-colors button-hover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Contact
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="https://x.com/Medisync_AI" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-violet-600 transition-colors button-hover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    X (Twitter)
                  </motion.a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-6xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 bg-clip-text text-transparent mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              The Future of Healthcare is Here
            </motion.h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Available 24/7 to provide trusted advice and support, just a message away. Whether it's health tips or symptoms you're concerned about, we've got you covered.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-violet-600 to-violet-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-violet-700 hover:to-violet-900 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto button-hover"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              ref={featureRef}
              className="grid md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featureInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)"
                  }}
                  className="feature-card bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
                >
                  <motion.div 
                    className="bg-violet-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-violet-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 bg-clip-text text-transparent mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Revolutionizing Healthcare with AI
              </motion.h2>
              <p className="text-gray-600 mb-12 leading-relaxed">
                With AI transforming industries, healthcare is next in line. From early disease detection to personalized treatment, MediSync is here to revolutionize the way you access medical care—smarter, faster, and always available.
              </p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://x.com/Medisync_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-violet-600 to-violet-800 text-white px-6 py-3 rounded-xl hover:from-violet-700 hover:to-violet-900 transition-all shadow-lg hover:shadow-xl button-hover"
                >
                  Learn More
                </motion.a>
                <motion.a
                  href="https://x.com/Medisync_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-violet-600 text-violet-600 px-6 py-3 rounded-xl hover:bg-violet-50 transition-all button-hover"
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative overflow-hidden"
            >
              <motion.button
                onClick={() => setIsChatOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-violet-50 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
              <div className="p-6 border-b bg-gradient-to-r from-violet-50 to-violet-100/50">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-violet-600" />
                  <h2 className="text-2xl font-semibold text-violet-900">Chat with MediSync AI</h2>
                </div>
                <p className="text-gray-600 mt-2">
                  Get instant medical guidance and support. Remember, this is an AI assistant and not a replacement for professional medical advice.
                </p>
              </div>
              <div className="h-[500px]">
                <Chatbot />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;