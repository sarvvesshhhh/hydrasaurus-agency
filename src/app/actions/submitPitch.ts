'use server';

import { Resend } from 'resend';
import { prisma } from '@/lib/db';
import { sendRawZohoEmail } from '@/lib/outreach/zoho';

export async function submitPitch(prevState: any, formData: FormData) {
  try {
    const brandName = (formData.get('brandName') as string)?.trim() || (formData.get('entityName') as string)?.trim() || 'Direct Inquiry';
    const repName = (formData.get('repName') as string)?.trim() || (formData.get('name') as string)?.trim() || brandName;
    const email = (formData.get('email') as string)?.trim() || (formData.get('repEmail') as string)?.trim() || '';
    const budget = (formData.get('budget') as string)?.trim() || 'Undisclosed';
    const details = (formData.get('details') as string)?.trim() || (formData.get('message') as string)?.trim() || '';
    const source = (formData.get('source') as string)?.trim() || (formData.get('entityName') ? 'Home Terminal' : 'Contact Page');

    if (!details || (!brandName && !email)) {
      return { error: 'Please provide required contact identification and message details.' };
    }

    const emailSubject = `🦖 [Hydrasaurus Pitch] New Inquiry from ${brandName}`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070709; color: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid #c8102e; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c8102e; margin-top: 0; text-transform: uppercase; letter-spacing: 1px; font-size: 20px;">
          🦖 New Inbound Transmission (${source})
        </h2>
        <div style="background-color: #0d0d12; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 8px 0; font-size: 14px;"><strong>🏢 Entity / Brand:</strong> <span style="color: #ffb3b1; font-weight: bold;">${brandName}</span></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>👤 Representative:</strong> ${repName}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>✉️ Contact Email:</strong> <a href="mailto:${email}" style="color: #c8102e; font-weight: bold; text-decoration: underline;">${email || 'Not provided'}</a></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>💰 Campaign Budget:</strong> <span style="color: #4ade80; font-family: monospace;">${budget}</span></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>📡 Origin:</strong> ${source}</p>
          <p style="margin: 8px 0; font-size: 12px; color: #888;"><strong>⏱️ Timestamp:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
        <h3 style="color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
          Project Details / Operational Directive:
        </h3>
        <div style="background-color: #12121a; border-left: 4px solid #c8102e; padding: 16px; border-radius: 4px; line-height: 1.6; color: #e5e5e5; font-size: 14px; white-space: pre-wrap;">${details}</div>
        <div style="margin-top: 28px; font-size: 11px; color: #666; font-family: monospace; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
          Hydrasaurus Agency Automated Dispatch System • management@hydrasaurusagency.in
        </div>
      </div>
    `;

    const plainTextBody = `
NEW INBOUND AGENCY TRANSMISSION (${source})
--------------------------------------------------
Entity / Brand: ${brandName}
Representative: ${repName}
Contact Email: ${email || 'N/A'}
Campaign Budget: ${budget}
Origin: ${source}
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

Project Details / Directive:
${details}
--------------------------------------------------
Hydrasaurus Agency Management
    `;

    let emailSent = false;
    const dispatchErrors: string[] = [];

    // 1. Dispatch via Resend to Administrator
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const resendRes = await resend.emails.send({
          from: 'Hydrasaurus Agency <onboarding@resend.dev>',
          to: 'shindesarvesh727@gmail.com',
          subject: emailSubject,
          html: emailHtml
        });
        if (resendRes.data?.id) {
          emailSent = true;
        } else if (resendRes.error) {
          dispatchErrors.push(`Resend: ${resendRes.error.message}`);
        }
      } catch (err: any) {
        dispatchErrors.push(`Resend: ${err.message}`);
      }
    }

    // 2. Dispatch / Failover via Zoho Mail
    try {
      const zohoRes = await sendRawZohoEmail({
        to: 'shindesarvesh727@gmail.com',
        subject: emailSubject,
        body: plainTextBody
      });
      if (zohoRes.success) {
        emailSent = true;
      } else if (zohoRes.error) {
        dispatchErrors.push(`Zoho: ${zohoRes.error}`);
      }
    } catch (err: any) {
      dispatchErrors.push(`Zoho: ${err.message}`);
    }

    // 3. Persistent Storage in PostgreSQL CRM & Activity Timeline
    try {
      let createdBrandId: string | null = null;
      if (brandName) {
        const domain = email && email.includes('@') ? email.split('@')[1] : 'inbound.direct';
        const brand = await prisma.brand.create({
          data: {
            name: brandName,
            website: domain.includes('.') ? `https://${domain}` : 'https://inbound-pitch.hydrasaurusagency.in',
            category: source === 'Home Terminal' ? 'Terminal Lead' : 'Inbound Sponsor',
            status: 'PENDING',
            leadScore: budget.includes('50,000') || budget.includes('+') ? 85 : 75,
            contacts: email ? {
              create: [{
                name: repName || brandName,
                email: email,
                role: 'Inbound Lead',
                isPrimary: true
              }]
            } : undefined,
            notes: {
              create: [{
                author: 'Inbound System',
                content: `Budget: ${budget}\n\nProject Details:\n${details}`
              }]
            }
          }
        });
        createdBrandId = brand.id;
      }

      await prisma.activity.create({
        data: {
          brandId: createdBrandId,
          type: 'INBOUND_INQUIRY',
          title: `Inbound Pitch Received from ${brandName}`,
          details: `Rep: ${repName} (${email || 'No email provided'}). Budget: ${budget}. Source: ${source}`
        }
      });
    } catch (dbErr: any) {
      console.warn('[Database Inbound Lead Warning]:', dbErr.message);
    }

    return { 
      success: true, 
      message: 'Transmission confirmed. Your dossier has been securely ingested by Hydrasaurus Agency management.' 
    };
  } catch (error: any) {
    console.error('[SubmitPitch Action Error]:', error);
    return { error: error.message || 'Transmission failed. Please try again or reach out to management@hydrasaurusagency.in' };
  }
}
