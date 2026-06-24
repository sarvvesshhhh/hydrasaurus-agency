'use client';

interface RosterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RosterSidebar({ isOpen, onClose }: RosterSidebarProps) {
  return (
    <aside 
      className={`fixed right-0 top-0 bottom-0 w-[400px] max-w-full bg-void-black/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col font-label-caps transition-transform duration-500 ease-[cubic-bezier(0.8,0,0.2,1)] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} 
      id="roster-sidebar"
    >
      <div className="px-8 py-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
        <h3 className="text-[10px] text-white uppercase tracking-widest flex items-center gap-3 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> 
          HYDRASAURUS NETWORK
        </h3>
        <button 
          onClick={onClose}
          className="text-secondary hover:text-[#c8102e] transition-colors flex items-center justify-center p-2 cursor-pointer bg-transparent" 
          id="close-sidebar"
          aria-label="Close Roster Sidebar"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto roster-scroll px-8 py-8 flex flex-col gap-12">
        {/* Command Staff */}
        <div>
          <h4 className="text-[10px] text-[#c8102e] uppercase tracking-widest mb-6 border-b border-white/10 pb-2 font-bold">// COMMAND STAFF</h4>
          <div className="flex flex-col gap-6">
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Sarvesh Shinde
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Founder & CEO</div>
            </div>
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Rohit Badhe
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Co-Founder</div>
            </div>
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Sushant Nanaware
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Head Manager</div>
            </div>
          </div>
        </div>

        {/* Hydrasaurus Roster / Active Roster */}
        <div>
          <h4 className="text-[10px] text-[#c8102e] uppercase tracking-widest mb-6 border-b border-white/10 pb-2 font-bold">// HYDRASAURUS ROSTER</h4>
          <div className="flex flex-col gap-4">
            {/* PN Syed */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> PN Syed
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                115.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* iMRocky */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> iMRocky
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                52.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Arnav Gaming */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Arnav Gaming
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                38.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* RadBriefing */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> RadBriefing
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                36.5K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* The Deadshot */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> The Deadshot
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                24.8K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Asuka Bae */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Asuka Bae
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                21.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* BacKFire */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> BacKFire
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                19.4K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Eliminator */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Eliminator
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                18.5K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Typhon */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Typhon
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                15.5K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* SHREE PlayZ */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> SHREE PlayZ
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                15.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* DollyIsLive */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> DollyIsLive
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                13.9K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Laila playzz */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Laila playzz
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                13.6K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* BeLikeHanna */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> BeLikeHanna
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                12.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* M4GOD */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> M4GOD
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                10.0K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* ABHiBERG Unfiltered */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> ABHiBERG Unfiltered
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                7.4K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* DeepZ9k */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> DeepZ9k
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                4.8K Subs
                <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube Only"></span>
              </div>
            </div>
            {/* DAMASK plays */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> DAMASK plays
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                4.2K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Mxrsh */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Mxrsh
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                2.5K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* Brian Playzz */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Brian Playzz
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                2.4K Subs
                <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube Only"></span>
              </div>
            </div>
            {/* WhyisSelena */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> WhyisSelena
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                2.3K Subs
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube"></span>
                  <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-sm" title="Kick Partnered"></span>
                </span>
              </div>
            </div>
            {/* SnFx */}
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> SnFx
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                1.3K Subs
                <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm" title="YouTube Only"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-white/10 bg-void-black">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-secondary uppercase tracking-widest">Uplink Status: Secure</span>
          <span className="w-2 h-2 bg-[#c8102e] animate-pulse rounded-none"></span>
        </div>
      </div>
    </aside>
  );
}
