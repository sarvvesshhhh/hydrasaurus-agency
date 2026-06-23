'use client';

import React from 'react';

export default function Home() {
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
            <span className="text-white text-base tracking-widest">11+ Partnered Creators</span>
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
            <span className="text-[#c8102e] tracking-widest">// METRIC_04</span>
            <span className="text-white text-base tracking-widest">South Asian Creator Network</span>
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
              <h3 className="font-display-lg text-6xl md:text-8xl lg:text-9xl text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">REPRESENTATION</h3>
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
              <h3 className="font-display-lg text-6xl md:text-8xl lg:text-9xl text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">MONETIZATION</h3>
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
              <h3 className="font-display-lg text-6xl md:text-8xl lg:text-9xl text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">OPERATIONS</h3>
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
              <h3 className="font-display-lg text-6xl md:text-8xl lg:text-9xl text-[#c4c7ca] uppercase tracking-tighter leading-none mb-12 opacity-80 group-hover:opacity-100 transition-opacity">EXPANSION</h3>
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
      <section className="relative py-32 md:py-48 border-b border-white/10 bg-void-black overflow-hidden h-[800px] md:h-[1000px]">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-20 relative z-10 h-full flex flex-col">
          <div className="mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#c8102e]"></span>
            <h2 className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">Command Center Visualization</h2>
          </div>
          {/* Network Map Container */}
          <div className="relative flex-grow w-full h-full flex items-center justify-center">
            {/* Central Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6">
              <div className="w-48 h-48 border border-[#c8102e]/80 bg-void-black flex items-center justify-center p-8 relative group shadow-[0_0_50px_rgba(200,16,46,0.2)]">
                <div className="absolute inset-0 border border-[#c8102e] animate-pulse opacity-50"></div>
                <div className="absolute inset-[-10px] border border-[#c8102e]/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <img 
                  alt="Hub Core" 
                  className="w-full h-full object-contain" 
                  src="/logo.png"
                />
              </div>
              <div className="text-center bg-void-black/80 backdrop-blur-sm p-2 border border-white/10">
                <h4 className="font-label-caps text-[14px] text-[#c8102e] tracking-widest uppercase mb-1 font-bold">Hydrasaurus Core</h4>
                <p className="font-label-caps text-[9px] text-secondary">Master Routing Node</p>
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
            <div className="command-node top-[10%] left-1/2 -translate-x-1/2">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">groups</span></div>
              <div className="command-label mt-2">Active Creators</div>
            </div>
            {/* Bottom Node: Sponsors */}
            <div className="command-node bottom-[10%] left-1/2 -translate-x-1/2">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">attach_money</span></div>
              <div className="command-label mt-2">Brand Partners</div>
            </div>
            {/* Left Node: YouTube/Kick */}
            <div className="command-node left-[10%] md:left-[20%] top-1/2 -translate-y-1/2">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">live_tv</span></div>
              <div className="command-label mt-2">Broadcast Platforms</div>
            </div>
            {/* Right Node: Monetization */}
            <div className="command-node right-[10%] md:right-[20%] top-1/2 -translate-y-1/2">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">account_balance</span></div>
              <div className="command-label mt-2">Monetization Engine</div>
            </div>
            {/* Top Left Node: Operations */}
            <div className="command-node top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 hidden md:flex">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">settings</span></div>
              <div className="command-label mt-2">Operations</div>
            </div>
            {/* Top Right Node: Representation */}
            <div className="command-node top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2 hidden md:flex">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">gavel</span></div>
              <div className="command-label mt-2">Representation</div>
            </div>
            {/* Bottom Left Node: Logistics */}
            <div className="command-node bottom-[25%] left-[25%] -translate-x-1/2 translate-y-1/2 hidden md:flex">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">local_shipping</span></div>
              <div className="command-label mt-2">Logistics</div>
            </div>
            {/* Bottom Right Node: Analytics */}
            <div className="command-node bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2 hidden md:flex">
              <div className="command-icon-box group cursor-pointer"><span className="material-symbols-outlined">monitoring</span></div>
              <div className="command-label mt-2">Data Analytics</div>
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
          <button className="font-label-caps text-[10px] text-white hover:text-[#c8102e] transition-colors uppercase border-b border-transparent hover:border-[#c8102e] pb-1 cursor-pointer bg-transparent">
            Access Full Directory
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Portfolio Asset 1: Zane */}
          <div className="group cursor-pointer flex flex-col border border-white/10 hover:border-white/30 transition-colors bg-void-black">
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <h3 className="font-display-lg text-3xl text-white uppercase tracking-tighter mb-1 font-bold">ZANE</h3>
                <span className="font-label-caps text-[9px] text-[#c4c7ca] uppercase tracking-widest block">Asset Class: Elite RP</span>
              </div>
              <div className="px-2 py-1 border border-[#c8102e]/50 bg-[#c8102e]/10 text-[#c8102e] font-label-caps text-[8px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> Verified
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-void-deep border-b border-white/10">
              <img 
                alt="Zane" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-lighten" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLvD_IonGqo657628mzDxB9V5Myi83CUI3H3gzTlTa9zE6tkPRFpjLrOLVZJ9Jal2u2IRBuUvtUf9j1NWmne4Op6UJVDYKoocY8o0NZUfcFUgtECuowVotMj3ACLw9ZJYmGF1v_yRjKuMUQLyFpENd91uYZx7DbGyy1R7sFclDtNeWgxmzxPBQCaI8wkxub54amTnRcfhKecrW0T3NIsOUkxEq5kptWOCDqHKoDzStU7VUlHunMEsvTr9BdR"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 font-label-caps text-[10px] uppercase">
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">Base Metric</span>
                <span className="text-white text-base">14.2K CCV</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">MoM Delta</span>
                <span className="text-[#c4c7ca] text-base">+18.4% Growth</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[#c8102e] tracking-widest font-bold">Primary Vector</span>
                <span className="text-white text-sm">YouTube Live Ecosystem</span>
              </div>
            </div>
          </div>

          {/* Portfolio Asset 2: Nova */}
          <div className="group cursor-pointer flex flex-col border border-white/10 hover:border-white/30 transition-colors bg-void-black">
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <h3 className="font-display-lg text-3xl text-white uppercase tracking-tighter mb-1 font-bold">NOVA</h3>
                <span className="font-label-caps text-[9px] text-[#c4c7ca] uppercase tracking-widest block">Asset Class: Variety</span>
              </div>
              <div className="px-2 py-1 border border-white/30 bg-white/5 text-white font-label-caps text-[8px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> Verified
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-void-deep border-b border-white/10">
              <img 
                alt="Nova" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-lighten" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLsc-RrNN955n64EpPeA-1KHO8fMOK1oHBvNMvmKPOqRATv7cftek3rRmuDgcZkAC4Q6U5l2mjZd-bcQ18EZDLAVvCM9V-d05J4fmNLxwDvlj7-hOLD1qGJTWb8sZMMg2V8dkfFEYdRh-KMDbUQlPQNbEQ1NgBqAuA4wj01lOWWyTkTvOPMYGbiSC8Sg62EnYy1KH1_a3Kwe9t9kqmszA6AUYOBHHSm0WXcZv3tQiId4YQWcq3F-lFybGkQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 font-label-caps text-[10px] uppercase">
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">Base Metric</span>
                <span className="text-white text-base">8.5K CCV</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">MoM Delta</span>
                <span className="text-[#c4c7ca] text-base">+4.2% Growth</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[#c8102e] tracking-widest font-bold">Primary Vector</span>
                <span className="text-white text-sm">Kick Broadcast Network</span>
              </div>
            </div>
          </div>

          {/* Portfolio Asset 3: BackFire */}
          <div className="group cursor-pointer flex flex-col border border-white/10 hover:border-white/30 transition-colors bg-void-black">
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <h3 className="font-display-lg text-3xl text-white uppercase tracking-tighter mb-1 font-bold">BACKFIRE</h3>
                <span className="font-label-caps text-[9px] text-[#c4c7ca] uppercase tracking-widest block">Asset Class: Tier-1 FPS</span>
              </div>
              <div className="px-2 py-1 border border-[#c8102e]/50 bg-[#c8102e]/10 text-[#c8102e] font-label-caps text-[8px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> Verified
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-void-deep border-b border-white/10">
              <img 
                alt="BackFire" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-lighten" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLthz-y8Yw4F59JQJZPj95Gfnc-Z57droyOaAk-MXBfVDQIq6uwCvchy6x_wVO7Z5GOEb9rJH-aiAx-KZn7uY_ueyJDQ-WpsBX30VMDzbrEO1GZQ_NwGYRh_oRox5gHK-Q9G_tPnsy1JTAWWG0WXz6BaJJ_bpjeKuHIhwk2OXs0BbYwbalqKq0TztUTpb_zEerEcrk06w2u6j_IuI0rNKjcXzWsveGnVEA0kYc7huslYlNd_WRdHjNx0JWiz"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 font-label-caps text-[10px] uppercase">
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">Base Metric</span>
                <span className="text-white text-base">19.4K CCV</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#c8102e] tracking-widest font-bold">MoM Delta</span>
                <span className="text-[#c4c7ca] text-base">+22.1% Growth</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[#c8102e] tracking-widest font-bold">Primary Vector</span>
                <span className="text-white text-sm">YouTube Live Ecosystem</span>
              </div>
            </div>
          </div>
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
