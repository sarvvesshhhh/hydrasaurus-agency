import { calculateLeadScore } from './lead-scoring';

export interface DiscoveredLead {
  id: string;
  name: string;
  website: string;
  category: string;
  description: string;
  estimatedBudget: string;
  suggestedContact: {
    name: string;
    email: string;
    role: string;
  };
  leadScore: number;
}

export const DISCOVERY_CATEGORIES = [
  { id: 'gaming', name: 'Gaming & Hardware Brands', icon: 'sports_esports' },
  { id: 'drinks', name: 'Energy Drinks & Hydration', icon: 'local_drink' },
  { id: 'peripherals', name: 'Gaming Peripherals & Gear', icon: 'mouse' },
  { id: 'startups', name: 'Creator Economy Startups', icon: 'rocket_launch' },
  { id: 'd2c', name: 'Indian D2C Brands', icon: 'shopping_bag' }
];

export async function discoverBrandsByCategory(categoryId: string): Promise<DiscoveredLead[]> {
  // Database of target discovery leads with initial lead scores
  const dataset: Record<string, Omit<DiscoveredLead, 'id' | 'leadScore'>[]> = {
    gaming: [
      {
        name: 'Asus ROG',
        website: 'https://rog.asus.com',
        category: 'Gaming Hardware',
        description: 'Republic of Gamers - premium gaming laptops, monitors, and PC components.',
        estimatedBudget: '$10,000 - $30,000',
        suggestedContact: { name: 'Karan Mehta', email: 'karan_m@asus.com', role: 'Esports Sponsorship Lead' }
      },
      {
        name: 'MSI Gaming',
        website: 'https://msi.com',
        category: 'Gaming Hardware',
        description: 'High performance gaming laptops, graphics cards, and motherboard manufacturer.',
        estimatedBudget: '$8,000 - $25,000',
        suggestedContact: { name: 'Pooja Verma', email: 'pooja.v@msi.com', role: 'Influencer Marketing Manager' }
      }
    ],
    drinks: [
      {
        name: 'G FUEL',
        website: 'https://gfuel.com',
        category: 'Energy Drinks',
        description: 'The Official Energy Drink of Esports, formula tailored for gamers and content creators.',
        estimatedBudget: '$5,000 - $20,000',
        suggestedContact: { name: 'Brandon Cole', email: 'b.cole@gfuel.com', role: 'Global Creator Manager' }
      },
      {
        name: 'Predator Energy',
        website: 'https://predatorenergy.com',
        category: 'Energy Drinks',
        description: 'High caffeine energy drink brand targeting gaming tournaments and active youth.',
        estimatedBudget: '$4,000 - $15,000',
        suggestedContact: { name: 'Amit Roy', email: 'amit@predatorenergy.com', role: 'Regional Brand Manager' }
      }
    ],
    peripherals: [
      {
        name: 'Corsair',
        website: 'https://corsair.com',
        category: 'Peripherals',
        description: 'High performance gear for gamers, content creators, and PC enthusiasts.',
        estimatedBudget: '$10,000 - $40,000',
        suggestedContact: { name: 'Chris Miller', email: 'cmiller@corsair.com', role: 'Head of Sponsorships' }
      },
      {
        name: 'Elgato',
        website: 'https://elgato.com',
        category: 'Peripherals & Streaming',
        description: 'Stream Decks, capture cards, microphones, and studio lighting for live streamers.',
        estimatedBudget: '$6,000 - $20,000',
        suggestedContact: { name: 'Julianna Vance', email: 'j.vance@elgato.com', role: 'Creator Ecosystem Manager' }
      }
    ],
    startups: [
      {
        name: 'Restream.io',
        website: 'https://restream.io',
        category: 'Creator SaaS',
        description: 'Multistreaming service broadcasting live streams to YouTube, Kick, and Twitch simultaneously.',
        estimatedBudget: '$3,000 - $12,000',
        suggestedContact: { name: 'David Park', email: 'david@restream.io', role: 'Growth Marketing Lead' }
      },
      {
        name: 'EpocCam / Streamlabs',
        website: 'https://streamlabs.com',
        category: 'Creator SaaS',
        description: 'Livestream broadcasting software, overlays, and creator monetization suite.',
        estimatedBudget: '$5,000 - $15,000',
        suggestedContact: { name: 'Rachel Green', email: 'rachel@streamlabs.com', role: 'Partner Success Lead' }
      }
    ],
    d2c: [
      {
        name: 'boAt Lifestyle',
        website: 'https://boat-lifestyle.com',
        category: 'Indian D2C / Audio',
        description: 'India\'s #1 wearable and gaming audio brand actively sponsoring gaming creators.',
        estimatedBudget: '$15,000 - $50,000',
        suggestedContact: { name: 'Siddharth Kapoor', email: 'siddharth.k@boat-lifestyle.com', role: 'VP Brand Marketing' }
      },
      {
        name: 'Noise',
        website: 'https://gonoise.com',
        category: 'Indian D2C / Wearables',
        description: 'Smartwatches and gaming wireless earbuds targeting youth and livestreamers.',
        estimatedBudget: '$10,000 - $35,000',
        suggestedContact: { name: 'Vikram Singh', email: 'vikram@gonoise.com', role: 'Head of Influencer Marketing' }
      }
    ]
  };

  const rawLeads = dataset[categoryId] || dataset.gaming;

  return rawLeads.map((item, idx) => {
    const leadScoreObj = calculateLeadScore(item.category, item.website, item.suggestedContact.email);
    return {
      ...item,
      id: `disc_${categoryId}_${idx}_${Date.now()}`,
      leadScore: leadScoreObj.score
    };
  });
}
