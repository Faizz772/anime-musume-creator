import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { WHATSAPP_URL } from "@/lib/clan";

export const metadata: Metadata = {
  title: "Kontak",
};

export default function KontakPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -right-16 -top-20 size-64 text-purple/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-heading text-sm font-bold text-pink">Kontak</p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
            Ngobrol soal clan, karya, atau seleksi.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Jalur paling cepat adalah grup WhatsApp. Admin dan anggota aktif di
            sana.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-gradient-to-br from-surface to-night-2 p-6 sm:p-8">
              <Blossom className="absolute -right-8 -top-8 size-40 text-pink/10" />
              <p className="font-heading text-sm font-bold text-blossom">
                WhatsApp
              </p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold">
                Grup Clan Anime Musume Creator
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Tempat bertanya, berbagi karya, dan mengikuti seleksi anggota
                baru.
              </p>
              <ActionLink href={WHATSAPP_URL} external className="mt-6">
                Buka grup WhatsApp
              </ActionLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-heading text-base font-bold">
                Sebelum menghubungi
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  Untuk seleksi, siapkan karya yang ingin kamu tunjukkan.
                </li>
                <li>
                  Untuk kolaborasi, jelaskan idemu singkat dan jelas.
                </li>
                <li>
                  Balasan mengikuti jadwal admin, mohon tunggu dengan sabar.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
