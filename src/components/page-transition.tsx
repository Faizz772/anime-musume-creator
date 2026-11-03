"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { navItems } from "@/lib/clan";

const EXIT_MS = 200;
const SAFETY_MS = 4000;

function navIndex(pathname: string) {
  const index = navItems.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return index === -1 ? 0 : index;
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);
  const exitTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    busy.current = false;
    if (exitTimer.current !== null) {
      window.clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
    if (safetyTimer.current !== null) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
      if (safetyTimer.current !== null)
        window.clearTimeout(safetyTimer.current);
    };
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      if (busy.current) return;

      const next = `${url.pathname}${url.search}${url.hash}`;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const current = document.querySelector<HTMLElement>(".page-enter");
      if (reduced || !current) {
        router.push(next);
        return;
      }

      busy.current = true;
      const dir = navIndex(url.pathname) >= navIndex(window.location.pathname) ? 1 : -1;
      current.style.setProperty("--page-dir", String(dir));
      current.classList.add("is-leaving");

      exitTimer.current = window.setTimeout(() => {
        exitTimer.current = null;
        router.push(next);
      }, EXIT_MS);

      safetyTimer.current = window.setTimeout(() => {
        current.classList.remove("is-leaving");
        busy.current = false;
        safetyTimer.current = null;
      }, SAFETY_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
