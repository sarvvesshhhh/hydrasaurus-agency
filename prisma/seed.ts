async function main() {
  console.log('Seeding PostgreSQL database via Prisma ORM...');

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // 1. Seed Mailbox
    const mailbox = await prisma.mailbox.upsert({
      where: { email: 'management@hydrasaurusagency.in' },
      update: {},
      create: {
        id: 'mb_mgmt',
        email: 'management@hydrasaurusagency.in',
        displayName: 'Hydrasaurus Agency Management',
        isDefault: true,
        dailyLimit: 100,
      },
    });
    console.log('Seeded Mailbox:', mailbox.email);

    // 2. Seed User
    await prisma.user.upsert({
      where: { email: 'management@hydrasaurusagency.in' },
      update: {},
      create: {
        email: 'management@hydrasaurusagency.in',
        name: 'Hydrasaurus Agency Admin',
        role: 'ADMIN',
      },
    });

    // 3. Seed Creators
    const creators = [
      {
        id: 'cr_pnsyed',
        name: 'PN Syed',
        platform: 'YouTube',
        category: 'Gaming / GTA RP',
        subscribers: '115.0K',
        followers: '45.0K',
        avgViews: '35.0K',
        country: 'India',
        languages: ['English', 'Hindi'],
        bio: 'Leading GTA RP stream creator and high-tempo gaming personality.',
        youtubeUrl: 'https://youtube.com/@PNSYED',
        kickUrl: 'https://kick.com/pnsyed',
      },
      {
        id: 'cr_dolly',
        name: 'DollyIsLive',
        platform: 'YouTube / Kick',
        category: 'Livestreaming / Esports',
        subscribers: '13.9K',
        followers: '18.2K',
        avgViews: '8.5K',
        country: 'India',
        languages: ['English', 'Telugu', 'Hindi'],
        bio: 'Streamer & Esports athlete from Hyderabad with 1.1M+ total channel views.',
        youtubeUrl: 'https://youtube.com/@dollyislive1756',
        kickUrl: 'https://kick.com/dollyislive',
      },
      {
        id: 'cr_selena',
        name: 'WhyisSelena',
        platform: 'YouTube',
        category: 'FPS / Gaming',
        subscribers: '2.3K',
        followers: '12.0K',
        avgViews: '4.2K',
        country: 'India',
        languages: ['English', 'Hindi'],
        bio: 'Lethal precision FPS & competitive gaming content creator.',
        youtubeUrl: 'https://youtube.com/@Whyisselena',
        kickUrl: 'https://kick.com/whyisselena',
      }
    ];

    for (const c of creators) {
      await prisma.creator.upsert({
        where: { id: c.id },
        update: {},
        create: c,
      });
    }
    console.log(`Seeded ${creators.length} Creators.`);

    await prisma.$disconnect();
  } catch (err: any) {
    console.warn('[Prisma Seed Warning]:', err.message);
  }

  console.log('PostgreSQL database seed complete!');
}

main().catch(console.error);
