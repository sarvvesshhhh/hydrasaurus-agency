import { prisma } from '@/lib/db';
import { classifyReplySentiment } from './openai';
import { SentEmail, BrandStatus } from './types';

// In-memory token storage (NEVER stored in database)
let inMemoryAccessToken: string | null = null;
let tokenExpiresAt: number | null = null;
let lastRefreshedAt: string | null = null;
let lastRefreshError: string | null = null;

export interface ZohoOAuthStatus {
  isConnected: boolean;
  connectedMailbox: string;
  lastRefreshedAt: string | null;
  lastRefreshError: string | null;
  hasClientId: boolean;
  hasClientSecret: boolean;
  hasRefreshToken: boolean;
  hasAccountId: boolean;
}

/**
 * Obtains a valid Zoho OAuth Access Token with automatic refresh handling
 */
export async function getZohoAccessToken(): Promise<string> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = [];
    if (!clientId) missing.push('ZOHO_CLIENT_ID');
    if (!clientSecret) missing.push('ZOHO_CLIENT_SECRET');
    if (!refreshToken) missing.push('ZOHO_REFRESH_TOKEN');
    throw new Error(`Zoho OAuth configuration missing: ${missing.join(', ')} in .env.local`);
  }

  // Return cached token if valid for at least another 60 seconds
  if (inMemoryAccessToken && tokenExpiresAt && tokenExpiresAt > Date.now() + 60000) {
    return inMemoryAccessToken;
  }

  console.log('[Zoho OAuth] Requesting access token refresh from accounts.zoho.in...');

  const authEndpoints = [
    'https://accounts.zoho.in/oauth/v2/token',
    'https://accounts.zoho.com/oauth/v2/token'
  ];

  let lastError: Error | null = null;

  for (const endpoint of authEndpoints) {
    try {
      const params = new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token'
      });

      const response = await fetch(`${endpoint}?${params.toString()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          const token = data.access_token as string;
          inMemoryAccessToken = token;
          const expiresInMs = (data.expires_in || 3600) * 1000;
          tokenExpiresAt = Date.now() + expiresInMs;
          lastRefreshedAt = new Date().toISOString();
          lastRefreshError = null;

          console.log(`[Zoho OAuth] Token refreshed successfully via ${endpoint}. Valid for ${data.expires_in}s.`);
          return token;
        }
      } else {
        const errBody = await response.text();
        console.warn(`[Zoho OAuth Endpoint Error ${endpoint}]:`, errBody);
        lastRefreshError = `HTTP ${response.status}: ${errBody}`;
      }
    } catch (err: any) {
      lastError = err;
      lastRefreshError = err.message;
    }
  }

  throw new Error(`Zoho OAuth token refresh failed. ${lastRefreshError || lastError?.message || 'Check credentials'}`);
}

/**
 * Returns current Zoho OAuth health and connection metadata
 */
export function getZohoStatus(): ZohoOAuthStatus {
  return {
    isConnected: Boolean(inMemoryAccessToken && tokenExpiresAt && tokenExpiresAt > Date.now()),
    connectedMailbox: 'management@hydrasaurusagency.in',
    lastRefreshedAt,
    lastRefreshError,
    hasClientId: Boolean(process.env.ZOHO_CLIENT_ID),
    hasClientSecret: Boolean(process.env.ZOHO_CLIENT_SECRET),
    hasRefreshToken: Boolean(process.env.ZOHO_REFRESH_TOKEN),
    hasAccountId: Boolean(process.env.ZOHO_ACCOUNT_ID)
  };
}

/**
 * Sends a production email via Zoho Mail REST API
 */
export async function sendEmailViaZoho(
  brandId: string,
  draftId: string,
  recipient: string,
  subject: string,
  body: string
): Promise<SentEmail> {
  const accountId = process.env.ZOHO_ACCOUNT_ID;
  const token = await getZohoAccessToken();

  if (!accountId) {
    throw new Error('ZOHO_ACCOUNT_ID is missing in environment variables');
  }

  const fromAddress = 'management@hydrasaurusagency.in';

  const payload = {
    fromAddress,
    toAddress: recipient,
    subject,
    content: body.replace(/\n/g, '<br/>'),
    mailFormat: 'html',
    askReceipt: 'no'
  };

  const mailEndpoints = [
    `https://mail.zoho.in/api/v1/accounts/${accountId}/messages`,
    `https://mail.zoho.com/api/v1/accounts/${accountId}/messages`
  ];

  let resData: any = null;
  let lastErrorMsg = '';

  for (const endpoint of mailEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        resData = await response.json();
        break;
      } else {
        lastErrorMsg = await response.text();
      }
    } catch (e: any) {
      lastErrorMsg = e.message;
    }
  }

  if (!resData) {
    throw new Error(`Zoho Mail dispatch failed: ${lastErrorMsg}`);
  }

  const zohoMessageId = resData.data?.messageId || resData.data?.msgId || `ZOHO_MSG_${Date.now()}`;
  
  // Find or create default mailbox
  let mailbox = await prisma.mailbox.findFirst({
    where: { email: 'management@hydrasaurusagency.in' }
  });

  if (!mailbox) {
    mailbox = await prisma.mailbox.create({
      data: {
        email: 'management@hydrasaurusagency.in',
        displayName: 'Hydrasaurus Agency Management',
        isDefault: true,
        dailyLimit: 100
      }
    });
  }

  const sentEmail = await prisma.sentEmail.create({
    data: {
      brandId,
      draftId,
      mailboxId: mailbox.id,
      recipient,
      subject,
      body,
      zohoMessageId,
      status: 'SENT',
      sentAt: new Date()
    }
  });

  await prisma.brand.update({
    where: { id: brandId },
    data: { status: 'SENT' }
  });

  await prisma.activity.create({
    data: {
      brandId,
      type: 'EMAIL_SENT',
      title: 'Email Dispatched via Zoho Mail',
      details: `Message ID: ${zohoMessageId}`
    }
  });

  return sentEmail as any;
}

