import type { Metadata } from "next";
import { Noto_Sans, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const display = Zen_Kaku_Gothic_New({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clan Anime Musume Creator",
    template: "%s | Clan Anime Musume Creator",
  },
  description:
    "Komunitas kreator yang menggambar, menulis, dan membangun karakter anime musume. Lihat tim inti, galeri karya, dan jalur seleksi anggota.",
  openGraph: {
    title: "Clan Anime Musume Creator",
    description:
      "Komunitas kreator anime musume: tim inti, galeri karya, dan seleksi anggota baru.",
    type: "website",
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
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
