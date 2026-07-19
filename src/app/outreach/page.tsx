import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const brands = await prisma.brand.findMany({
    where: { isArchived: false },
    include: { contacts: true, emailDrafts: true, sentEmails: true },
    orderBy: { leadScore: 'desc' }
  });

  const totalBrands = brands.length;
  const sentCount = await prisma.sentEmail.count();
  const pendingApproval = await prisma.emailDraft.count({ where: { status: 'DRAFT' } });
  const activeConversations = brands.filter((b: any) => ['INTERESTED', 'NEED_MORE_INFO'].includes(b.status)).length;
  const meetingsScheduled = brands.filter((b: any) => b.status === 'MEETING_SCHEDULED').length;
  const signedPartnerships = brands.filter((b: any) => b.status === 'PARTNERSHIP_SIGNED').length;
  const followUpsDue = brands.filter((b: any) => b.status === 'FOLLOW_UP_REQUIRED').length;

  const replyRate = totalBrands > 0 ? `${Math.round(((activeConversations + meetingsScheduled + signedPartnerships) / totalBrands) * 100)}%` : '0%';
  const conversionRate = totalBrands > 0 ? `${Math.round((signedPartnerships / totalBrands) * 100)}%` : '0%';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/10 to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">dashboard</span>
            Hydrasaurus Outreach Control Center
          </h1>
          <p className="text-xs text-gray-400">
            Real-time pipeline metrics powered by PostgreSQL & OpenAI RAG Context Engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/outreach/discovery"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">travel_explore</span>
            Find New Gaming Brands
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Total Target Brands</span>
          <div className="text-3xl font-extrabold text-white">{totalBrands}</div>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">PostgreSQL Sync</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Dispatched Pitches</span>
          <div className="text-3xl font-extrabold text-white">{sentCount}</div>
          <span className="text-[10px] text-gray-400 font-mono">Via Zoho API</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Pending Manager Review</span>
          <div className="text-3xl font-extrabold text-amber-400">{pendingApproval}</div>
          <span className="text-[10px] text-amber-400 font-mono">Requires Approval</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Signed Partnerships</span>
          <div className="text-3xl font-extrabold text-emerald-400">{signedPartnerships}</div>
          <span className="text-[10px] text-emerald-400 font-mono">Conversion: {conversionRate}</span>
        </div>
      </div>

      {/* Top Value Brand Opportunities */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500 text-sm">stars</span>
            Highest Priority Brand Opportunities (Lead Score Ranked)
          </h2>
          <Link href="/outreach/brands" className="text-xs text-red-400 hover:text-red-300 font-semibold font-mono">
            View All Brands &rarr;
          </Link>
        </div>

        <div className="divide-y divide-white/5">
          {brands.slice(0, 5).map((brand: any) => (
            <div key={brand.id} className="py-3 flex items-center justify-between text-xs hover:bg-white/[0.01] transition-colors">
              <div>
                <Link href={`/outreach/brands/${brand.id}`} className="font-bold text-white hover:text-red-400 text-sm">
                  {brand.name}
                </Link>
                <div className="text-[10px] text-gray-500 font-mono">{brand.category} • {brand.website}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-white/5 text-gray-300 border border-white/10">
                  {brand.status.replace(/_/g, ' ')}
                </span>
                <span className="font-mono font-bold text-sm text-red-400 w-12 text-right">
                  {brand.leadScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
