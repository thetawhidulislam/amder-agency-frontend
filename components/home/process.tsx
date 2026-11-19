import { Container, Section, SectionHeading } from "@/components/shared/container";
import { processSteps } from "@/config/site";

// A real sequence, so numbered steps are appropriate here.
export function Process() {
  return (
    <Section className="theme-dark bg-page text-fg">
      <Container>
        <SectionHeading title="How a project runs" intro="Six steps from first conversation to delivery, the same way every time." />
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <li key={step.title} className="border-t border-line pt-6">
              <span className="font-display text-5xl font-semibold text-brand" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
