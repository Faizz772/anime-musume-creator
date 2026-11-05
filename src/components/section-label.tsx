import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-2">
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-[1px] bg-accent"
      />
      {children}
    </p>
  );
}
