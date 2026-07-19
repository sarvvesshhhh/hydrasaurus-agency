'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { runAIBrandResearch, generateAIEmailDraft } from '@/lib/outreach/openai';
import { sendTestEmail, processOutboundQueue, syncReplies } from '@/lib/outreach/zoho';
import { UserRole } from '@/lib/outreach/types';

/**
 * Gets active session user role from cookies
 */
export async function getActiveRole(): Promise<UserRole> {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get('outreach_role')?.value as UserRole;
  return roleCookie || 'ADMIN';
}

/**
 * Sets active session user role cookie
 */
export async function setActiveRoleAction(role: UserRole) {
  const cookieStore = await cookies();
  cookieStore.set('outreach_role', role, { path: '/', httpOnly: true });
  revalidatePath('/outreach');
  return { success: true, role };
}

/**
 * RBAC Permission Guard
 */
async function enforcePermission(allowedRoles: UserRole[]) {
  const currentRole = await getActiveRole();
  if (!allowedRoles.includes(currentRole)) {
    throw new Error(`403 Forbidden: Your role (${currentRole}) is not permitted to perform this action.`);
  }
}

// Revalidation helper across all CRM subpages
function revalidateOutreachPages() {
  revalidatePath('/outreach');
  revalidatePath('/outreach/brands');
  revalidatePath('/outreach/creators');
  revalidatePath('/outreach/knowledge');
  revalidatePath('/outreach/review');
  revalidatePath('/outreach/queue');
  revalidatePath('/outreach/analytics');
}

// ============================================================================
// BRANDS SERVER ACTIONS
// ============================================================================

export async function createBrandAction(formData: FormData) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  const name = formData.get('name') as string;
  const website = formData.get('website') as string;
  const category = formData.get('category') as string;
  const email = formData.get('email') as string;
  const contactName = formData.get('contactName') as string;

  if (!name || !website || !email) {
    return { error: 'Missing required fields (Name, Website, Email)' };
  }

  const brand = await prisma.brand.create({
    data: {
      name,
      website: website.startsWith('http') ? website : `https://${website}`,
      category: category || 'Gaming Sponsor',
      status: 'PENDING',
      leadScore: 80,
      contacts: {
        create: [
          {
            name: contactName || 'Marketing Lead',
            email,
            role: 'Partnerships Lead',
            isPrimary: true
          }
        ]
      }
    }
  });

  await prisma.activity.create({
    data: {
      brandId: brand.id,
      type: 'BRAND_CREATED',
      title: `Brand ${name} Created in CRM`
    }
  });

  revalidateOutreachPages();
  return { success: true, brandId: brand.id };
}

export async function updateBrandStatusAction(brandId: string, status: any) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  await prisma.brand.update({
    where: { id: brandId },
    data: { status, updatedAt: new Date(), lastActivityAt: new Date() }
  });

  await prisma.activity.create({
    data: {
      brandId,
      type: 'STATUS_CHANGE',
      title: `Brand Status Updated to ${status}`
    }
  });

  revalidateOutreachPages();
  return { success: true };
}

export async function deleteBrandAction(brandId: string) {
  await enforcePermission(['ADMIN']);

  // Soft delete / archive brand
  await prisma.brand.update({
    where: { id: brandId },
    data: { isArchived: true }
  });

  revalidateOutreachPages();
  return { success: true };
}

export async function addBrandNoteAction(brandId: string, content: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  if (!content || content.trim() === '') return { error: 'Note content cannot be empty' };

  const note = await prisma.note.create({
    data: {
      brandId,
      author: 'Hydrasaurus Team',
      content
    }
  });

  await prisma.brand.update({
    where: { id: brandId },
    data: { notesCount: { increment: 1 } }
  });

  revalidateOutreachPages();
  return { success: true, note };
}

// ============================================================================
// CREATORS SERVER ACTIONS
// ============================================================================

export async function createCreatorAction(formData: FormData) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  const name = formData.get('name') as string;
  const platform = formData.get('platform') as string;
  const category = formData.get('category') as string;
  const subscribers = formData.get('subscribers') as string;
  const followers = formData.get('followers') as string;
  const avgViews = formData.get('avgViews') as string;
  const bio = formData.get('bio') as string;
  const youtubeUrl = formData.get('youtubeUrl') as string;
  const kickUrl = formData.get('kickUrl') as string;

  if (!name || !platform || !category) {
    return { error: 'Missing required creator details' };
  }

  const creator = await prisma.creator.create({
    data: {
      name,
      platform,
      category,
      subscribers: subscribers || '0',
      followers: followers || '0',
      avgViews: avgViews || '0',
      bio,
      youtubeUrl,
      kickUrl,
      isActive: true,
      isArchived: false
    }
  });

  revalidateOutreachPages();
  return { success: true, creatorId: creator.id };
}

