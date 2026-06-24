export interface Creator {
  slug: string;
  name: string;
  subscribers: string; // Static default fallback
  youtubeHandle?: string;
  youtubeChannelId?: string;
  youtubeUrl?: string;
  role?: string;
  totalViews?: string;
  videos?: string;
  joined?: string;
  setup?: string;
  bio?: string;
  social?: string;
  kickUrl?: string;
  image?: string;
  hoverVideo?: string;
  isKickPartner?: boolean;
}

export const rosterData: Record<string, Creator> = {
  pnsyed: {
    slug: "pnsyed",
    name: "PN Syed",
    subscribers: "115.0K",
    youtubeHandle: "@PNSYED",
    youtubeChannelId: "UC-Tbl7UT0Ffm49IeRc7CSlg",
    youtubeUrl: "https://youtube.com/@PNSYED",
    kickUrl: "https://kick.com/pnsyed",
    isKickPartner: true
  },
  imrocky: {
    slug: "imrocky",
    name: "iMRocky",
    subscribers: "52.0K",
    youtubeHandle: "@iMRocky",
    youtubeChannelId: "UCdZSSMQI6vWr3VneoNuv9SQ",
    youtubeUrl: "https://youtube.com/@iMRocky",
    kickUrl: "https://kick.com/imrocky",
    isKickPartner: true
  },
  arnavgaming: {
    slug: "arnavgaming",
    name: "Arnav Gaming",
    subscribers: "38.0K",
    youtubeHandle: "@ARNAVGAMING",
    youtubeChannelId: "UC6ArZpt3EQ4OGrZ5fjch_rg",
    youtubeUrl: "https://youtube.com/@ARNAVGAMING",
    kickUrl: "https://kick.com/arnavgaming",
    isKickPartner: true
  },
  asukabae: {
    slug: "asukabae",
    name: "Asuka Bae",
    subscribers: "21.0K",
    youtubeHandle: "@AsukaBae",
    youtubeChannelId: "UCDVQYp-GGoqbJWomfFaKKeg",
    youtubeUrl: "https://youtube.com/@AsukaBae",
    kickUrl: "https://kick.com/asukabae",
    isKickPartner: true
  },
  eliminator: {
    slug: "eliminator",
    name: "Eliminator",
    subscribers: "18.5K",
    youtubeHandle: "@imeliminator",
    youtubeChannelId: "UC_1wX6o_jQ6uOxdw8j_xoZg",
    youtubeUrl: "https://youtube.com/@imeliminator",
    kickUrl: "https://kick.com/imeliminator",
    isKickPartner: true
  },
  shreeplayz: {
    slug: "shreeplayz",
    name: "SHREE PlayZ",
    subscribers: "15.0K",
    youtubeHandle: "@SHREEPlayZ",
    youtubeChannelId: "UCA6qqnQ6u_WRDNkfdvD-N1g",
    youtubeUrl: "https://youtube.com/@SHREEPlayZ",
    kickUrl: "https://kick.com/shreeplayz",
    isKickPartner: true
  },
  abhibergunfiltered: {
    slug: "abhibergunfiltered",
    name: "ABHiBERG Unfiltered",
    subscribers: "7.4K",
    youtubeHandle: "@AbhibergUnfiltered",
    youtubeChannelId: "UCxJa4ZKnXl5KarWGWdNo0fw",
    youtubeUrl: "https://youtube.com/@AbhibergUnfiltered",
    kickUrl: "https://kick.com/abhiberg",
    isKickPartner: true
  },
  thedeadshot: {
    slug: "thedeadshot",
    name: "The Deadshot",
    subscribers: "24.8K",
    youtubeHandle: "@thedeadshott",
    youtubeChannelId: "UCf-T1vPbbMMzKxJcNLwXPfQ",
    youtubeUrl: "https://youtube.com/@thedeadshott",
    kickUrl: "https://kick.com/thedeadshott",
    isKickPartner: true
  },
  backfire: {
    slug: "backfire",
    name: "BacKFire",
    subscribers: "19.4K",
    youtubeHandle: "@BacKFFR",
    youtubeChannelId: "UCKeIVjp5pExBXUjwlq_GSyg",
    youtubeUrl: "https://youtube.com/@BacKFFR",
    kickUrl: "https://kick.com/backfiretv",
    isKickPartner: true
  },
  typhon: {
    slug: "typhon",
    name: "Typhon",
    subscribers: "15.5K",
    youtubeHandle: "@TYPHONisLivee",
    youtubeChannelId: "UCADW4EcCkiXkp9ScwbsiYdA",
    youtubeUrl: "https://youtube.com/@TYPHONisLivee",
    kickUrl: "https://kick.com/typhonl1ve",
    isKickPartner: true
  },
  dollyislive: {
    slug: "dollyislive",
    name: "DollyIsLive",
    subscribers: "13.9K",
    youtubeHandle: "@dollyislive1756",
    youtubeChannelId: "UCDWW2LRI0O4lGsUBFVVRybw",
    youtubeUrl: "https://youtube.com/@dollyislive1756",
    role: "Streamer & Esports Athlete (Hyderabad)",
    totalViews: "1.1M+",
    videos: "884",
    joined: "Oct 13, 2022",
    setup: "Viewsonic LED VX2428 Monitor, HyperX Cloud Stinger Headset",
    bio: "Hi people am a Streamer and an esports athlete from Hyderabad.",
    kickUrl: "https://kick.com/dollyislive",
    image: "/dolly.png",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-a-person-playing-a-video-game-2178/1080p.mp4",
    isKickPartner: true
  },
  lailaplayzz: {
    slug: "lailaplayzz",
    name: "Laila playzz",
    subscribers: "13.6K",
    youtubeHandle: "@lailaplayzz",
    youtubeChannelId: "UCPcKzGvifyxaZuksBZYn0xg",
    youtubeUrl: "https://youtube.com/@lailaplayzz",
    kickUrl: "https://kick.com/lailaplayzz",
    isKickPartner: true
  },
  belikehanna: {
    slug: "belikehanna",
    name: "BeLikeHanna",
    subscribers: "12.0K",
    youtubeHandle: "@belikehanna",
    youtubeChannelId: "UCoYfyfcgIBbceEjT72FAv8A",
    youtubeUrl: "https://youtube.com/@belikehanna",
    kickUrl: "https://kick.com/belikehanna",
    isKickPartner: true
  },
  m4god: {
    slug: "m4god",
    name: "M4GOD",
    subscribers: "10.0K",
    youtubeHandle: "@m4godofficial",
    youtubeChannelId: "UCupNRQm2F_vP23nnOYkUjFw",
    youtubeUrl: "https://youtube.com/@m4godofficial",
    kickUrl: "https://kick.com/m4god",
    isKickPartner: true
  },
  deepz9k: {
    slug: "deepz9k",
    name: "DeepZ9k",
    subscribers: "4.8K",
    youtubeHandle: "@DeepZ9K",
    youtubeChannelId: "UCRaNlzqMtgAetZRuYDDdlTw",
    youtubeUrl: "https://youtube.com/@DeepZ9K",
    kickUrl: "https://kick.com/deepz9k",
    isKickPartner: true
  },
  damaskplays: {
    slug: "damaskplays",
    name: "DAMASK plays",
    subscribers: "4.2K",
    youtubeHandle: "@DAMASKplays",
    youtubeChannelId: "UCa4bH9tgyGE-S-nbiWpJ05w",
    youtubeUrl: "https://youtube.com/@DAMASKplays",
    kickUrl: "https://kick.com/damaskplays",
    isKickPartner: true
  },
  mxrsh: {
    slug: "mxrsh",
    name: "Mxrsh",
    subscribers: "2.5K",
    youtubeHandle: "@not_marsh",
    youtubeChannelId: "UCjE1jD58l0TRrh3KTY3lP0A",
    youtubeUrl: "https://youtube.com/@not_marsh",
    kickUrl: "https://kick.com/not_marsh",
    isKickPartner: true
  },
  brianplayzz: {
    slug: "brianplayzz",
    name: "Brian Playzz",
    subscribers: "2.4K",
    youtubeHandle: "@brianocplays",
    youtubeChannelId: "UCvpnJBDOJf2LfHx5z_YziIA",
    youtubeUrl: "https://youtube.com/@brianocplays",
    kickUrl: "https://kick.com/brianplayzz",
    role: "Cinematic FPS & Gaming Innovator",
    totalViews: "TBA",
    videos: "TBA",
    joined: "TBA",
    bio: "Delivering high-octane cinematic gameplay and unparalleled FPS mastery.",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-abstract-neon-waves-2253/1080p.mp4",
    isKickPartner: true
  },
  whyisselena: {
    slug: "whyisselena",
    name: "WhyisSelena",
    subscribers: "2.3K",
    youtubeHandle: "@Whyisselena",
    youtubeChannelId: "UCF8Jy62QvzoR_RycLdCyhXw",
    youtubeUrl: "https://youtube.com/@Whyisselena",
    kickUrl: "https://kick.com/whyisselena",
    role: "Lethal Precision FPS & Content Creator",
    totalViews: "198K+",
    videos: "189",
    joined: "Jan 7, 2021",
    social: "instagram.com/selenaauwu",
    image: "/selena.png",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-playing-a-video-game-9626/1080p.mp4",
    isKickPartner: true
  },
  snfx: {
    slug: "snfx",
    name: "SnFx",
    subscribers: "1.3K",
    youtubeHandle: "@SnFx_111",
    youtubeChannelId: "UCHPdVkoLuzQA4B4atJl0ijA",
    youtubeUrl: "https://youtube.com/@SnFx_111",
    kickUrl: "https://kick.com/snfxx",
    role: "Cinematic Gaming Virtuoso",
    totalViews: "TBA",
    videos: "TBA",
    joined: "TBA",
    bio: "Pioneering visual storytelling and elite mechanical skill across the gaming spectrum.",
    hoverVideo: "https://cdn.coverr.co/videos/coverr-abstract-glowing-lines-4158/1080p.mp4",
    isKickPartner: true
  },
  radbriefing: {
    slug: "radbriefing",
    name: "RadBriefing",
    subscribers: "36.5K",
    youtubeHandle: "@OfficialRadBriefingGaming",
    youtubeChannelId: "UC6FT9HcUPrVcNVhixVvxYPw",
    youtubeUrl: "https://youtube.com/@OfficialRadBriefingGaming",
    kickUrl: "https://kick.com/radbriefing",
    isKickPartner: true
  }
};

export const rosterArray = Object.values(rosterData);
