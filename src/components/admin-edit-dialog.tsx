"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isVideoUrl, type GalleryItem } from "@/lib/gallery-types";

const IMAGE_MAX = 8 * 1024 * 1024;
const VIDEO_MAX = 50 * 1024 * 1024;
const MEDIA_ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4";
const POSTER_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif";

type AdminEditDialogProps = {
  item: GalleryItem;
  onClose: () => void;
  onSaved: (item: GalleryItem, warning?: string) => void;
};

async function uploadFile(file: File) {
  const response = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentType: file.type }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    signedUrl?: string;
    path?: string;
    error?: string;
  };

  if (!response.ok || !data.signedUrl || !data.path) {
    throw new Error(data.error ?? "Gagal menyiapkan upload.");
  }

  const upload = await fetch(data.signedUrl, {
    method: "PUT",
    headers: {
      "content-type": file.type,
      "x-upsert": "false",
    },
    body: file,
  });

  if (!upload.ok) {
    throw new Error("Gagal mengunggah file.");
  }

  return data.path;
}

export function AdminEditDialog({
  item,
  onClose,
  onSaved,
}: AdminEditDialogProps) {
  const [title, setTitle] = useState(item.title);
  const [tags, setTags] = useState(item.tags.join(", "));
  const [author, setAuthor] = useState(item.author ?? "");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [removePoster, setRemovePoster] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => titleRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  useEffect(
    () => () => {
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    },
    [mediaPreview],
  );

  useEffect(
    () => () => {
      if (posterPreview) URL.revokeObjectURL(posterPreview);
    },
    [posterPreview],
  );

  if (typeof document === "undefined") return null;

  const mediaIsVideo = mediaFile
    ? mediaFile.type.startsWith("video/")
    : isVideoUrl(item.image_url);
  const posterSrc = removePoster
    ? null
    : (posterPreview ?? item.poster_url ?? null);

  function onMediaChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setMediaFile(next);
    setMediaPreview(next ? URL.createObjectURL(next) : null);
    if (next && !next.type.startsWith("video/")) {
      setRemovePoster(false);
      setPosterFile(null);
      setPosterPreview(null);
    }
  }

  function onPosterChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setPosterFile(next);
    setPosterPreview(next ? URL.createObjectURL(next) : null);
    if (next) setRemovePoster(false);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Judul wajib diisi.");
      return;
    }

    if (mediaFile) {
      const max = mediaFile.type.startsWith("video/") ? VIDEO_MAX : IMAGE_MAX;
      if (mediaFile.size > max) {
        setError(
          mediaFile.type.startsWith("video/")
            ? "Ukuran video maksimal 50 MB."
            : "Ukuran gambar maksimal 8 MB.",
        );
        return;
      }
    }

    if (posterFile) {
      if (!posterFile.type.startsWith("image/")) {
        setError("Poster harus berupa gambar.");
        return;
      }
      if (posterFile.size > IMAGE_MAX) {
        setError("Ukuran poster maksimal 8 MB.");
        return;
      }
    }

    setBusy(true);

    try {
      let mediaPath: string | undefined;
      if (mediaFile) mediaPath = await uploadFile(mediaFile);

      let posterPath: string | undefined;
      if (mediaIsVideo && posterFile && !removePoster) {
        posterPath = await uploadFile(posterFile);
      }

      const response = await fetch(`/api/admin/gallery/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          tags,
          author,
          mediaPath,
          posterPath,
          removePoster,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        item?: GalleryItem;
        error?: string;
        warning?: string;
      };

      if (!response.ok || !data.item) {
        throw new Error(data.error ?? "Gagal memperbarui karya.");
      }

      onSaved(data.item, data.warning);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memperbarui karya.");
      setBusy(false);
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-title"
      className="fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-8"
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={() => {
          if (!busy) onClose();
        }}
        className="fixed inset-0 bg-night/90 backdrop-blur-sm"
      />

      <form
        onSubmit={onSubmit}
        className="relative z-10 my-4 w-full max-w-2xl rounded-2xl border border-line bg-surface p-4 sm:my-0 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="edit-title" className="font-heading text-lg font-bold">
              Edit karya
            </h2>
            <p className="mt-1 text-xs text-muted">
              Perbaiki judul, tag, kreator, media, atau poster.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!busy) onClose();
            }}
            aria-label="Tutup"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-text transition-colors hover:border-accent/60 hover:bg-surface-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="edit-title-input"
              className="mb-1.5 block text-sm font-semibold"
            >
              Judul karya
            </label>
            <input
              ref={titleRef}
              id="edit-title-input"
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-line bg-night-2 px-4 py-3 text-sm text-text focus:border-accent/60 focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-tags"
                className="mb-1.5 block text-sm font-semibold"
              >
                Tag
              </label>
              <input
                id="edit-tags"
                type="text"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="ilustrasi, digital"
                className="w-full rounded-lg border border-line bg-night-2 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-accent/60 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="edit-author"
                className="mb-1.5 block text-sm font-semibold"
              >
                Kreator
              </label>
              <input
                id="edit-author"
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="@username atau nama"
                className="w-full rounded-lg border border-line bg-night-2 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-accent/60 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-semibold">Media</span>
            <div className="overflow-hidden rounded-lg border border-line bg-night-2">
              <div className="relative aspect-[4/3]">
                {mediaFile && mediaPreview ? (
                  mediaFile.type.startsWith("video/") ? (
                    <video
                      src={mediaPreview}
                      controls
                      muted
                      playsInline
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <Image
                      src={mediaPreview}
                      alt="Pratinjau media baru"
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 640px"
                      className="object-cover"
                    />
                  )
                ) : isVideoUrl(item.image_url) ? (
                  <video
                    src={item.image_url}
                    poster={item.poster_url ?? undefined}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 640px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <input
                id="edit-media"
                type="file"
                accept={MEDIA_ACCEPT}
                onChange={onMediaChange}
                className="peer sr-only"
              />
              <label
                htmlFor="edit-media"
                className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-line px-4 text-xs font-semibold text-text transition-colors hover:border-accent/60 hover:bg-surface-2 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
              >
                Ganti media
              </label>
              <span className="min-w-0 truncate text-xs text-muted">
                {mediaFile ? mediaFile.name : "Biarkan kosong jika tidak diganti."}
              </span>
            </div>
          </div>

          {mediaIsVideo ? (
            <div>
              <span className="mb-1.5 block text-sm font-semibold">
                Poster video
              </span>
              <div className="flex items-center gap-3">
                <span className="relative block size-16 shrink-0 overflow-hidden rounded-lg border border-line bg-night-2">
                  {posterSrc ? (
                    <Image
                      src={posterSrc}
                      alt="Poster video"
                      fill
                      unoptimized
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid size-full place-items-center text-[10px] text-muted">
                      Kosong
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <input
                    id="edit-poster"
                    type="file"
                    accept={POSTER_ACCEPT}
                    onChange={onPosterChange}
                    disabled={removePoster}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="edit-poster"
                    className={`inline-flex min-h-10 items-center rounded-full border border-line px-4 text-xs font-semibold text-text transition-colors ${
                      removePoster
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:border-accent/60 hover:bg-surface-2"
                    } peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent`}
                  >
                    {posterFile ? "Ganti poster baru" : "Pilih poster"}
                  </label>
                  {(item.poster_url || posterFile) && !removePoster ? (
                    <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-muted">
                      <input
                        type="checkbox"
                        checked={removePoster}
                        onChange={(event) => {
                          setRemovePoster(event.target.checked);
                          if (event.target.checked) {
                            setPosterFile(null);
                            setPosterPreview(null);
                          }
                        }}
                        className="size-4 accent-[var(--color-accent)]"
                      />
                      Hapus poster
                    </label>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              if (!busy) onClose();
            }}
            disabled={busy}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-text transition-colors hover:border-accent/60 hover:bg-surface-2 disabled:opacity-60"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-night transition-colors hover:bg-ice disabled:opacity-60"
          >
            {busy ? "Menyimpan..." : "Simpan perubahan"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
