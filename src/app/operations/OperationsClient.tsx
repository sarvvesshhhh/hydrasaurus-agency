'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  title: string;
  creator: string;
  slug: string;
  category: 'ESPORTS' | 'SETUPS' | 'IDENTITY' | 'UPDATES';
  description: string;
  imageUrl?: string; // Stores user-uploaded base64 string
  visualPattern: string; // Tailwind gradient fallback
  isUserUploaded?: boolean;
}

const defaultGallery: GalleryItem[] = [
  {
    id: "pnsyed-hud",
    title: "Prime Tournament HUD Overlay",
    creator: "PN Syed",
    slug: "pnsyed",
    category: "ESPORTS",
    description: "Custom HUD overlay designed for professional PUBG Mobile/BGMI tournament streams. Integrates live squad metrics, kill feeds, and telemetry data designed for clean, high-stakes competition.",
    visualPattern: "from-[#c8102e]/40 via-[#0A0A0A] to-[#c8102e]/10",
  },
  {
    id: "imrocky-neon",
    title: "Neon Broadcast Stream Pack",
    creator: "iMRocky",
    slug: "imrocky",
    category: "IDENTITY",
    description: "Cyberpunk-inspired stream design theme. Includes modular webcam frames, animated starting/ending cards, sound-reactive chat frames, and custom typography to establish a premium visual identity.",
    visualPattern: "from-[#53FC18]/30 via-[#0A0A0A] to-[#53FC18]/5",
  },
  {
    id: "arnavgaming-rig",
    title: "Dual-Stream Hardware Encoding Setup",
    creator: "Arnav Gaming",
    slug: "arnavgaming",
    category: "SETUPS",
    description: "Advanced dual-platform RTMP/SRT stream routing architecture. Tuned settings for zero-loss encoding to both YouTube and Kick concurrently with audio channel splits for copyrighted tracks.",
    visualPattern: "from-blue-600/30 via-[#0A0A0A] to-blue-500/5",
  },
  {
    id: "asukabae-brand",
    title: "Cyber Brand Visual Identity Guide",
    creator: "Asuka Bae",
    slug: "asukabae",
    category: "IDENTITY",
    description: "Complete visual guidelines detailing logo typography, mascot illustration assets, corporate sponsorships placeholder grids, and social media media kits designed to attract premium brand partners.",
    visualPattern: "from-purple-600/30 via-[#0A0A0A] to-purple-500/5",
  },
  {
    id: "eliminator-alerts",
    title: "Sound-Reactive Dynamic Subscriber Alerts",
    creator: "Eliminator",
    slug: "eliminator",
    category: "IDENTITY",
    description: "HTML5/WebGL sound-reactive animated alert boxes. Displays custom neon flares and particles when a viewer subscribes or sends a donation on YouTube and Kick.",
    visualPattern: "from-amber-500/30 via-[#0A0A0A] to-amber-500/5",
  },
  {
    id: "shreeplayz-jersey",
    title: "Esports Cohort Identity & Jersey Design",
    creator: "SHREE PlayZ",
    slug: "shreeplayz",
    category: "ESPORTS",
    description: "Visual system and print-ready digital templates for cohort jerseys, social banners, and tournament profiles. Uses high-contrast geometry to convey mechanical precision and focus.",
    visualPattern: "from-cyan-500/30 via-[#0A0A0A] to-cyan-500/5",
  },
  {
    id: "thedeadshot-studio",
    title: "Dual PC Audio Routing & Command Deck",
    creator: "The Deadshot",
    slug: "thedeadshot",
    category: "SETUPS",
    description: "Hardware audio architecture configuring sub-mixes for team chat, game audio, background music, and microphone feed. Mapped key triggers to physical Stream Deck XL for on-the-fly modifications.",
    visualPattern: "from-emerald-600/30 via-[#0A0A0A] to-emerald-500/5",
  },
  {
    id: "backfire-transition",
    title: "Stinger Broadcast Transitions Pack",
    creator: "BacKFire",
    slug: "backfire",
    category: "ESPORTS",
    description: "Custom transition assets matching fast-paced tactical FPS gaming. Blends clean military wipe graphics with synthesized sound effects for seamless scene transitions on stream.",
    visualPattern: "from-[#c8102e]/30 via-[#0A0A0A] to-[#E3C287]/10",
  }
];

