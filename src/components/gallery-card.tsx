import Image from "next/image";
import { isVideoUrl, type GalleryItem } from "@/lib/gallery-types";

type GalleryCardProps = {
  item: GalleryItem;
  priority?: boolean;
};

export function GalleryCard({ item, priority = false }: GalleryCardProps) {
  const video = isVideoUrl(item.image_url);

  return (
    <article className="overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-accent/50">
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
          <span className="pointer-events-none absolute left-2 top-2 rounded border border-accent/40 bg-night/80 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
            MP4
          </span>
        ) : null}
      </div>
      <div className="p-3.5">
        <h3 className="font-heading text-sm font-bold leading-snug">
          {item.title}
        </h3>
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
    </article>
  );
}
