"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, WHATSAPP_URL } from "@/lib/clan";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-b border-line-soft bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="logo-mark relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-accent/30">
            <Image
              src="/logo.webp"
              alt=""
              width={40}
              height={40}
              priority
              className="size-full scale-125 object-cover"
            />
          </span>
          <span className="leading-none">
            <span className="block font-heading text-sm font-black tracking-tight">
              Clan Anime Musume
            </span>
            <span className="mt-1 block font-heading text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              Creator
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                  active
                    ? "bg-surface text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-xs font-semibold text-night transition-colors duration-200 hover:bg-ice"
          >
            Gabung
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="grid size-11 place-items-center rounded-full border border-line text-text transition-colors duration-200 hover:border-accent/50 md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ease-out ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-5 rounded bg-current transition-opacity duration-300 ease-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-0.5 w-5 rounded bg-current transition-transform duration-300 ease-out ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        inert={!open}
        className={`grid overflow-hidden border-t transition-[grid-template-rows,border-color,background-color] duration-300 ease-out md:hidden ${
          open
            ? "grid-rows-[1fr] border-line-soft bg-night/95 backdrop-blur-md"
            : "grid-rows-[0fr] border-transparent bg-transparent"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            aria-label="Navigasi seluler"
            className="flex flex-col gap-1 px-5 pb-5 pt-3"
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-sm transition-colors duration-200 ${
                    active
                      ? "bg-surface text-text"
                      : "text-muted hover:bg-surface/60 hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-night"
            >
              Gabung grup WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
