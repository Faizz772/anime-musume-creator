import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { MemberAvatar } from "@/components/member-avatar";
import { RoleBadge } from "@/components/role-badge";
import { ActionLink } from "@/components/action";
import { admins, owner } from "@/lib/clan";

export const metadata: Metadata = {
  title: "Tim Inti",
};

export default function TimPage() {
  return (
    <main>
      <PageHero
        index="02"
        label="Tim inti"
        title="Empat orang di balik clan."
        intro="Mereka yang menjaga arah, menjawab pertanyaan, dan menyambut anggota baru."
        aside={
          <aside className="rounded-2xl bg-surface p-5">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Struktur
            </p>
            <dl className="mt-3 divide-y divide-line-soft">
              <div className="py-3">
                <dt className="text-xs text-muted">Owner</dt>
                <dd className="mt-1 font-heading text-sm font-bold">
                  {owner.name}
                </dd>
              </div>
              <div className="py-3">
                <dt className="text-xs text-muted">Admin</dt>
                <dd className="mt-1 font-heading text-sm font-bold">
                  {admins.map((member) => member.name).join(", ")}
                </dd>
              </div>
            </dl>
          </aside>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <article className="rounded-2xl bg-surface-2 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="flex flex-col items-start gap-4 lg:col-span-4">
                <MemberAvatar
                  src={owner.avatar}
                  initials={owner.initials}
                  className="size-24 text-2xl"
                />
                <RoleBadge role="Owner" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-xs text-accent-2">{owner.username}</p>
                <h2 className="mt-1 font-heading text-3xl font-black tracking-tight sm:text-4xl">
                  {owner.name}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {owner.task}
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {admins.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-2xl bg-surface p-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <MemberAvatar
                    src={member.avatar}
                    initials={member.initials}
                    variant="quiet"
                    className="size-14 text-base"
                  />
                  <RoleBadge role="Admin" />
                </div>
                <p className="mt-4 text-xs text-accent-2">{member.username}</p>
                <h3 className="font-heading text-lg font-bold">{member.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {member.task}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
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
