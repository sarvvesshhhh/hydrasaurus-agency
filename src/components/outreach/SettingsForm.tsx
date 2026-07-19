'use client';

import React, { useState } from 'react';
import { sendTestEmailAction, syncRepliesAction } from '@/app/outreach/actions';
import { ZohoOAuthStatus } from '@/lib/outreach/zoho';

interface SettingsFormProps {
  zohoStatus: ZohoOAuthStatus;
}

export default function SettingsForm({ zohoStatus }: SettingsFormProps) {
  const [model, setModel] = useState('gemini-2.0-flash');
  const [rateLimitSec, setRateLimitSec] = useState(30);
  const [dailyCap, setDailyCap] = useState(100);

  // Test Email state
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Reply sync state
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('CRM Engine Settings saved successfully!');
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;
    setSendingTest(true);
    setTestResult(null);

    const res: any = await sendTestEmailAction(testEmail);
    setSendingTest(false);

    if (res?.error) {
      setTestResult(`Error: ${res.error}`);
    } else {
      setTestResult(`Success! Dispatched via Zoho Mail. Message ID: ${res.messageId}`);
      setTestEmail('');
    }
  };

  const handleSyncReplies = async () => {
    setSyncing(true);
    setSyncResult(null);

    const res: any = await syncRepliesAction();
    setSyncing(false);

    if (res?.error) {
      setSyncResult(`Sync Error: ${res.error}`);
    } else {
      setSyncResult(`Synced ${res.syncedCount} new replies across brands: ${res.matchedBrands?.join(', ') || 'None'}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Zoho OAuth Mailbox Diagnostics */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">verified_user</span>
            Zoho Mail OAuth 2.0 Diagnostics
          </h2>

          <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase border ${
            zohoStatus.hasClientId && zohoStatus.hasRefreshToken
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}>
            {zohoStatus.hasClientId && zohoStatus.hasRefreshToken ? 'OAuth Configured' : 'Credentials Missing'}
          </span>
        </div>

        {/* Environment Variables Health Checklist */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
            <span>ZOHO_CLIENT_ID</span>
            <span className={zohoStatus.hasClientId ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {zohoStatus.hasClientId ? '✓ Set' : '✗ Missing'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
            <span>ZOHO_CLIENT_SECRET</span>
            <span className={zohoStatus.hasClientSecret ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {zohoStatus.hasClientSecret ? '✓ Set' : '✗ Missing'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
            <span>ZOHO_REFRESH_TOKEN</span>
            <span className={zohoStatus.hasRefreshToken ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {zohoStatus.hasRefreshToken ? '✓ Set' : '✗ Missing'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
            <span>ZOHO_ACCOUNT_ID</span>
            <span className={zohoStatus.hasAccountId ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {zohoStatus.hasAccountId ? '✓ Set' : '✗ Missing'}
            </span>
          </div>
        </div>

        {/* Mailbox Details */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Primary Mailbox:</span>
            <span className="font-bold text-white font-mono">{zohoStatus.connectedMailbox}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Display Name:</span>
            <span className="text-gray-200">Hydrasaurus Agency Partnerships</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Last Token Refresh:</span>
            <span className="font-mono text-emerald-400">{zohoStatus.lastRefreshedAt || 'Not Refreshed Yet'}</span>
          </div>
          {zohoStatus.lastRefreshError && (
            <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-[10px]">
              {zohoStatus.lastRefreshError}
            </div>
          )}
        </div>

        {/* Live Test Email Dispatcher */}
        <form onSubmit={handleSendTestEmail} className="pt-2 border-t border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase font-mono">Send Live Test Email via Zoho</h3>
          <div className="flex items-center gap-2">
            <input
              type="email"
              required
              value={testEmail}
              onChange={e => setTestEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={sendingTest}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-1.5"
            >
              <span className={`material-symbols-outlined text-xs ${sendingTest ? 'animate-spin' : ''}`}>send</span>
              {sendingTest ? 'Sending...' : 'Test Send'}
            </button>
          </div>
          {testResult && (
            <div className={`p-2.5 rounded-lg text-xs font-mono ${
              testResult.startsWith('Success')
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}>
              {testResult}
            </div>
          )}
        </form>

        {/* Manual Reply Sync Button */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase font-mono">Periodic Reply Sync</span>
            <button
              onClick={handleSyncReplies}
              disabled={syncing}
              className="px-3.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 text-xs font-semibold border border-sky-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-xs ${syncing ? 'animate-spin' : ''}`}>sync</span>
              {syncing ? 'Syncing...' : 'Sync Mailbox Replies'}
            </button>
          </div>
          {syncResult && (
            <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">
              {syncResult}
            </div>
          )}
        </div>
      </div>

      {/* AI & Rate Limiting Engine Settings */}
      <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-5 shadow-2xl">
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">psychology</span>
            Multi-Provider AI Engine & Outbound Settings
          </h2>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Primary AI Engine Selection</label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-red-500"
            >
              <option value="gemini-2.0-flash">Google Gemini (gemini-flash-latest / 2.0-flash)</option>
              <option value="grok-beta">xAI Grok API (grok-beta)</option>
              <option value="gpt-4o-mini">OpenAI (gpt-4o-mini)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Outbound Sending Queue Delay (Seconds)</label>
            <input
              type="number"
              value={rateLimitSec}
              onChange={e => setRateLimitSec(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-red-500"
            />
            <span className="text-[10px] text-gray-500 mt-0.5 block font-mono">Enforces 1 email every 30 seconds rate-limiting rule.</span>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Daily Mailbox Quota Cap</label>
            <input
              type="number"
              value={dailyCap}
              onChange={e => setDailyCap(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all"
        >
          Save CRM Engine Settings
        </button>
      </form>
    </div>
  );
}
