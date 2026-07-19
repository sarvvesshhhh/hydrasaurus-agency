import React from 'react';
import { prisma } from '@/lib/db';
import { createKnowledgeItemAction, deleteKnowledgeItemAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function KnowledgeBasePage() {
  const items = await prisma.knowledgeItem.findMany({
    where: { isArchived: false },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">auto_stories</span>
            Agency RAG Knowledge Base
          </h1>
          <p className="text-xs text-gray-400">
            Persistent PostgreSQL knowledge base providing real pitch deck facts, demographics, and sponsorship tiers to OpenAI.
          </p>
        </div>
      </div>

      {/* Add Knowledge Item Form */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 shadow-2xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-red-500 text-sm">note_add</span>
          Add Knowledge Base Entry
        </h2>

        <form action={async (formData: FormData) => {
          'use server';
          await createKnowledgeItemAction(formData);
        }} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              name="title"
              required
              placeholder="Entry Title (e.g. Master Pitch Deck 2026)"
              className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 md:col-span-2"
            />
            <select
              name="category"
              required
              className="bg-black/50 border border-white/10 text-xs text-white rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-red-500"
            >
              <option value="PITCH_DECK">PITCH DECK</option>
              <option value="AGENCY_INTRO">AGENCY INTRO</option>
              <option value="CREATOR_BIO">CREATOR BIO</option>
              <option value="CASE_STUDY">CASE STUDY</option>
              <option value="SPONSORSHIP_PACKAGE">SPONSORSHIP PACKAGE</option>
              <option value="FAQ">FAQ</option>
            </select>
          </div>

          <textarea
            name="content"
            required
            rows={3}
            placeholder="Detailed facts, metrics, pricing tiers, demographics, or partnership guidelines..."
            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />

          <div className="flex items-center gap-3">
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated, e.g. deck, pricing, gta rp)"
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="py-2 px-5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">add_link</span>
              Save Knowledge Entry
            </button>
          </div>
        </form>
      </div>

      {/* Knowledge Base Entries List */}
      <div className="space-y-4">
        {items.map((item: any) => (
          <div key={item.id} className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{item.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                  {item.category.replace(/_/g, ' ')}
                </span>
              </div>

              <form action={async () => {
                'use server';
                await deleteKnowledgeItemAction(item.id);
              }}>
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-bold border border-red-500/20 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">delete</span>
                  Archive
                </button>
              </form>
            </div>

            <pre className="text-xs text-gray-300 font-sans whitespace-pre-wrap bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed">
              {item.content}
            </pre>

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag: any, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-400 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
