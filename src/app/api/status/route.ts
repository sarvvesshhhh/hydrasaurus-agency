import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId');

  if (!channelId) return NextResponse.json({ isLive: false });

  const apiKey = process.env.YOUTUBE_API_KEY; // Ensure this matches your .env file
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await res.json();
    
    // If Google throws a specific API error, log it so we aren't blind, but don't crash the site
    if (data.error) {
      console.error("YT API Error:", data.error.message);
      return NextResponse.json({ isLive: false }); 
    }

    // If items array has content, they are live.
    const isLive = data.items && data.items.length > 0;
    return NextResponse.json({ isLive });

  } catch (error) {
    return NextResponse.json({ isLive: false });
  }
}
