import { z } from 'zod';

export type UserRole = 'ADMIN' | 'MANAGER' | 'VIEWER';

export type BrandStatus = 
  | 'PENDING'
  | 'RESEARCHING'
  | 'RESEARCH_COMPLETE'
  | 'DRAFT_GENERATED'
  | 'AWAITING_APPROVAL'
  | 'SENT'
  | 'INTERESTED'
  | 'NOT_INTERESTED'
  | 'NEED_MORE_INFO'
  | 'MEETING_SCHEDULED'
  | 'PARTNERSHIP_SIGNED'
  | 'FOLLOW_UP_REQUIRED'
  | 'CLOSED';

export type DraftStatus = 'DRAFT' | 'APPROVED' | 'REJECTED';
export type DispatchStatus = 'QUEUED' | 'SENDING' | 'SENT' | 'FAILED';
export type FollowUpStatus = 'SCHEDULED' | 'SENT' | 'CANCELLED';

export type KnowledgeCategory = 
  | 'PITCH_DECK'
  | 'AGENCY_INTRO'
  | 'CREATOR_BIO'
  | 'CASE_STUDY'
  | 'SPONSORSHIP_PACKAGE'
  | 'FAQ';

export interface Creator {
  id: string;
  name: string;
  platform: 'YouTube' | 'Kick' | 'Twitch' | string;
  category: string;
  subscribers: string;
  followers: string;
  avgViews: string;
  country: string;
  languages: string[];
  bio?: string;
  youtubeUrl?: string;
  kickUrl?: string;
  isActive: boolean;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  brandId: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  isPrimary: boolean;
}

export interface ResearchProfile {
  id: string;
  brandId: string;
  description: string;
  productCategory: string;
  targetAudience: string;
  brandPositioning: string;
  brandTone: string;
  marketingStyle: string;
  creatorOpportunities: string;
  sponsorshipAngles: string;
  audienceOverlap: string;
  recommendedType: string;
  matchedCreatorIds: string[];
  autoPitchReasoning: string;
  rawInsights?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailDraft {
  id: string;
  brandId: string;
  subject: string;
  body: string;
  matchedCreatorIds: string[];
  partnershipAngle: string;
  callToAction: string;
  status: DraftStatus;
  version: number;
  editorFeedback?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SentEmail {
  id: string;
  brandId: string;
  draftId?: string;
  mailboxId: string;
  recipient: string;
  subject: string;
  body: string;
  zohoMessageId?: string;
  status: DispatchStatus;
  sentAt?: string;
  openedAt?: string;
  repliedAt?: string;
  replyContent?: string;
  sentiment?: BrandStatus;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  brandId: string;
  sequenceNumber: number;
  scheduledFor: string;
  subject: string;
  body: string;
  status: FollowUpStatus;
  sentAt?: string;
}

export interface MediaKit {
  id: string;
  brandId: string;
  agencyIntro: string;
  matchedCreators: Creator[];
  totalReach: string;
  partnershipIdeas: { title: string; desc: string; price: string }[];
  pdfUrl?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  brandId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  brandId?: string;
  userId?: string;
  type: string;
  title: string;
  details?: string;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  tags: string[];
  isActive: boolean;
  isArchived?: boolean;
  createdAt: string;
}

export interface Mailbox {
  id: string;
  email: string;
  displayName: string;
  zohoClientId?: string;
  zohoSecret?: string;
  refreshToken?: string;
  isDefault: boolean;
  dailyLimit: number;
  sentToday: number;
}

export interface LeadScoreBreakdown {
  score: number;
  brandSizeScore: number;
  gamingRelScore: number;
  sponsHistScore: number;
  contactQualScore: number;
  audienceOverScore: number;
}

export interface Brand {
  id: string;
  name: string;
  website: string;
  category: string;
  status: BrandStatus;
  leadScore: number; // 0 - 100
  brandSizeScore: number;
  gamingRelScore: number;
  sponsHistScore: number;
  contactQualScore: number;
  audienceOverScore: number;
  notesCount: number;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
  contacts?: Contact[];
  researchProfile?: ResearchProfile | null;
  emailDrafts?: EmailDraft[];
  sentEmails?: SentEmail[];
  followUps?: FollowUp[];
  mediaKits?: MediaKit[];
  notes?: Note[];
  activities?: Activity[];
}

export interface DashboardMetrics {
  totalBrands: number;
  sentCount: number;
  pendingApproval: number;
  activeConversations: number;
  meetingsScheduled: number;
  signedPartnerships: number;
  followUpsDue: number;
  replyRate: string;
  conversionRate: string;
}

// Zod Schemas
export const BrandFormSchema = z.object({
  name: z.string().min(2, "Brand name is required"),
  website: z.string().url("Valid website URL required"),
  category: z.string().min(2, "Category is required"),
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: z.string().email("Valid email required"),
  contactRole: z.string().optional(),
});

export const CreatorFormSchema = z.object({
  name: z.string().min(2, "Creator name is required"),
  platform: z.string().min(2, "Platform required"),
  category: z.string().min(2, "Category required"),
  subscribers: z.string().min(1, "Subscribers count required"),
  followers: z.string().min(1, "Followers count required"),
  avgViews: z.string().min(1, "Average views required"),
  country: z.string().default("India"),
  languages: z.string().default("English, Hindi"),
  bio: z.string().optional(),
  youtubeUrl: z.string().optional(),
  kickUrl: z.string().optional(),
});

export const KnowledgeFormSchema = z.object({
  title: z.string().min(3, "Title required"),
  category: z.enum(['PITCH_DECK', 'AGENCY_INTRO', 'CREATOR_BIO', 'CASE_STUDY', 'SPONSORSHIP_PACKAGE', 'FAQ']),
  content: z.string().min(10, "Content must be detailed"),
  tags: z.string().optional(),
});

export const EditDraftSchema = z.object({
  draftId: z.string(),
  subject: z.string().min(3, "Subject required"),
  body: z.string().min(20, "Body content required"),
});
