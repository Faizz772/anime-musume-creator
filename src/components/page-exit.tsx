"use client";

import { useEffect } from "react";
import { navItems } from "@/lib/clan";

function navIndex(pathname: string) {
  if (pathname === "/") return 0;
  return navItems.findIndex(
    (item) =>
      item.href !== "/" &&
      (pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
}

export function PageExit() {
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (location.pathname.startsWith("/admin")) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }

      if (url.origin !== location.origin) return;
      if (url.pathname.startsWith("/admin")) return;
      if (
        url.pathname === location.pathname &&
        url.search === location.search
      ) {
        return;
      }

      const wrapper = document.querySelector<HTMLElement>(".page-enter");
      if (!wrapper || wrapper.classList.contains("page-exit")) return;

      const from = navIndex(location.pathname);
      const to = navIndex(url.pathname);
      const direction = from !== -1 && to !== -1 && to < from ? -1 : 1;

      wrapper.style.setProperty("--page-exit-dir", String(direction));
      wrapper.classList.add("page-exit");
      window.setTimeout(() => wrapper.classList.remove("page-exit"), 240);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  return null;
}