export async function deleteCreatorAction(creatorId: string) {
  await enforcePermission(['ADMIN']);

  // Soft delete creator
  await prisma.creator.update({
    where: { id: creatorId },
    data: { isArchived: true, isActive: false }
  });

  revalidateOutreachPages();
  return { success: true };
}

// ============================================================================
// KNOWLEDGE BASE SERVER ACTIONS
// ============================================================================

export async function createKnowledgeItemAction(formData: FormData) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  const title = formData.get('title') as string;
  const category = formData.get('category') as any;
  const content = formData.get('content') as string;
  const tagsString = formData.get('tags') as string;

  if (!title || !content || !category) {
    return { error: 'Title, category, and content are required' };
  }

  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

  const item = await prisma.knowledgeItem.create({
    data: {
      title,
      category,
      content,
      tags,
      isActive: true,
      isArchived: false
    }
  });

  revalidateOutreachPages();
  return { success: true, itemId: item.id };
}

export async function deleteKnowledgeItemAction(itemId: string) {
  await enforcePermission(['ADMIN']);

  await prisma.knowledgeItem.update({
    where: { id: itemId },
    data: { isArchived: true, isActive: false }
  });

  revalidateOutreachPages();
  return { success: true };
}

// ============================================================================
// AI RESEARCH & VERSIONED DRAFT GENERATION
// ============================================================================

export async function triggerResearchAction(brandId: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  try {
    const profile = await runAIBrandResearch(brandId);
    revalidateOutreachPages();
    return { success: true, profile };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function generateDraftAction(brandId: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  try {
    const draft = await generateAIEmailDraft(brandId);
    revalidateOutreachPages();
    return { success: true, draft };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function restoreDraftVersionAction(draftId: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  const targetDraft = await prisma.emailDraft.findUnique({
    where: { id: draftId }
  });

  if (!targetDraft) return { error: 'Target draft version not found' };

  // Set selected draft to APPROVED/active
  await prisma.emailDraft.update({
    where: { id: draftId },
    data: { status: 'DRAFT' }
  });

  await prisma.brand.update({
    where: { id: targetDraft.brandId },
    data: { status: 'DRAFT_GENERATED' }
  });

  revalidateOutreachPages();
  return { success: true };
}

export async function approveDraftAction(draftId: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  const draft = await prisma.emailDraft.update({
    where: { id: draftId },
    data: { status: 'APPROVED' }
  });

  await prisma.brand.update({
    where: { id: draft.brandId },
    data: { status: 'AWAITING_APPROVAL' }
  });

  await prisma.activity.create({
    data: {
      brandId: draft.brandId,
      type: 'DRAFT_APPROVED',
      title: `Email Draft V${draft.version} Approved for Sending`
    }
  });

  revalidateOutreachPages();
  return { success: true };
}

export async function updateDraftBodyAction(draftId: string, subject: string, body: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  await prisma.emailDraft.update({
    where: { id: draftId },
    data: { subject, body, updatedAt: new Date() }
  });

  revalidateOutreachPages();
  return { success: true };
}

// ============================================================================
// SYSTEM DISPATCH & MAILBOX ACTIONS
// ============================================================================

export async function sendTestEmailAction(toEmail: string) {
  await enforcePermission(['ADMIN', 'MANAGER']);

  try {
    const result = await sendTestEmail(toEmail);
    revalidateOutreachPages();
    return { success: true, messageId: result.messageId };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function processOutboundQueueAction() {
  await enforcePermission(['ADMIN', 'MANAGER']);

  try {
    const result = await processOutboundQueue();
    revalidateOutreachPages();
    return { success: true, processed: result.processed, failed: result.failed };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function syncRepliesAction() {
  await enforcePermission(['ADMIN', 'MANAGER']);

  try {
    const result = await syncReplies();
    revalidateOutreachPages();
    return { success: true, syncedCount: result.syncedCount, matchedBrands: result.matchedBrands };
  } catch (err: any) {
    return { error: err.message };
  }
}
