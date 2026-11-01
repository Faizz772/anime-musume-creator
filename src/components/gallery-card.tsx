import Image from "next/image";
import { isVideoUrl, type GalleryItem } from "@/lib/gallery-types";

type GalleryCardProps = {
  item: GalleryItem;
  priority?: boolean;
};

export function GalleryCard({ item, priority = false }: GalleryCardProps) {
  const video = isVideoUrl(item.image_url);

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="relative aspect-[3/4] bg-night-2">
        {video ? (
          <video
            src={item.image_url}
            controls
            playsInline
            preload="metadata"
            aria-label={item.title}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
            className="object-cover"
          />
        )}
        {video ? (
          <span className="pointer-events-none absolute left-2 top-2 rounded bg-night/80 px-2 py-0.5 text-[10px] font-semibold text-text">
            MP4
          </span>
        ) : null}
      </div>
      <div className="p-3">
        <h3 className="font-heading text-sm font-bold leading-snug">
          {item.title}
        </h3>
        {item.tags.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
