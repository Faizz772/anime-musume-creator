import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
import { Reveal } from "@/components/reveal";
import { MemberAvatar } from "@/components/member-avatar";
import { RoleBadge } from "@/components/role-badge";
import { ActionLink } from "@/components/action";
import { SectionLabel } from "@/components/section-label";
import { admins, owner } from "@/lib/clan";

export const metadata: Metadata = {
  title: "Tim Inti",
};

export default function TimPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -left-20 -top-20 size-72 text-accent/[0.07]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel>02 / Tim inti</SectionLabel>
          <h1 className="mt-6 max-w-2xl font-heading text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            Empat orang di balik clan.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Mereka yang menjaga arah, menjawab pertanyaan, dan menyambut anggota
            baru.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-lg border border-accent/25 bg-surface p-6 sm:p-8">
              <Blossom className="absolute -right-10 -top-10 size-44 text-accent/10" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <RoleBadge role="Owner" />
                  <span className="font-heading text-xs text-muted">01</span>
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <MemberAvatar
                    initials={owner.initials}
                    className="size-16 text-xl"
                  />
                  <div>
                    <p className="text-xs text-muted">Pemegang arah clan</p>
                    <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                      {owner.name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-lg border border-line bg-surface">
              <ul className="divide-y divide-line-soft">
                {admins.map((member, index) => (
                  <li
                    key={member.name}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <span className="w-5 font-heading text-xs text-muted">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    <MemberAvatar
                      initials={member.initials}
                      variant="quiet"
                      className="size-10 text-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-sm font-bold">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted">
                        Membantu jalannya clan
                      </p>
                    </div>
                    <RoleBadge role="Admin" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted">
              Ada pertanyaan untuk tim inti? Mulai dari grup seleksi.
            </p>
            <ActionLink href="/kontak" variant="secondary" className="shrink-0">
              Hubungi kami
            </ActionLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
