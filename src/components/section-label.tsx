import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-heading text-xs font-medium text-accent">
      <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
      {children}
    </p>
  );
}
