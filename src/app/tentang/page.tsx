import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Tentang",
};

const activities = [
  {
    title: "Tumbuh sebagai kreator",
    body: "Editor, desainer, content creator, penulis, dan illustrator berproses bareng di satu tempat, masing-masing mengasah kemampuannya.",
  },
  {
    title: "Saling memberi masukan",
    body: "Kritik yang jujur tapi sopan, biar tiap orang makin tajam dan karyanya makin hidup.",
  },
  {
    title: "Menjaga lingkungan yang sehat",
    body: "Aktif, profesional, dan saling mendukung. Di sini orang berkembang karena dihargai, bukan karena berlomba.",
  },
];

const focus = [
  "Editor",
  "Desainer",
  "Content creator",
  "Penulis",
  "Illustrator",
];

export default function TentangPage() {
  return (
    <main>
      <PageHero
        index="01"
        label="Tentang"
        title="Ruang tumbuh untuk kreator anime musume."
        intro="Anime Musume Creator adalah wadah bagi pecinta anime dan kreator untuk tumbuh bareng: editor, desainer, content creator, dan siapa pun yang ingin berkarya. Lingkungannya aktif, profesional, dan saling mendukung."
        aside={
          <aside className="rounded-2xl bg-surface p-5">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Fokus
            </p>
            <ul className="mt-3 divide-y divide-line-soft">
              {focus.map((item) => (
                <li key={item} className="py-2.5 text-sm text-text">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl">
              Apa yang kami lakukan
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Tiga hal yang kami jaga supaya komunitas tetap hidup dan sehat.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line-soft">
              {activities.map((activity, index) => (
                <Reveal key={activity.title} delay={index * 0.06}>
                  <div className="grid gap-3 border-b border-line-soft py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <span
                      aria-hidden="true"
                      className="font-heading text-2xl font-black text-gold/35"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold sm:text-xl">
                        {activity.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                        {activity.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line-soft bg-night-2/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SectionLabel>Mulai dari sini</SectionLabel>
                <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl">
                  Belum perlu jago untuk mulai.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                  Yang kami cari bukan yang paling jago, tapi yang mau belajar
                  dan menghargai karya orang lain.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <ActionLink href="/seleksi">Lihat seleksi</ActionLink>
                <ActionLink href="/tim" variant="secondary">
                  Kenali tim
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
