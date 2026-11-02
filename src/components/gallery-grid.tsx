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

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            key={item.id}
            delay={(index % 3) * 0.05}
            className={index % 3 === 1 ? "sm:translate-y-8" : ""}
          >
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