export default function OperationsClient() {
  const [items, setItems] = useState<GalleryItem[]>(defaultGallery);
  const [activeTab, setActiveTab] = useState<'ALL' | 'ESPORTS' | 'SETUPS' | 'IDENTITY' | 'UPDATES'>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [category, setCategory] = useState<'ESPORTS' | 'SETUPS' | 'IDENTITY' | 'UPDATES'>('IDENTITY');
  const [description, setDescription] = useState('');
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);

  // Load user-uploaded items on mount
  useEffect(() => {
    const saved = localStorage.getItem('hydrasaurus_gallery');
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved);
        setItems([...defaultGallery, ...parsedSaved]);
      } catch (err) {
        console.error("Failed to parse gallery items:", err);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !creator.trim()) return;

    // Define random gradient fallback patterns
    const patterns = [
      "from-[#c8102e]/40 via-[#0A0A0A] to-[#c8102e]/10",
      "from-[#53FC18]/30 via-[#0A0A0A] to-[#53FC18]/5",
      "from-blue-600/30 via-[#0A0A0A] to-blue-500/5",
      "from-purple-600/30 via-[#0A0A0A] to-purple-500/5",
      "from-amber-500/30 via-[#0A0A0A] to-amber-500/5",
    ];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

    const newItem: GalleryItem = {
      id: `user-${Date.now()}`,
      title,
      creator,
      slug: creator.toLowerCase().trim().replace(/\s+/g, '-'),
      category,
      description: description || "No overview directive mapped for this asset upload.",
      imageUrl: fileDataUrl || undefined,
      visualPattern: randomPattern,
      isUserUploaded: true,
    };

    // Filter current user items and append
    const currentUserItems = items.filter(item => item.isUserUploaded);
    const updatedUserItems = [...currentUserItems, newItem];
    localStorage.setItem('hydrasaurus_gallery', JSON.stringify(updatedUserItems));
    setItems([...defaultGallery, ...updatedUserItems]);

    // Reset fields
    setTitle('');
    setCreator('');
    setDescription('');
    setFileDataUrl(null);
    const fileInput = document.getElementById('image-upload-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    alert('Asset uploaded successfully and committed to local operations storage.');
  };

  const handleDeleteItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening lightbox modal
    if (confirm('Are you sure you want to delete this asset from the gallery?')) {
      const updatedUserItems = items.filter(item => item.isUserUploaded && item.id !== itemId);
      localStorage.setItem('hydrasaurus_gallery', JSON.stringify(updatedUserItems));
      setItems([...defaultGallery, ...updatedUserItems]);
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === 'ALL') return true;
    return item.category === activeTab;
  });

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-20 relative z-10 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-[#c8102e]"></span>
          <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest font-bold">Division 03 // Agency Media Center</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4 font-bold">
          OPERATIONS MEDIA GALLERY
        </h1>
        <p className="font-body-md text-sm text-secondary max-w-xl leading-relaxed">
          Upload images, post stream setups, overlays, and share brand updates. Persisted locally to your browser console routing node.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Admin Upload Terminal Form */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6 font-label-caps">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#c8102e] font-label-caps border-b border-white/5 pb-4 flex justify-between items-center">
            <span>// Upload Terminal Uplink</span>
            <span className="w-2 h-2 bg-[#c8102e] animate-pulse"></span>
          </h2>

          <form onSubmit={handleUploadSubmit} className="flex flex-col gap-5">
            <div className="relative group">
              <span className="absolute left-0 top-3 text-secondary text-xs">&gt;</span>
              <input 
                type="text" 
                placeholder="Asset / Post Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/15 focus:border-[#c8102e] pl-6 py-3 text-xs text-white focus:outline-none transition-colors uppercase placeholder-secondary/40 tracking-wider"
              />
            </div>

            <div className="relative group">
              <span className="absolute left-0 top-3 text-secondary text-xs">&gt;</span>
              <input 
                type="text" 
                placeholder="Creator Name" 
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/15 focus:border-[#c8102e] pl-6 py-3 text-xs text-white focus:outline-none transition-colors uppercase placeholder-secondary/40 tracking-wider"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] text-secondary/60 font-bold tracking-widest">Category</span>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-void-black border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none cursor-pointer focus:border-[#c8102e]"
              >
                <option value="IDENTITY">Visual Identity</option>
                <option value="ESPORTS">Esports Assets</option>
                <option value="SETUPS">Stream Setups</option>
                <option value="UPDATES">Brand Updates</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[8px] text-secondary/60 font-bold tracking-widest">Image File Upload</span>
              <input 
                type="file" 
                id="image-upload-input"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-secondary bg-void-black border border-white/10 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:border-[#c8102e] file:hidden"
              />
              {fileDataUrl && (
                <div className="mt-2 relative rounded-lg border border-white/10 overflow-hidden aspect-video bg-void-black">
                  <img src={fileDataUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="relative group">
              <span className="absolute left-0 top-3 text-secondary text-xs">&gt;</span>
              <textarea 
                placeholder="Asset Description / Updates Info" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#c8102e] pl-6 py-3 text-xs text-white focus:outline-none transition-colors resize-none placeholder-secondary/40 tracking-wider uppercase"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="text-white text-[9px] px-6 py-3.5 bg-transparent border border-[#c8102e]/50 hover:bg-[#c8102e] hover:text-white transition-all duration-300 uppercase tracking-widest w-max mt-4 flex items-center gap-3 group cursor-pointer font-bold"
            >
              Upload Asset <span className="material-symbols-outlined text-xs group-hover:translate-x-1.5 transition-transform">cloud_upload</span>
            </button>
          </form>
        </div>

        {/* Right Column: Grid and Filter Tabs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Category Filter bar */}
          <div className="flex flex-wrap gap-2 border border-white/10 p-1.5 rounded-xl bg-[#0A0A0A] w-fit">
            {(['ALL', 'ESPORTS', 'SETUPS', 'IDENTITY', 'UPDATES'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[9px] font-label-caps tracking-widest uppercase transition-all duration-300 ${
                  activeTab === tab 
                    ? tab === 'IDENTITY' 
                      ? 'bg-purple-600 text-white font-bold'
                      : tab === 'SETUPS'
                        ? 'bg-blue-600 text-white font-bold'
                        : tab === 'UPDATES'
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-[#c8102e] text-white font-bold'
                    : 'text-secondary hover:text-white bg-transparent'
                }`}
              >
                {tab === 'IDENTITY' ? 'VISUAL IDENTITY' : tab === 'SETUPS' ? 'STREAM SETUPS' : tab === 'UPDATES' ? 'BRAND UPDATES' : tab}
              </button>
            ))}
          </div>

          {/* Grid display */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-[#0A0A0A] border border-white/5 hover:border-white/20 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between h-[320px] shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                >
                  {/* Media Image or Visual fallback */}
                  <div className="h-40 relative overflow-hidden border-b border-white/5 bg-void-black flex items-center justify-center">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.visualPattern} flex items-center justify-center p-6`}>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-void-black/40 backdrop-blur-md">
                          <span className="material-symbols-outlined text-white/40 text-lg">
                            {item.category === 'ESPORTS' ? 'sports_esports' : item.category === 'SETUPS' ? 'hardware' : item.category === 'UPDATES' ? 'campaign' : 'palette'}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Delete button for user uploads */}
                    {item.isUserUploaded && (
                      <button
                        onClick={(e) => handleDeleteItem(item.id, e)}
                        className="absolute top-4 right-4 bg-void-black/85 border border-white/10 hover:border-[#c8102e] hover:text-[#c8102e] text-secondary p-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer"
                        title="Delete Asset"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                      </button>
                    )}
                  </div>

                  {/* Info card */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] text-secondary/40 font-mono tracking-widest block mb-1">// {item.category} DELIVERABLE</span>
                      <h3 className="text-white text-xs font-bold uppercase tracking-tight line-clamp-1 group-hover:text-[#E3C287] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                      <span className="text-[8px] text-[#c4c7ca] uppercase font-bold tracking-wider">Node: {item.creator}</span>
                      <span className="material-symbols-outlined text-[10px] text-secondary group-hover:text-[#E3C287] group-hover:translate-x-1 transition-all duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 bg-white/[0.01] p-12 rounded-2xl text-center py-20 flex flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined text-4xl text-secondary/30">folder_open</span>
              <h3 className="font-label-caps text-xs text-white uppercase tracking-widest font-bold">
                No Media Node Found
              </h3>
              <p className="text-[9px] text-secondary uppercase max-w-xs leading-relaxed">
                Upload assets on the left or switch filter criteria to begin catalog deployment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] max-w-2xl w-full p-8 md:p-12 relative flex flex-col gap-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-secondary hover:text-[#c8102e] transition-colors p-2 cursor-pointer bg-transparent"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-1.5 h-1.5 rounded-sm ${
                  selectedItem.category === 'IDENTITY' 
                    ? 'bg-purple-500' 
                    : selectedItem.category === 'SETUPS'
                      ? 'bg-blue-500'
                      : selectedItem.category === 'UPDATES'
                        ? 'bg-amber-500'
                        : 'bg-[#c8102e]'
                }`}></span>
                <span className="text-[9px] text-secondary font-mono tracking-widest uppercase">// {selectedItem.category} SPECS</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none mb-1">
                {selectedItem.title}
              </h2>
              <p className="text-[#E3C287] text-[10px] font-bold uppercase tracking-widest font-label-caps">
                Roster Node: {selectedItem.creator}
              </p>
            </div>

            {/* Image Panel */}
            <div className="h-64 rounded-2xl border border-white/5 relative overflow-hidden bg-void-black flex items-center justify-center">
              {selectedItem.imageUrl ? (
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedItem.visualPattern} flex items-center justify-center`}>
                  <div className="text-center bg-void-black/75 border border-white/10 rounded-xl px-6 py-4 backdrop-blur-md">
                    <span className="material-symbols-outlined text-white/40 text-3xl mb-2">
                      {selectedItem.category === 'ESPORTS' ? 'sports_esports' : selectedItem.category === 'SETUPS' ? 'hardware' : selectedItem.category === 'UPDATES' ? 'campaign' : 'palette'}
                    </span>
                    <p className="text-[9px] text-white/70 font-mono tracking-wider uppercase select-none">
                      UPLINK: {selectedItem.id.toUpperCase()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-1.5">Description Overview</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed font-medium">
                {selectedItem.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex gap-4">
              <Link
                href={`/talent/${selectedItem.slug}`}
                onClick={() => setSelectedItem(null)}
                className="text-white text-[9px] font-label-caps font-bold tracking-widest uppercase bg-[#c8102e] hover:bg-[#c8102e]/85 px-6 py-3 rounded-lg transition-colors text-center w-full md:w-auto"
              >
                View Creator Profile
              </Link>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white text-[9px] font-label-caps font-bold tracking-widest uppercase bg-transparent hover:bg-white/5 border border-white/10 px-6 py-3 rounded-lg transition-colors text-center cursor-pointer w-full md:w-auto"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
