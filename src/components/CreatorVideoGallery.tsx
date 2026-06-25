'use client';

import React, { useState } from 'react';

export interface YoutubeVideoDetails {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
}

interface CreatorVideoGalleryProps {
  videos: YoutubeVideoDetails[];
  fallbackVideoId?: string;
  creatorName: string;
}

export default function CreatorVideoGallery({ videos, fallbackVideoId = "5Db8P7EBLP8", creatorName }: CreatorVideoGalleryProps) {
  const [activeVideoId, setActiveVideoId] = useState<string>(
    videos.length > 0 ? videos[0].videoId : fallbackVideoId
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-12 bg-[#C8102E]/40"></div>
        <span className="text-[#C8102E] text-[11px] font-bold tracking-[0.25em] uppercase">Broadcast Uplink / Recent Content</span>
      </div>

      {/* Main Spotlight Player */}
      <div className="w-full aspect-video bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(200,16,46,0.15)] relative">
        <iframe
          src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
          className="w-full h-full block"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={`${creatorName} Highlight Reel`}
        />
      </div>

      {/* Thumbnails Roster Grid */}
      {videos.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="text-secondary/50 text-[9px] uppercase tracking-widest font-mono select-none">// CHOOSE RECENT BROADCAST FEED</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {videos.map((vid) => {
              const isActive = activeVideoId === vid.videoId;
              return (
                <div
                  key={vid.videoId}
                  onClick={() => setActiveVideoId(vid.videoId)}
                  className={`cursor-pointer bg-[#0A0A0A] border rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col select-none ${
                    isActive
                      ? 'border-[#C8102E] shadow-[0_0_15px_rgba(200,16,46,0.25)] scale-[1.02]'
                      : 'border-white/5 hover:border-white/25'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center z-10 ${isActive ? 'bg-transparent' : ''}`}>
                      <div className="w-8 h-8 rounded-full bg-[#C8102E]/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-white text-base">play_arrow</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between gap-2">
                    <h4 className="text-[10px] text-white font-bold line-clamp-2 leading-snug uppercase font-mono">
                      {vid.title}
                    </h4>
                    <span className="text-[8px] text-secondary/60 font-mono block">
                      {formatDate(vid.publishedAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
