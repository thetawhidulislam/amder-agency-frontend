import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/home/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Container, Section } from "@/components/shared/container";
import { publicButtonClass } from "@/components/shared/public-button";
import { TeamAvatar } from "@/components/shared/team-avatar";
import { TeamSection } from "@/components/shared/team-section";
import { siteConfig } from "@/config/site";
import { getSettings, getTeam, getTeamMember } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const socialProfiles = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "instagram", label: "Instagram", Icon: Instagram },
] as const;

export async function generateStaticParams() {
  const team = await getTeam();
  return team.flatMap((member) => (member.slug ? [{ slug: member.slug }] : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) return { title: "Team member not found" };

  return {
    title: `${member.name}, ${member.role}`,
    description: member.bio || member.about?.slice(0, 155),
    alternates: { canonical: `/team/${member.slug ?? slug}` },
    ...(member.photo ? { openGraph: { images: [member.photo] } } : {}),
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const [member, team, settings] = await Promise.all([
    getTeamMember(slug),
    getTeam(),
    getSettings(),
  ]);
  if (!member) notFound();

  const socials = socialProfiles.flatMap(({ key, label, Icon }) => {
    const href = member.socials?.[key];
    return href ? [{ href, label, Icon }] : [];
  });
  const aboutParagraphs = (member.about ?? "")
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const otherMembers = team.filter((other) => other.id !== member.id).slice(0, 3);
  const sameAs = Object.values(member.socials ?? {}).filter(
    (profile): profile is string => Boolean(profile)
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    ...(member.photo ? { image: member.photo } : {}),
    url: `${siteConfig.url}/team/${member.slug ?? slug}`,
    sameAs,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <Section className="!py-12 lg:!py-20">
        <Container>
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Our team
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <Reveal variant="left" className="overflow-visible lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100">
                <TeamAvatar
                  name={member.name}
                  photo={member.photo}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal variant="up" className="overflow-visible">
              <div>
                {member.department ? (
                  <span className="inline-flex rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-muted">
                    {member.department}
                  </span>
                ) : null}

                <SplitHeading
                  as="h1"
                  text={member.name}
                  className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-balance"
                />
                <p className="mt-3 text-xl text-muted">{member.role}</p>

                {socials.length ? (
                  <nav aria-label={`${member.name} social links`} className="mt-6 flex gap-2">
                    {socials.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${label}`}
                        className="flex size-10 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </a>
                    ))}
                  </nav>
                ) : null}

                {member.bio ? (
                  <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink">{member.bio}</p>
                ) : null}

                {aboutParagraphs.length ? (
                  <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
                    {aboutParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {member.skills.length ? (
                  <div className="mt-8">
                    <h2 className="font-display text-lg font-semibold">Skills</h2>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <li key={skill} className="rounded-full bg-surface px-3.5 py-1.5 text-sm text-muted">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <Link href="/contact" className={`${publicButtonClass()} mt-8`}>
                  Work with us
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {otherMembers.length ? <TeamSection members={otherMembers} title="More from the team" /> : null}

      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}