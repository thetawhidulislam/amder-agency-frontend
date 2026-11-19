import { Container, Section } from "@/components/shared/container";
import { whyPoints } from "@/config/site";

export function Why() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Why businesses choose Amader Agency
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted">
            Growth needs more than advertising. It needs the right strategy, clear creative and steady execution.
          </p>
        </div>
        <dl className="border-t border-line">
          {whyPoints.map((p) => (
            <div key={p.title} className="grid gap-1 border-b border-line py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <dt className="font-display text-xl font-semibold">{p.title}</dt>
              <dd className="text-muted">{p.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
