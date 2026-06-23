'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] // Custom snappy easeInOut
            } 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] flex-col"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8102E] opacity-75"></span>
              <div className="relative inline-flex rounded-full h-3 w-3 bg-[#C8102E]"></div>
            </div>
            <h1 className="text-white/60 font-mono text-sm tracking-[0.3em]">
              HYDRASAURUS <span className="text-[#C8102E]">//</span> INITIALIZING...
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
