import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { addBrandNoteAction } from '../../actions';
import BrandStatusSelect from '@/components/outreach/BrandStatusSelect';
import BrandActionButtons from '@/components/outreach/BrandActionButtons';
import RestoreDraftButton from '@/components/outreach/RestoreDraftButton';

export const dynamic = 'force-dynamic';

export default async function BrandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const brandId = resolvedParams?.id;

  if (!brandId) {
    notFound();
  }

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    include: {
      contacts: true,
      researchProfile: true,
      emailDrafts: { orderBy: { version: 'desc' } },
      notes: { orderBy: { createdAt: 'desc' } },
      activities: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!brand || brand.isArchived) {
    notFound();
  }

  const latestDraft = brand.emailDrafts[0] || null;
  const research = brand.researchProfile || null;
  const nextVersion = latestDraft ? latestDraft.version + 1 : 1;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/outreach/brands" className="text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">{brand.name}</h1>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/30">
              Score: {brand.leadScore}/100
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            {brand.website} • {brand.category} • Created {new Date(brand.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Changer */}
          <BrandStatusSelect brandId={brandId} currentStatus={brand.status} />

          {/* AI Action Buttons with Loading States */}
          <BrandActionButtons
            brandId={brandId}
            hasDraft={Boolean(latestDraft)}
            nextVersion={nextVersion}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Research & Pitch Email Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Research Overview */}
          <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-4 shadow-2xl">
            <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-400 text-sm">analytics</span>
              AI Research & Creator Matching Rationale
            </h2>

            {research ? (
              <div className="space-y-3 text-xs">
                <p className="text-gray-300 leading-relaxed">{research.description}</p>
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-purple-200">
                  <strong>Matched Rationale:</strong> {research.autoPitchReasoning}
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-gray-500 block">Recommended Type</span>
                    <span className="text-gray-200 font-bold">{research.recommendedType}</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-gray-500 block">Target Audience</span>
                    <span className="text-gray-200 font-bold">{research.targetAudience}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 font-mono">
                No research profile generated yet. Click "Run AI Research" to analyze brand fit.
              </p>
            )}
          </div>

          {/* AI Email Drafts & Version History */}
          <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm">history_edu</span>
                Versioned Outreach Email Pitch Drafts ({brand.emailDrafts.length})
              </h2>

              {latestDraft && (
                <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase border ${
                  latestDraft.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  Active Version: V{latestDraft.version} ({latestDraft.status})
                </span>
              )}
            </div>

            {brand.emailDrafts.length === 0 ? (
              <p className="text-xs text-gray-500 font-mono">
                No draft generated yet. Click "Generate Email Draft" to create Version 1.
              </p>
            ) : (
              <div className="space-y-4">
                {brand.emailDrafts.map((draft: any) => (
                  <div 
                    key={draft.id}
                    className={`p-4 rounded-xl border transition-all ${
                      draft.id === latestDraft?.id 
                        ? 'bg-gradient-to-r from-red-950/20 to-black border-red-500/40 shadow-lg' 
                        : 'bg-black/30 border-white/5 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-red-400">Version V{draft.version}</span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {new Date(draft.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {draft.id !== latestDraft?.id && (
                        <RestoreDraftButton draftId={draft.id} version={draft.version} />
                      )}
                    </div>

                    <div className="text-xs font-bold text-white mb-2">{draft.subject}</div>
                    <pre className="text-xs text-gray-300 font-sans whitespace-pre-wrap bg-black/50 p-3 rounded-lg border border-white/5 leading-relaxed">
                      {draft.body}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact Details, Notes & Audit Activity */}
        <div className="space-y-6">
          {/* Primary Contacts */}
          <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-3 shadow-2xl">
            <h3 className="text-xs font-bold text-white uppercase font-mono">Primary Brand Contact</h3>
            {brand.contacts[0] ? (
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                <div className="font-bold text-white">{brand.contacts[0].name}</div>
                <div className="text-gray-400 font-mono">{brand.contacts[0].email}</div>
                <div className="text-[10px] text-gray-500">{brand.contacts[0].role}</div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 font-mono">No contact recorded.</p>
            )}
          </div>

          {/* Notes Section */}
          <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-3 shadow-2xl">
            <h3 className="text-xs font-bold text-white uppercase font-mono">Campaign Notes ({brand.notes.length})</h3>

            <form action={async (formData: FormData) => {
              'use server';
              const content = formData.get('content') as string;
              await addBrandNoteAction(brandId, content);
            }} className="space-y-2">
              <textarea
                name="content"
                required
                rows={2}
                placeholder="Add team note or call response..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
              >
                Add Note
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brand.notes.map((note: any) => (
                <div key={note.id} className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs space-y-1">
                  <div className="text-gray-300">{note.content}</div>
                  <div className="text-[10px] text-gray-500 font-mono">{new Date(note.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
