import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-void-black w-full pt-16 pb-8 border-t border-white/10">
      <div className="px-6 md:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <img 
              alt="Hydrasaurus Logo" 
              className="h-18 w-auto object-contain mb-6" 
              src="/logo.png"
            />
            <p className="font-label-caps text-[10px] text-secondary uppercase tracking-widest mb-2">Command Node / Mumbai, IN</p>
            <p className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">management@hydrasaurusagency.in</p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-label-caps text-[10px] text-[#c8102e] uppercase tracking-widest mb-2">Index Database</h5>
            <Link className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="/directory">
              Directory
            </Link>
            <Link className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="/operations">
              Operations
            </Link>
            <Link className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="/logistics">
              Logistics
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-label-caps text-[10px] text-[#c8102e] uppercase tracking-widest mb-2">External Relays</h5>
            <a className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="https://www.instagram.com/hydrasaurus.agency" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="https://discord.gg/3wGeSwkcVx" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            <a className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="https://www.linkedin.com/in/sarvvesshhhh" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase" href="https://youtube.com/@hydrasaurus" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-caps text-[10px] text-tertiary uppercase tracking-widest">
            © 2026 HYDRASAURUS. CLASSIFIED INFRASTRUCTURE.
          </p>
          <p className="font-label-caps text-[10px] text-tertiary uppercase tracking-widest">
            SYS.VER 4.2.1 // OFFLINE
          </p>
        </div>
      </div>
    </footer>
  );
}

