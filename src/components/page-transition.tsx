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

function place(clone: HTMLElement, source: HTMLElement) {
  const rect = source.getBoundingClientRect();
  clone.style.position = "absolute";
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.margin = "0";
}

function stripIds(node: HTMLElement) {
  node.removeAttribute("id");
  node.querySelectorAll("[id]").forEach((child) => child.removeAttribute("id"));
}

function syncFields(source: HTMLElement, clone: HTMLElement) {
  const from = source.querySelectorAll<HTMLInputElement>("input");
  const to = clone.querySelectorAll<HTMLInputElement>("input");
  from.forEach((input, index) => {
    if (input.type === "checkbox" || input.type === "radio") {
      if (to[index]) to[index].checked = input.checked;
    } else if (to[index]) {
      to[index].value = input.value;
    }
  });
}

function buildSnapshot(page: HTMLElement, direction: number) {
  const container = document.createElement("div");
  container.className = "page-snapshot";
  container.setAttribute("aria-hidden", "true");
  container.style.setProperty("--page-nav-dir", String(direction));

  const clonePage = page.cloneNode(true) as HTMLElement;
  clonePage.classList.remove("page-enter");
  stripIds(clonePage);
  syncFields(page, clonePage);
  place(clonePage, page);
  container.appendChild(clonePage);

  const footer = document.querySelector<HTMLElement>("body > footer");
  if (footer) {
    const rect = footer.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const cloneFooter = footer.cloneNode(true) as HTMLElement;
      stripIds(cloneFooter);
      place(cloneFooter, footer);
      container.appendChild(cloneFooter);
    }
  }

  document.body.appendChild(container);
  return container;
}

export function PageTransition() {
  useEffect(() => {
    let snapshot: HTMLDivElement | null = null;
    let pollTimer = 0;
    let leaveTimer = 0;

    const remove = () => {
      window.clearTimeout(pollTimer);
      window.clearTimeout(leaveTimer);
      snapshot?.remove();
      snapshot = null;
    };

    const start = (startUrl: string, direction: number) => {
      remove();
      const page = document.querySelector<HTMLElement>(".page-enter");
      if (!page) return;

      const element = buildSnapshot(page, direction);
      snapshot = element;
      let elapsed = 0;

      const tick = () => {
        if (location.pathname + location.search !== startUrl) {
          if (!element.classList.contains("is-leaving")) {
            element.classList.add("is-leaving");
            leaveTimer = window.setTimeout(remove, 260);
          }
          return;
        }

        elapsed += 24;
        if (elapsed > 2200) {
          remove();
          return;
        }
        pollTimer = window.setTimeout(tick, 24);
      };

      pollTimer = window.setTimeout(tick, 24);
    };

    const onClick = (event: MouseEvent) => {
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

      const startUrl = location.pathname + location.search;
      const from = navIndex(location.pathname);
      const to = navIndex(url.pathname);
      const direction = from !== -1 && to !== -1 && to < from ? -1 : 1;

      queueMicrotask(() => {
        start(startUrl, direction);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      remove();
    };
  }, []);

  return null;
}
