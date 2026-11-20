import { CircleCheck, Compass, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/config/site";

const processIcons = [Search, Compass, PenTool, CircleCheck, Rocket, TrendingUp];

export function Process() {
  return (
    <Section className="theme-dark bg-page text-fg">
      <Container>
        <SectionHeading title="How a project runs" intro="Six steps from first conversation to delivery, the same way every time." />
        <Reveal y={0}>
          <ol className="process-steps mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => {
              const Icon = processIcons[i];
              return (
                <li key={step.title} className="process-step group">
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="process-icon flex size-12 items-center justify-center border border-white/30 bg-ink">
                      <Icon aria-hidden="true" className="size-6 text-brand group-hover:text-white" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-5xl font-semibold text-brand" aria-hidden="true">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-muted">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
