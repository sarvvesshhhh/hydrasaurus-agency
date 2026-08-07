'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

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
        <Link href="/directory" className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase">
          Directory
        </Link>
        <Link href="/operations" className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase">
          Operations
        </Link>
        <Link href="/logistics" className="font-label-caps text-[10px] text-secondary hover:text-white transition-colors uppercase">
          Logistics
        </Link>
        {isLoaded && isSignedIn && (
          <Link href="/outreach" className="font-label-caps text-[10px] text-red-400 hover:text-red-300 transition-colors uppercase font-bold">
            Outreach CRM
          </Link>
        )}
      </div>
      <div className="flex items-center gap-6">
        {isLoaded && !isSignedIn && (
          <SignInButton mode="modal">
            <button className="text-white font-label-caps text-[10px] px-5 py-2.5 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase cursor-pointer text-center">
              Sign In
            </button>
          </SignInButton>
        )}

        {isLoaded && isSignedIn && (
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 ring-2 ring-red-500/40 hover:ring-red-500 transition-all"
              }
            }}
          />
        )}

        <Link 
          href="/contact" 
          className="text-white font-label-caps text-[10px] px-6 py-3 bg-red-600 hover:bg-red-500 transition-all duration-300 uppercase cursor-pointer text-center font-bold shadow-lg shadow-red-600/20"
        >
          Inquire
        </Link>
      </div>
    </nav>
  );
}
