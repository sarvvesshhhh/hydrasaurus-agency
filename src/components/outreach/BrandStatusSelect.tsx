'use client';

import React, { useTransition } from 'react';
import { updateBrandStatusAction } from '@/app/outreach/actions';

interface BrandStatusSelectProps {
  brandId: string;
  currentStatus: string;
}

export default function BrandStatusSelect({ brandId, currentStatus }: BrandStatusSelectProps) {
  const [status, setStatus] = React.useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    startTransition(async () => {
      await updateBrandStatusAction(brandId, newStatus as any);
    });
  };

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={handleChange}
      className="bg-black/50 border border-white/10 text-xs text-white rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-red-500 disabled:opacity-50"
    >
      <option value="PENDING">PENDING</option>
      <option value="RESEARCHING">RESEARCHING</option>
      <option value="RESEARCH_COMPLETE">RESEARCH COMPLETE</option>
      <option value="DRAFT_GENERATED">DRAFT GENERATED</option>
      <option value="AWAITING_APPROVAL">AWAITING APPROVAL</option>
      <option value="SENT">SENT</option>
      <option value="INTERESTED">INTERESTED</option>
      <option value="MEETING_SCHEDULED">MEETING SCHEDULED</option>
      <option value="PARTNERSHIP_SIGNED">PARTNERSHIP SIGNED</option>
      <option value="NOT_INTERESTED">NOT INTERESTED</option>
    </select>
  );
}
