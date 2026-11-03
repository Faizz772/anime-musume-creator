"use client";

import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { Reveal } from "./reveal";
import { GalleryCard } from "./gallery-card";
import { GalleryLightbox } from "./gallery-lightbox";
import type { GalleryItem } from "@/lib/gallery-types";

type GalleryGridProps = {
  items: GalleryItem[];
  priorityCount?: number;
};

type ActiveItem = {
  item: GalleryItem;
  preview?: string;
};

function withViewTransition(update: () => void) {
  if (
    typeof document === "undefined" ||
    typeof document.startViewTransition !== "function"
  ) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

export function GalleryGrid({ items, priorityCount = 0 }: GalleryGridProps) {
  const [active, setActive] = useState<ActiveItem | null>(null);
  const open = useCallback((item: GalleryItem, preview?: string) => {
    withViewTransition(() => setActive({ item, preview }));
  }, []);
  const close = useCallback(() => {
    withViewTransition(() => setActive(null));
  }, []);

  const layout =
    items.length === 1
      ? "mx-auto grid max-w-sm grid-cols-1 gap-3"
      : items.length === 2
        ? "mx-auto grid max-w-2xl grid-cols-2 gap-3"
        : "grid grid-cols-2 gap-3 sm:grid-cols-3";

  return (
    <>
      <div className={layout}>
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 0.05}>
            <GalleryCard
              item={item}
              priority={index < priorityCount}
              shareName={
                active?.item.id === item.id ? undefined : `gallery-${item.id}`
              }
              onOpen={(preview) => open(item, preview)}
            />
          </Reveal>
        ))}
      </div>
      <GalleryLightbox
        item={active?.item ?? null}
        preview={active?.preview}
        onClose={close}
      />
    </>
  );
}
