'use client';

import { motion } from 'framer-motion';

export default function InfiniteMarquee() {
  const pillars = [
    "ESPORTS MANAGEMENT",
    "BRAND INTEGRATION",
    "IMMERSIVE STORYTELLING",
    "CONTENT STRATEGY"
  ];

  const marqueeContent = Array(10).fill(pillars).flat();

  return (
    <div className="relative w-full overflow-hidden bg-[#C8102E] py-4 -rotate-2 scale-110 my-24 z-20 border-y border-white/20 shadow-[0_0_50px_rgba(200,16,46,0.2)]">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {marqueeContent.map((text, index) => (
            <div key={index} className="flex items-center mx-4">
              <span className="text-[#E3C287] font-black text-2xl md:text-4xl tracking-tighter uppercase italic">
                {text}
              </span>
              <span className="mx-8 text-black font-black text-2xl md:text-4xl opacity-40">
                //
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
