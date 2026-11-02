import { Blossom } from "@/components/blossom";
import { BlossomSpin } from "@/components/blossom-spin";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { TextLink } from "@/components/text-link";
import { MemberAvatar } from "@/components/member-avatar";
import { RoleBadge } from "@/components/role-badge";
import { GallerySlot } from "@/components/gallery-slot";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionLabel } from "@/components/section-label";
import { admins, coreTeam, owner, WHATSAPP_URL } from "@/lib/clan";
import { getGallery } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const gallery = await getGallery(3);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <BlossomSpin className="absolute -right-24 -top-24 size-80 text-accent/[0.06] sm:size-[28rem]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
          <SectionLabel>Komunitas kreator anime musume</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.8rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.045em]">
            Clan Anime <span className="text-gradient">Musume</span> Creator
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Tempat berkumpulnya pecinta anime dan kreator: editor, desainer,
                content creator, dan lainnya. Semua berproses bareng sampai
                karyanya siap dibagikan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="/seleksi">Daftar seleksi</ActionLink>
                <ActionLink href="/tentang" variant="secondary">
                  Kenalan dulu
                </ActionLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Sekilas
                </p>
                <dl className="mt-3 divide-y divide-line-soft">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-xs text-muted">Owner</dt>
                    <dd className="font-heading text-sm font-bold">
                      {owner.name}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-xs text-muted">Admin</dt>
                    <dd className="font-heading text-sm font-bold">
                      {admins.length} orang
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-xs text-muted">Seleksi</dt>
                    <dd className="flex items-center gap-2 font-heading text-sm font-bold">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-accent"
                      />
                      Dibuka
                    </dd>
                  </div>
                </dl>
                <div className="mt-3">
                  <TextLink href="/tim">Kenali tim inti</TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line-soft">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3">
                <p
                  aria-hidden="true"
                  className="font-heading text-5xl font-black text-accent/20"
                >
                  01
                </p>
                <div className="mt-4">
                  <SectionLabel>Tentang</SectionLabel>
                </div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="max-w-3xl font-heading text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                  Wadah kreatif untuk tumbuh bersama.
                </h2>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    Anime Musume Creator menjadi rumah bagi pecinta anime,
                    editor, desainer, dan content creator yang mau berkembang
                    bareng. Semua saling memberi masukan dan merayakan hasil.
                  </p>
                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    Tidak perlu sudah jago untuk mulai. Yang penting mau belajar
                    dan menghargai karya orang lain.
                  </p>
                </div>
                <div className="mt-7">
                  <TextLink href="/tentang">Baca soal clan</TextLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line-soft bg-night-2/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Tim inti</SectionLabel>
              <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl">
                Yang menjaga ritme clan
              </h2>
            </div>
            <TextLink href="/tim">Semua tim</TextLink>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {coreTeam.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-5 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/50">
                  <MemberAvatar
                    src={member.avatar}
                    initials={member.initials}
                    variant={member.role === "Owner" ? "solid" : "quiet"}
                    className="size-16 text-lg"
                  />
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-accent">
                      {member.username}
                    </span>
                    <RoleBadge role={member.role} />
                  </div>
                  <h3 className="mt-1 font-heading text-lg font-bold">
                    {member.name}
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Galeri</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-black tracking-tight sm:text-4xl">
              Karya anggota, satu tempat.
            </h2>
          </div>
          <TextLink href="/galeri">Buka galeri</TextLink>
        </div>

        <div className="mt-10">
          {gallery.length > 0 ? (
            <GalleryGrid items={gallery} />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <GallerySlot key={index} className="aspect-[3/4]" />
              ))}
            </div>
          )}
        </div>

        <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted">
          {gallery.length > 0
            ? "Karya terbaru dari anggota clan. Buka galeri untuk melihat semuanya."
            : "Galeri masih disiapkan. Begitu karya pertama masuk, akan tampil di halaman ini."}
        </p>
      </section>

      <section className="border-t border-line-soft">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-surface/60 p-6 sm:p-10">
              <Blossom className="absolute -right-10 -top-10 size-48 text-accent/10" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <SectionLabel>Seleksi</SectionLabel>
                  <h2 className="mt-3 max-w-xl font-heading text-3xl font-black tracking-tight sm:text-4xl">
                    Mau gabung ke clan?
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                    Seleksi anggota dibuka lewat grup WhatsApp. Bawa karya
                    terbaik dan perkenalkan dirimu di sana.
                  </p>
                </div>
                <ActionLink
                  href={WHATSAPP_URL}
                  external
                  className="shrink-0"
                >
                  Daftar seleksi sekarang
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
