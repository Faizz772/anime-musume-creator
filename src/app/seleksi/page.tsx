import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { SectionLabel } from "@/components/section-label";
import { WHATSAPP_URL } from "@/lib/clan";

export const metadata: Metadata = {
  title: "Seleksi",
};

const steps = [
  {
    title: "Buka grup WhatsApp",
    body: "Semua proses seleksi berjalan di grup. Pakai tombol daftar di halaman ini untuk masuk.",
  },
  {
    title: "Perkenalkan diri",
    body: "Ceritakan sedikit tentang dirimu dan tunjukkan karya yang paling kamu banggakan.",
  },
  {
    title: "Ikuti arahan admin",
    body: "Admin akan memandu langkah berikutnya sampai hasil seleksi diumumkan.",
  },
];

export default function SeleksiPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -left-20 -top-20 size-72 text-accent/[0.07]" />
        <div className="hero-in relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel>04 / Seleksi</SectionLabel>
          <h1 className="mt-6 max-w-2xl font-heading text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            Pintu masuk anggota baru.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Seleksi dibuka lewat grup WhatsApp. Baca langkahnya, lalu masuk saat
            kamu sudah siap.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="font-heading text-xl font-bold sm:text-2xl">
              Cara ikut seleksi
            </h2>
            <ol className="mt-6 divide-y divide-line-soft border-t border-line-soft">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08}>
                  <li className="flex gap-5 py-6">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded border border-accent/30 bg-accent/10 font-heading text-xs font-bold text-accent"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-bold">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <p className="mt-6 border-l-2 border-accent/40 pl-4 text-xs leading-relaxed text-muted">
              Ketentuan lengkap dan jadwal dibagikan di dalam grup. Tanyakan
              langsung ke admin kalau ada yang belum jelas.
            </p>
          </div>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-lg border border-accent/25 bg-surface p-6 sm:p-8">
                <Blossom className="absolute -right-8 -top-8 size-40 text-accent/10" />
                <div className="relative">
                  <SectionLabel>Seleksi anggota</SectionLabel>
                  <h2 className="mt-3 font-heading text-2xl font-bold">
                    Siap gabung?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Klik tombol di bawah untuk masuk ke grup WhatsApp seleksi.
                  </p>
                  <ActionLink
                    href={WHATSAPP_URL}
                    external
                    className="mt-6 w-full"
                  >
                    Daftar seleksi sekarang
                  </ActionLink>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    Tautan membuka grup WhatsApp di tab baru.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
