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
        <dl className="grid gap-4">
          {whyPoints.map((p, index) => {
            const Icon = whyIcons[index];
            return (
              <div key={p.title} className="why-card group grid gap-4 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:grid-cols-[1fr_1.2fr] sm:items-center">
                <dt className="flex items-center gap-4 font-display text-xl font-semibold">
                  <span className="why-card-icon flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                  </span>
                  <span>{p.title}</span>
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
