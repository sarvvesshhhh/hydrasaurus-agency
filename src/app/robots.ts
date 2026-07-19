import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/outreach/queue',
    },
    sitemap: 'https://hydrasaurusagency.in/sitemap.xml',
  };
}