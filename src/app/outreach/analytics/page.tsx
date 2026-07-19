import React from 'react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const [brands, totalSent, totalDrafts] = await Promise.all([
    prisma.brand.findMany({ where: { isArchived: false } }),
    prisma.sentEmail.count(),
    prisma.emailDraft.count()
  ]);

  const statuses = [
    { label: 'Pending / Initial', key: 'PENDING', color: 'bg-gray-500' },
    { label: 'Research Complete', key: 'RESEARCH_COMPLETE', color: 'bg-purple-500' },
    { label: 'Draft Generated', key: 'DRAFT_GENERATED', color: 'bg-indigo-500' },
    { label: 'Awaiting Approval', key: 'AWAITING_APPROVAL', color: 'bg-amber-500' },
    { label: 'Sent Dispatched', key: 'SENT', color: 'bg-blue-500' },
    { label: 'Interested Reply', key: 'INTERESTED', color: 'bg-sky-500' },
    { label: 'Meeting Scheduled', key: 'MEETING_SCHEDULED', color: 'bg-emerald-500' },
    { label: 'Partnership Signed', key: 'PARTNERSHIP_SIGNED', color: 'bg-green-500' },
    { label: 'Not Interested', key: 'NOT_INTERESTED', color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">bar_chart</span>
            Outreach & CRM Funnel Analytics
          </h1>
          <p className="text-xs text-gray-400">
            Real-time status breakdown and conversion velocity across target gaming brands.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Total Database Brands</span>
          <div className="text-3xl font-extrabold text-white">{brands.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Total Draft Versions Generated</span>
          <div className="text-3xl font-extrabold text-purple-400">{totalDrafts}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs text-gray-400 font-mono">Total Zoho Mail Messages Sent</span>
          <div className="text-3xl font-extrabold text-emerald-400">{totalSent}</div>
        </div>
      </div>

      {/* Funnel Pipeline Breakdown */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl">
        <h2 className="text-sm font-bold text-white uppercase font-mono">Pipeline Conversion Funnel</h2>

        <div className="space-y-3">
          {statuses.map(st => {
            const count = brands.filter((b: any) => b.status === st.key).length;
            const pct = brands.length > 0 ? Math.round((count / brands.length) * 100) : 0;
            return (
              <div key={st.key} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">{st.label}</span>
                  <span className="text-white font-bold">{count} brands ({pct}%)</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`${st.color} h-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
