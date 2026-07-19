'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'cmp_1',
      name: 'Q3 Energy Drink Surge 2026',
      description: 'Outreach campaign targeting premium hydration and energy drink brands for GTA RP stream overlays.',
      targetSector: 'Energy Drinks',
      brandsCount: 8,
      sentCount: 6,
      replyCount: 3,
      createdAt: '2026-07-01'
    },
    {
      id: 'cmp_2',
      name: 'FPS Peripherals Blitz Q4',
      description: 'Hardware sponsorship drive for mouse, keyboard, and headset brands matching WhyisSelena and FPS creators.',
      targetSector: 'Peripherals',
      brandsCount: 5,
      sentCount: 4,
      replyCount: 2,
      createdAt: '2026-07-10'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/10 to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">campaign</span>
            Targeted Outreach Campaigns
          </h1>
          <p className="text-xs text-gray-400">
            Group brand outreach into seasonal waves and track aggregate performance by sector.
          </p>
        </div>

        <Link
          href="/outreach/brands"
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Create Campaign Wave
        </Link>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map(cmp => (
          <div key={cmp.id} className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 hover:border-red-500/30 transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-red-500/10 text-red-400 font-mono text-[10px] font-bold uppercase">
                  {cmp.targetSector}
                </span>
                <h2 className="text-base font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                  {cmp.name}
                </h2>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{cmp.createdAt}</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">{cmp.description}</p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 text-center font-mono">
              <div>
                <span className="block text-[9px] text-gray-500 uppercase">Target Brands</span>
                <span className="text-sm font-bold text-white">{cmp.brandsCount}</span>
              </div>
              <div>
                <span className="block text-[9px] text-gray-500 uppercase">Emails Dispatched</span>
                <span className="text-sm font-bold text-sky-400">{cmp.sentCount}</span>
              </div>
              <div>
                <span className="block text-[9px] text-gray-500 uppercase">Replies</span>
                <span className="text-sm font-bold text-emerald-400">{cmp.replyCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
