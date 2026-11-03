"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const VEIL_MIN_MS = 240;
const VEIL_LEAD_MS = 180;
const SAFETY_MS = 5000;

type VeilPhase = "idle" | "in" | "out";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [veil, setVeil] = useState<VeilPhase>("idle");
  const busy = useRef(false);
  const firstPathname = useRef(true);
  const navStartedAt = useRef(0);
  const safetyTimer = useRef<number | null>(null);
  const pushTimer = useRef<number | null>(null);
  const outTimer = useRef<number | null>(null);

  useEffect(() => {
    if (firstPathname.current) {
      firstPathname.current = false;
      return;
    }

    if (safetyTimer.current !== null) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
    if (pushTimer.current !== null) {
      window.clearTimeout(pushTimer.current);
      pushTimer.current = null;
    }

    busy.current = false;

    const elapsed = performance.now() - navStartedAt.current;
    const wait = Math.max(0, VEIL_MIN_MS - elapsed);

    if (outTimer.current !== null) {
      window.clearTimeout(outTimer.current);
    }
    outTimer.current = window.setTimeout(() => setVeil("out"), wait);

    return () => {
      if (outTimer.current !== null) {
        window.clearTimeout(outTimer.current);
        outTimer.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (safetyTimer.current !== null) {
        window.clearTimeout(safetyTimer.current);
      }
      if (pushTimer.current !== null) {
        window.clearTimeout(pushTimer.current);
      }
      if (outTimer.current !== null) {
        window.clearTimeout(outTimer.current);
      }
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

      if (outTimer.current !== null) {
        window.clearTimeout(outTimer.current);
        outTimer.current = null;
      }

      busy.current = true;
      navStartedAt.current = performance.now();
      setVeil("in");

      if (safetyTimer.current !== null) {
        window.clearTimeout(safetyTimer.current);
      }
      safetyTimer.current = window.setTimeout(() => {
        setVeil("out");
        busy.current = false;
      }, SAFETY_MS);

      if (pushTimer.current !== null) {
        window.clearTimeout(pushTimer.current);
      }
      pushTimer.current = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, VEIL_LEAD_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div
      aria-hidden="true"
      className={`route-veil${
        veil === "in" ? " is-in" : veil === "out" ? " is-out" : ""
      }`}
    />
  );
}
