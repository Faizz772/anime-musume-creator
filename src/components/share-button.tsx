"use client";

import { useState } from "react";

type ShareStatus = "idle" | "copied" | "shared" | "error";

export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState<ShareStatus>("idle");

  async function share() {
    const url = window.location.href;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
        setStatus("shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setStatus("copied");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    window.setTimeout(() => setStatus("idle"), 2200);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent/60 hover:bg-surface"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="size-4"
          aria-hidden="true"
        >
          <path
            d="M12 16V4M12 4l-4 4M12 4l4 4M5 14v5h14v-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Bagikan
      </button>
      <span role="status" aria-live="polite" className="text-xs text-muted">
        {status === "copied"
          ? "Link tersalin."
          : status === "shared"
            ? "Sudah dibagikan."
            : status === "error"
              ? "Gagal membagikan."
              : ""}
      </span>
    </div>
  );
}
