'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { rosterArray } from '@/data/roster';

const parseSubscribers = (subString: string): number => {
  const clean = subString.toUpperCase().replace('K', '').replace('M', '').replace('+', '').trim();
  const num = parseFloat(clean);
  if (subString.toUpperCase().includes('M')) {
    return num * 1_000_000;
  }
  if (subString.toUpperCase().includes('K')) {
    return num * 1_000;
  }
  return num || 0;
};

export default function DirectoryClient() {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'ALL' | 'KICK' | 'YT_ONLY'>('ALL');
  const [sortOrder, setSortOrder] = useState<'SUBS_DESC' | 'SUBS_ASC' | 'NAME_AZ' | 'NAME_ZA'>('SUBS_DESC');
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

  // Filter & Sort Logic
  const filteredRoster = rosterArray
    .filter((creator) => {
      // 1. Search Filter
      const matchesSearch = creator.name.toLowerCase().includes(search.toLowerCase()) || 
                            creator.youtubeHandle?.toLowerCase().includes(search.toLowerCase());

      // 2. Platform Filter
      if (platformFilter === 'KICK') {
        return matchesSearch && creator.isKickPartner;
      }
      if (platformFilter === 'YT_ONLY') {
        return matchesSearch && !creator.isKickPartner;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      // 3. Sorting
      const aSubs = parseSubscribers(a.youtubeChannelId && liveSubs[a.youtubeChannelId] ? liveSubs[a.youtubeChannelId] : a.subscribers);
      const bSubs = parseSubscribers(b.youtubeChannelId && liveSubs[b.youtubeChannelId] ? liveSubs[b.youtubeChannelId] : b.subscribers);

      if (sortOrder === 'SUBS_DESC') {
        return bSubs - aSubs;
      }
      if (sortOrder === 'SUBS_ASC') {
        return aSubs - bSubs;
      }
      if (sortOrder === 'NAME_AZ') {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === 'NAME_ZA') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-20 relative z-10 max-w-[1600px] mx-auto">
      {/* Title & Description */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-[#c8102e]"></span>
          <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">Active Operations Directory</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4 font-bold">
          CREATOR DIRECTORY
        </h1>
        <p className="font-body-md text-sm text-secondary max-w-xl leading-relaxed">
          Index of all verified creator uplink nodes deployed in the Hydrasaurus global network. Monitor live stats and inspect system dossiers below.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center mb-12 bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm">&gt;</span>
          <input 
            type="text"
            placeholder="FILTER BY CREATOR NAME..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/15 focus:border-[#c8102e] pl-8 pr-4 py-2.5 text-xs text-white focus:outline-none transition-colors uppercase tracking-widest font-label-caps"
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Platform Filters */}
          <div className="flex border border-white/10 rounded-lg overflow-hidden bg-void-black">
            <button 
              onClick={() => setPlatformFilter('ALL')}
              className={`px-4 py-2 text-[9px] font-label-caps tracking-widest uppercase transition-colors border-r border-white/10 ${
                platformFilter === 'ALL' ? 'bg-[#c8102e] text-white' : 'text-secondary hover:text-white'
              }`}
            >
              ALL
            </button>
            <button 
              onClick={() => setPlatformFilter('KICK')}
              className={`px-4 py-2 text-[9px] font-label-caps tracking-widest uppercase transition-colors border-r border-white/10 ${
                platformFilter === 'KICK' ? 'bg-[#53FC18] text-black font-bold' : 'text-secondary hover:text-white'
              }`}
            >
              KICK PARTNER
            </button>
            <button 
              onClick={() => setPlatformFilter('YT_ONLY')}
              className={`px-4 py-2 text-[9px] font-label-caps tracking-widest uppercase transition-colors ${
                platformFilter === 'YT_ONLY' ? 'bg-[#c8102e] text-white' : 'text-secondary hover:text-white'
              }`}
            >
              YT ONLY
            </button>
          </div>

          {/* Sort Order */}
          <div className="relative">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-void-black border border-white/10 rounded-lg px-4 py-2 text-[9px] font-label-caps tracking-widest uppercase text-white focus:outline-none cursor-pointer focus:border-[#c8102e]"
            >
              <option value="SUBS_DESC">SUBS: HIGH TO LOW</option>
              <option value="SUBS_ASC">SUBS: LOW TO HIGH</option>
              <option value="NAME_AZ">NAME: A - Z</option>
              <option value="NAME_ZA">NAME: Z - A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roster Grid */}
      {filteredRoster.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRoster.map((creator) => {
            const liveCount = creator.youtubeChannelId ? liveSubs[creator.youtubeChannelId] : null;
            const displaySubs = liveCount || creator.subscribers;

            return (
              <Link 
                key={creator.slug}
                href={`/talent/${creator.slug}`}
                className="group relative bg-white/[0.01] border border-white/5 hover:border-[#c8102e]/30 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between min-h-[180px] shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(200,16,46,0.1)]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-secondary opacity-30 text-[9px] font-label-caps font-bold">// SECURE NODE</span>
                    <span className="flex gap-1.5 items-center">
                      {creator.youtubeUrl && (
                        <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube Active"></span>
                      )}
                      {creator.isKickPartner && creator.kickUrl && (
                        <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                      )}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-bold group-hover:text-[#E3C287] transition-colors uppercase tracking-tight mb-2">
                    {creator.name}
                  </h3>
                  <p className="text-[10px] text-secondary/60 uppercase tracking-widest font-label-caps font-bold mb-4">
                    {displaySubs} Subscribers
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                  <span className="text-[9px] text-[#E3C287] uppercase tracking-wider font-bold">Access Dossier</span>
                  <span className="material-symbols-outlined text-[12px] text-secondary group-hover:text-[#E3C287] group-hover:translate-x-1 transition-all duration-300">
                    arrow_forward
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="border border-[#c8102e]/30 bg-[#c8102e]/5 p-8 rounded-2xl text-center flex flex-col items-center gap-4 justify-center py-16">
          <span className="material-symbols-outlined text-4xl text-[#c8102e] animate-pulse">warning</span>
          <h3 className="font-label-caps text-xs text-white uppercase tracking-widest font-bold">
            No Network Nodes Matched Your Query
          </h3>
          <p className="text-[10px] text-secondary uppercase max-w-xs leading-relaxed">
            Ensure your spelling matches official roster entities or switch platform filter bounds.
          </p>
        </div>
      )}
    </main>
  );
}
