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
        <h3 className="text-[10px] text-white uppercase tracking-widest flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse"></span> 
          HYDRASAURUS NETWORK
        </h3>
        <button 
          onClick={onClose}
          className="text-secondary hover:text-[#c8102e] transition-colors flex items-center justify-center p-2 cursor-pointer" 
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
              <div className="text-[9px] text-secondary uppercase pl-4">Director of Operations</div>
            </div>
            <div className="group flex flex-col gap-1 cursor-pointer">
              <div className="text-white text-[11px] group-hover:text-[#c8102e] transition-colors uppercase tracking-widest flex items-center gap-2">
                <span className="text-secondary opacity-50">&gt;</span> Rohit
              </div>
              <div className="text-[9px] text-secondary uppercase pl-4">Logistics Commander</div>
            </div>
          </div>
        </div>

        {/* Active Roster */}
        <div>
          <h4 className="text-[10px] text-[#c8102e] uppercase tracking-widest mb-6 border-b border-white/10 pb-2 font-bold">// ACTIVE ROSTER</h4>
          <div className="flex flex-col gap-4">
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> iMRocky
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                52.0K CCV
                <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm"></span>
              </div>
            </div>
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-white/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> The Deadshot
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                24.8K CCV
                <span className="w-1.5 h-1.5 bg-white/20 rounded-sm"></span>
              </div>
            </div>
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-[#c8102e]/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-[#c8102e] transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> BacKFire
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                19.4K CCV
                <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-sm"></span>
              </div>
            </div>
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-white/50 transition-colors">
              <div className="text-white text-[10px] group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <span className="text-secondary opacity-50 text-xs">-</span> Typhon
              </div>
              <div className="text-[9px] text-secondary flex items-center gap-2">
                15.5K CCV
                <span className="w-1.5 h-1.5 bg-white/20 rounded-sm"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Pipeline */}
        <div>
          <h4 className="text-[10px] text-[#c8102e] uppercase tracking-widest mb-6 border-b border-white/10 pb-2 font-bold">// DEPLOYMENT PIPELINE</h4>
          <div className="flex flex-col gap-4">
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-white/20 transition-colors">
              <div className="text-secondary text-[10px] group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <span className="text-tertiary opacity-30 text-xs">~</span> DollyIsLive
              </div>
              <div className="text-[9px] text-tertiary">13.9K CCV</div>
            </div>
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-white/20 transition-colors">
              <div className="text-secondary text-[10px] group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <span className="text-tertiary opacity-30 text-xs">~</span> Laila playzz
              </div>
              <div className="text-[9px] text-tertiary">13.6K CCV</div>
            </div>
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-white/20 transition-colors">
              <div className="text-secondary text-[10px] group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <span className="text-tertiary opacity-30 text-xs">~</span> BeLikeHanna
              </div>
              <div className="text-[9px] text-tertiary">12.0K CCV</div>
            </div>
            <div className="group flex items-baseline justify-between cursor-pointer border-b border-white/5 pb-2 hover:border-white/20 transition-colors">
              <div className="text-secondary text-[10px] group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <span className="text-tertiary opacity-30 text-xs">~</span> M4GOD
              </div>
              <div className="text-[9px] text-tertiary">10.0K CCV</div>
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

