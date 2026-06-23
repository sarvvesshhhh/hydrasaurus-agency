import Link from 'next/link';
import LiveStatusBadge from '@/components/LiveStatusBadge';

import { rosterData } from '@/data/roster';

export default async function TalentPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();
  
  // Fallback to dollyislive if slug not found
  const talent = rosterData[slug] || rosterData['dollyislive'];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex flex-col items-center">
      
      {/* Back Navigation */}
      <div className="w-full max-w-[1200px] mb-8">
        <Link href="/" className="text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold flex items-center gap-2 w-fit">
          ← Back to Roster
        </Link>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-[1200px] relative py-24 flex flex-col items-center justify-center overflow-hidden mb-16 rounded-[2rem] border border-white/5 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <h1 className="text-[clamp(3rem,10vw,10rem)] font-black uppercase tracking-tighter leading-none text-white text-center relative z-10 whitespace-nowrap">
          {talent.name}
        </h1>
        <p className="text-[#E3C287] tracking-[0.25em] uppercase font-bold text-sm md:text-xl mt-4 relative z-10 text-center px-4">
          {talent.role}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 flex flex-col justify-center items-center group hover:border-white/10 transition-colors">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Subscribers</span>
          <span className="text-5xl font-black text-white tracking-tighter">{talent.subscribers}</span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 flex flex-col justify-center items-center group hover:border-white/10 transition-colors">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Total Views</span>
          <span className="text-5xl font-black text-white tracking-tighter">{talent.totalViews}</span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 flex flex-col justify-center items-center">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">Current Status</span>
          <LiveStatusBadge kickUrl={talent.kickUrl} ytChannelId={talent.youtubeChannelId} youtubeUrl={talent.youtubeUrl} />
        </div>

      </div>

      {/* Creator Dossier (About) */}
      <div className="w-full max-w-[1200px] bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 md:p-16 mb-16 flex flex-col gap-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] w-12 bg-[#C8102E]/40"></div>
          <span className="text-[#C8102E] text-[11px] font-bold tracking-[0.25em] uppercase">Creator Dossier</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            {talent.bio && (
              <div>
                <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">Biography</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">"{talent.bio}"</p>
              </div>
            )}
            <div>
              <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">YouTube Analytics</h3>
              <p className="text-white/80 text-sm font-medium">{talent.videos} Videos uploaded • Active since {talent.joined}</p>
            </div>
            {talent.social && (
              <div>
                <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">Social Hub</h3>
                <a href={`https://${talent.social}`} target="_blank" rel="noopener noreferrer" className="text-[#E3C287] hover:underline text-sm font-medium">
                  {talent.social}
                </a>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-6">
            {talent.setup && (
              <div className="bg-[#050505] p-6 rounded-2xl border border-white/5">
                <h3 className="text-[#C8102E] text-[10px] font-bold uppercase tracking-widest mb-3">Hardware Setup</h3>
                <p className="text-white/70 text-sm leading-relaxed font-medium">{talent.setup}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Embed */}
      <div className="w-full max-w-[1200px] aspect-video bg-[#050505]/40 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center relative group cursor-pointer hover:border-[#C8102E]/50 transition-colors">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
           <svg className="w-16 h-16 text-[#C8102E] mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
             <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
           </svg>
           <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">Play Highlight Reel</span>
        </div>
      </div>

    </main>
  );
}
