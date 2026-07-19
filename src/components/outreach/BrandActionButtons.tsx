'use client';

import React, { useTransition } from 'react';
import { triggerResearchAction, generateDraftAction, deleteBrandAction } from '@/app/outreach/actions';

interface BrandActionButtonsProps {
  brandId: string;
  hasDraft: boolean;
  nextVersion: number;
}

export default function BrandActionButtons({ brandId, hasDraft, nextVersion }: BrandActionButtonsProps) {
  const [isResearching, startResearchTransition] = useTransition();
  const [isDrafting, startDraftTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleRunResearch = () => {
    startResearchTransition(async () => {
      const res = await triggerResearchAction(brandId);
      if (res.error) {
        alert(`AI Research Error: ${res.error}`);
      }
    });
  };

  const handleGenerateDraft = () => {
    startDraftTransition(async () => {
      const res = await generateDraftAction(brandId);
      if (res.error) {
        alert(`Draft Generation Error: ${res.error}`);
      }
    });
  };

  const handleDeleteBrand = () => {
    if (!confirm('Are you sure you want to archive this brand?')) return;
    startDeleteTransition(async () => {
      const res: any = await deleteBrandAction(brandId);
      if (res?.error) {
        alert(`Archive Error: ${res.error}`);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* AI Research Button */}
      <button
        type="button"
        onClick={handleRunResearch}
        disabled={isResearching || isDrafting}
        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-1.5 disabled:opacity-50"
      >
        <span className={`material-symbols-outlined text-sm text-purple-400 ${isResearching ? 'animate-spin' : ''}`}>
          {isResearching ? 'sync' : 'psychology'}
        </span>
        {isResearching ? 'Analyzing Brand...' : 'Run AI Research'}
      </button>

      {/* AI Email Generation / Regeneration */}
      <button
        type="button"
        onClick={handleGenerateDraft}
        disabled={isResearching || isDrafting}
        className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
      >
        <span className={`material-symbols-outlined text-sm ${isDrafting ? 'animate-spin' : ''}`}>
          {isDrafting ? 'sync' : 'auto_fix_high'}
        </span>
        {isDrafting
          ? 'Generating Draft with OpenAI...'
          : hasDraft
          ? `Regenerate Draft (V${nextVersion})`
          : 'Generate Email Draft'}
      </button>

      {/* Soft Delete Brand */}
      <button
        type="button"
        onClick={handleDeleteBrand}
        disabled={isDeleting}
        className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-bold border border-red-500/20 transition-all disabled:opacity-50"
        title="Archive Brand"
      >
        <span className={`material-symbols-outlined text-sm ${isDeleting ? 'animate-spin' : ''}`}>
          {isDeleting ? 'sync' : 'archive'}
        </span>
      </button>
    </div>
  );
}
