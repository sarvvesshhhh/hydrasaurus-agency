'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { rosterArray } from '@/data/roster';

interface RosterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const parseSubscribers = (subString: string): number => {
  const clean = subString.toUpperCase().replace('K', '').replace('M', '');
  const num = parseFloat(clean);
  if (subString.toUpperCase().includes('M')) {
    return num * 1_000_000;
  }
  if (subString.toUpperCase().includes('K')) {
    return num * 1_000;
  }
  return num || 0;
};

const sortedRoster = [...rosterArray].sort((a, b) => {
  return parseSubscribers(b.subscribers) - parseSubscribers(a.subscribers);
});

export default function RosterSidebar({ isOpen, onClose }: RosterSidebarProps) {
  const [liveSubs, setLiveSubs] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchLiveSubs() {
      try {
        const res = await fetch('/api/youtube-subs');
        if (res.ok) {
          const data = await res.json();
          setLiveSubs(data);
        }
      } catch (err) {
        console.error("Failed to load live subscribers:", err);
      }
    }
    fetchLiveSubs();
  }, []);

  return (
    <aside 
      className={`fixed right-0 top-0 bottom-0 w-[400px] max-w-full bg-void-black/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col font-label-caps transition-transform duration-500 ease-[cubic-bezier(0.8,0,0.2,1)] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} 
      id="roster-sidebar"
    >
      <div className="px-8 py-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
        <h3 className="text-[10px] text-white uppercase tracking-widest flex items-center gap-3 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> 
          HYDRASAURUS NETWORK
        </h3>
        <button 
          onClick={onClose}
          className="text-secondary hover:text-[#c8102e] transition-colors flex items-center justify-center p-2 cursor-pointer bg-transparent" 
          id="close-sidebar"
          aria-label="Close Roster Sidebar"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto roster-scroll px-8 py-8 flex flex-col gap-12">
        {/* Command Staff */}
        <div>
          <h4 className="text-[10px] text-[#c8102e] uppercase tracking-widest mb-6 border-b border-white/10 pb-2 font-bold">// COMMAND STAFF</h4>
          <div className="flex flex-col gap-6">
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Sarvesh Shinde
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Founder & CEO</div>
            </div>
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Rohit Badhe
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Co-Founder</div>
            </div>
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Sushant Nanaware
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Head Manager</div>
            </div>
          </div>
        </div>

        {/* Hydrasaurus Roster / Active Roster */}
        <div>
          <h4 className="text-[10px] text-[#c8102e] uppercase tracking-widest mb-6 border-b border-white/10 pb-2 font-bold">// HYDRASAURUS ROSTER</h4>
          <div className="flex flex-col gap-4">
            {sortedRoster.map((creator) => {
              const liveCount = creator.youtubeChannelId ? liveSubs[creator.youtubeChannelId] : null;
              const displaySubs = liveCount || creator.subscribers;

              return (
                <div 
                  key={creator.slug}
                  className="group flex items-baseline justify-between border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors"
                >
                  <Link 
                    href={`/talent/${creator.slug}`}
                    onClick={onClose}
                    className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-secondary opacity-50 text-xs">-</span> {creator.name}
                  </Link>
                  <div className="text-[9px] text-secondary flex items-center gap-2.5">
                    <Link
                      href={`/talent/${creator.slug}`}
                      onClick={onClose}
                      className="hover:text-white transition-colors cursor-pointer mr-1"
                    >
                      {displaySubs} Subs
                    </Link>
                    <span className="flex gap-1.5 items-center">
                      {creator.youtubeUrl && (
                        <a 
                          href={creator.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2 h-2 bg-[#c8102e] rounded-sm hover:scale-125 hover:bg-[#ff0000] hover:shadow-[0_0_8px_rgba(255,0,0,0.8)] transition-all duration-300 inline-block cursor-pointer"
                          title="Open YouTube Channel"
                        ></a>
                      )}
                      {creator.isKickPartner && creator.kickUrl && (
                        <a 
                          href={creator.kickUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2 h-2 bg-[#53FC18] rounded-sm hover:scale-125 hover:bg-[#53fc18] hover:shadow-[0_0_8px_rgba(83,252,24,0.8)] transition-all duration-300 inline-block cursor-pointer"
                          title="Open Kick Profile"
                        ></a>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-white/10 bg-void-black">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-secondary uppercase tracking-widest">Uplink Status: Secure</span>
          <span className="w-2 h-2 bg-[#c8102e] animate-pulse rounded-none"></span>
        </div>
      </div>
    </aside>
  );
}
