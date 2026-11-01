import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { GallerySlot } from "@/components/gallery-slot";
import { GalleryCard } from "@/components/gallery-card";
import { ActionLink } from "@/components/action";
import { SectionLabel } from "@/components/section-label";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeri",
};

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const items = await getGallery();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -right-20 -top-20 size-72 text-accent/[0.07]" />
        <div className="hero-in relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel>03 / Galeri</SectionLabel>
          <h1 className="mt-6 max-w-2xl font-heading text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            Karya anggota, satu tempat.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Ilustrasi dan karakter buatan anggota clan. Karya terbaru tampil
            paling depan.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {items.length === 0 ? (
          <>
            <Reveal>
              <div className="flex flex-col items-start gap-4 border-y border-line-soft py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-base font-bold">
                    Galeri masih kosong
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Karya pertama akan tampil di sini setelah ditambahkan lewat
                    panel admin.
                  </p>
                </div>
                <ActionLink href="/seleksi" className="shrink-0">
                  Gabung dan kirim karya
                </ActionLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 0.05}>
                <GalleryCard item={item} priority={index < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
