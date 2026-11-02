import Link from "next/link";
import { navItems, WHATSAPP_URL } from "@/lib/clan";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line-soft">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
          <div>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Clan Anime Musume Creator
            </p>
            <p className="mt-4 max-w-3xl font-heading text-[clamp(2.4rem,7vw,5rem)] font-black leading-[0.92] tracking-[-0.04em]">
              Berproses, berkarya,{" "}
              <span className="text-gradient">tumbuh bareng.</span>
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Wadah kreatif untuk pecinta anime, editor, desainer, dan content
              creator.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Jelajahi
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 w-fit items-center text-sm text-muted transition-colors duration-200 hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 w-fit items-center rounded-full border border-line px-4 text-xs font-semibold text-text transition-colors duration-200 hover:border-accent/60 hover:bg-surface"
            >
              Gabung WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-soft pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Clan Anime Musume Creator</p>
          <p>Dijaga oleh tim inti dan anggota.</p>
        </div>
      </div>
    </footer>
  );
}
