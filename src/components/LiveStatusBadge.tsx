'use client'
import { useState, useEffect } from 'react';

interface LiveStatusBadgeProps {
  kickUrl?: string;
  ytChannelId?: string;
  youtubeUrl?: string;
}

export default function LiveStatusBadge({ kickUrl, ytChannelId, youtubeUrl }: LiveStatusBadgeProps) {
  const [status, setStatus] = useState({ youtube: false });

  useEffect(() => {
    if (!ytChannelId) return;

    const fetchStatus = async () => {
      try {
        const params = new URLSearchParams();
        if (ytChannelId) params.append('channelId', ytChannelId);

        const res = await fetch(`/api/status?${params.toString()}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        
        setStatus({ youtube: data.isLive });
      } catch (e) {
        console.error('Failed to fetch status', e);
      }
    };

    fetchStatus();
    // Poll the API every 5 seconds for real-time updates
    const interval = setInterval(fetchStatus, 5000); 
    return () => clearInterval(interval);
  }, [ytChannelId]);

  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      {/* YouTube Dynamic Badge */}
      {status.youtube ? (
        <a 
          href={youtubeUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            if (!youtubeUrl) e.preventDefault();
          }}
          className={`flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm transition-all duration-300 ${youtubeUrl ? 'hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:scale-105' : ''} group`}
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75"></span>
            <div className="relative rounded-full h-2 w-2 bg-[#FF0000]"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF0000]">
            Live on YouTube
          </span>
        </a>
      ) : (
        <a 
          href={youtubeUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            if (!youtubeUrl) e.preventDefault();
          }}
          className={`flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm opacity-60 grayscale transition-all duration-300 ${youtubeUrl ? 'hover:opacity-100 hover:grayscale-0 hover:border-white/20 hover:scale-105' : ''}`}
        >
          <div className="relative flex h-2 w-2">
            <div className="relative rounded-full h-2 w-2 bg-gray-500"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Offline
          </span>
        </a>
      )}

      {/* Kick Static Call-to-Action */}
      {kickUrl && (
        <a 
          href={kickUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#53FC18]/50 hover:bg-[#53FC18]/10 hover:shadow-[0_0_15px_rgba(83,252,24,0.2)] group"
        >
          <div className="relative flex h-2 w-2">
            <div className="relative rounded-full h-2 w-2 bg-[#53FC18] group-hover:scale-110 transition-transform duration-300"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-[#53FC18] transition-colors duration-300">
            Watch on Kick
          </span>
        </a>
      )}
    </div>
  );
}
