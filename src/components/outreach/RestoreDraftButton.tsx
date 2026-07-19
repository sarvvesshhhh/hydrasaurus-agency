'use client';

import React, { useTransition } from 'react';
import { restoreDraftVersionAction } from '@/app/outreach/actions';

interface RestoreDraftButtonProps {
  draftId: string;
  version: number;
}

export default function RestoreDraftButton({ draftId, version }: RestoreDraftButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleRestore = () => {
    startTransition(async () => {
      const res = await restoreDraftVersionAction(draftId);
      if (res?.error) {
        alert(`Restore Error: ${res.error}`);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleRestore}
      disabled={isPending}
      className="px-2.5 py-1 rounded text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-50 flex items-center gap-1"
    >
      {isPending ? 'Restoring...' : `Restore V${version}`}
    </button>
  );
}
