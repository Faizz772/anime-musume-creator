import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
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
        <Blossom className="absolute -left-16 -top-20 size-64 text-pink/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-heading text-sm font-bold text-pink">Seleksi</p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
            Pintu masuk anggota baru.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Seleksi dibuka lewat grup WhatsApp. Baca langkahnya, lalu masuk saat
            kamu sudah siap.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
              Cara ikut seleksi
            </h2>
            <ol className="mt-6 divide-y divide-line-soft">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.08}>
                  <li className="flex gap-5 py-6 first:pt-0 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface font-heading text-xs font-extrabold text-pink"
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
            <p className="mt-6 rounded-xl border border-line-soft bg-night-2 p-4 text-xs leading-relaxed text-muted">
              Ketentuan lengkap dan jadwal dibagikan di dalam grup. Tanyakan
              langsung ke admin kalau ada yang belum jelas.
            </p>
          </div>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-gradient-to-br from-surface to-night-2 p-6 sm:p-8">
                <Blossom className="absolute -right-8 -top-8 size-40 text-pink/10" />
                <p className="font-heading text-sm font-bold text-blossom">
                  Seleksi anggota
                </p>
                <h2 className="mt-3 font-heading text-2xl font-extrabold">
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
