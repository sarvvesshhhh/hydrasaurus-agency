'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DISCOVERY_CATEGORIES, discoverBrandsByCategory, DiscoveredLead } from '@/lib/outreach/brand-discovery';
import { createBrandAction } from '../actions';

export default function BrandDiscoveryPage() {
  const [activeCategory, setActiveCategory] = useState('drinks');
  const [leads, setLeads] = useState<DiscoveredLead[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRunDiscovery = async (catId: string) => {
    setActiveCategory(catId);
    setLoading(true);
    const results = await discoverBrandsByCategory(catId);
    setLeads(results);
    setLoading(false);
  };

  React.useEffect(() => {
    handleRunDiscovery('drinks');
  }, []);

  const handleImportLead = async (lead: DiscoveredLead) => {
    const formData = new FormData();
    formData.append('name', lead.name);
    formData.append('website', lead.website);
    formData.append('category', lead.category);
    formData.append('email', lead.suggestedContact.email);
    formData.append('contactName', lead.suggestedContact.name);

    const res = await createBrandAction(formData);
    if (res.error) {
      alert(`Import error: ${res.error}`);
    } else {
      alert(`Successfully imported ${lead.name} (${lead.suggestedContact.email}) into CRM PostgreSQL database!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/10 to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider border border-red-500/30">
              AI Lead Engine
            </span>
            <span className="text-xs text-gray-400 font-mono">Auto-Lead Generation</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">travel_explore</span>
            AI Brand Discovery Hub
          </h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Automatically discover active gaming sponsors, energy drink brands, peripheral makers, and Indian D2C companies ready for creator activations.
          </p>
        </div>

        <Link
          href="/outreach/brands"
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">business_center</span>
          View Brand CRM
        </Link>
      </div>

      {/* Discovery Category Selection Chips */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {DISCOVERY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleRunDiscovery(cat.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 group ${
                isActive
                  ? 'bg-red-500/15 border-red-500/40 shadow-lg shadow-red-500/10'
                  : 'bg-[#0C0C10] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`material-symbols-outlined text-lg ${isActive ? 'text-red-400' : 'text-gray-400'}`}>
                  {cat.icon}
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">AI FIND</span>
              </div>
              <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Table */}
      <div className="rounded-2xl bg-[#0C0C10] border border-white/10 p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 text-lg">travel_explore</span>
              Discovered Target Opportunities
            </h2>
            <p className="text-[11px] text-gray-400">Showing AI discovered sponsorship prospects for current category selection.</p>
          </div>

          <button
            onClick={() => handleRunDiscovery(activeCategory)}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-semibold border border-red-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-xs ${loading ? 'animate-spin' : ''}`}>sync</span>
            {loading ? 'Discovering...' : 'Rescan Category'}
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <span className="material-symbols-outlined text-4xl animate-spin text-red-500">travel_explore</span>
            <div className="text-xs font-mono">Analyzing web signals & sponsor databases...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-red-500/30 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                      {lead.name}
                    </h3>
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-gray-400 hover:text-gray-200 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      {lead.website.replace('https://', '')}
                      <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                    </a>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                    <span className="text-xs font-black text-red-400 font-mono block">{lead.leadScore}</span>
                    <span className="text-[8px] text-gray-400 font-mono block">SCORE</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {lead.description}
                </p>

                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-gray-300 font-semibold">
                    <span>Contact Person:</span>
                    <span className="text-red-400 font-mono">{lead.suggestedContact.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>Direct Email:</span>
                    <span className="font-mono text-gray-200">{lead.suggestedContact.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>Est. Budget Tier:</span>
                    <span className="font-mono text-emerald-400 font-bold">{lead.estimatedBudget}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleImportLead(lead)}
                  className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add_circle</span>
                  Import Target into CRM
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
