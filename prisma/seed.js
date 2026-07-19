const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting Hydrasaurus Agency PostgreSQL Database Seed...');

  // 1. Seed RAG Knowledge Base Items
  console.log('📦 Seeding RAG Knowledge Base Items...');
  const knowledgeItems = [
    {
      title: 'Master Agency Pitch Deck 2026',
      category: 'PITCH_DECK',
      content: `Hydrasaurus Agency represents 25+ top-tier gaming creators and livestreamers across YouTube Gaming, Kick, and Twitch. Combined monthly audience reach exceeds 570,000+ active gaming fans. Specializing in high-engagement livestream integrations, branded tournaments, product placements, and custom GTA RP server integrations. Direct conversion rates average 4.2% on gaming peripherals and energy drink partnerships.`,
      tags: ['deck', 'agency', 'reach', 'metrics', 'gtarp'],
      isActive: true
    },
    {
      title: 'Agency Overview & Executive Summary',
      category: 'AGENCY_INTRO',
      content: `Hydrasaurus Agency is India's premier gaming creator management agency. We handle commercial partnerships, brand sponsorships, and talent development for creators like PN Syed, DollyIsLive, WhyisSelena, iMRocky, and Arnav Gaming. Primary contact: management@hydrasaurusagency.in. Website: https://hydrasaurusagency.in.`,
      tags: ['agency', 'intro', 'overview', 'contact'],
      isActive: true
    },
    {
      title: 'Creator Roster Reach & Demographics',
      category: 'CREATOR_BIO',
      content: `Audience Demographics: 82% Male, 18% Female. Age distribution: 18-24 (58%), 25-34 (32%). Top geographic markets: India (85%), UAE/Middle East (8%), Southeast Asia (5%). Average livestream watch duration: 42 minutes per session. Stream chat engagement rate exceeds 12%.`,
      tags: ['creators', 'demographics', 'audience', 'engagement'],
      isActive: true
    },
    {
      title: 'Standard Sponsorship Packages & Deliverables',
      category: 'SPONSORSHIP_PACKAGE',
      content: `Tier 1 (Bronze): Stream Overlay Logo + Chat Command Bot + 2 Social Shoutouts ($1,500/mo). Tier 2 (Silver): Tier 1 + 60-second Dedicated Live Segment + Unboxing Video ($3,500/mo). Tier 3 (Gold): Tier 2 + Dedicated GTA RP Server Branding + Custom In-Game Asset Integration + Exclusive Roster Co-Stream ($7,500/mo).`,
      tags: ['pricing', 'tiers', 'packages', 'deliverables', 'sponsorship'],
      isActive: true
    }
  ];

  for (const item of knowledgeItems) {
    const existing = await prisma.knowledgeItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.knowledgeItem.create({ data: item });
    }
  }

  // 2. Seed Creator Roster
  console.log('🎮 Seeding Exclusive Gaming Creators...');
  const creators = [
    {
      name: 'PN Syed',
      platform: 'YouTube',
      subscribers: '115K',
      followers: '45K',
      avgViews: '35K',
      category: 'Gaming / GTA RP',
      bio: 'Leading GTA RP streamer known for high-octane roleplay sessions and daily livestreams.',
      isActive: true
    },
    {
      name: 'DollyIsLive',
      platform: 'YouTube',
      subscribers: '180K',
      followers: '62K',
      avgViews: '48K',
      category: 'Gaming / Variety',
      bio: 'Competitive esports and variety streamer with massive chat engagement.',
      isActive: true
    },
    {
      name: 'WhyisSelena',
      platform: 'Kick / YouTube',
      subscribers: '95K',
      followers: '38K',
      avgViews: '25K',
      category: 'Gaming / IRL',
      bio: 'Top female gaming streamer focusing on Valorant, BGMI, and community events.',
      isActive: true
    },
    {
      name: 'iMRocky',
      platform: 'YouTube',
      subscribers: '140K',
      followers: '50K',
      avgViews: '40K',
      category: 'Esports / FPS',
      bio: 'Professional FPS gamer and livestreamer specializing in tactical shooters.',
      isActive: true
    },
    {
      name: 'Arnav Gaming',
      platform: 'YouTube',
      subscribers: '210K',
      followers: '75K',
      avgViews: '60K',
      category: 'Mobile Gaming / BGMI',
      bio: 'High-energy mobile gaming creator with a passionate youth audience.',
      isActive: true
    }
  ];

  for (const creator of creators) {
    const existing = await prisma.creator.findFirst({ where: { name: creator.name } });
    if (!existing) {
      await prisma.creator.create({ data: creator });
    }
  }

  // 3. Seed Initial Target Brands
  console.log('💼 Seeding Target Brand Opportunities...');
  const brands = [
    {
      name: 'Red Bull India',
      website: 'redbull.com',
      category: 'Energy Drinks',
      status: 'PENDING',
      leadScore: 94,
      brandSizeScore: 95,
      gamingRelScore: 95,
      sponsHistScore: 90,
      contactQualScore: 92,
      audienceOverScore: 95,
      contact: {
        name: 'Vikram Sharma',
        email: 'vikram.sharma@redbull.com',
        role: 'Head of Sports & Gaming Marketing'
      }
    },
    {
      name: 'Monster Energy',
      website: 'monsterenergy.com',
      category: 'Energy Drinks',
      status: 'PENDING',
      leadScore: 91,
      brandSizeScore: 90,
      gamingRelScore: 95,
      sponsHistScore: 92,
      contactQualScore: 88,
      audienceOverScore: 90,
      contact: {
        name: 'Ananya Mehta',
        email: 'ananya.mehta@monsterenergy.com',
        role: 'Brand Manager - Gaming Partnerships'
      }
    },
    {
      name: 'Logitech G India',
      website: 'logitechg.com',
      category: 'Gaming Peripherals',
      status: 'PENDING',
      leadScore: 88,
      brandSizeScore: 90,
      gamingRelScore: 98,
      sponsHistScore: 85,
      contactQualScore: 85,
      audienceOverScore: 92,
      contact: {
        name: 'Rohan Kapoor',
        email: 'rkapoor@logitech.com',
        role: 'Category Marketing Manager - Gaming'
      }
    },
    {
      name: 'Razer APAC',
      website: 'razer.com',
      category: 'Gaming Hardware',
      status: 'PENDING',
      leadScore: 86,
      brandSizeScore: 88,
      gamingRelScore: 96,
      sponsHistScore: 84,
      contactQualScore: 82,
      audienceOverScore: 90,
      contact: {
        name: 'Priya Nair',
        email: 'pnair@razer.com',
        role: 'Esports & Influencer Relations Manager'
      }
    }
  ];

  for (const b of brands) {
    const existing = await prisma.brand.findFirst({ where: { name: b.name } });
    if (!existing) {
      await prisma.brand.create({
        data: {
          name: b.name,
          website: b.website,
          category: b.category,
          status: b.status,
          leadScore: b.leadScore,
          brandSizeScore: b.brandSizeScore,
          gamingRelScore: b.gamingRelScore,
          sponsHistScore: b.sponsHistScore,
          contactQualScore: b.contactQualScore,
          audienceOverScore: b.audienceOverScore,
          contacts: {
            create: [
              {
                name: b.contact.name,
                email: b.contact.email,
                role: b.contact.role,
                isPrimary: true
              }
            ]
          }
        }
      });
    }
  }

  console.log('✅ Hydrasaurus Agency Neon PostgreSQL Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database Seeding Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
