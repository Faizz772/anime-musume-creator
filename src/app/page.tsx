import { Blossom } from "@/components/blossom";
import { BlossomSpin } from "@/components/blossom-spin";
import { Reveal } from "@/components/reveal";
import { ActionLink } from "@/components/action";
import { MemberAvatar } from "@/components/member-avatar";
import { RoleBadge } from "@/components/role-badge";
import { GallerySlot } from "@/components/gallery-slot";
import { GalleryCard } from "@/components/gallery-card";
import { SectionLabel } from "@/components/section-label";
import { TextLink } from "@/components/text-link";
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

        <div className="hero-in relative mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <SectionLabel>Komunitas kreator anime musume</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-heading text-[2.6rem] font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Clan Anime <span className="text-gradient">Musume</span> Creator
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Tempat berkumpulnya kreator yang menggambar, menulis, dan
              membangun karakter anime musume. Dari sketsa pertama sampai karya
              yang siap dibagikan.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <ActionLink href="/seleksi">Daftar seleksi</ActionLink>
              <ActionLink href="/tentang" variant="secondary">
                Kenalan dulu
              </ActionLink>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-3 divide-x divide-line-soft border-t border-line-soft pt-6">
            <div className="pr-4">
              <dt className="text-[11px] font-medium text-muted">Owner</dt>
              <dd className="mt-1 font-heading text-base font-bold">
                {owner.name}
              </dd>
            </div>
            <div className="px-4">
              <dt className="text-[11px] font-medium text-muted">Admin</dt>
              <dd className="mt-1 font-heading text-base font-bold">
                {admins.length} orang
              </dd>
            </div>
            <div className="pl-4">
              <dt className="text-[11px] font-medium text-muted">Seleksi</dt>
              <dd className="mt-1 flex items-center gap-2 font-heading text-base font-bold">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                Dibuka
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
          <SectionLabel>01 / Tentang</SectionLabel>
          <div>
            <h2 className="max-w-2xl font-heading text-2xl font-bold leading-[1.2] sm:text-3xl lg:text-4xl">
              Kami menggambar karakter, bukan sekadar ikut tren.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Clan Anime Musume Creator adalah komunitas kecil yang serius
                soal karya. Anggota saling memberi masukan, berbagi proses, dan
                merayakan hasil masing-masing.
              </p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Tidak perlu sudah jago untuk mulai. Yang penting mau belajar dan
                menghargai karya orang lain.
              </p>
            </div>
            <div className="mt-6">
              <TextLink href="/tentang">Baca soal clan</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line-soft bg-night-2/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>02 / Tim inti</SectionLabel>
              <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
                Yang menjaga ritme clan
              </h2>
            </div>
            <TextLink href="/tim">Semua tim</TextLink>
          </div>

          <ul className="mt-10 border-t border-line-soft">
            {coreTeam.map((member, index) => (
              <li
                key={member.name}
                className="flex items-center gap-4 border-b border-line-soft py-4"
              >
                <span className="w-6 shrink-0 font-heading text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <MemberAvatar
                  src={member.avatar}
                  initials={member.initials}
                  variant={member.role === "Owner" ? "solid" : "quiet"}
                  className="size-10 text-xs"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-bold">
                    {member.name}
                  </p>
                  <p className="text-xs text-accent">{member.username}</p>
                </div>
                <RoleBadge role={member.role} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <SectionLabel>03 / Galeri</SectionLabel>
            <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
              Karya anggota, satu tempat.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
              {gallery.length > 0
                ? "Karya terbaru dari anggota clan. Buka galeri untuk melihat semuanya."
                : "Galeri masih disiapkan. Begitu karya pertama masuk, akan tampil di halaman ini."}
            </p>
            <div className="mt-6">
              <TextLink href="/galeri">Buka galeri</TextLink>
            </div>
          </div>
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

      <section className="border-y border-line-soft bg-night-2/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="relative overflow-hidden">
            <Blossom className="absolute -right-12 -top-16 size-56 text-accent/10" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>04 / Seleksi</SectionLabel>
                <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
                  Mau gabung ke clan?
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                  Seleksi anggota dibuka lewat grup WhatsApp. Bawa karya terbaik
                  dan perkenalkan dirimu di sana.
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
        </div>
      </section>
    </main>
  );
}
