import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";

export const metadata: Metadata = {
  title: "Tentang",
};

const activities = [
  {
    title: "Menggambar karakter",
    body: "Latihan bareng, dari proporsi dan pose sampai ekspresi yang terasa hidup.",
  },
  {
    title: "Menulis cerita",
    body: "Membangun latar, kepribadian, dan alasan kenapa karakter itu ada.",
  },
  {
    title: "Memberi masukan",
    body: "Kritik yang jujur tapi sopan, supaya karya berikutnya lebih baik.",
  },
];

export default function TentangPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -right-16 -top-16 size-64 text-pink/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-heading text-sm font-bold text-pink">Tentang</p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
            Ruang tumbuh untuk kreator anime musume.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Clan Anime Musume Creator dibangun oleh orang-orang yang suka
            menggambar karakter dan ingin punya tempat pulang untuk berbagi
            prosesnya.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="font-heading text-2xl font-extrabold">
              Apa yang kami lakukan
            </h2>
          </Reveal>

          <div className="divide-y divide-line-soft">
            {activities.map((activity, index) => (
              <Reveal key={activity.title} delay={index * 0.08}>
                <div className="flex gap-5 py-6 first:pt-0 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="font-heading text-sm font-extrabold text-purple"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold">
                      {activity.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {activity.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                Belum perlu jago untuk mulai.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Yang kami cari bukan yang paling jago, tapi yang mau belajar dan
                menghargai karya orang lain.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <ActionLink href="/seleksi">Lihat seleksi</ActionLink>
              <ActionLink href="/tim" variant="secondary">
                Kenali tim
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
