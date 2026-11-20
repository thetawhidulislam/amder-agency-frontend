import { CircleCheck, Compass, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/config/site";

const processIcons = [Search, Compass, PenTool, CircleCheck, Rocket, TrendingUp];

export function Process() {
  return (
    <Section className="theme-dark bg-ink text-white">
      <Container>
        <SectionHeading
          title="How a project runs"
          intro="Six steps from first conversation to delivery, the same way every time."
          align="center"
          chip="How it works"
          chipTone="dark"
        />
        <Reveal y={0}>
          <ol className="process-steps mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => {
              const Icon = processIcons[i];
              return (
                <li key={step.title} className="process-step group rounded-3xl border border-white/10 bg-[#161616] p-8 text-center">
                  <div className="process-icon-wrap relative mx-auto w-fit">
                    <span className="process-icon-ring flex size-[114px] items-center justify-center rounded-full border border-white/15 p-2">
                      <span className="flex size-full items-center justify-center rounded-full bg-white">
                        <Icon aria-hidden="true" className="size-10 text-brand" strokeWidth={1.75} />
                      </span>
                    </span>
                    <span className="process-number absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                      {String(i + 1).padStart(2, "0")}
                      <span aria-hidden="true" className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-brand" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-sm text-white/65">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
