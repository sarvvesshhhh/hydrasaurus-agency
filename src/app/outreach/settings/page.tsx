import React from 'react';
import { getZohoStatus } from '@/lib/outreach/zoho';
import SettingsForm from '@/components/outreach/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const zohoStatus = getZohoStatus();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/10 to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">settings</span>
            CRM Mailbox & OAuth Engine Settings
          </h1>
          <p className="text-xs text-gray-400">
            Configure primary Zoho Mail OAuth credentials, test live dispatches from <strong>management@hydrasaurusagency.in</strong>, and manage Multi-Provider AI parameters.
          </p>
        </div>
      </div>

      <SettingsForm zohoStatus={zohoStatus} />
    </div>
  );
}
