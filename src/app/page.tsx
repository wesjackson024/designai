'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const prompts = [
    { text: "Design a modern landing page with gradient background", response: "Creating a sleek landing page with vibrant gradients..." },
    { text: "Add a hero section with animated CTA", response: "Designing an eye-catching hero section..." },
    { text: "Make it mobile responsive", response: "Optimizing layout for all devices..." }
  ];

  useEffect(() => {
    setIsVisible(true);
    animateText();
  }, []);

  const animateText = async () => {
    while (true) {
      // Start typing prompt
      setIsTyping(true);
      setShowResponse(false);
      const prompt = prompts[currentPrompt].text;
      for (let i = 0; i <= prompt.length; i++) {
        setCurrentText(prompt.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsTyping(false);
      setShowResponse(true);
      
      // Wait before showing next prompt
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center p-4"
      >
        <div className="flex items-center space-x-2">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg"
          ></motion.div>
          <span className="font-bold">DesignAI</span>
        </div>
        <div className="flex space-x-6">
          <button className="text-gray-300 hover:text-white transition-colors">Support</button>
          <button className="text-gray-300 hover:text-white transition-colors">Blog</button>
          <button className="text-gray-300 hover:text-white transition-colors">Learn</button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100"
          >
            Sign up
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
          className="w-16 h-16 mb-8 relative"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 180, 360],
              borderRadius: ["20%", "50%", "20%"]
            }}
            transition={{ 
              duration: 3,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500"
          ></motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-center mb-4">
            Idea to design in seconds.
          </h1>
          <p className="text-xl text-gray-400 text-center mb-8">
            DesignAI is your superhuman design assistant. Start for free today.
          </p>
        </motion.div>

        {/* Interactive Demo Box */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 mb-16"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
              <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
              <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
            </div>
          </div>
          <motion.div 
            className="h-64 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 blur-xl"
            />
            
            <div className="w-full max-w-lg z-10">
              {/* Command Input */}
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">→</span>
                  <motion.div 
                    className="text-gray-200 font-mono"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                  >
                    {currentText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-gray-400 ml-1"
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Response */}
              <AnimatePresence>
                {showResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gray-900/30 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-3 mt-1"
                      />
                      <span className="text-blue-400">{prompts[currentPrompt].response}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl"
          >
            <p className="text-lg mb-4">"Never seen anything like this. The designs it creates are absolutely mind-blowing! 🚀"</p>
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
              ></motion.div>
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-gray-400">Senior Designer, Figma</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl"
          >
            <p className="text-lg mb-4">"This is pure magic! Transformed our design workflow completely. 10/10 would recommend! ✨"</p>
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full"
              ></motion.div>
              <div>
                <p className="font-semibold">Alex Rivera</p>
                <p className="text-sm text-gray-400">Design Lead, Adobe</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 