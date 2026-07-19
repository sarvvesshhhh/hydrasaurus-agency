import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { createBrandAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    where: { isArchived: false },
    include: { contacts: true, emailDrafts: true, sentEmails: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-black to-black border border-red-500/20 shadow-2xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">business_center</span>
            Brand CRM Data Directory
          </h1>
          <p className="text-xs text-gray-400">
            Persistent PostgreSQL database list of target sponsors, pipeline statuses, lead scores, and primary contacts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/outreach/discovery"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm text-red-400">travel_explore</span>
            AI Brand Discovery
          </Link>
        </div>
      </div>

      {/* Brand Creation Form / Modal */}
      <div className="p-6 rounded-2xl bg-[#0C0C10] border border-white/10 shadow-2xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-red-500 text-sm">add_business</span>
          Add New Target Brand
        </h2>

        <form action={async (formData: FormData) => {
          'use server';
          await createBrandAction(formData);
        }} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Brand Name (e.g. Red Bull)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="website"
            required
            placeholder="Website (e.g. redbull.com)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="category"
            required
            placeholder="Category (e.g. Energy Drinks)"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Contact Email"
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Brand
          </button>
        </form>
      </div>

      {/* Brands Table */}
      <div className="rounded-2xl bg-[#0C0C10] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-black/60 text-gray-400 font-mono text-[11px] uppercase border-b border-white/10">
              <tr>
                <th className="p-4">Brand Name & Category</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4 text-center">Lead Score</th>
                <th className="p-4">Primary Contact</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 font-mono">
                    No active brands in database. Click "Add New Target Brand" above or run AI Brand Discovery.
                  </td>
                </tr>
              ) : (
                brands.map((brand: any) => (
                  <tr key={brand.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <Link href={`/outreach/brands/${brand.id}`} className="font-bold text-white hover:text-red-400 text-sm flex items-center gap-2">
                        {brand.name}
                        <span className="material-symbols-outlined text-xs text-gray-500">open_in_new</span>
                      </Link>
                      <span className="text-[10px] text-gray-400 font-mono">{brand.website} • {brand.category}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase border ${
                        brand.status === 'PARTNERSHIP_SIGNED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        brand.status === 'MEETING_SCHEDULED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                        brand.status === 'INTERESTED' ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' :
                        brand.status === 'AWAITING_APPROVAL' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-white/5 text-gray-300 border-white/10'
                      }`}>
                        {brand.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-mono font-bold text-sm text-red-400">{brand.leadScore}</span>
                    </td>
                    <td className="p-4 font-mono text-gray-300">
                      {brand.contacts[0]?.name || 'N/A'}
                      <div className="text-[10px] text-gray-500">{brand.contacts[0]?.email || 'No Email'}</div>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/outreach/brands/${brand.id}`}
                        className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold border border-red-500/30 transition-all inline-flex items-center gap-1"
                      >
                        Manage 360°
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
