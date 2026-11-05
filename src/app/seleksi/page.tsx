import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
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
      <PageHero
        index="04"
        label="Seleksi"
        title="Pintu masuk anggota baru."
        intro="Seleksi dibuka lewat grup WhatsApp. Baca langkahnya, lalu masuk saat kamu sudah siap."
        aside={
          <aside className="rounded-2xl bg-surface p-5">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Jalur
            </p>
            <dl className="mt-3 divide-y divide-line-soft">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-xs text-muted">Media</dt>
                <dd className="font-heading text-sm font-bold">WhatsApp</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-xs text-muted">Status</dt>
                <dd className="flex items-center gap-2 font-heading text-sm font-bold">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent"
                  />
                  Terbuka
                </dd>
              </div>
            </dl>
          </aside>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl">
              Cara ikut seleksi
            </h2>
            <ol className="mt-8 border-t border-line-soft">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <li className="grid gap-3 border-b border-line-soft py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                    <span
                      aria-hidden="true"
                      className="font-heading text-3xl font-black text-gold/35"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
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

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-surface-2 p-6 sm:p-8 lg:sticky lg:top-24">
                <SectionLabel>Seleksi anggota</SectionLabel>
                <h2 className="mt-3 font-heading text-2xl font-black tracking-tight sm:text-3xl">
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
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
