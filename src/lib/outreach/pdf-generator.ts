import { Brand, ResearchProfile, Creator } from './types';

/**
 * Generates and triggers instant PDF download of a branded Media Kit for a target brand.
 */
export function generateMediaKitPDF(
  brand: Brand,
  research: ResearchProfile | null,
  creators: Creator[]
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the Media Kit PDF.');
    return;
  }

  const creatorRows = creators.map(c => `
    <div style="background: #111; padding: 12px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #333;">
      <h3 style="color: #fff; margin: 0; font-size: 14px;">${c.name} (${c.platform})</h3>
      <p style="color: #E11D48; font-size: 11px; margin: 4px 0 0 0; font-family: monospace;">${c.category} • ${c.subscribers} Subscribers</p>
      <p style="color: #aaa; font-size: 11px; margin: 4px 0 0 0;">${c.bio || 'Core Hydrasaurus gaming content creator.'}</p>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hydrasaurus Agency - Media Kit for ${brand.name}</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #070709; color: #fff; padding: 40px; }
        .header { border-bottom: 2px solid #E11D48; padding-bottom: 20px; margin-bottom: 30px; }
        .title { font-size: 24px; font-weight: 900; color: #fff; margin: 0; }
        .subtitle { color: #E11D48; font-size: 12px; font-family: monospace; text-transform: uppercase; margin-top: 5px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 14px; font-weight: bold; color: #E11D48; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 6px; margin-bottom: 15px; font-family: monospace; }
        .box { background: #0E0E12; border: 1px solid #222; padding: 15px; border-radius: 8px; font-size: 12px; line-height: 1.6; color: #ccc; }
        .metrics { display: flex; gap: 20px; margin-bottom: 30px; }
        .metric-card { flex: 1; background: #0E0E12; border: 1px solid #222; padding: 15px; border-radius: 8px; text-align: center; }
        .metric-val { font-size: 20px; font-weight: 900; color: #fff; font-family: monospace; }
        .metric-lbl { font-size: 9px; color: #888; text-transform: uppercase; margin-top: 4px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">HYDRASAURUS AGENCY</h1>
        <div class="subtitle">Official Sponsorship Proposal & Media Kit for ${brand.name}</div>
      </div>

      <div class="metrics">
        <div class="metric-card">
          <div class="metric-val">570,000+</div>
          <div class="metric-lbl">Combined Network Reach</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">25+</div>
          <div class="metric-lbl">Exclusive Creators</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">${brand.leadScore}/100</div>
          <div class="metric-lbl">AI Lead Compatibility</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Agency Overview</div>
        <div class="box">
          Hydrasaurus Agency is a premium gaming creator management and livestream operations agency specializing in creator growth, livestream infrastructure, monetization, sponsorships, platform partnerships, and commercial representation across YouTube and Kick.
        </div>
      </div>

      <div class="section">
        <div class="section-title">Recommended Creator Roster Match</div>
        ${creatorRows || '<div class="box">PN Syed, DollyIsLive, WhyisSelena, iMRocky</div>'}
      </div>

      <div class="section">
        <div class="section-title">Proposed Activation Packages</div>
        <div class="box">
          <strong>Tier 1: Stream Overlay & Chat Bot Integration</strong> ($1,500/mo)<br/>
          <strong>Tier 2: Dedicated Stream Sip Test & Product Placements</strong> ($3,500/mo)<br/>
          <strong>Tier 3: Full Roster Exclusive Ambassador Campaign</strong> ($8,000/mo)
        </div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
  }, 500);
}
