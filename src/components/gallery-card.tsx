"use client";

import Image from "next/image";
import { useRef } from "react";
import { isVideoUrl, type GalleryItem } from "@/lib/gallery-types";

type GalleryCardProps = {
  item: GalleryItem;
  priority?: boolean;
  shareName?: string;
  onOpen: (preview?: string) => void;
};

export function GalleryCard({
  item,
  priority = false,
  shareName,
  onOpen,
}: GalleryCardProps) {
  const video = isVideoUrl(item.image_url);
  const mediaRef = useRef<HTMLDivElement>(null);

  const openLightbox = () => {
    const image = mediaRef.current?.querySelector("img");
    onOpen(image?.currentSrc || undefined);
  };

  return (
    <article className="group relative overflow-hidden rounded-xl border border-line bg-surface transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/50">
      <div
        ref={mediaRef}
        className="relative aspect-[3/4] overflow-hidden bg-night-2"
        style={
          shareName && !video ? { viewTransitionName: shareName } : undefined
        }
      >
        {video ? (
          <>
            <video
              src={item.image_url}
              poster={item.poster_url ?? undefined}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center bg-gradient-to-t from-night/60 via-transparent to-transparent"
            >
              <span className="grid size-12 place-items-center rounded-full border border-white/20 bg-night/70 text-text backdrop-blur-sm transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5 size-5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            <span className="absolute left-2 top-2 rounded-full border border-accent/40 bg-night/80 px-2 py-0.5 text-[10px] font-semibold text-accent">
              MP4
            </span>
          </>
        ) : (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="p-3.5">
        <h3 className="font-heading text-sm font-bold leading-snug">
          {item.title}
        </h3>
        {item.author ? (
          <p className="mt-0.5 text-[11px] text-accent">{item.author}</p>
        ) : null}
        {item.tags.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
            {item.tags.map((tag) => (
              <li key={tag} className="text-[10px] text-muted">
                <span aria-hidden="true" className="text-accent">
                  #
                </span>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <button
        type="button"
        onClick={openLightbox}
        aria-label={`Buka ${item.title}${video ? ", putar video" : ""}`}
        className="absolute inset-0 z-10 rounded-xl"
      />
    </article>
  );
}
