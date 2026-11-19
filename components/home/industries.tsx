import { Container } from "@/components/shared/container";
import { industries } from "@/config/site";

export function Industries() {
  return (
    <section className="border-y border-line bg-surface py-16 sm:py-24">
      <Container>
        <p className="max-w-4xl font-display text-2xl font-medium leading-snug tracking-tight text-balance sm:text-4xl">
          We work with {industries.join(", ")}.
        </p>
      </Container>
    </section>
  );
}
