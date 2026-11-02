import type { ReactNode } from "react";
import { Blossom } from "./blossom";
import { SectionLabel } from "./section-label";

type PageHeroProps = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({
  index,
  label,
  title,
  intro,
  aside,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      <Blossom className="absolute -right-24 -top-24 size-72 text-accent/[0.06]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-heading text-xs font-medium text-muted">
                {index}
              </span>
              <SectionLabel>{label}</SectionLabel>
            </div>
            <h1 className="mt-6 max-w-3xl font-heading text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[0.98] tracking-[-0.04em]">
              {title}
            </h1>
            {intro ? (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {intro}
              </p>
            ) : null}
          </div>
          {aside ? <div className="lg:col-span-4">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
