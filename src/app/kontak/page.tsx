import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { SectionLabel } from "@/components/section-label";
import { Blossom } from "@/components/blossom";
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
      <PageHero
        index="05"
        label="Kontak"
        title="Ngobrol soal clan, karya, atau seleksi."
        intro="Jalur paling cepat adalah grup WhatsApp. Admin dan anggota aktif di sana."
        aside={
          <aside className="rounded-2xl border border-line bg-surface/60 p-5">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Respons
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Admin membalas sesuai jadwal. Untuk hal mendesak, tulis dengan
              jelas di grup.
            </p>
          </aside>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-surface/70 p-6 sm:p-8">
              <Blossom className="absolute -right-8 -top-8 size-40 text-accent/10" />
              <div className="relative">
                <SectionLabel>WhatsApp</SectionLabel>
                <h2 className="mt-3 max-w-md font-heading text-2xl font-black tracking-tight sm:text-3xl">
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

          <Reveal delay={0.08} className="md:col-span-5">
            <div className="h-full rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
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
                      className="mt-2 size-1.5 shrink-0 rounded-[1px] bg-accent"
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
