import { BadgeCheck, HeartHandshake, Layers, Target, Users } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { whyPoints } from "@/config/site";

const whyIcons = [Layers, Users, Target, BadgeCheck, HeartHandshake];

export function Why() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <SectionHeading
          title="Why businesses choose Amader Agency"
          intro="Growth needs more than advertising. It needs the right strategy, clear creative and steady execution."
          className="self-start lg:sticky lg:top-28"
        />
        <dl className="border-t border-line">
          {whyPoints.map((p, index) => {
            const Icon = whyIcons[index];
            return (
              <div key={p.title} className="grid gap-1 border-b border-line border-l-[3px] border-l-transparent py-6 pl-5 hover:border-l-brand sm:grid-cols-[13rem_1fr] sm:gap-8">
                <dt className="flex items-center gap-3 font-display text-xl font-semibold">
                  <Icon aria-hidden="true" className="size-6 shrink-0 text-brand" />
                  {p.title}
                </dt>
                <dd className="text-muted">{p.text}</dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}
