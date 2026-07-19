import React from 'react';
import { prisma } from '@/lib/db';
import { createCreatorAction, deleteCreatorAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function CreatorsPage() {
  const creators = await prisma.creator.findMany({
    where: { isArchived: false },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-red-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">groups</span>
            Agency Creator Roster Database
          </h1>
          <p className="text-xs text-gray-400">
            Persistent PostgreSQL database of exclusive gaming creators, streamers, reach metrics, and categories.
          </p>
        </div>
      </div>

      {/* Add Creator Form */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 shadow-2xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-red-500 text-sm">person_add</span>
          Add New Roster Creator
        </h2>

        <form action={async (formData: FormData) => {
          'use server';
          await createCreatorAction(formData);
        }} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Creator Name (e.g. PN Syed)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="platform"
            required
            placeholder="Platform (e.g. YouTube / Kick)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="category"
            required
            placeholder="Category (e.g. Gaming / GTA RP)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="subscribers"
            required
            placeholder="Subscribers (e.g. 115K)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="followers"
            required
            placeholder="Followers (e.g. 45K)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="avgViews"
            required
            placeholder="Avg Views (e.g. 35K)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio / Channel Summary"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 md:col-span-2"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 md:col-span-4"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Save Creator to Roster Database
          </button>
        </form>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creators.map((creator: any) => (
          <div key={creator.id} className="p-5 rounded-2xl bg-[#0C0C10] border border-white/10 space-y-3 shadow-xl relative group">
            <div className="flex items-center justify-between">
              <div className="font-extrabold text-white text-base">{creator.name}</div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                {creator.platform}
              </span>
            </div>

            <div className="text-xs text-gray-400 font-mono">{creator.category}</div>
            {creator.bio && <p className="text-xs text-gray-300 leading-relaxed">{creator.bio}</p>}

            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div>
                <span className="text-gray-500 block text-[9px]">Subs</span>
                <span className="font-bold text-white">{creator.subscribers}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[9px]">Followers</span>
                <span className="font-bold text-white">{creator.followers}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[9px]">Avg Views</span>
                <span className="font-bold text-white">{creator.avgViews}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Creator
              </span>

              <form action={async () => {
                'use server';
                await deleteCreatorAction(creator.id);
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
          </div>
        ))}
      </div>
    </div>
  );
}
