'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="top-nav"
      className={`fixed top-0 left-0 transition-all duration-500 z-40 border-b flex justify-between items-center px-6 md:px-20 max-w-[1600px] mx-auto w-full ${
        sidebarOpen ? 'lg:right-[400px] lg:w-[calc(100%-400px)]' : 'right-0 w-full'
      } ${
        scrolled 
          ? 'bg-void-black/95 py-4 border-white/10' 
          : 'bg-void-black/90 py-6 border-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <Link href="/">
          <img 
            alt="Hydrasaurus Logo" 
            className="h-15 w-auto object-contain cursor-pointer" 
            src="/logo.png"
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-12">
        <Link href="#" className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase">
          Directory
        </Link>
        <Link href="#" className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase">
          Operations
        </Link>
        <Link href="#" className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase">
          Logistics
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <button className="hidden md:block font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase cursor-pointer">
          Client Portal
        </button>
        <Link 
          href="/contact" 
          className="text-white font-label-caps text-[10px] px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase cursor-pointer text-center"
        >
          Inquire
        </Link>
      </div>
    </nav>
  );
}

