import React from 'react';
import { prisma } from '@/lib/db';
import { processOutboundQueueAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function OutboundQueuePage() {
  const approvedDrafts = await prisma.emailDraft.findMany({
    where: { status: 'APPROVED' },
    include: { brand: { include: { contacts: true } } }
  });

  const sentEmails = await prisma.sentEmail.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: { brand: true }
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">forward_to_inbox</span>
            Outbound Dispatch Queue Monitor
          </h1>
          <p className="text-xs text-gray-400">
            Monitors approved outreach emails ready to send via Zoho Mail API with 30-second rate limiting rule.
          </p>
        </div>

        {/* Dispatch Action Button */}
        <form action={async () => {
          'use server';
          await processOutboundQueueAction();
        }}>
          <button
            type="submit"
            disabled={approvedDrafts.length === 0}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            Process Queue ({approvedDrafts.length} Approved)
          </button>
        </form>
      </div>

      {/* Approved Drafts Queue */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl">
        <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400 text-sm">hourglass_top</span>
          Approved Emails Ready for Dispatch ({approvedDrafts.length})
        </h2>

        {approvedDrafts.length === 0 ? (
          <p className="text-xs text-gray-500 font-mono">
            No approved emails in queue. Approve drafts from the Human Review Queue to send them via Zoho Mail.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {approvedDrafts.map((draft: any) => (
              <div key={draft.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{draft.brand.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    To: {draft.brand.contacts[0]?.email || 'N/A'} • Subject: {draft.subject}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Approved V{draft.version}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Dispatched Emails */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl">
        <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-sm">mark_email_read</span>
          Recently Dispatched via Zoho Mail API ({sentEmails.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-black/60 text-gray-400 font-mono text-[11px] uppercase border-b border-white/10">
              <tr>
                <th className="p-3">Brand & Recipient</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Zoho Message ID</th>
                <th className="p-3 text-right">Sent Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {sentEmails.map((email: any) => (
                <tr key={email.id} className="hover:bg-white/[0.02]">
                  <td className="p-3">
                    <span className="font-bold text-white">{email.brand.name}</span>
                    <div className="text-[10px] text-gray-500">{email.recipient}</div>
                  </td>
                  <td className="p-3 text-gray-300 truncate max-w-xs">{email.subject}</td>
                  <td className="p-3 text-emerald-400 text-[11px] font-bold">{email.zohoMessageId || 'ZOHO_SENT'}</td>
                  <td className="p-3 text-right text-gray-500 text-[10px]">
                    {new Date(email.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
