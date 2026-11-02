"use client";

import { useCallback, useState } from "react";
import { Reveal } from "./reveal";
import { GalleryCard } from "./gallery-card";
import { GalleryLightbox } from "./gallery-lightbox";
import type { GalleryItem } from "@/lib/gallery-types";

type GalleryGridProps = {
  items: GalleryItem[];
  priorityCount?: number;
};

export function GalleryGrid({ items, priorityCount = 0 }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const close = useCallback(() => setActive(null), []);

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
              onOpen={() => setActive(item)}
            />
          </Reveal>
        ))}
      </div>
      <GalleryLightbox item={active} onClose={close} />
    </>
  );
}
