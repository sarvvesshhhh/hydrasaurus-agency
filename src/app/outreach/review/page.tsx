import React from 'react';
import { prisma } from '@/lib/db';
import ReviewItemCard from '@/components/outreach/ReviewItemCard';

export const dynamic = 'force-dynamic';

export default async function ReviewQueuePage() {
  const drafts = await prisma.emailDraft.findMany({
    where: { status: { in: ['DRAFT', 'APPROVED'] } },
    include: {
      brand: {
        include: { contacts: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">rate_review</span>
            Human Review & Approval Queue
          </h1>
          <p className="text-xs text-gray-400">
            Mandatory human verification stage. Generated emails must be approved by a Manager/Admin before entering the outbound Zoho send queue.
          </p>
        </div>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {drafts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0C0C10] border border-white/10 text-center space-y-3 shadow-2xl">
            <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
            <div className="text-sm font-bold text-white">All Clear! Review Queue Empty</div>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              No pending drafts awaiting manager review. Generate new email drafts from any Brand page to queue them here.
            </p>
          </div>
        ) : (
          drafts.map((draft: any) => (
            <ReviewItemCard key={draft.id} draft={draft} />
          ))
        )}
      </div>
    </div>
  );
}
