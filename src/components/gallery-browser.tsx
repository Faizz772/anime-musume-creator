"use client";

import { useMemo, useState } from "react";
import { GalleryGrid } from "./gallery-grid";
import type { GalleryItem } from "@/lib/gallery-types";

const chipBase =
  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200";

export function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () =>
      Array.from(new Set(items.flatMap((item) => item.tags))).sort((a, b) =>
        a.localeCompare(b, "id"),
      ),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      if (tag && !item.tags.includes(tag)) return false;
      if (!q) return true;
      const haystack =
        `${item.title} ${item.author ?? ""} ${item.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, tag]);

  function reset() {
    setQuery("");
    setTag(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari judul, kreator, atau tag"
            aria-label="Cari karya"
            autoComplete="off"
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted focus:border-accent/60 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={!tag}
            onClick={() => setTag(null)}
            className={`${chipBase} ${
              !tag
                ? "border-accent bg-accent text-night"
                : "border-line text-muted hover:border-accent/50 hover:text-text"
            }`}
          >
            Semua
          </button>
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tag === item}
              onClick={() => setTag(tag === item ? null : item)}
              className={`${chipBase} ${
                tag === item
                  ? "border-accent bg-accent text-night"
                  : "border-line text-muted hover:border-accent/50 hover:text-text"
              }`}
            >
              #{item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">{filtered.length} karya</p>

      {filtered.length > 0 ? (
        <div className="mt-5">
          <GalleryGrid items={filtered} priorityCount={3} />
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface/40 p-8 text-center">
          <p className="font-heading text-base font-bold">
            Tidak ada karya yang cocok
          </p>
          <p className="mt-1 text-sm text-muted">
            Coba kata lain atau hapus filter tag.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent/60 hover:bg-surface"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
