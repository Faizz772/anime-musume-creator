"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/clan";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-b border-line-soft bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="logo-mark relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-accent/30">
            <Image
              src="/logo-amc.webp"
              alt=""
              width={40}
              height={40}
              priority
              className="size-full object-cover"
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

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-xs font-semibold text-night transition-colors duration-200 hover:bg-ice"
        >
          Gabung
        </a>
      </div>
    </header>
  );
}
