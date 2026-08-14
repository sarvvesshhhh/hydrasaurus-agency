'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { submitPitch } from '@/app/actions/submitPitch';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`mt-4 w-full font-black uppercase tracking-widest py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
        pending 
          ? 'bg-white/10 text-white/30 border border-white/5 cursor-not-allowed' 
          : 'bg-[#C8102E] border border-[#C8102E] text-white hover:bg-white hover:text-[#C8102E] hover:border-white shadow-lg shadow-red-600/30'
      }`}
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
          <span>Transmitting Pitch...</span>
        </>
      ) : (
        <>
          <span>Submit Pitch</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </>
      )}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitPitch, null);

  // Success State Override UI
  if (state?.success) {
    return (
      <main className="min-h-screen pt-48 pb-24 px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-[#0B0B0E] border border-[#C8102E]/40 rounded-3xl p-10 md:p-14 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500 shadow-xl shadow-red-500/20 animate-pulse">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Pitch Transmitted
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed font-body-md">
              {state.message || 'Your inquiry has been received by Hydrasaurus Agency leadership. Our executive team will review your dossier and initiate contact shortly.'}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-label-caps uppercase transition-all"
            >
              Return to Hub
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3.5 rounded-xl bg-[#C8102E] hover:bg-red-500 text-white text-xs font-bold font-label-caps uppercase transition-all shadow-lg shadow-red-600/30"
            >
              Submit Another Pitch
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-48 pb-24 px-6 relative z-10 flex flex-col items-center">
      {/* Hero */}
      <div className="w-full max-w-[1000px] mb-14 text-center">
        <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase tracking-tighter leading-none mb-4 font-display-lg">
          <span className="text-white block">Claim Your Digital Real Estate</span>
          <span className="text-[#C8102E] block mt-2">Secure A Roster Spot</span>
        </h1>
        <p className="text-secondary text-sm md:text-base font-body-md max-w-xl mx-auto">
          Partner with India&apos;s fastest growing gaming creator management & livestream operations agency.
        </p>
      </div>

      {/* Form */}
      <form action={formAction} className="w-full max-w-[800px] bg-[#070709]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col gap-6 relative shadow-2xl">
        <input type="hidden" name="source" value="Contact Page" />

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-bold font-label-caps uppercase tracking-wider text-center flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{state.error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold font-label-caps">Brand / Entity Name</label>
            <input 
              name="brandName"
              type="text" 
              required
              className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C8102E] transition-colors text-sm" 
              placeholder="e.g. Asus ROG, boAt, G FUEL"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold font-label-caps">Representative Name</label>
            <input 
              name="repName"
              type="text" 
              required
              className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C8102E] transition-colors text-sm" 
              placeholder="e.g. Sarvesh Shinde"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold font-label-caps">Contact Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C8102E] transition-colors text-sm" 
              placeholder="marketing@brand.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold font-label-caps">Estimated Campaign Budget</label>
            <div className="relative">
              <select name="budget" className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#C8102E] transition-colors appearance-none w-full cursor-pointer text-sm">
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 - ₹10,00,000</option>
                <option value="₹10,00,000+ / Custom Retainer">₹10,00,000+ / Custom Retainer</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold font-label-caps">Campaign Goals / Project Details</label>
          <textarea 
            name="details"
            required
            rows={4} 
            className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C8102E] transition-colors resize-none text-sm leading-relaxed"
            placeholder="Outline your campaign scope, target creators (e.g. PN Syed, DollyIsLive), deliverable formats (streams, videos, tournament overlays), and launch timeline..."
          ></textarea>
        </div>

        <SubmitButton />

        <div className="text-center mt-4 pt-6 border-t border-white/5 flex flex-col items-center gap-1">
          <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold font-label-caps">Direct Executive Communications Node</span>
          <a href="mailto:management@hydrasaurusagency.in" className="text-red-400 text-xs hover:text-red-300 transition-colors tracking-wider font-mono mt-1">
            management@hydrasaurusagency.in
          </a>
        </div>
      </form>
    </main>
  );
}
