"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { navItems } from "@/lib/clan";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavIcon({ href }: { href: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (href) {
    case "/":
      return (
        <svg {...common}>
          <path d="M3.5 10.5 12 3.5l8.5 7" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9.5 20v-5.5h5V20" />
        </svg>
      );
    case "/tentang":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 10.8v5.2" />
          <path d="M12 7.9h.01" />
        </svg>
      );
    case "/tim":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="3" />
          <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
          <path d="M15.5 6.2a3 3 0 0 1 0 5.6" />
          <path d="M17.5 14.9c2 .6 3.2 2.3 3.2 4.6" />
        </svg>
      );
    case "/galeri":
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m4.5 17 4.3-4.3a1.5 1.5 0 0 1 2.1 0l2.4 2.4 1.5-1.5a1.5 1.5 0 0 1 2.1 0l3.1 3.1" />
        </svg>
      );
    case "/seleksi":
      return (
        <svg {...common}>
          <path d="m12 3.5 1.9 4.3 4.6.5-3.4 3.1.9 4.6-4-2.4-4 2.4.9-4.6-3.4-3.1 4.6-.5Z" />
          <path d="M5 19.5h14" />
        </svg>
      );
    case "/kontak":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <path d="m4 7 7.1 5a1.6 1.6 0 0 0 1.8 0L20 7" />
        </svg>
      );
    default:
      return null;
  }
}

export function BottomNav() {
  const pathname = usePathname();
  const barRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const measured = useRef(false);

  const activeHref =
    navItems.find((item) => isActive(pathname, item.href))?.href ??
    navItems[0].href;

  const moveTo = useCallback((href: string, animate: boolean) => {
    const item = itemRefs.current.get(href);
    const pill = pillRef.current;
    if (!item || !pill) return;

    const x = item.offsetLeft;
    const width = item.offsetWidth;

    if (!animate) {
      const previous = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = `translateX(${x}px)`;
      pill.style.width = `${width}px`;
      void pill.offsetWidth;
      pill.style.transition = previous;
      return;
    }

    pill.style.transform = `translateX(${x}px)`;
    pill.style.width = `${width}px`;
  }, []);

  useEffect(() => {
    moveTo(activeHref, measured.current);
    measured.current = true;
  }, [activeHref, moveTo]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const remeasure = () => moveTo(activeHref, false);
    const observer = new ResizeObserver(remeasure);
    observer.observe(bar);
    const frame = requestAnimationFrame(remeasure);

    if (document.fonts) {
      void document.fonts.ready.then(remeasure);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeHref, moveTo]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
      <nav
        ref={barRef}
        aria-label="Navigasi utama"
        className="pointer-events-auto relative flex w-full max-w-2xl items-stretch gap-0.5 overflow-x-auto rounded-full border border-line/80 bg-surface/85 p-1.5 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <span
          ref={pillRef}
          aria-hidden="true"
          className="absolute inset-y-1.5 left-0 z-0 rounded-full bg-ice shadow-[0_10px_28px_-10px_rgba(216,229,255,0.55)] transition-[transform,width] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,width]"
          style={{ width: 0, transform: "translateX(0)" }}
        />
        {navItems.map((item) => {
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              ref={(node) => {
                if (node) itemRefs.current.set(item.href, node);
                else itemRefs.current.delete(item.href);
              }}
              className={`relative z-10 flex min-w-0 flex-1 shrink-0 flex-col items-center justify-center gap-1 whitespace-nowrap rounded-full px-1 py-2 text-[9px] font-semibold leading-none transition-colors duration-200 md:flex-row md:gap-2 md:px-3.5 md:py-2.5 md:text-xs ${
                active
                  ? "text-night"
                  : "text-muted hover:text-text"
              }`}
            >
              <NavIcon href={item.href} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
