'use client';

import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020202] pointer-events-none">
      
      {/* Deep Crimson Red Orb */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[150px] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(200, 16, 46, 0.3) 0%, rgba(200, 16, 46, 0) 70%)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 50, 150, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dark Violet / Charcoal Orb */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[200px] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(45, 20, 60, 0.4) 0%, rgba(20, 20, 25, 0) 70%)',
          bottom: '-20%',
          right: '-10%',
        }}
        animate={{
          x: [0, -150, 50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Deep Oceanic Blue / Grey Orb */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] rounded-full blur-[150px] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(15, 40, 60, 0.35) 0%, rgba(10, 20, 30, 0) 70%)',
          top: '30%',
          left: '40%',
        }}
        animate={{
          x: [0, 80, -100, 0],
          y: [0, -80, 100, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}
