"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { navItems } from "@/lib/clan";

const EXIT_MS = 220;
const SAFETY_MS = 4000;

function navIndex(pathname: string) {
  const index = navItems.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return index === -1 ? 0 : index;
}

function freezePage(current: HTMLElement, dir: number) {
  const clone = current.cloneNode(true) as HTMLElement;
  clone.setAttribute("aria-hidden", "true");
  clone.classList.remove("page-enter");
  clone.classList.add("page-freeze");
  clone.style.setProperty("--page-dir", String(dir));
  clone.style.position = "fixed";
  clone.style.top = `${-window.scrollY}px`;
  clone.style.left = "0";
  clone.style.right = "0";
  clone.style.zIndex = "45";
  clone.style.pointerEvents = "none";
  document.body.appendChild(clone);
  return clone;
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);
  const firstPathname = useRef(true);
  const overlay = useRef<HTMLElement | null>(null);
  const exitTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  const removeOverlay = () => {
    if (exitTimer.current !== null) {
      window.clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
    if (safetyTimer.current !== null) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
    if (overlay.current) {
      overlay.current.remove();
      overlay.current = null;
    }
    busy.current = false;
  };

  useLayoutEffect(() => {
    if (firstPathname.current) {
      firstPathname.current = false;
      return;
    }
    const clone = overlay.current;
    if (!clone) return;

    if (safetyTimer.current !== null) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }

    clone.classList.add("is-leaving");
    exitTimer.current = window.setTimeout(() => {
      exitTimer.current = null;
      clone.remove();
      if (overlay.current === clone) overlay.current = null;
      busy.current = false;
    }, EXIT_MS);
  }, [pathname]);

  useEffect(() => {
    return removeOverlay;
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
      const current = document.querySelector<HTMLElement>(".flex-1 .page-enter");

      if (!current) {
        router.push(next);
        return;
      }

      busy.current = true;
      const dir =
        navIndex(url.pathname) >= navIndex(window.location.pathname) ? 1 : -1;
      overlay.current = freezePage(current, dir);

      router.push(next);

      safetyTimer.current = window.setTimeout(() => {
        removeOverlay();
      }, SAFETY_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
