import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { industries } from "@/config/site";

const industryGroups: { name: string; index: number }[][] = [];
industries.forEach((name, index) => {
  const groupIndex = Math.min(index, 5);
  industryGroups[groupIndex] ??= [];
  industryGroups[groupIndex].push({ name, index });
});

export function Industries() {
  return (
    <section className="relative isolate border-y border-line bg-surface py-20 sm:py-28 lg:py-32">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none">
        <defs>
          <pattern id="industry-dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#0B0B0B" fillOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#industry-dot-pattern)" />
      </svg>
      <Container className="relative z-10">
        <p className="max-w-4xl font-display text-2xl font-medium leading-snug tracking-tight text-balance sm:text-4xl">
          We work with{" "}
          {industryGroups.map((group, groupIndex) => (
            <Reveal
              key={group[0].index}
              as="span"
              className="motion-reveal-inline"
              delay={groupIndex * 80}
            >
              {group.map(({ name, index }) => (
                <span key={index}>
                  {index > 0 ? ", " : null}
                  <span className="industry-highlight">{name}</span>
                </span>
              ))}
            </Reveal>
          ))}
          .
        </p>
      </Container>
    </section>
  );
}
