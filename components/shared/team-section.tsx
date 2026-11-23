import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { TeamCard } from "@/components/shared/team-card";
import type { TeamMember } from "@/lib/types";

const defaultTitle = "Meet the team";
const defaultIntro = "Specialists in marketing, design, video and web working together on your business.";

export function TeamSection({
  members,
  id,
  title = defaultTitle,
  intro = defaultIntro,
  viewAllHref,
  max,
}: {
  members: TeamMember[];
  id?: string;
  title?: string;
  intro?: string;
  viewAllHref?: string;
  max?: number;
}) {
  if (members.length === 0) return null;

  const visibleMembers = max === undefined ? members : members.slice(0, max);

  return (
    <Section id={id} className="!py-16 sm:!py-16 lg:!py-20">
      <Container>
        <div className="mb-10">
          <SectionHeading
            chip="Our team"
            title={title}
            intro={intro}
            align="center"
            titleClassName="text-[clamp(2rem,4vw,3rem)]"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {visibleMembers.map((member, index) => (
            <Reveal
              key={member.id}
              delay={Math.min(index, 7) * 80}
              className="basis-full overflow-visible sm:basis-[calc(50%_-_0.625rem)] lg:basis-[calc(25%_-_0.9375rem)]"
            >
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>

        {viewAllHref ? (
          <div className="mt-8 text-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
            >
              View full team
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
