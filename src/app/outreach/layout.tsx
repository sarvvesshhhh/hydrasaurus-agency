'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser, SignOutButton } from '@clerk/nextjs';
import { setActiveRoleAction } from './actions';
import { UserRole } from '@/lib/outreach/types';
import { isEmailAdmin } from '@/lib/auth-config';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isLoaded } = useUser();

  const handleRoleChange = async (newRole: UserRole) => {
    setRole(newRole);
    await setActiveRoleAction(newRole);
  };

  // 1. Loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono text-gray-400">Verifying Administrative Access...</p>
      </div>
    );
  }

  // 2. Email Whitelist Authorization Guard
  const userEmails = user?.emailAddresses.map(e => e.emailAddress) || [];
  const isAuthorizedAdmin = userEmails.some(email => isEmailAdmin(email));

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center p-6 relative z-30">
        <div className="max-w-md w-full bg-[#0B0B0E] border border-red-500/30 rounded-2xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500 shadow-lg shadow-red-500/10">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold tracking-tight text-white uppercase">Restricted Admin Area</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              The Outreach AI CRM portal is restricted strictly to authorized Hydrasaurus Agency administrative accounts.
            </p>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-xl p-3.5 text-xs font-mono text-gray-300 text-left space-y-1">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Signed in as</div>
            <div className="text-red-400 font-bold truncate">{user?.primaryEmailAddress?.emailAddress || 'Unknown User'}</div>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all text-center"
            >
              Return to Public Website
            </Link>
            <SignOutButton>
              <button className="w-full py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-bold transition-all cursor-pointer">
                Sign Out & Switch Account
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    );
  }


  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/outreach', icon: 'dashboard' },
    { name: 'Compose Mail', href: '/outreach/compose', icon: 'edit_square', badge: 'New' },
    { name: 'Brand CRM', href: '/outreach/brands', icon: 'business_center' },
    { name: 'AI Brand Discovery', href: '/outreach/discovery', icon: 'travel_explore', badge: 'AI' },
    { name: 'Creators Roster', href: '/outreach/creators', icon: 'groups', badge: '25+' },
    { name: 'Knowledge Base', href: '/outreach/knowledge', icon: 'auto_stories', badge: 'RAG' },
    { name: 'Human Review Queue', href: '/outreach/review', icon: 'rate_review', badge: 'Review' },
    { name: 'Outbound Queue', href: '/outreach/queue', icon: 'forward_to_inbox' },
    { name: 'Analytics', href: '/outreach/analytics', icon: 'bar_chart' },
    { name: 'Campaigns', href: '/outreach/campaigns', icon: 'campaign' },
    { name: 'Settings', href: '/outreach/settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 font-sans flex flex-col selection:bg-red-500/30">
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/10 bg-[#0B0B0E]/90 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Toggle Sidebar"
          >
            <span className="material-symbols-outlined">{sidebarOpen ? 'menu_open' : 'menu'}</span>
          </button>

          <Link href="/outreach" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 via-red-500 to-rose-700 p-0.5 shadow-lg shadow-red-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0B0E] rounded-[6px] flex items-center justify-center">
                <span className="text-red-500 font-black text-xs tracking-tighter">HX</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                HYDRASAURUS <span className="text-red-500 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">OUTREACH AI</span>
              </span>
              <span className="text-[10px] text-gray-400">Enterprise Creator Sponsorship CRM</span>
            </div>
          </Link>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center gap-3">
          {/* Quick Compose Button */}
          <Link
            href="/outreach/compose"
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">edit_square</span>
            <span className="hidden sm:inline">Compose</span>
          </Link>

          {/* Mailbox Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="material-symbols-outlined text-sm text-emerald-400">mail</span>
            <span className="font-mono text-[11px]">management@hydrasaurusagency.in</span>
          </div>

          {/* Real Session Role Switcher */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 p-1 rounded-lg text-xs">
            {(['ADMIN', 'MANAGER', 'VIEWER'] as const).map(r => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                  role === r
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* User Profile */}
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 ring-2 ring-red-500/50 hover:ring-red-500 transition-all"
              }
            }}
          />

        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 border-r border-white/10 bg-[#0A0A0D] flex flex-col justify-between shrink-0 select-none`}>
          <div className="py-4 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/outreach' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-red-500/10 border border-red-500/30 text-white font-semibold shadow-sm shadow-red-500/10'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-red-500' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {sidebarOpen && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                          item.badge === 'AI' || item.badge === 'RAG' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-white/10 text-gray-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Agency Reach Summary in Sidebar Footer */}
          {sidebarOpen && (
            <div className="m-3 p-3 rounded-xl bg-gradient-to-br from-red-950/40 to-black border border-red-500/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300">
                <span>Agency Reach</span>
                <span className="text-red-400 font-mono font-bold">570K+</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-[85%] rounded-full"></div>
              </div>
              <div className="text-[10px] text-gray-400 flex items-center justify-between">
                <span>25+ Creators</span>
                <span>YT & Kick</span>
              </div>
            </div>
          )}
        </aside>

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#070709] p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
