import Link from 'next/link';
import LiveStatusBadge from '@/components/LiveStatusBadge';
import { rosterData } from '@/data/roster';

interface YoutubeChannelDetails {
  title?: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  subscriberCount?: string;
  viewCount?: string;
  videoCount?: string;
  country?: string;
  publishedAt?: string;
}

// Fetch YouTube stats and assets, caching the query for 24 hours (86,400 seconds)
async function getYoutubeChannelDetails(channelId: string): Promise<YoutubeChannelDetails | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || !channelId || channelId.startsWith("UC_Placeholder")) {
    return null;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${apiKey}`;
    const res = await fetch(url, {
      next: { revalidate: 86400 } // Cache this query for 24 hours
    });

    if (!res.ok) {
      console.error(`Failed to fetch channel info for ${channelId}:`, res.statusText);
      return null;
    }

    const data = await res.json();
    if (!data.items || data.items.length === 0) {
      return null;
    }

    const item = data.items[0];
    const snippet = item.snippet || {};
    const statistics = item.statistics || {};
    const branding = item.brandingSettings || {};

    return {
      title: snippet.title,
      description: snippet.description,
      avatarUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
      bannerUrl: branding.image?.bannerExternalUrl,
      subscriberCount: statistics.subscriberCount,
      viewCount: statistics.viewCount,
      videoCount: statistics.videoCount,
      country: snippet.country,
      publishedAt: snippet.publishedAt,
    };
  } catch (error) {
    console.error(`Error resolving channel details for ${channelId}:`, error);
    return null;
  }
}

function formatCount(countStr?: string): string | null {
  if (!countStr) return null;
  const count = parseInt(countStr, 10);
  if (isNaN(count)) return null;

  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

function formatDate(dateStr?: string): string | null {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return null;
  }
}

const countryMap: Record<string, string> = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
};

function formatCountry(code?: string): string | null {
  if (!code) return null;
  return countryMap[code.toUpperCase()] || code.toUpperCase();
}

export default async function TalentPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();
  
  // Fallback to dollyislive if slug not found
  const talent = rosterData[slug] || rosterData['dollyislive'];

  // Query live channel stats from YouTube (cached for 24 hours)
  const liveData = talent.youtubeChannelId ? await getYoutubeChannelDetails(talent.youtubeChannelId) : null;

  // Resolve assets and analytics with static fallbacks
  const displayName = liveData?.title || talent.name;
  const displaySubs = formatCount(liveData?.subscriberCount) || talent.subscribers;
  const displayViews = formatCount(liveData?.viewCount) || talent.totalViews || "TBA";
  const displayVideos = formatCount(liveData?.videoCount) || talent.videos || "TBA";
  const displayJoined = formatDate(liveData?.publishedAt) || talent.joined || "TBA";
  const displayCountry = formatCountry(liveData?.country) || "Global";
  const displayBio = talent.bio || liveData?.description || "Dossier records active under Hydrasaurus operations routing.";
  
  const avatarUrl = liveData?.avatarUrl || talent.image;
  const bannerUrl = liveData?.bannerUrl;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex flex-col items-center">
      
      {/* Back Navigation */}
      <div className="w-full max-w-[1200px] mb-8">
        <Link href="/" className="text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold flex items-center gap-2 w-fit">
          ← Back to Roster
        </Link>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-[1200px] relative min-h-[350px] py-16 flex flex-col items-center justify-center overflow-hidden mb-16 rounded-[2rem] border border-white/5 bg-[#050505]">
        {bannerUrl ? (
          <>
            <img 
              src={bannerUrl} 
              alt={`${displayName} Banner`} 
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.15)_0%,transparent_70%)] pointer-events-none" />
        )}
        
        {/* Profile Avatar */}
        {avatarUrl && (
          <img 
            src={avatarUrl} 
            alt={displayName} 
            className="w-24 h-24 rounded-full border-2 border-[#C8102E]/60 mb-6 relative z-10 shadow-[0_0_25px_rgba(200,16,46,0.4)] object-cover"
          />
        )}
        
        <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-black uppercase tracking-tighter leading-none text-white text-center relative z-10 px-4">
          {displayName}
        </h1>
        <p className="text-[#E3C287] tracking-[0.25em] uppercase font-bold text-xs md:text-sm mt-3 relative z-10 text-center px-4">
          {talent.role || (displayCountry ? `Representing ${displayCountry}` : "Active Creator")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center items-center group hover:border-[#C8102E]/30 transition-all duration-500">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Subscribers</span>
          <span className="text-4xl font-black text-white tracking-tighter">{displaySubs}</span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center items-center group hover:border-[#C8102E]/30 transition-all duration-500">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Total Views</span>
          <span className="text-4xl font-black text-white tracking-tighter">{displayViews}</span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center items-center group hover:border-[#C8102E]/30 transition-all duration-500">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Total Videos</span>
          <span className="text-4xl font-black text-white tracking-tighter">{displayVideos}</span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center items-center">
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
            {displayBio && (
              <div>
                <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">Biography / Description</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium whitespace-pre-line">"{displayBio}"</p>
              </div>
            )}
            <div>
              <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">YouTube Uplink Node</h3>
              <p className="text-white/80 text-sm font-medium leading-relaxed">
                Active since {displayJoined}. Mapped from {displayCountry}.
              </p>
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
