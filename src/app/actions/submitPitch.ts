'use server'

import { Resend } from 'resend';

// Initialize Resend with the API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitPitch(prevState: any, formData: FormData) {
  try {
    const brandName = formData.get('brandName') as string;
    const repName = formData.get('repName') as string;
    const budget = formData.get('budget') as string;
    const details = formData.get('details') as string;

    if (!brandName || !repName || !details) {
      return { error: "Please fill out all required fields." };
    }

    const { error } = await resend.emails.send({
      from: 'Hydrasaurus Agency <onboarding@resend.dev>', // Developer fallback email. Usually verified custom domain in prod.
      to: 'hydrasaurus.agency@gmail.com',
      subject: `New Agency Pitch from ${brandName}`,
      html: `
        <h2 style="color: #C8102E;">New Client Pitch Received</h2>
        <p><strong>Brand Name:</strong> ${brandName}</p>
        <p><strong>Representative:</strong> ${repName}</p>
        <p><strong>Campaign Budget:</strong> ${budget}</p>
        <br/>
        <h3>Project Details:</h3>
        <p style="background: #f4f4f4; padding: 16px; border-radius: 8px;">
          ${details.replace(/\n/g, '<br/>')}
        </p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: "Failed to send email. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: "Internal Server Error" };
  }
}
