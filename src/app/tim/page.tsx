import type { Metadata } from "next";
import { Blossom } from "@/components/blossom";
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
      <section className="relative overflow-hidden border-b border-line-soft">
        <Blossom className="absolute -left-16 -top-20 size-64 text-purple/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-heading text-sm font-bold text-pink">Tim inti</p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
            Empat orang di balik clan.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Mereka yang menjaga arah, menjawab pertanyaan, dan menyambut anggota
            baru.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-pink/30 bg-gradient-to-br from-surface to-night-2 p-6 sm:p-8">
              <Blossom className="absolute -right-10 -top-10 size-44 text-pink/10" />
              <RoleBadge role="Owner" />
              <div className="mt-8 flex items-center gap-4">
                <MemberAvatar
                  initials={owner.initials}
                  className="size-16 text-xl"
                />
                <div>
                  <p className="text-xs text-muted">Pemegang arah clan</p>
                  <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                    {owner.name}
                  </h2>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-line bg-surface p-2">
              <ul className="divide-y divide-line-soft">
                {admins.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-center gap-4 px-4 py-4"
                  >
                    <MemberAvatar
                      initials={member.initials}
                      tone="purple"
                      className="size-11 text-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-sm font-bold">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted">Membantu jalannya clan</p>
                    </div>
                    <RoleBadge role="Admin" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-night-2 p-6 sm:flex-row sm:items-center sm:justify-between">
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
