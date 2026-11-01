import Link from "next/link";
import { Blossom } from "./blossom";
import { navItems, WHATSAPP_URL } from "@/lib/clan";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line-soft">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-pink to-purple text-night">
                <Blossom className="size-4" />
              </span>
              <span className="font-heading text-sm font-extrabold">
                Clan Anime Musume Creator
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Komunitas kreator anime musume. Menggambar, menulis, dan tumbuh
              bareng.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="font-heading text-xs font-bold text-text">
              Halaman
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="font-heading text-xs font-bold text-text">
              Seleksi
            </span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-text"
            >
              Gabung grup WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line-soft pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Clan Anime Musume Creator</p>
          <div className="flex items-center gap-4">
            <p>Dijaga oleh tim inti dan anggota.</p>
            <Link
              href="/admin"
              className="text-muted transition-colors hover:text-text"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
