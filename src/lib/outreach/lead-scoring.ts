import { LeadScoreBreakdown } from './types';

/**
 * Calculates Lead Score (0 - 100) for a brand based on weighted criteria:
 * - Brand Size (20%)
 * - Gaming Relevance (25%)
 * - Sponsorship History (20%)
 * - Contact Quality (15%)
 * - Audience Overlap (20%)
 */
export function calculateLeadScore(
  category: string,
  website: string,
  contactEmail?: string
): LeadScoreBreakdown {
  const cat = category.toLowerCase();
  
  // 1. Gaming Relevance (25%)
  let gamingRelScore = 60;
  if (cat.includes('energy') || cat.includes('drink') || cat.includes('peripheral') || cat.includes('gear') || cat.includes('hardware')) {
    gamingRelScore = 95;
  } else if (cat.includes('saas') || cat.includes('app') || cat.includes('vpn') || cat.includes('gaming')) {
    gamingRelScore = 90;
  } else if (cat.includes('fashion') || cat.includes('lifestyle') || cat.includes('d2c')) {
    gamingRelScore = 75;
  }

  // 2. Brand Size (20%)
  let brandSizeScore = 70;
  if (website.includes('.com') || website.includes('.co')) {
    brandSizeScore = 85;
  }

  // 3. Sponsorship History (20%)
  let sponsHistScore = 80;
  if (cat.includes('energy') || cat.includes('peripheral')) {
    sponsHistScore = 95;
  }

  // 4. Contact Quality (15%)
  let contactQualScore = 50;
  if (contactEmail) {
    if (!contactEmail.includes('gmail') && !contactEmail.includes('yahoo') && !contactEmail.includes('hotmail')) {
      contactQualScore = 90; // Custom business domain
    } else {
      contactQualScore = 70;
    }
  }

  // 5. Audience Overlap (20%)
  let audienceOverScore = 85;
  if (cat.includes('energy') || cat.includes('gta') || cat.includes('livestream')) {
    audienceOverScore = 98;
  }

  // Weighted total calculation
  const totalScore = Math.round(
    brandSizeScore * 0.20 +
    gamingRelScore * 0.25 +
    sponsHistScore * 0.20 +
    contactQualScore * 0.15 +
    audienceOverScore * 0.20
  );

  return {
    score: Math.min(100, Math.max(10, totalScore)),
    brandSizeScore,
    gamingRelScore,
    sponsHistScore,
    contactQualScore,
    audienceOverScore
  };
}
