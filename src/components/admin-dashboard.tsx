"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { isVideoUrl, type GalleryItem } from "@/lib/gallery-types";

type Status = { kind: "ok" | "error"; text: string } | null;

const IMAGE_MAX = 8 * 1024 * 1024;
const VIDEO_MAX = 50 * 1024 * 1024;

export function AdminDashboard({
  initialItems,
}: {
  initialItems: GalleryItem[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(null);

  const fileIsVideo = file?.type.startsWith("video/") ?? false;

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(next ? URL.createObjectURL(next) : null);
  }

  function resetForm() {
    setTitle("");
    setTags("");
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!title.trim()) {
      setStatus({ kind: "error", text: "Judul wajib diisi." });
      return;
    }

    if (!file) {
      setStatus({ kind: "error", text: "Pilih gambar atau video dulu." });
      return;
    }

    const maxBytes = file.type.startsWith("video/") ? VIDEO_MAX : IMAGE_MAX;
    if (file.size > maxBytes) {
      setStatus({
        kind: "error",
        text:
          file.type.startsWith("video/")
            ? "Ukuran video maksimal 50 MB."
            : "Ukuran gambar maksimal 8 MB.",
      });
      return;
    }

    setBusy(true);

    const urlResponse = await fetch("/api/admin/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type }),
    });

    const urlData = (await urlResponse.json().catch(() => ({}))) as {
      signedUrl?: string;
      path?: string;
      error?: string;
    };

    if (!urlResponse.ok || !urlData.signedUrl || !urlData.path) {
      setBusy(false);
      setStatus({
        kind: "error",
        text: urlData.error ?? "Gagal menyiapkan upload.",
      });
      return;
    }

    const uploadResponse = await fetch(urlData.signedUrl, {
      method: "PUT",
      headers: {
        "content-type": file.type,
        "x-upsert": "false",
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      setBusy(false);
      setStatus({
        kind: "error",
        text: "Gagal mengunggah file ke penyimpanan.",
      });
      return;
    }

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        tags,
        path: urlData.path,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      item?: GalleryItem;
      error?: string;
    };

    setBusy(false);

    if (!response.ok || !data.item) {
      setStatus({ kind: "error", text: data.error ?? "Gagal menambah karya." });
      return;
    }

    setItems((current) => [data.item as GalleryItem, ...current]);
    resetForm();
    setStatus({ kind: "ok", text: "Karya ditambahkan ke galeri." });
    router.refresh();
  }

  async function onDelete(item: GalleryItem) {
    if (!window.confirm(`Hapus karya "${item.title}"?`)) return;

    setStatus(null);
    setDeleting(item.id);

    const response = await fetch(`/api/admin/gallery/${item.id}`, {
      method: "DELETE",
    });

    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    setDeleting(null);

    if (!response.ok) {
      setStatus({ kind: "error", text: data.error ?? "Gagal menghapus karya." });
      return;
    }

    setItems((current) => current.filter((entry) => entry.id !== item.id));
    setStatus({ kind: "ok", text: "Karya dihapus." });
    router.refresh();
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-sm font-bold text-pink">Admin</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold">
            Panel admin
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
            Tambah karya berupa gambar atau video MP4. Perubahan langsung tampil
            di halaman Galeri dan beranda.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-pink/50 hover:bg-surface-2"
        >
          Keluar
        </button>
      </div>

      {status ? (
        <p
          role={status.kind === "error" ? "alert" : "status"}
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            status.kind === "error"
              ? "border-pink/40 bg-pink/10 text-blossom"
              : "border-purple/40 bg-purple/10 text-purple"
          }`}
        >
          {status.text}
        </p>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={onSubmit}
          className="h-fit rounded-3xl border border-line bg-surface p-6"
        >
          <h2 className="font-heading text-lg font-bold">Tambah karya</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-semibold"
              >
                Judul karya
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Contoh: Musume di bawah sakura"
                className="w-full rounded-xl border border-line bg-night-2 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-pink/60 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="mb-1.5 block text-sm font-semibold"
              >
                Tag
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="ilustrasi, digital, orisinal"
                className="w-full rounded-xl border border-line bg-night-2 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-pink/60 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-muted">
                Pisahkan dengan koma, maksimal 8 tag.
              </p>
            </div>

            <div>
              <span className="mb-1.5 block text-sm font-semibold">
                Gambar atau video
              </span>
              <input
                ref={fileInputRef}
                id="media"
                name="media"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4"
                onChange={onFileChange}
                className="peer sr-only"
              />
              <label
                htmlFor="media"
                className="block cursor-pointer rounded-xl border border-dashed border-line bg-night-2 p-3 transition-colors hover:border-pink/50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pink"
              >
                {preview ? (
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
                    {fileIsVideo ? (
                      <video
                        src={preview}
                        controls
                        muted
                        playsInline
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : (
                      <Image
                        src={preview}
                        alt="Pratinjau media yang dipilih"
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    )}
                  </span>
                ) : (
                  <span className="flex flex-col items-center justify-center gap-1 py-6 text-center">
                    <span className="font-heading text-sm font-semibold">
                      Pilih gambar atau video
                    </span>
                    <span className="text-xs text-muted">
                      JPG, PNG, WEBP, GIF, AVIF (maks 8 MB) atau MP4 (maks 50 MB).
                    </span>
                  </span>
                )}
              </label>
              {file ? (
                <p className="mt-2 truncate text-xs text-muted">{file.name}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink to-purple px-5 py-3 text-sm font-semibold text-night transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Mengunggah..." : "Tambah ke galeri"}
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-bold">Karya tersimpan</h2>
            <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              {items.length}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-line bg-night-2 p-6 text-center">
              <p className="font-heading text-sm font-semibold">
                Belum ada karya
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Karya yang kamu tambahkan akan muncul di sini.
              </p>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-line-soft">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <span className="relative block size-16 shrink-0 overflow-hidden rounded-lg bg-night-2">
                    {isVideoUrl(item.image_url) ? (
                      <>
                        <video
                          src={item.image_url}
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={item.title}
                          className="absolute inset-0 size-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 rounded bg-night/80 px-1.5 py-0.5 text-[9px] font-semibold text-text">
                          MP4
                        </span>
                      </>
                    ) : (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-sm font-bold">
                      {item.title}
                    </p>
                    {item.tags.length > 0 ? (
                      <p className="mt-1 truncate text-xs text-muted">
                        {item.tags.join(", ")}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    disabled={deleting === item.id}
                    className="shrink-0 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-muted transition-colors hover:border-pink/50 hover:text-blossom disabled:opacity-60"
                  >
                    {deleting === item.id ? "Menghapus..." : "Hapus"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
