export interface Creator {
  slug: string;
  name: string;
  role: string;
  youtubeHandle: string;
  youtubeChannelId: string;
  youtubeUrl: string;
  subscribers: string;
  totalViews: string;
  videos: string;
  joined: string;
  setup?: string;
  bio?: string;
  social?: string;
  kickUrl?: string;
  image?: string;
  hoverVideo?: string;
}

export const rosterData: Record<string, Creator> = {
  dollyislive: {
    slug: "dollyislive",
    name: "DollyIsLive",
    role: "Streamer & Esports Athlete (Hyderabad)",
    youtubeHandle: "@dollyislive1756",
    youtubeChannelId: "UCDWW2LRI0O4lGsUBFVVRybw",
    youtubeUrl: "https://youtube.com/@dollyislive1756",
    subscribers: "13.4K",
    totalViews: "1.1M+",
    videos: "884",
    joined: "Oct 13, 2022",
    setup: "Viewsonic LED VX2428 Monitor, HyperX Cloud Stinger Headset",
    bio: "Hi people am a Streamer and an esports athlete from Hyderabad.",
    kickUrl: "https://kick.com/dollyislive",
    image: "/dolly.png",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-a-person-playing-a-video-game-2178/1080p.mp4"
  },
  whyisselena: {
    slug: "whyisselena",
    name: "Selena",
    role: "Lethal Precision FPS & Content Creator",
    youtubeHandle: "@Whyisselena",
    youtubeChannelId: "UCF8Jy62QvzoR_RycLdCyhXw",
    youtubeUrl: "https://youtube.com/@Whyisselena",
    subscribers: "2.23K",
    totalViews: "198K+",
    videos: "189",
    joined: "Jan 7, 2021",
    social: "instagram.com/selenaauwu",
    kickUrl: "https://kick.com/whyisselena",
    image: "/selena.png",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-playing-a-video-game-9626/1080p.mp4"
  },
  brianplayzz: {
    slug: "brianplayzz",
    name: "Brian Playzz",
    role: "Cinematic FPS & Gaming Innovator",
    youtubeHandle: "@brianplayzz",
    youtubeChannelId: "UC_PlaceholderBrian",
    youtubeUrl: "https://youtube.com/@brianplayzz",
    subscribers: "TBA",
    totalViews: "TBA",
    videos: "TBA",
    joined: "TBA",
    bio: "Delivering high-octane cinematic gameplay and unparalleled FPS mastery.",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-abstract-neon-waves-2253/1080p.mp4"
  },
  snfx: {
    slug: "snfx",
    name: "SnFx",
    role: "Cinematic Gaming Virtuoso",
    youtubeHandle: "@snfx",
    youtubeChannelId: "UC_PlaceholderSnFx",
    youtubeUrl: "https://youtube.com/@snfx",
    subscribers: "TBA",
    totalViews: "TBA",
    videos: "TBA",
    joined: "TBA",
    bio: "Pioneering visual storytelling and elite mechanical skill across the gaming spectrum.",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-abstract-glowing-lines-4158/1080p.mp4"
  }
};

export const rosterArray = Object.values(rosterData);
