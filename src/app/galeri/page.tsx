import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { GallerySlot } from "@/components/gallery-slot";
import { GalleryGrid } from "@/components/gallery-grid";
import { ActionLink } from "@/components/action";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeri",
};

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const items = await getGallery();

  return (
    <main>
      <PageHero
        index="03"
        label="Galeri"
        title="Karya anggota, satu tempat."
        intro="Ilustrasi dan karakter buatan anggota clan. Karya terbaru tampil paling depan."
        aside={
          <aside className="rounded-2xl border border-line bg-surface/60 p-5">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Koleksi
            </p>
            <p className="mt-2 font-heading text-4xl font-black">
              {items.length}
            </p>
            <p className="text-xs text-muted">karya terkurasi</p>
          </aside>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {items.length === 0 ? (
          <>
            <Reveal>
              <div className="flex flex-col items-start gap-4 border-y border-line-soft py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-lg font-bold">
                    Galeri masih kosong
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Karya pertama akan tampil di sini setelah melalui kurasi
                    tim.
                  </p>
                </div>
                <ActionLink href="/seleksi" className="shrink-0">
                  Gabung dan kirim karya
                </ActionLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <GallerySlot key={index} className="aspect-[3/4]" />
                ))}
              </div>
            </Reveal>

            <p className="mt-6 text-xs leading-relaxed text-muted">
              Kotak di atas adalah slot kosong, bukan contoh karya.
            </p>
          </>
        ) : (
          <GalleryGrid items={items} priorityCount={3} />
        )}
      </section>
    </main>
  );
}
