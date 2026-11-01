import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery";

type GalleryCardProps = {
  item: GalleryItem;
  priority?: boolean;
};

export function GalleryCard({ item, priority = false }: GalleryCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="relative aspect-[3/4] bg-night-2">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
          className="object-cover"
        />
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
