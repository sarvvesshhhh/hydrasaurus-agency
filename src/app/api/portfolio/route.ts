import { NextResponse } from 'next/server';
import { rosterData } from '@/data/roster';

export const revalidate = 86400; // Cache for 24 hours (86400 seconds)

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY is not configured' }, { status: 400 });
  }

  const targets = ['dollyislive', 'whyisselena', 'backfire'];
  const results: Record<string, { avatarUrl?: string; subscribers?: string }> = {};

  try {
    const ids = targets
      .map(slug => rosterData[slug]?.youtubeChannelId)
      .filter((id): id is string => !!id && !id.startsWith("UC_Placeholder"));

    if (ids.length === 0) {
      return NextResponse.json({});
    }

    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ids.join(',')}&key=${apiKey}`;
    const res = await fetch(url, {
      next: { revalidate: 86400 } // Cache this fetch call for 24 hours
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Failed to fetch YouTube API: ${res.statusText}`, errText);
      return NextResponse.json({ error: 'Failed to fetch YouTube API' }, { status: res.status });
    }

    const data = await res.json();
    if (data.items) {
      for (const item of data.items) {
        const id = item.id;
        const slug = Object.keys(rosterData).find(key => rosterData[key].youtubeChannelId === id);
        if (slug) {
          results[slug] = {
            avatarUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url,
            subscribers: formatCount(item.statistics?.subscriberCount)
          };
        }
      }
    }

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Error fetching portfolio details:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio statistics' }, { status: 500 });
  }
}

function formatCount(countStr?: string): string {
  if (!countStr) return '';
  const count = parseInt(countStr, 10);
  if (isNaN(count)) return '';
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}
