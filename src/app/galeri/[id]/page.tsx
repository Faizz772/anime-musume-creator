import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getGalleryItem } from "@/lib/gallery";
import { isVideoUrl } from "@/lib/gallery-types";
import { SectionLabel } from "@/components/section-label";
import { ShareButton } from "@/components/share-button";

export const dynamic = "force-dynamic";

type WorkPageProps = {
  params: Promise<{ id: string }>;
};

const loadItem = cache(getGalleryItem);

function descriptionFor(item: {
  title: string;
  author?: string | null;
}) {
  return item.author
    ? `Karya ${item.title} oleh ${item.author} di galeri Clan Anime Musume Creator.`
    : `Karya ${item.title} di galeri Clan Anime Musume Creator.`;
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await loadItem(id);

  if (!item) {
    return { title: "Karya tidak ditemukan" };
  }

  const video = isVideoUrl(item.image_url);
  const image =
    item.poster_url ?? (!video ? item.image_url : "/logo-amc.webp");
  const description = descriptionFor(item);

  return {
    title: item.title,
    description,
    openGraph: {
      title: item.title,
      description,
      type: "article",
      images: [{ url: image, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [image],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const item = await loadItem(id);

  if (!item) notFound();

  const video = isVideoUrl(item.image_url);
  const posted = item.posted_at ? new Date(item.posted_at) : null;
  const date =
    posted && !Number.isNaN(posted.getTime())
      ? new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(posted)
      : null;

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/galeri"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors duration-200 hover:text-text"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-4"
          aria-hidden="true"
        >
          <path
            d="M15 6l-6 6 6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Galeri
      </Link>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-5">
        <div className="min-w-0">
          <SectionLabel>Karya</SectionLabel>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {item.author ? (
              <>
                oleh{" "}
                <Link
                  href="/tim"
                  className="text-accent-2 transition-colors hover:text-ice"
                >
                  {item.author}
                </Link>
              </>
            ) : (
              "Karya anggota"
            )}
            {date ? <span> · {date}</span> : null}
          </p>
        </div>
        <ShareButton title={item.title} />
      </div>

      {item.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface px-2.5 py-1 text-[11px] text-muted"
            >
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-2xl bg-night-2">
        {video ? (
          <video
            src={item.image_url}
            poster={item.poster_url ?? undefined}
            controls
            playsInline
            className="max-h-[80vh] w-full bg-black"
          />
        ) : (
          <Image
            src={item.image_url}
            alt={item.title}
            width={1600}
            height={1600}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="h-auto w-full object-contain"
          />
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-5">
        <Link
          href="/galeri"
          className="text-sm font-semibold text-muted transition-colors duration-200 hover:text-text"
        >
          Kembali ke galeri
        </Link>
        <Link
          href="/seleksi"
          className="text-sm font-semibold text-accent-2 transition-colors duration-200 hover:text-ice"
        >
          Gabung dan kirim karya
        </Link>
      </div>
    </main>
  );
}
