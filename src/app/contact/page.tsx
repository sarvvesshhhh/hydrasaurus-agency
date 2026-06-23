'use client'
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitPitch } from '@/app/actions/submitPitch';

// Extracted submit button component to leverage useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`mt-6 w-full font-black uppercase tracking-widest py-5 rounded-xl transition-all duration-300 ${
        pending 
          ? 'bg-white/10 text-white/30 border border-white/5 cursor-not-allowed' 
          : 'bg-[#C8102E] border border-[#C8102E] text-white hover:bg-white hover:text-[#C8102E] hover:border-white'
      }`}
    >
      {pending ? 'Sending...' : 'Submit Pitch'}
    </button>
  );
}

export default function ContactPage() {
  // Setup the server action state handling
  const [state, formAction] = useActionState(submitPitch, null);

  // Success State Override UI
  if (state?.success) {
    return (
      <main className="min-h-screen pt-48 pb-24 px-6 relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-none text-center">
          <span className="text-white block">PITCH RECEIVED.</span>
          <span className="text-[#C8102E] block mt-2">WE WILL BE IN TOUCH.</span>
        </h1>
      </main>
    );
  }

  // Active Form UI
  return (
    <main className="min-h-screen pt-48 pb-24 px-6 relative z-10 flex flex-col items-center">
      
      {/* Hero */}
      <div className="w-full max-w-[1000px] mb-16 text-center">
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-none mb-4">
          <span className="text-white block">Claim Your Digital Real Estate</span>
          <span className="text-[#C8102E] block mt-2">Secure A Roster Spot</span>
        </h1>
      </div>

      {/* Form */}
      <form action={formAction} className="w-full max-w-[800px] bg-[#050505]/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col gap-6 relative">
        
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center">
            {state.error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Brand Name</label>
            <input 
              name="brandName"
              type="text" 
              required
              className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors" 
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Representative Name</label>
            <input 
              name="repName"
              type="text" 
              required
              className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors" 
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Campaign Budget</label>
          <div className="relative">
            <select name="budget" className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors appearance-none w-full cursor-pointer">
              <option>Under ₹20,000</option>
              <option>₹20,000 - ₹50,000</option>
              <option>₹50,000+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Project Details</label>
          <textarea 
            name="details"
            required
            rows={5} 
            className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors resize-none"
            placeholder="Tell us about your campaign goals..."
          ></textarea>
        </div>

        <SubmitButton />

        <div className="text-center mt-6 pt-6 border-t border-white/5">
          <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold">Or email us directly at </span>
          <br />
          <a href="mailto:hydrasaurus.agency@gmail.com" className="text-[#E3C287] text-sm hover:text-white transition-colors tracking-widest mt-2 inline-block">
            hydrasaurus.agency@gmail.com
          </a>
        </div>

      </form>
    </main>
  );
}
