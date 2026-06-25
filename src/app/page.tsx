'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { rosterArray, rosterData } from '@/data/roster';

const COMMAND_NODES = {
  core: {
    title: "HYDRASAURUS ENTERTAINMENT HUB",
    status: "ONLINE",
    stats: [
      { label: "Exclusive Talent", value: "21 Creators" },
      { label: "Aggregated Views", value: "1.2B+ Views" },
      { label: "Total Reach", value: "460K+ Subscribers" },
      { label: "Broadcast Range", value: "South Asian Region" }
    ],
    logs: [
      "[LIVE] DollyIsLive streaming on YouTube/Kick.",
      "[LIVE] Syncing subscriber counter databases.",
      "[MEDIA] Custom overlays deployed to creators.",
      "[LOGISTICS] New brand campaign routing active."
    ]
  },
  creators: {
    title: "TALENT ROSTER & LIVE TALENT INDEX",
    status: "21/21 ACTIVE",
    stats: [
      { label: "Partnered Creators", value: "21 Exclusive" },
      { label: "Core Genres", value: "Variety, FPS, Gaming" },
      { label: "Stream Output", value: "850+ Hours Monthly" },
      { label: "Network Growth", value: "+18% MoM Average" }
    ],
    logs: [
      "[LIVE] DollyIsLive is streaming (YouTube & Kick).",
      "[LIVE] WhyisSelena broadcast session active.",
      "[ROSTER] BacKFire highlight packages delivered.",
      "[STANDBY] 8 creator broadcast streams queued."
    ]
  },
  brands: {
    title: "BRAND CAMPAIGNS & SPONSORS",
    status: "DEPLOYED",
    stats: [
      { label: "Active Sponsors", value: "14 Premium Brands" },
      { label: "Live Campaigns", value: "8 Active Runs" },
      { label: "Target Audience", value: "Gen Z & Millennial Gamers" },
      { label: "Average Campaign ROI", value: "3.4x over baseline" }
    ],
    logs: [
      "[CAMPAIGN] Direct sponsorship asset packages delivered.",
      "[INTEGRATION] Pre-roll overlay configured on live stream.",
      "[REPORT] Viewership conversion metrics verified."
    ]
  },
  platforms: {
    title: "BROADCAST PLATFORMS UPLINK",
    status: "ONLINE",
    stats: [
      { label: "Platform Ingestion", value: "YouTube Gaming & Kick Live" },
      { label: "Encoding Quality", value: "1080p 60FPS Standard" },
      { label: "Chat Ingestion", value: "Sub-Second Syncing" }
    ],
    logs: [
      "[SYNC] YouTube live subscriber counter synced.",
      "[SYNC] Kick chat webhook triggers secured.",
      "[UPLINK] Stream server encoding pipeline stable."
    ]
  },
  monetization: {
    title: "MONETIZATION ENGINE (SYS.02)",
    status: "ACTIVE",
    stats: [
      { label: "Revenue Vectors", value: "Ads, Sponsorships, Merch" },
      { label: "Talent Yield Increase", value: "2.8x Average Coef" },
      { label: "Exclusive Creator IPs", value: "3 Projects Underway" }
    ],
    logs: [
      "[REVENUE] Brand deal payouts cleared for talent.",
      "[MERCH] E-commerce storefront setups synchronized.",
      "[IP] Digital product line designs verified."
    ]
  },
  operations: {
    title: "STREAM OPERATIONS & BROADCAST DESIGN",
    status: "STABLE",
    stats: [
      { label: "Deployed Overlays", value: "3D HUD & Alert Packs" },
      { label: "Production Grade", value: "Studio Broadcasting" },
      { label: "Audio Output", value: "Dolby Stream Stereo" }
    ],
    logs: [
      "[ASSETS] Custom stream overlay packages active.",
      "[HUD] Interactive stream widgets rendering successfully.",
      "[AUDIO] Stream audio mixing parameters aligned."
    ]
  },
  representation: {
    title: "TALENT REPRESENTATION (SYS.01)",
    status: "MAXIMUM ALLOCATION",
    stats: [
      { label: "Contract Integrity", value: "100% Vetted & Protected" },
      { label: "Priority Partners", value: "YouTube & Kick Direct Channels" },
      { label: "Legal Coverage", value: "Full IP Rights Protection" }
    ],
    logs: [
      "[PARTNER] Tier-1 verified status secured for new signee.",
      "[CONTRACT] Premium negotiation points successfully executed.",
      "[LEGAL] Creator IP rights registration complete."
    ]
  },
  logistics: {
    title: "TALENT LOGISTICS & MERCHANDISING",
    status: "STANDBY",
    stats: [
      { label: "Creator Stores", value: "5 Official Storefronts" },
      { label: "Fulfillment Rate", value: "100% Global Delivery" },
      { label: "Distribution Hubs", value: "3 Regional Hubs" }
    ],
    logs: [
      "[FULFILLMENT] Creator merch dispatch complete.",
      "[INVENTORY] Stock levels synced with storefront ledger.",
      "[SHIPPING] Global shipping channels operational."
    ]
  },
  analytics: {
    title: "AUDIENCE INSIGHTS & ANALYTICS",
    status: "ACTIVE",
    stats: [
      { label: "Monitored Viewers", value: "460K+ Endpoints" },
      { label: "Audience Sync", value: "Real-Time Viewers Tracking" },
      { label: "Interest Niche", value: "94% Gaming & Variety Culture" }
    ],
    logs: [
      "[ANALYTICS] Audience conversion indexing complete.",
      "[METRIC] Viewership statistics parsed successfully.",
      "[REPORT] Monthly creator growth overview generated."
    ]
  }
};

