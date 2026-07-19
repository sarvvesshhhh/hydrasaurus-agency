import React from 'react';
import { prisma } from '@/lib/db';
import ComposeMailForm from '@/components/outreach/ComposeMailForm';

export const dynamic = 'force-dynamic';

export default async function ComposePage() {
  const [brands, recentSent] = await Promise.all([
    prisma.brand.findMany({
      where: { isArchived: false },
      include: { contacts: true },
      orderBy: { name: 'asc' }
    }),
    prisma.sentEmail.findMany({
      take: 10,
      orderBy: { sentAt: 'desc' },
      include: { brand: true }
    })
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/10 to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">edit_square</span>
            Compose Custom Email
          </h1>
          <p className="text-xs text-gray-400">
            Dispatch manual custom emails, custom sponsorship decks, or direct follow-ups via primary Zoho Mail (<strong>management@hydrasaurusagency.in</strong>).
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Connected: management@hydrasaurusagency.in
        </div>
      </div>

      <ComposeMailForm brands={brands} recentSent={recentSent} />
    </div>
  );
}
