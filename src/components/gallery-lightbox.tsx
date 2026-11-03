"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { isVideoUrl, type GalleryItem } from "@/lib/gallery-types";

type GalleryLightboxProps = {
  item: GalleryItem | null;
  preview?: string;
  onClose: () => void;
};

export function GalleryLightbox({
  item,
  preview,
  onClose,
}: GalleryLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [item, onClose]);

  if (!item || typeof document === "undefined") return null;
  const video = isVideoUrl(item.image_url);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Tutup karya"
        onClick={onClose}
        className="absolute inset-0 bg-night/90 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-4xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup karya"
          className="absolute -right-1 -top-1 z-10 grid size-11 place-items-center rounded-full border border-line bg-night/90 text-text transition-colors duration-200 hover:border-accent/60 hover:bg-surface sm:-right-3 sm:-top-3"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="overflow-hidden rounded-2xl border border-line bg-night-2">
          <div
            className="relative bg-night-2"
            style={
              video
                ? undefined
                : { viewTransitionName: `gallery-${item.id}` }
            }
          >
            {!video && preview ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${preview}")` }}
              />
            ) : null}
            {video ? (
              <video
                src={item.image_url}
                poster={item.poster_url ?? undefined}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] w-full bg-black"
              />
            ) : (
              <Image
                src={item.image_url}
                alt={item.title}
                width={1200}
                height={1600}
                sizes="100vw"
                className="relative z-10 max-h-[75vh] w-full object-contain"
              />
            )}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
            <div>
              <h2 className="font-heading text-base font-bold sm:text-lg">
                {item.title}
              </h2>
              {item.author ? (
                <p className="mt-1 text-xs text-accent">{item.author}</p>
              ) : null}
              {item.tags.length > 0 ? (
                <ul className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                  {item.tags.map((tag) => (
                    <li key={tag} className="text-xs text-muted">
                      <span aria-hidden="true" className="text-accent">
                        #
                      </span>
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-muted">
                {video ? "Video" : "Gambar"}
              </span>
              <Link
                href={`/galeri/${item.id}`}
                className="text-xs font-semibold text-accent transition-colors hover:text-ice"
              >
                Buka halaman karya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