/**
 * Sends a test email to verify Zoho OAuth API connectivity
 */
export async function sendTestEmail(toEmail: string): Promise<{ success: boolean; messageId: string }> {
  const accountId = process.env.ZOHO_ACCOUNT_ID;
  const token = await getZohoAccessToken();

  if (!accountId) throw new Error('ZOHO_ACCOUNT_ID missing in environment');

  const subject = 'Hydrasaurus Agency - Zoho Integration Test';
  const body = `Hello,\n\nThis is an automated test email confirming real Zoho Mail API integration for Hydrasaurus Agency.\n\nTime: ${new Date().toLocaleString()}\nMailbox: management@hydrasaurusagency.in\n\nBest regards,\nHydrasaurus Technical Team`;

  const payload = {
    fromAddress: 'management@hydrasaurusagency.in',
    toAddress: toEmail,
    subject,
    content: body.replace(/\n/g, '<br/>'),
    mailFormat: 'html'
  };

  const mailEndpoints = [
    `https://mail.zoho.in/api/v1/accounts/${accountId}/messages`,
    `https://mail.zoho.com/api/v1/accounts/${accountId}/messages`
  ];

  let resData: any = null;
  let lastErr = '';

  for (const endpoint of mailEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        resData = await response.json();
        break;
      } else {
        lastErr = await response.text();
      }
    } catch (e: any) {
      lastErr = e.message;
    }
  }

  if (!resData) {
    throw new Error(`Test email failed: ${lastErr}`);
  }

  const messageId = resData.data?.messageId || resData.data?.msgId || `ZOHO_TEST_${Date.now()}`;
  
  await prisma.activity.create({
    data: {
      type: 'TEST_EMAIL_SENT',
      title: 'Test Email Dispatched via Zoho',
      details: `Sent to ${toEmail} (Zoho ID: ${messageId})`
    }
  });

  return { success: true, messageId };
}

