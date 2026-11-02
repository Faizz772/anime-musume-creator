"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const EXIT_MS = 200;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);
  const leaving = useRef<Element | null>(null);

  useEffect(() => {
    document
      .querySelectorAll(".page-enter.is-leaving")
      .forEach((element) => element.classList.remove("is-leaving"));
    busy.current = false;
  }, [pathname]);

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
      busy.current = true;

      const page = document.querySelector(".page-enter");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const wait = reduce || !page ? 0 : EXIT_MS;

      if (page) {
        leaving.current = page;
        page.classList.add("is-leaving");
      }

      window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
        window.setTimeout(() => {
          leaving.current?.classList.remove("is-leaving");
          busy.current = false;
        }, 600);
      }, wait);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
