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
  title: "HYDRASAURUS - Elite Creator Infrastructure",
  description: "Immersive RP Storytelling & High-Retention Gaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-void-black text-on-surface">
        <AmbientBackground />
        <FilmGrain />
        <Preloader />
        <CustomCursor />
        <BackgroundCanvas />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

