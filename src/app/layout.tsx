import type { Metadata } from "next";
import { Archivo, Noto_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteChrome } from "@/components/site-chrome";
import { RouteProgress } from "@/components/route-progress";
import { SplashScreen } from "@/components/splash-screen";
import { PageTransition } from "@/components/page-transition";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://anime-musume-creator-alpha.vercel.app",
  ),
  title: {
    default: "Clan Anime Musume Creator",
    template: "%s | Clan Anime Musume Creator",
  },
  description:
    "Komunitas kreatif pecinta anime: editor, desainer, content creator, dan kreator lain yang berkembang bareng dalam lingkungan aktif, profesional, dan saling mendukung.",
  openGraph: {
    title: "Clan Anime Musume Creator",
    description:
      "Wadah kreatif pecinta anime: tim inti, galeri karya, dan seleksi anggota baru.",
    type: "website",
    images: [
      {
        url: "/logo-amc.webp",
        width: 256,
        height: 256,
        alt: "Clan Anime Musume Creator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <div className="page-bg" aria-hidden="true" />
        <SplashScreen />
        <RouteProgress />
        <PageTransition />
        <SiteChrome header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
