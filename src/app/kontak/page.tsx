import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { SectionLabel } from "@/components/section-label";
import { WHATSAPP_URL } from "@/lib/clan";

export const metadata: Metadata = {
  title: "Kontak",
};

const notes = [
  "Untuk seleksi, siapkan karya yang ingin kamu tunjukkan.",
  "Untuk kolaborasi, jelaskan idemu singkat dan jelas.",
  "Balasan mengikuti jadwal admin, mohon tunggu dengan sabar.",
];

export default function KontakPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -right-20 -top-20 size-72 text-accent/[0.07]" />
        <div className="hero-in relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel>05 / Kontak</SectionLabel>
          <h1 className="mt-6 max-w-2xl font-heading text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            Ngobrol soal clan, karya, atau seleksi.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Jalur paling cepat adalah grup WhatsApp. Admin dan anggota aktif di
            sana.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-accent/25 bg-surface p-6 sm:p-8">
              <Blossom className="absolute -right-8 -top-8 size-40 text-accent/10" />
              <div className="relative">
                <SectionLabel>WhatsApp</SectionLabel>
                <h2 className="mt-3 font-heading text-2xl font-bold">
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
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-lg border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-heading text-base font-bold">
                Sebelum menghubungi
              </h2>
              <ul className="mt-4 divide-y divide-line-soft border-t border-line-soft">
                {notes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 py-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-sm bg-accent"
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
