import { Blossom } from "./blossom";

type GallerySlotProps = {
  className?: string;
};

export function GallerySlot({ className = "" }: GallerySlotProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-surface/40 p-4 text-center ${className}`}
    >
      <Blossom className="size-6 text-purple/50" />
      <span className="font-heading text-[11px] font-semibold text-muted">
        Slot karya
      </span>
    </div>
  );
}
