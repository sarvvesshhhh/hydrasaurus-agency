import { NextResponse } from 'next/server';
import { rosterArray } from '@/data/roster';

export const revalidate = 43200; // Cache this route's output for 12 hours (43200 seconds)

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY is not configured' }, { status: 400 });
  }

  // Filter out placeholders to get real YouTube Channel IDs
  const channelIds = rosterArray
    .map(c => c.youtubeChannelId)
    .filter((id): id is string => !!id && !id.startsWith("UC_Placeholder"));

  if (channelIds.length === 0) {
    return NextResponse.json({});
  }

  try {
    // YouTube channels endpoint allows batch requests up to 50 channel IDs separated by commas
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds.join(',')}&key=${apiKey}`;
    
    const res = await fetch(url, {
      next: { revalidate: 43200 } // Cache the fetch request for 12 hours
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`YouTube API returned status ${res.status}:`, errText);
      return NextResponse.json({ error: `YouTube API returned status ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    const subCounts: Record<string, string> = {};

    if (data.items) {
      for (const item of data.items) {
        const id = item.id;
        const subsVal = item.statistics?.subscriberCount;
        if (subsVal) {
          const subs = parseInt(subsVal, 10);
          subCounts[id] = formatSubscriberCount(subs);
        }
      }
    }

    return NextResponse.json(subCounts);
  } catch (error: any) {
    console.error('Error fetching YouTube subscribers:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch YouTube subscribers' }, { status: 500 });
  }
}

function formatSubscriberCount(subs: number): string {
  if (subs >= 1_000_000) {
    return `${(subs / 1_000_000).toFixed(1)}M`;
  }
  if (subs >= 1_000) {
    return `${(subs / 1_000).toFixed(1)}K`;
  }
  return subs.toString();
}
