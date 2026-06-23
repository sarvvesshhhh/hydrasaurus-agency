'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveStatusBadge from '@/components/LiveStatusBadge';
import { Creator } from '@/data/roster';

interface CreatorCardProps {
  creator: Creator;
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax logic for the background image
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  // Move background slightly up/down (deep space effect)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={cardRef}
      onClick={() => router.push(`/talent/${creator.slug}`)} 
      className="creator-card magnetic block h-full rounded-[2rem] overflow-hidden relative border border-white/5 bg-[#050505] group hover:scale-[1.02] hover:border-white/10 transition-all duration-500 cursor-none"
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y, scale: 1.15 }}
      >
        {creator.hoverVideo && (
          <video
            src={creator.hoverVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
        
        {creator.image ? (
          <Image
            src={creator.image}
            alt={creator.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center opacity-40 group-hover:opacity-0 transition-opacity duration-700 relative z-10"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#C8102E] opacity-15 group-hover:opacity-0 transition-opacity duration-700 relative z-10" />
        )}
      </motion.div>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <LiveStatusBadge 
            kickUrl={creator.kickUrl} 
            ytChannelId={creator.youtubeChannelId} 
            youtubeUrl={creator.youtubeUrl}
          />
        </div>

        <h2 className="text-4xl font-black mb-3 tracking-tight text-white group-hover:text-[#E3C287] transition-colors duration-500">{creator.name}</h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-[95%] font-medium line-clamp-3">
          {creator.bio || creator.role}
        </p>
      </div>
    </div>
  );
}
