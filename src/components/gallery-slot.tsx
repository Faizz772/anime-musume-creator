import { Blossom } from "./blossom";

type GallerySlotProps = {
  className?: string;
};

export function GallerySlot({ className = "" }: GallerySlotProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-accent/25 bg-surface/30 p-4 text-center ${className}`}
    >
      <Blossom className="size-6 text-accent/40" />
      <span className="font-heading text-[11px] font-semibold text-muted">
        Slot karya
      </span>
    </div>
  );
}
