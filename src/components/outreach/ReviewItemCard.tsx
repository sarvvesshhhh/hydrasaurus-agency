'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { approveDraftAction, generateDraftAction, updateDraftBodyAction } from '@/app/outreach/actions';

interface ReviewItemCardProps {
  draft: any;
}

export default function ReviewItemCard({ draft }: ReviewItemCardProps) {
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [isSaving, startSaveTransition] = useTransition();
  const [isRegenerating, startRegenTransition] = useTransition();
  const [isApproving, startApproveTransition] = useTransition();

  const handleSave = () => {
    startSaveTransition(async () => {
      const res: any = await updateDraftBodyAction(draft.id, subject, body);
      if (res?.error) {
        alert(`Save Error: ${res.error}`);
      } else {
        alert('Draft changes saved!');
      }
    });
  };

  const handleRegenerate = () => {
    startRegenTransition(async () => {
      const res: any = await generateDraftAction(draft.brandId);
      if (res?.error) {
        alert(`Regeneration Error: ${res.error}`);
      }
    });
  };

  const handleApprove = () => {
    startApproveTransition(async () => {
      const res: any = await approveDraftAction(draft.id);
      if (res?.error) {
        alert(`Approval Error: ${res.error}`);
      }
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <Link href={`/outreach/brands/${draft.brandId}`} className="font-extrabold text-white text-base hover:text-red-400 flex items-center gap-2">
            {draft.brand.name}
            <span className="material-symbols-outlined text-xs text-gray-500">open_in_new</span>
          </Link>
          <div className="text-xs text-gray-400 font-mono">
            Recipient: {draft.brand.contacts[0]?.name || 'Marketing Lead'} ({draft.brand.contacts[0]?.email || 'N/A'})
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/30">
            Draft V{draft.version}
          </span>
          <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase border ${
            draft.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}>
            {draft.status}
          </span>
        </div>
      </div>

      {/* Editable Subject & Body Inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] font-mono uppercase text-gray-500 mb-1">Subject Line</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-gray-500 mb-1">Email Body Pitch</label>
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-gray-200 font-sans leading-relaxed focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>

          <div className="flex items-center gap-2">
            {/* Regenerate Button */}
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={isRegenerating || isApproving}
              className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold border border-purple-500/30 transition-all flex items-center gap-1 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-xs ${isRegenerating ? 'animate-spin' : ''}`}>
                {isRegenerating ? 'sync' : 'auto_fix_high'}
              </span>
              {isRegenerating ? 'Regenerating...' : `Regenerate (V${draft.version + 1})`}
            </button>

            {/* Approve Button */}
            <button
              type="button"
              onClick={handleApprove}
              disabled={draft.status === 'APPROVED' || isApproving}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center gap-1"
            >
              <span className={`material-symbols-outlined text-xs ${isApproving ? 'animate-spin' : ''}`}>
                {isApproving ? 'sync' : 'check'}
              </span>
              {isApproving ? 'Approving...' : draft.status === 'APPROVED' ? 'Approved & Ready' : 'Approve Pitch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
