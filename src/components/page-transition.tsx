"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const COVER_MS = 360;
const REVEAL_MS = 420;
const SAFETY_MS = 4000;

type Phase = "idle" | "cover" | "reveal";

function clearTimer(ref: { current: number | null }) {
  if (ref.current !== null) {
    window.clearTimeout(ref.current);
    ref.current = null;
  }
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const busy = useRef(false);
  const firstPathname = useRef(true);
  const navStartedAt = useRef(0);
  const coverTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    if (firstPathname.current) {
      firstPathname.current = false;
      return;
    }

    if (!busy.current) return;

    clearTimer(coverTimer);
    clearTimer(safetyTimer);

    const elapsed = performance.now() - navStartedAt.current;
    const wait = Math.max(0, COVER_MS - elapsed);

    clearTimer(revealTimer);
    revealTimer.current = window.setTimeout(() => {
      setPhase("reveal");
      revealTimer.current = window.setTimeout(() => {
        setPhase("idle");
        busy.current = false;
        revealTimer.current = null;
      }, REVEAL_MS);
    }, wait);

    return () => {
      clearTimer(revealTimer);
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimer(coverTimer);
      clearTimer(revealTimer);
      clearTimer(safetyTimer);
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

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const next = `${url.pathname}${url.search}${url.hash}`;

      if (reduced) {
        router.push(next);
        return;
      }

      busy.current = true;
      navStartedAt.current = performance.now();
      clearTimer(coverTimer);
      clearTimer(revealTimer);
      clearTimer(safetyTimer);
      setPhase("cover");

      coverTimer.current = window.setTimeout(() => {
        coverTimer.current = null;
        router.push(next);
      }, COVER_MS);

      safetyTimer.current = window.setTimeout(() => {
        setPhase("idle");
        busy.current = false;
        safetyTimer.current = null;
      }, SAFETY_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div
      aria-hidden="true"
      className={`route-curtain${
        phase === "cover"
          ? " is-cover"
          : phase === "reveal"
            ? " is-reveal"
            : " is-reset"
      }`}
    />
  );
}
