import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import FilmGrain from "@/components/FilmGrain";
import AmbientBackground from "@/components/AmbientBackground";
import ClientLayout from "@/components/ClientLayout";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hydrasaurusagency.in'),
  title: {
    default: 'Hydrasaurus Agency | Gaming Talent Management, Esports & Creator Partnerships',
    template: '%s | Hydrasaurus Agency'
  },
  description: 'Hydrasaurus Agency is a gaming talent management agency specializing in creators, live streamers, brand partnerships, sponsorships, and creator growth.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Hydrasaurus Agency | Gaming Talent Management & Creator Partnerships',
    description: 'Elevate your brand with Hydrasaurus Agency. We manage top-tier gaming creators and live streamers, executing high-impact sponsorships and campaigns.',
    url: 'https://hydrasaurusagency.in',
    siteName: 'Hydrasaurus Agency',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydrasaurus Agency | Gaming Talent Management & Partnerships',
    description: 'Hydrasaurus Agency connects premium brands with leading gaming creators and live streamers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-[#070709] text-on-surface">
          <AmbientBackground />
          <FilmGrain />
          <Preloader />
          <CustomCursor />
          <BackgroundCanvas />
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}


