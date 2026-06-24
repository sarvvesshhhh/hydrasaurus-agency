'use client';

import { useState } from 'react';

export default function LogisticsClient() {
  const [reach, setReach] = useState(150000); // Default 150k subscribers
  const [hours, setHours] = useState(20);      // Default 20 hours of stream content
  const [budget, setBudget] = useState('5K_20K');
  const [brandName, setBrandName] = useState('');
  const [directive, setDirective] = useState('');

  // Projections Logic
  const projectedImpressions = Math.floor(reach * 0.18 + hours * 600);
  const estimatedCpm = 25.0; // 25 USD CPM
  const projectedYield = ((projectedImpressions / 1000) * estimatedCpm * (1 + hours * 0.005)).toFixed(2);

  let allocationClass = "Tier-2 Tactical Allocation";
  if (reach >= 50000 && reach < 300000) {
    allocationClass = "Tier-1 Priority Network Routing";
  } else if (reach >= 300000) {
    allocationClass = "Elite Hydrasaurus Core Cohort";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Transmission received. Logistics routing sequence initialized. Operations Center is preparing evaluation briefings.');
    setBrandName('');
    setDirective('');
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-20 relative z-10 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-[#c8102e]"></span>
          <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest font-bold">Division 02 // Monetization & Yield Routing</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4 font-bold">
          LOGISTICS & SPONSORSHIPS
        </h1>
        <p className="font-body-md text-sm text-secondary max-w-xl leading-relaxed">
          Dynamic campaign allocation systems, sponsorship yield forecasting, and streamlined deployment paths connecting premium brands to elite creators.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Estimator Slider Grid */}
        <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#c8102e] font-label-caps border-b border-white/5 pb-4">
            // Sponsorship Yield Calculator
          </h2>

          {/* Sliders Container */}
          <div className="flex flex-col gap-6">
            {/* Slider 1: Reach */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-label-caps font-bold">
                <span className="text-white">AGGREGATE REACH (SUBS)</span>
                <span className="text-[#E3C287]">{(reach / 1000).toFixed(0)}K REACH</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="1000000" 
                step="10000"
                value={reach} 
                onChange={(e) => setReach(Number(e.target.value))}
                className="w-full accent-[#c8102e] bg-void-black border border-white/10 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-secondary/40 font-mono">
                <span>10K</span>
                <span>500K</span>
                <span>1.0M</span>
              </div>
            </div>

            {/* Slider 2: Content Hours */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-label-caps font-bold">
                <span className="text-white">STREAM BROADCAST TIME</span>
                <span className="text-[#E3C287]">{hours} CONTENT HOURS</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                step="1"
                value={hours} 
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-[#c8102e] bg-void-black border border-white/10 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-secondary/40 font-mono">
                <span>1 HR</span>
                <span>50 HRS</span>
                <span>100 HRS</span>
              </div>
            </div>
          </div>

          {/* Projections Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-8 mt-4 font-label-caps">
            <div className="bg-void-black border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <span className="text-secondary/60 text-[8px] font-bold uppercase tracking-widest mb-2">PROJECTED IMPRESSIONS</span>
              <span className="text-xl font-black text-white tracking-tighter">{(projectedImpressions / 1000).toFixed(1)}K</span>
            </div>
            <div className="bg-void-black border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <span className="text-[#c8102e]/80 text-[8px] font-bold uppercase tracking-widest mb-2">ESTIMATED YIELD</span>
              <span className="text-xl font-black text-[#53FC18] tracking-tighter">${parseFloat(projectedYield).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
            </div>
            <div className="bg-void-black border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <span className="text-secondary/60 text-[8px] font-bold uppercase tracking-widest mb-2">ALLOCATION CLASS</span>
              <span className="text-[9px] font-black text-white uppercase leading-normal tracking-wide">{allocationClass}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Routing SVG & Dispatch Form */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* SVG Routing Map */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#c8102e] font-label-caps border-b border-white/5 pb-4">
              // Campaign Deployment Route
            </h2>
            <div className="relative h-[160px] bg-void-black border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Animated SVG Path Map */}
              <svg className="w-[85%] h-[80%]" viewBox="0 0 400 100">
                {/* Connecting Lines */}
                <path d="M 40 50 L 160 50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="none" />
                <path d="M 160 50 L 280 50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="none" />
                
                {/* Branches to Creators */}
                <path d="M 280 50 L 360 20" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="none" />
                <path d="M 280 50 L 360 50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="none" />
                <path d="M 280 50 L 360 80" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" fill="none" />

                {/* Animated Pulsing Signal Dots */}
                <circle r="4" fill="#c8102e">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 40 50 L 160 50" />
                </circle>
                <circle r="4" fill="#53FC18">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M 160 50 L 280 50" />
                </circle>

                {/* Nodes */}
                {/* Sponsor Node */}
                <circle cx="40" cy="50" r="14" fill="#0A0A0A" stroke="#E3C287" strokeWidth="2" />
                <text x="40" y="53" textAnchor="middle" fill="#E3C287" fontSize="8" fontWeight="bold" fontFamily="monospace">SPN</text>

                {/* Agency Core Node */}
                <circle cx="160" cy="50" r="16" fill="#0A0A0A" stroke="#c8102e" strokeWidth="2" />
                <text x="160" y="53" textAnchor="middle" fill="#c8102e" fontSize="7" fontWeight="bold" fontFamily="monospace">CORE</text>

                {/* Allocation Node */}
                <circle cx="280" cy="50" r="14" fill="#0A0A0A" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                <text x="280" y="53" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="monospace">ALLOC</text>

                {/* Creator Nodes */}
                <circle cx="360" cy="20" r="8" fill="#0A0A0A" stroke="#53FC18" strokeWidth="1.5" />
                <circle cx="360" cy="50" r="8" fill="#0A0A0A" stroke="#53FC18" strokeWidth="1.5" />
                <circle cx="360" cy="80" r="8" fill="#0A0A0A" stroke="#53FC18" strokeWidth="1.5" />
              </svg>
              <div className="absolute bottom-2 right-4 text-[7px] text-secondary/40 font-mono tracking-widest uppercase select-none">
                Uplink Trace: Active
              </div>
            </div>
          </div>

          {/* Secure Transmission Dispatch Form */}
          <form onSubmit={handleSubmit} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6 font-label-caps">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#c8102e] font-label-caps border-b border-white/5 pb-4 flex justify-between items-center">
              <span>// Secure Brand Dispatch</span>
              <span className="w-2 h-2 bg-[#c8102e] animate-pulse"></span>
            </h2>

            <div className="relative group">
              <span className="absolute left-0 top-3 text-secondary text-xs">&gt;</span>
              <input 
                type="text" 
                placeholder="BRAND IDENTIFIER (NAME)" 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/15 focus:border-[#c8102e] pl-6 py-3 text-xs text-white focus:outline-none transition-colors uppercase placeholder-secondary/40 tracking-wider"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[8px] text-secondary/60 font-bold tracking-widest">BUDGET ALLOCATION VECTOR</span>
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-void-black border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer focus:border-[#c8102e]"
              >
                <option value="LT_5K">&lt; $5,000 USD</option>
                <option value="5K_20K">$5,000 - $20,000 USD</option>
                <option value="20K_100K">$20,000 - $100,000 USD</option>
                <option value="GT_100K">$100,000+ USD</option>
              </select>
            </div>

            <div className="relative group">
              <span className="absolute left-0 top-3 text-secondary text-xs">&gt;</span>
              <textarea 
                placeholder="CAMPAIGN TARGET DIRECTIVES" 
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                required
                rows={2}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#c8102e] pl-6 py-3 text-xs text-white focus:outline-none transition-colors resize-none placeholder-secondary/40 tracking-wider uppercase"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="text-white text-[9px] px-6 py-3.5 bg-transparent border border-[#c8102e]/50 hover:bg-[#c8102e] hover:text-white transition-all duration-300 uppercase tracking-widest w-max mt-4 flex items-center gap-3 group cursor-pointer font-bold"
            >
              Transmit Dispatch <span className="material-symbols-outlined text-xs group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
