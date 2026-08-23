'use client';

import React, { useState, useTransition } from 'react';
import { sendManualEmailAction } from '@/app/outreach/actions';

interface ComposeMailFormProps {
  brands: any[];
  recentSent: any[];
}

const TEMPLATES = [
  {
    name: 'Sponsorship Pitch',
    subject: 'Hydrasaurus Agency x {BrandName} — Creator Roster Partnership Proposal',
    body: `Hi {ContactName},

I hope you're having a great week.

I'm reaching out from Hydrasaurus Agency (Gaming Creator Management & Livestream Operations). We represent 27 top gaming creators with 580K+ combined audience across YouTube & Kick.

We've been following {BrandName}'s recent campaigns and believe our creator roster would be a perfect fit for an integrated livestream sponsorship & product placement campaign.

Would you be open for a quick 10-minute intro call this Thursday or Friday to discuss potential collaboration angles?

Best regards,

Hydrasaurus Agency Partnerships
management@hydrasaurusagency.in`
  },
  {
    name: 'Media Kit & Rates',
    subject: 'Hydrasaurus Creator Roster 2026 — Media Kit & Campaign Packages',
    body: `Hi {ContactName},

Thanks for reaching out!

Please find below our updated 2026 Agency Creator Media Kit and standard livestream integration packages:

- Livestream Overlay Banner & Dedicated Shoutout: $1,500 / month
- Dedicated YouTube Integration Video (60s): $3,000 / video
- Multi-Creator Gaming Tournament Sponsorship: $7,500 / event

Let me know which package aligns best with your Q3/Q4 marketing budget!

Best regards,

Hydrasaurus Agency Partnerships
management@hydrasaurusagency.in`
  },
  {
    name: 'Follow Up',
    subject: 'Following Up: Hydrasaurus Agency x {BrandName}',
    body: `Hi {ContactName},

Just following up on my previous email regarding creator sponsorship opportunities with Hydrasaurus Agency.

Do you have 5 minutes this week to connect?

Best regards,

Hydrasaurus Agency Partnerships
management@hydrasaurusagency.in`
  }
];

export default function ComposeMailForm({ brands, recentSent }: ComposeMailFormProps) {
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrandId(brandId);
    if (!brandId) return;
    const brand = brands.find(b => b.id === brandId);
    if (brand && brand.contacts && brand.contacts.length > 0) {
      setToEmail(brand.contacts[0].email || '');
    }
  };

  const handleApplyTemplate = (template: typeof TEMPLATES[0]) => {
    const brand = brands.find(b => b.id === selectedBrandId);
    const brandName = brand ? brand.name : 'Your Brand';
    const contactName = brand && brand.contacts?.[0]?.name ? brand.contacts[0].name : 'Marketing Team';

    setSubject(template.subject.replace('{BrandName}', brandName));
    setBody(template.body.replace(/{BrandName}/g, brandName).replace(/{ContactName}/g, contactName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEmail || !subject || !body) {
      setStatusMsg({ type: 'error', text: 'Please complete To Email, Subject, and Body fields.' });
      return;
    }

    setStatusMsg(null);

    const formData = new FormData();
    formData.append('brandId', selectedBrandId);
    formData.append('toEmail', toEmail);
    formData.append('subject', subject);
    formData.append('body', body);

    startTransition(async () => {
      const res: any = await sendManualEmailAction(formData);
      if (res?.error) {
        setStatusMsg({ type: 'error', text: res.error });
      } else {
        setStatusMsg({ type: 'success', text: `Email successfully dispatched via Zoho Mail! Message ID: ${res.messageId}` });
        setSubject('');
        setBody('');
        setToEmail('');
        setSelectedBrandId('');
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Compose Form (2 Columns) */}
      <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">mail</span>
            New Message
          </h2>

          {/* Quick Templates Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Insert Template:</span>
            {TEMPLATES.map(t => (
              <button
                key={t.name}
                type="button"
                onClick={() => handleApplyTemplate(t)}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-semibold text-gray-300 border border-white/10 transition-all"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand Link Dropdown */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
              Link to Brand CRM Record (Optional)
            </label>
            <select
              value={selectedBrandId}
              onChange={e => handleBrandSelect(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="">-- Direct External Recipient (No CRM Brand Linked) --</option>
              {brands.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.contacts?.[0]?.email || 'No email recorded'})
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Email */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
              To (Recipient Email Address) *
            </label>
            <input
              type="email"
              required
              value={toEmail}
              onChange={e => setToEmail(e.target.value)}
              placeholder="brand.contact@company.com"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          {/* Subject Line */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
              Subject Line *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Creator Sponsorship Inquiry — Hydrasaurus Agency"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Email Body */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
              Email Content / Body Pitch *
            </label>
            <textarea
              rows={12}
              required
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your email body pitch here..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-gray-200 font-sans leading-relaxed focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Status Message Alert */}
          {statusMsg && (
            <div className={`p-3 rounded-xl text-xs font-mono ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}>
              {statusMsg.text}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setSubject('');
                setBody('');
                setToEmail('');
                setSelectedBrandId('');
                setStatusMsg(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-semibold transition-all"
            >
              Clear Form
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <span className={`material-symbols-outlined text-sm ${isPending ? 'animate-spin' : ''}`}>
                {isPending ? 'sync' : 'send'}
              </span>
              {isPending ? 'Dispatching via Zoho Mail...' : 'Send Email Now'}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Dispatches Sidebar (1 Column) */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl h-fit">
        <h2 className="text-xs font-bold text-white uppercase font-mono border-b border-white/10 pb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-emerald-400">history</span>
          Recent Outbound Dispatches
        </h2>

        <div className="space-y-3">
          {recentSent.length === 0 ? (
            <div className="text-xs text-gray-500 italic py-4 text-center">No emails sent yet.</div>
          ) : (
            recentSent.map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span className="font-bold text-white">{item.brand?.name || 'Manual Recipient'}</span>
                  <span>{new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="font-semibold text-gray-200 line-clamp-1">{item.subject}</div>
                <div className="text-[10px] text-gray-400 font-mono truncate">To: {item.recipient}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