export default function Home() {
  const [portfolioStats, setPortfolioStats] = useState<Record<string, { avatarUrl?: string; subscribers?: string }>>({});
  const [liveSubs, setLiveSubs] = useState<Record<string, string>>({});
  const [activeNode, setActiveNode] = useState<string>('core');

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          setPortfolioStats(data);
        }
      } catch (err) {
        console.error("Failed to load portfolio stats:", err);
      }
    }
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
    loadPortfolio();
    fetchLiveSubs();
  }, []);

  const handleAccessDirectory = () => {
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terminal uplink secured. Dossier transmitted successfully.');
  };

  return (
    <main className="flex-grow pt-16">
      {/* Hero Section */}
      <section className="relative px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center max-w-[1600px] mx-auto min-h-[90vh] overflow-hidden">
        {/* Massive Dragon Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] md:w-[1800px] md:h-[1800px] opacity-[0.05] pointer-events-none z-0">
          <img 
            alt="Hydrasaurus Dragon" 
            className="w-full h-full object-contain filter grayscale" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB18KCfbGKIbk6SAyUD8pKeJfWOD76AxoLT1TNsUgEKbjVgIRU-9wqiAb9k3qm51miY-vnD0ctCebPujQ7pCSm1myeEg7xWYHqM9-1ufUNoaI5i3tfz8VQFtExpQZibwIqQxwshFJlWM3CAQmdVNFAgiDicnEL-i5PjgNaa7XYoF5R3ohw5Ag6ihaeA0_f9TGc9u6oKD8CYM4RuE1ePIXpbeT_D3RdsNFymGK5Ov9mPGQ-o_CyI4AmBBLoxXYHQgEMaqwco79J7fph9"
          />
          <div className="dragon-eye-glow"></div>
        </div>
        <div className="mb-12 max-w-[90rem] relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">Global Infrastructure</span>
          </div>
          <h1 className="font-display-lg text-6xl md:text-[100px] lg:text-[140px] leading-[0.85] mb-12 font-bold uppercase text-white tracking-tighter">
            WE DON'T<br/>
            <span className="text-secondary">MANAGE TALENT.</span><br/>
            <span className="text-white">WE BUILD DIGITAL</span><br/>
            <span className="text-[#c8102e]">EMPIRES.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mt-24 border-t border-white/10 pt-12">
            <p className="font-body-md text-sm md:text-base text-secondary max-w-md leading-relaxed">
              We operate at the highest tier of the digital economy, providing elite representation, technical infrastructure, and commercial routing for the top 1% of variety creators. No compromises.
            </p>
            <div className="flex justify-start md:justify-end">
              <button className="font-label-caps text-[10px] border-b border-white pb-2 hover:text-[#c8102e] hover:border-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2 cursor-pointer bg-transparent">
                View Operations <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Metrics Section */}
      <section className="border-y border-white/10 bg-void-black relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-20 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 font-label-caps text-[10px] uppercase">
          <div className="flex flex-col gap-3 border-l border-white/10 pl-6">
            <span className="text-[#c8102e] tracking-widest">// METRIC_01</span>
            <span className="text-white text-base tracking-widest">21 Partnered Creators</span>
          </div>
          <div className="flex flex-col gap-3 border-l border-white/10 pl-6">
            <span className="text-[#c8102e] tracking-widest">// METRIC_02</span>
            <span className="text-white text-base tracking-widest">460K+ Aggregate Reach</span>
          </div>
          <div className="flex flex-col gap-3 border-l border-white/10 pl-6">
            <span className="text-[#c8102e] tracking-widest">// METRIC_03</span>
            <span className="text-white text-base tracking-widest">3+ Platform Ecosystems</span>
          </div>
          <div className="flex flex-col gap-3 border-l md:border-r border-white/10 px-6">
            <span className="text-[#c8102e] tracking-widest font-bold">// METRIC_04</span>
            <span className="text-white text-base tracking-widest">South Asian Creator Network</span>
          </div>
        </div>
      </section>

      {/* Infinite Roster Marquee */}
      <section className="py-6 border-b border-white/10 bg-[#050505]/40 relative z-10 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-track">
            {/* First copy */}
            {rosterArray.map((creator) => {
              const liveCount = creator.youtubeChannelId ? liveSubs[creator.youtubeChannelId] : null;
              const displaySubs = liveCount ? `${liveCount} Subs` : `${creator.subscribers} Subs`;
              return (
                <Link
                  key={`${creator.slug}-m1`}
                  href={`/talent/${creator.slug}`}
                  className="inline-flex items-center gap-4 bg-void-black border border-white/5 hover:border-[#c8102e]/30 px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 select-none"
                >
                  <div className="flex flex-col">
                    <span className="text-white text-[10px] font-bold uppercase tracking-tight">{creator.name}</span>
                    <span className="text-[8px] text-secondary/50 font-mono mt-0.5">{creator.youtubeHandle}</span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 pl-4 border-l border-white/10">
                    <span className="text-white text-[9px] font-bold">{displaySubs}</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                      {creator.isKickPartner && <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>}
                    </span>
                  </div>
                </Link>
              );
            })}
            {/* Second copy for infinite loop */}
            {rosterArray.map((creator) => {
              const liveCount = creator.youtubeChannelId ? liveSubs[creator.youtubeChannelId] : null;
              const displaySubs = liveCount ? `${liveCount} Subs` : `${creator.subscribers} Subs`;
              return (
                <Link
                  key={`${creator.slug}-m2`}
                  href={`/talent/${creator.slug}`}
                  className="inline-flex items-center gap-4 bg-void-black border border-white/5 hover:border-[#c8102e]/30 px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 select-none"
                >
                  <div className="flex flex-col">
                    <span className="text-white text-[10px] font-bold uppercase tracking-tight">{creator.name}</span>
                    <span className="text-[8px] text-secondary/50 font-mono mt-0.5">{creator.youtubeHandle}</span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 pl-4 border-l border-white/10">
                    <span className="text-white text-[9px] font-bold">{displaySubs}</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                      {creator.isKickPartner && <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE SYSTEM Divisions */}
      <section className="flex flex-col w-full relative z-10">
        {/* DIVISION 01: REPRESENTATION */}
        <div className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-32 border-b border-white/10 max-w-[1600px] mx-auto w-full group">
          <div className="flex items-center gap-4 mb-24">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">The System // Div. 01</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h3 className="font-display-lg text-[clamp(2.5rem,5.2vw,7.5rem)] text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">REPRESENTATION</h3>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-12 mt-4 lg:mt-0">
              <p className="font-body-md text-base text-secondary leading-relaxed border-l border-[#c8102e]/50 pl-6">
                Securing tier-one verified partnerships and regional priority terms, bypassing standard queues to establish dominant digital real estate across primary broadcast sectors. We don't negotiate; we dictate terms.
              </p>
              <ul className="flex flex-col gap-4 font-label-caps text-[10px] text-white uppercase">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.01.1</span> Tier-One Allocation</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.01.2</span> Priority Queues</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.01.3</span> Contract Architecture</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVISION 02: MONETIZATION */}
        <div className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-32 border-b border-white/10 max-w-[1600px] mx-auto w-full group">
          <div className="flex items-center gap-4 mb-24">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">The System // Div. 02</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h3 className="font-display-lg text-[clamp(2.5rem,5.2vw,7.5rem)] text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">MONETIZATION</h3>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-12 mt-4 lg:mt-0">
              <p className="font-body-md text-base text-secondary leading-relaxed border-l border-[#c8102e]/50 pl-6">
                Enterprise sponsorship deployment and commercial routing strategy. We handle the logistical backend of brand integration, ensuring maximum yield per engagement and diversifying revenue streams beyond standard ad-sense.
              </p>
              <ul className="flex flex-col gap-4 font-label-caps text-[10px] text-white uppercase">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.02.1</span> Sponsorship Routing</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.02.2</span> Yield Optimization</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.02.3</span> IP Engineering</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVISION 03: OPERATIONS */}
        <div className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-32 border-b border-white/10 max-w-[1600px] mx-auto w-full group">
          <div className="flex items-center gap-4 mb-24">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">The System // Div. 03</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h3 className="font-display-lg text-[clamp(2.5rem,5.2vw,7.5rem)] text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">OPERATIONS</h3>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-12 mt-4 lg:mt-0">
              <p className="font-body-md text-base text-secondary leading-relaxed border-l border-[#c8102e]/50 pl-6">
                High-fidelity 3D brand architecture, custom broadcast overlays, and premium visual identity designed for legacy positioning and enterprise scalability. Providing the technical backbone for flawless execution.
              </p>
              <ul className="flex flex-col gap-4 font-label-caps text-[10px] text-white uppercase">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.03.1</span> Broadcast Architecture</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.03.2</span> Technical Backbone</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.03.3</span> Event Logistics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVISION 04: EXPANSION */}
        <div className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-32 border-b border-white/10 max-w-[1600px] mx-auto w-full group">
          <div className="flex items-center gap-4 mb-24">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">The System // Div. 04</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h3 className="font-display-lg text-[clamp(2.5rem,5.2vw,7.5rem)] text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">EXPANSION</h3>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-12 mt-4 lg:mt-0">
              <p className="font-body-md text-base text-secondary leading-relaxed border-l border-[#c8102e]/50 pl-6">
                Automated organic distribution networks. Converting long-form broadcast data into high-yield social assets deployed simultaneously across all major platforms to capture broader audience segments.
              </p>
              <ul className="flex flex-col gap-4 font-label-caps text-[10px] text-white uppercase">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.04.1</span> Scale Vectors</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.04.2</span> Asset Conversion</li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4"><span className="text-[#c8102e] tracking-widest">SYS.04.3</span> Omnichannel Reach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Command Center Visualization */}
      <section className="relative py-24 md:py-32 border-b border-white/10 bg-void-black overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-20 relative z-10 flex flex-col">
          <div className="mb-12 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">Command Center Visualization</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Network Map Container */}
            <div className="lg:col-span-8 relative min-h-[500px] md:min-h-[600px] border border-white/10 bg-[#050505]/40 backdrop-blur-sm flex items-center justify-center overflow-hidden rounded-xl">
              {/* Central Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
                <div 
                  onClick={() => setActiveNode('core')}
                  className={`w-36 h-36 border bg-void-black flex items-center justify-center p-6 relative group transition-all duration-300 cursor-pointer select-none ${
                    activeNode === 'core' 
                      ? 'border-[#c8102e] shadow-[0_0_40px_rgba(200,16,46,0.3)]' 
                      : 'border-white/10 hover:border-[#c8102e]/50'
                  }`}
                >
                  <div className={`absolute inset-0 border border-[#c8102e] animate-pulse ${activeNode === 'core' ? 'opacity-80' : 'opacity-30'}`}></div>
                  <div className="absolute inset-[-8px] border border-[#c8102e]/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <img 
                    alt="Hub Core" 
                    className="w-full h-full object-contain" 
                    src="/logo.png"
                  />
                </div>
                <div className="text-center bg-void-black/80 backdrop-blur-sm p-1.5 border border-white/10">
                  <h4 className={`font-label-caps text-[11px] tracking-widest uppercase mb-0.5 font-bold transition-all duration-300 ${activeNode === 'core' ? 'text-[#c8102e]' : 'text-white'}`}>Hydrasaurus Core</h4>
                  <p className="font-label-caps text-[8px] text-secondary">Master Routing Node</p>
                </div>
              </div>

              {/* Animated Lines (Horizontal/Vertical) */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 z-10">
                <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                  <div className="h-full w-[200px] glow-line animate-flow-h"></div>
                </div>
              </div>
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-10">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="w-full h-[200px] glow-line animate-flow-v"></div>
                </div>
              </div>

              {/* Diagonal Lines */}
              <svg className="absolute inset-0 w-full h-full z-10 opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line stroke="#ffffff" strokeWidth="0.1" x1="0" x2="100" y1="0" y2="100"></line>
                <line stroke="#ffffff" strokeWidth="0.1" x1="100" x2="0" y1="0" y2="100"></line>
              </svg>

              {/* Nodes */}
              {/* Top Node: Creators */}
              <div 
                onClick={() => setActiveNode('creators')}
                className="command-node top-[8%] left-1/2 -translate-x-1/2 cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'creators' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'creators' ? '!text-[#c8102e]' : ''}`}>groups</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'creators' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Active Creators</div>
              </div>

              {/* Bottom Node: Sponsors */}
              <div 
                onClick={() => setActiveNode('brands')}
                className="command-node bottom-[8%] left-1/2 -translate-x-1/2 cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'brands' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'brands' ? '!text-[#c8102e]' : ''}`}>attach_money</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'brands' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Brand Partners</div>
              </div>

              {/* Left Node: YouTube/Kick */}
              <div 
                onClick={() => setActiveNode('platforms')}
                className="command-node left-[6%] md:left-[14%] top-1/2 -translate-y-1/2 cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'platforms' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'platforms' ? '!text-[#c8102e]' : ''}`}>live_tv</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'platforms' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Broadcast Platforms</div>
              </div>

              {/* Right Node: Monetization */}
              <div 
                onClick={() => setActiveNode('monetization')}
                className="command-node right-[6%] md:right-[14%] top-1/2 -translate-y-1/2 cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'monetization' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'monetization' ? '!text-[#c8102e]' : ''}`}>account_balance</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'monetization' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Monetization Engine</div>
              </div>

              {/* Top Left Node: Operations */}
              <div 
                onClick={() => setActiveNode('operations')}
                className="command-node top-[22%] left-[22%] -translate-x-1/2 -translate-y-1/2 hidden md:flex cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'operations' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'operations' ? '!text-[#c8102e]' : ''}`}>settings</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'operations' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Operations</div>
              </div>

              {/* Top Right Node: Representation */}
              <div 
                onClick={() => setActiveNode('representation')}
                className="command-node top-[22%] right-[22%] translate-x-1/2 -translate-y-1/2 hidden md:flex cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'representation' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'representation' ? '!text-[#c8102e]' : ''}`}>gavel</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'representation' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Representation</div>
              </div>

              {/* Bottom Left Node: Logistics */}
              <div 
                onClick={() => setActiveNode('logistics')}
                className="command-node bottom-[22%] left-[22%] -translate-x-1/2 translate-y-1/2 hidden md:flex cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'logistics' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'logistics' ? '!text-[#c8102e]' : ''}`}>local_shipping</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'logistics' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Logistics</div>
              </div>

              {/* Bottom Right Node: Analytics */}
              <div 
                onClick={() => setActiveNode('analytics')}
                className="command-node bottom-[22%] right-[22%] translate-x-1/2 translate-y-1/2 hidden md:flex cursor-pointer select-none group"
              >
                <div className={`command-icon-box transition-all duration-300 ${activeNode === 'analytics' ? '!border-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.4)]' : ''}`}>
                  <span className={`material-symbols-outlined transition-all duration-300 ${activeNode === 'analytics' ? '!text-[#c8102e]' : ''}`}>monitoring</span>
                </div>
                <div className={`command-label mt-1 transition-all duration-300 ${activeNode === 'analytics' ? '!text-[#c8102e] font-bold' : 'text-secondary'}`}>Data Analytics</div>
              </div>
            </div>

            {/* Diagnostic Terminal Side Panel */}
            <div className="lg:col-span-4 flex flex-col border border-[#c8102e]/30 bg-[#050505]/90 backdrop-blur-md p-6 font-mono text-[11px] text-secondary select-none relative overflow-hidden rounded-xl shadow-[0_0_30px_rgba(200,16,46,0.08)]">
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[size:100%_4px] opacity-30"></div>
              
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-pulse"></span>
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest font-label-caps">// CREATOR_NETWORK_CONSOLE</span>
                </div>
                <span className="text-[9px] text-[#c8102e] font-mono">STATUS: {COMMAND_NODES[activeNode as keyof typeof COMMAND_NODES]?.status || 'ONLINE'}</span>
              </div>

              {/* Terminal Stats */}
              <div className="flex flex-col gap-3 mb-6 bg-black/60 border border-white/5 p-4 rounded">
                <div className="flex flex-col border-b border-white/5 pb-2 gap-0.5">
                  <span className="text-secondary/60 text-[9px]">SYSTEM DIVISION:</span>
                  <span className="text-white font-bold text-xs">{COMMAND_NODES[activeNode as keyof typeof COMMAND_NODES]?.title}</span>
                </div>
                {COMMAND_NODES[activeNode as keyof typeof COMMAND_NODES]?.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 last:border-0 pb-1 last:pb-0">
                    <span className="text-secondary/60 uppercase">{stat.label}:</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Log Feed */}
              <div className="flex-grow flex flex-col gap-2 font-mono text-[10px] overflow-y-auto max-h-[220px] roster-scroll bg-black/80 p-3 border border-white/5 rounded">
                <span className="text-secondary/30">// SYSTEM FEED ACTIVE</span>
                {COMMAND_NODES[activeNode as keyof typeof COMMAND_NODES]?.logs.map((log, i) => {
                  const match = log.match(/^\[(.*?)\]/);
                  const tag = match ? match[1] : 'INFO';
                  const content = log.replace(/^\[.*?\]\s*/, '');
                  
                  let tagColor = 'text-[#c8102e]'; // default brand red
                  if (tag === 'LIVE' || tag === 'SYNC') {
                    tagColor = 'text-emerald-400';
                  } else if (tag === 'REVENUE' || tag === 'CAMPAIGN') {
                    tagColor = 'text-[#c8102e]';
                  } else if (tag === 'ASSETS' || tag === 'ROSTER' || tag === 'MEDIA') {
                    tagColor = 'text-blue-400';
                  } else if (tag === 'PARTNER' || tag === 'CONTRACT' || tag === 'LEGAL') {
                    tagColor = 'text-amber-400';
                  }

                  return (
                    <div key={i} className="flex items-start gap-1 text-[9.5px]">
                      <span className={`font-bold ${tagColor}`}>[{tag}]</span>
                      <span className="text-secondary/90">{content}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex justify-between items-center text-[9px] text-secondary/40 font-mono">
                <span>SECTOR: HYDRA_ENT_01</span>
                <span>SYS_TEMP: STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Investment Portfolio Section */}
      <section className="px-6 md:px-20 py-24 md:py-32 max-w-[1600px] mx-auto">
        <div className="mb-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">Client Portfolio Deployment</h2>
          </div>
          <button 
            onClick={handleAccessDirectory}
            className="font-label-caps text-[10px] text-white hover:text-[#c8102e] transition-colors uppercase border-b border-transparent hover:border-[#c8102e] pb-1 cursor-pointer bg-transparent"
          >
            Access Full Directory
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Portfolio Asset 1: DollyIsLive */}
          <Link href="/talent/dollyislive" className="group cursor-pointer flex flex-col border border-white/10 hover:border-white/30 transition-all duration-300 bg-void-black relative overflow-hidden rounded-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-start z-10 relative bg-void-black/80 backdrop-blur-[2px]">
              <div>
                <h3 className="font-display-lg text-3xl text-white uppercase tracking-tighter mb-1 font-bold">DOLLYISLIVE</h3>
                <span className="font-label-caps text-[9px] text-[#c4c7ca] uppercase tracking-widest block">Asset Class: Streamer & Esports</span>
              </div>
              <div className="px-2 py-1 border border-[#c8102e]/50 bg-[#c8102e]/10 text-[#c8102e] font-label-caps text-[8px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> Verified
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-void-deep border-b border-white/10">
              <video
                src={rosterData.dollyislive?.hoverVideo || "https://cdn.coverr.co/videos/coverr-a-person-playing-a-video-game-2178/1080p.mp4"}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0"
              />
              <img 
                alt="DollyIsLive" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-0 group-hover:scale-105 transition-all duration-700 mix-blend-lighten z-10" 
                src={portfolioStats.dollyislive?.avatarUrl || "/dolly.png"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20"></div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 font-label-caps text-[10px] uppercase z-10 relative bg-void-black/80 backdrop-blur-[2px]">
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">Base Metric</span>
                <span className="text-white text-base">{portfolioStats.dollyislive?.subscribers || "13.9K"} Subs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">MoM Delta</span>
                <span className="text-[#c4c7ca] text-base">+18.4% Growth</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[#c8102e] tracking-widest font-bold">Primary Vector</span>
                <span className="text-white text-sm">YouTube & Kick Ecosystem</span>
              </div>
            </div>
          </Link>

          {/* Portfolio Asset 2: WhyisSelena */}
          <Link href="/talent/whyisselena" className="group cursor-pointer flex flex-col border border-white/10 hover:border-white/30 transition-all duration-300 bg-void-black relative overflow-hidden rounded-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-start z-10 relative bg-void-black/80 backdrop-blur-[2px]">
              <div>
                <h3 className="font-display-lg text-3xl text-white uppercase tracking-tighter mb-1 font-bold">WHYISSELENA</h3>
                <span className="font-label-caps text-[9px] text-[#c4c7ca] uppercase tracking-widest block">Asset Class: Variety FPS</span>
              </div>
              <div className="px-2 py-1 border border-[#c8102e]/50 bg-[#c8102e]/10 text-[#c8102e] font-label-caps text-[8px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> Verified
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-void-deep border-b border-white/10">
              <video
                src={rosterData.whyisselena?.hoverVideo || "https://cdn.coverr.co/videos/coverr-playing-a-video-game-9626/1080p.mp4"}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0"
              />
              <img 
                alt="WhyisSelena" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-0 group-hover:scale-105 transition-all duration-700 mix-blend-lighten z-10" 
                src={portfolioStats.whyisselena?.avatarUrl || "/selena.png"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20"></div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 font-label-caps text-[10px] uppercase z-10 relative bg-void-black/80 backdrop-blur-[2px]">
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">Base Metric</span>
                <span className="text-white text-base">{portfolioStats.whyisselena?.subscribers || "2.3K"} Subs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">MoM Delta</span>
                <span className="text-[#c4c7ca] text-base">+4.2% Growth</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[#c8102e] tracking-widest font-bold">Primary Vector</span>
                <span className="text-white text-sm">YouTube & Kick Ecosystem</span>
              </div>
            </div>
          </Link>

          {/* Portfolio Asset 3: BacKFire */}
          <Link href="/talent/backfire" className="group cursor-pointer flex flex-col border border-white/10 hover:border-white/30 transition-all duration-300 bg-void-black relative overflow-hidden rounded-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-start z-10 relative bg-void-black/80 backdrop-blur-[2px]">
              <div>
                <h3 className="font-display-lg text-3xl text-white uppercase tracking-tighter mb-1 font-bold">BACKFIRE</h3>
                <span className="font-label-caps text-[9px] text-[#c4c7ca] uppercase tracking-widest block">Asset Class: Tier-1 FPS</span>
              </div>
              <div className="px-2 py-1 border border-[#c8102e]/50 bg-[#c8102e]/10 text-[#c8102e] font-label-caps text-[8px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> Verified
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-void-deep border-b border-white/10">
              <video
                src={rosterData.backfire?.hoverVideo || "https://cdn.coverr.co/videos/coverr-a-gamer-playing-first-person-shooter-video-game-5658/1080p.mp4"}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0"
              />
              <img 
                alt="BacKFire" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-0 group-hover:scale-105 transition-all duration-700 mix-blend-lighten z-10" 
                src={portfolioStats.backfire?.avatarUrl || "https://lh3.googleusercontent.com/aida/AP1WRLthz-y8Yw4F59JQJZPj95Gfnc-Z57droyOaAk-MXBfVDQIq6uwCvchy6x_wVO7Z5GOEb9rJH-aiAx-KZn7uY_ueyJDQ-WpsBX30VMDzbrEO1GZQ_NwGYRh_oRox5gHK-Q9G_tPnsy1JTAWWG0WXz6BaJJ_bpjeKuHIhwk2OXs0BbYwbalqKq0TztUTpb_zEerEcrk06w2u6j_IuI0rNKjcXzWsveGnVEA0kYc7huslYlNd_WRdHjNx0JWiz"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20"></div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 font-label-caps text-[10px] uppercase z-10 relative bg-void-black/80 backdrop-blur-[2px]">
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">Base Metric</span>
                <span className="text-white text-base">{portfolioStats.backfire?.subscribers || "19.4K"} Subs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">MoM Delta</span>
                <span className="text-[#c4c7ca] text-base">+22.1% Growth</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[#c8102e] tracking-widest font-bold">Primary Vector</span>
                <span className="text-white text-sm">YouTube & Kick Ecosystem</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Final CTA - Secure Terminal */}
      <section className="px-6 md:px-20 py-32 max-w-[1600px] mx-auto border-t border-white/10 bg-void-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display-lg text-5xl md:text-7xl text-white mb-8 font-bold uppercase leading-tight tracking-tighter">
              ENTER THE <br/>
              <span className="text-[#c8102e]">NETWORK.</span>
            </h2>
            <p className="font-body-md text-secondary max-w-sm border-l border-[#c8102e]/30 pl-4">
              Representation inquiries are strictly vetted. Provide detailed metrics and current infrastructural bottlenecks to begin evaluation.
            </p>
          </div>
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full max-w-lg md:ml-auto border border-white/20 p-8 bg-void-black font-label-caps"
          >
            <div className="border-b border-white/10 pb-4 mb-4 flex justify-between items-center">
              <span className="text-[10px] text-[#c8102e] tracking-widest uppercase font-bold">// Terminal Access Protocol</span>
              <span className="w-2 h-2 bg-[#c8102e] animate-pulse"></span>
            </div>
            <div className="relative group">
              <span className="absolute left-0 top-4 text-secondary text-xs">&gt;</span>
              <input 
                className="w-full bg-transparent border-b border-white/20 pl-6 py-4 text-white focus:outline-none focus:border-[#c8102e] transition-colors text-xs placeholder-secondary/50 uppercase" 
                placeholder="Entity Identification" 
                type="text"
                required
              />
            </div>
            <div className="relative group">
              <span className="absolute left-0 top-4 text-secondary text-xs">&gt;</span>
              <input 
                className="w-full bg-transparent border-b border-white/20 pl-6 py-4 text-white focus:outline-none focus:border-[#c8102e] transition-colors text-xs placeholder-secondary/50 uppercase" 
                placeholder="Secure Communications Node" 
                type="email"
                required
              />
            </div>
            <div className="relative group">
              <span className="absolute left-0 top-4 text-secondary text-xs">&gt;</span>
              <textarea 
                className="w-full bg-transparent border-b border-white/20 pl-6 py-4 text-white focus:outline-none focus:border-[#c8102e] transition-colors resize-none text-xs placeholder-secondary/50 uppercase" 
                placeholder="Operational Directive Details" 
                rows={3}
                required
              ></textarea>
            </div>
            <button 
              className="text-white text-[10px] px-8 py-4 bg-transparent border border-[#c8102e]/50 hover:bg-[#c8102e] hover:text-white transition-all duration-300 uppercase tracking-widest w-max mt-8 flex items-center gap-4 group cursor-pointer font-bold" 
              type="submit"
            >
              Transmit Dossier <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
