import Link from "next/link";
import { Blossom } from "./blossom";
import { navItems, WHATSAPP_URL } from "@/lib/clan";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line-soft">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                <Blossom className="size-4" />
              </span>
              <span className="font-heading text-sm font-bold">
                Clan Anime Musume Creator
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Komunitas kreator anime musume. Menggambar, menulis, dan tumbuh
              bareng.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <span className="flex items-center gap-3 font-heading text-xs font-bold">
              <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
              Halaman
            </span>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 w-fit items-center text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <span className="flex items-center gap-3 font-heading text-xs font-bold">
              <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
              Seleksi
            </span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-fit items-center text-muted transition-colors hover:text-text"
            >
              Gabung grup WhatsApp
            </a>
            <Link
              href="/admin"
              className="flex min-h-11 w-fit items-center text-muted transition-colors hover:text-text"
            >
              Panel admin
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-soft pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Clan Anime Musume Creator</p>
          <p>Dijaga oleh tim inti dan anggota.</p>
        </div>
      </div>
    </footer>
  );
}