/**
 * Process Approved Outbound Drafts with 30s Rate Limiting & Retry Logic (Up to 3 Retries)
 */
export async function processOutboundQueue(): Promise<{ processed: number; failed: number }> {
  const approvedDrafts = await prisma.emailDraft.findMany({
    where: { status: 'APPROVED' },
    include: { brand: { include: { contacts: true } } }
  });

  let processed = 0;
  let failed = 0;

  for (const draft of approvedDrafts) {
    const recipient = draft.brand.contacts?.[0]?.email;
    if (!recipient) continue;

    let attempts = 0;
    let sentSuccess = false;

    while (attempts < 3 && !sentSuccess) {
      attempts++;
      try {
        await sendEmailViaZoho(
          draft.brandId,
          draft.id,
          recipient,
          draft.subject,
          draft.body
        );
        sentSuccess = true;
        processed++;
        await prisma.emailDraft.update({
          where: { id: draft.id },
          data: { status: 'DRAFT' }
        });
      } catch (err: any) {
        console.error(`[Outbound Queue] Attempt ${attempts} failed for draft ${draft.id}:`, err.message);
        if (attempts < 3) {
          await new Promise(res => setTimeout(res, Math.pow(2, attempts - 1) * 1000));
        } else {
          failed++;
          await prisma.activity.create({
            data: {
              brandId: draft.brandId,
              type: 'EMAIL_FAILED',
              title: 'Outbound Send Failed',
              details: `Failed after 3 retries: ${err.message}`
            }
          });
        }
      }
    }

    if (approvedDrafts.length > 1) {
      await new Promise(res => setTimeout(res, 30000));
    }
  }

  return { processed, failed };
}

/**
 * Periodically Syncs Mailbox Replies & Classifies Sentiment using OpenAI
 */
export async function syncReplies(): Promise<{ syncedCount: number; matchedBrands: string[] }> {
  const accountId = process.env.ZOHO_ACCOUNT_ID;
  if (!accountId) return { syncedCount: 0, matchedBrands: [] };

  let token: string;
  try {
    token = await getZohoAccessToken();
  } catch (e) {
    return { syncedCount: 0, matchedBrands: [] };
  }

  const searchEndpoints = [
    `https://mail.zoho.in/api/v1/accounts/${accountId}/messages/view?status=unread&limit=20`,
    `https://mail.zoho.com/api/v1/accounts/${accountId}/messages/view?status=unread&limit=20`
  ];

  for (const endpoint of searchEndpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const messages = data.data || [];
        const brands = await prisma.brand.findMany({
          where: { isArchived: false },
          include: { contacts: true }
        });

        const matchedBrands: string[] = [];
        let syncedCount = 0;

        for (const msg of messages) {
          const senderEmail = msg.fromAddress?.toLowerCase() || '';
          const content = msg.summary || msg.content || '';

          const matchingBrand = brands.find((b: any) => 
            b.contacts?.some((c: any) => c.email.toLowerCase() === senderEmail || senderEmail.includes(c.email.toLowerCase()))
          );

          if (matchingBrand) {
            const sentiment: BrandStatus = await classifyReplySentiment(content);

            await prisma.brand.update({
              where: { id: matchingBrand.id },
              data: { status: sentiment }
            });

            await prisma.activity.create({
              data: {
                brandId: matchingBrand.id,
                type: 'REPLY_RECEIVED',
                title: 'Reply Synced from Brand',
                details: `From ${senderEmail}. AI Sentiment: ${sentiment}`
              }
            });

            matchedBrands.push(matchingBrand.name);
            syncedCount++;
          }
        }

        return { syncedCount, matchedBrands };
      }
    } catch (err: any) {
      console.error('[Zoho Reply Sync Exception]:', err.message);
    }
  }

  return { syncedCount: 0, matchedBrands: [] };
}
