import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { GallerySlot } from "@/components/gallery-slot";
import { ActionLink } from "@/components/action";

export const metadata: Metadata = {
  title: "Galeri",
};

export default function GaleriPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -right-20 -top-20 size-64 text-purple/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-heading text-sm font-bold text-pink">Galeri</p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
            Karya anggota, satu tempat.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Halaman ini akan memuat ilustrasi dan karakter buatan anggota. Untuk
            sekarang, belum ada karya yang dipublikasikan.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-base font-bold">
                Galeri masih kosong
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Karya pertama akan tampil di sini setelah anggota mengirimkannya.
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
      </section>
    </main>
  );
}
