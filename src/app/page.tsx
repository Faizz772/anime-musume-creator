import Link from "next/link";
import { Blossom } from "@/components/blossom";
import { BlossomSpin } from "@/components/blossom-spin";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { MemberAvatar } from "@/components/member-avatar";
import { GallerySlot } from "@/components/gallery-slot";
import { GalleryCard } from "@/components/gallery-card";
import { admins, coreTeam, owner, WHATSAPP_URL } from "@/lib/clan";
import { getGallery } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const gallery = await getGallery(3);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-pink/10 via-purple/5 to-transparent" />
          <BlossomSpin className="absolute -right-20 -top-16 size-72 text-pink/[0.07] sm:size-96" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-heading text-sm font-bold text-pink">
                Komunitas kreator anime musume
              </p>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Clan Anime <span className="text-gradient">Musume</span> Creator
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Tempat berkumpulnya kreator yang menggambar, menulis, dan
                membangun karakter anime musume. Dari sketsa pertama sampai
                karya yang siap dibagikan.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="/seleksi">Daftar seleksi</ActionLink>
                <ActionLink href="/tentang" variant="secondary">
                  Kenalan dulu
                </ActionLink>
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-line bg-surface/80 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading text-sm font-bold">
                    Seleksi anggota
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-pink/40 bg-pink/10 px-2.5 py-1 text-[11px] font-semibold text-blossom">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-pink"
                    />
                    Dibuka
                  </span>
                </div>
                <div className="my-5 h-px w-full hairline" />
                <p className="text-sm leading-relaxed text-muted">
                  Pintu masuk anggota baru lewat grup WhatsApp. Perkenalkan
                  diri, tunjukkan karya, lalu ikuti arahan admin.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-line-soft bg-night-2 p-3">
                    <p className="font-heading text-2xl font-extrabold">1</p>
                    <p className="mt-1 text-xs text-muted">Owner</p>
                    <p className="font-heading text-sm font-bold">
                      {owner.name}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line-soft bg-night-2 p-3">
                    <p className="font-heading text-2xl font-extrabold">
                      {admins.length}
                    </p>
                    <p className="mt-1 text-xs text-muted">Admin</p>
                    <p className="font-heading text-sm font-bold">Tim inti</p>
                  </div>
                </div>
                <Link
                  href="/tim"
                  className="mt-5 inline-flex text-sm font-semibold text-pink transition-colors hover:text-blossom"
                >
                  Lihat tim inti
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="font-heading text-2xl font-extrabold leading-snug sm:text-3xl">
              Kami menggambar karakter, bukan sekadar ikut tren.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4">
            <p className="text-base leading-relaxed text-muted">
              Clan Anime Musume Creator adalah komunitas kecil yang serius soal
              karya. Anggota saling memberi masukan, berbagi proses, dan
              merayakan hasil masing-masing.
            </p>
            <p className="text-base leading-relaxed text-muted">
              Tidak perlu sudah jago untuk mulai. Yang penting mau belajar dan
              menghargai karya orang lain.
            </p>
            <Link
              href="/tentang"
              className="inline-flex text-sm font-semibold text-pink transition-colors hover:text-blossom"
            >
              Baca soal clan
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line-soft bg-night-2/60">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-sm font-bold text-pink">
                Tim inti
              </p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">
                Yang menjaga ritme clan
              </h2>
            </div>
            <Link
              href="/tim"
              className="shrink-0 text-sm font-semibold text-pink transition-colors hover:text-blossom"
            >
              Semua tim
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {coreTeam.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-surface p-4">
                  <MemberAvatar
                    initials={member.initials}
                    tone={member.role === "Owner" ? "pink" : "purple"}
                    className="size-11 text-sm"
                  />
                  <p className="mt-3 font-heading text-sm font-bold">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <Reveal>
            <p className="font-heading text-sm font-bold text-pink">Galeri</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">
              Karya anggota, satu tempat.
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              {gallery.length > 0
                ? "Karya terbaru dari anggota clan. Buka galeri untuk melihat semuanya."
                : "Galeri masih disiapkan. Begitu karya pertama masuk, akan tampil di halaman ini."}
            </p>
            <Link
              href="/galeri"
              className="mt-5 inline-flex text-sm font-semibold text-pink transition-colors hover:text-blossom"
            >
              Buka galeri
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3">
              {gallery.length > 0
                ? gallery.map((item) => (
                    <GalleryCard key={item.id} item={item} />
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <GallerySlot key={index} className="aspect-[3/4]" />
                  ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-4 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface to-night-2 p-8 sm:p-12">
          <Blossom className="absolute -bottom-12 -right-10 size-56 text-purple/10" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                Mau gabung ke clan?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Seleksi anggota dibuka lewat grup WhatsApp. Bawa karya terbaik
                dan perkenalkan dirimu di sana.
              </p>
            </div>
            <ActionLink href={WHATSAPP_URL} external className="shrink-0">
              Daftar seleksi sekarang
            </ActionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
