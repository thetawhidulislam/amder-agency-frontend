import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import type { Service } from "@/lib/types";

export function ServicesSection({
  services,
  title = "What we do",
  intro = "Specialist departments, coordinated under one roof, so you brief one agency and get the full result.",
  pageTitle = false,
}: {
  services: Service[];
  title?: string;
  intro?: string;
  pageTitle?: boolean;
}) {
  return (
    <Section id="services">
      <Container>
        <SectionHeading title={title} intro={intro} as={pageTitle ? "h1" : "h2"} accent={pageTitle} />

        {services.length === 0 ? (
          <p className="mt-12 border-t border-line pt-8 text-muted">
            Services will appear here once they are added in the admin panel.
          </p>
        ) : (
          <ul className="mt-14 border-t border-line">
            {services.map((s) => (
              <li key={s.id} className="grid gap-6 border-b border-line px-3 py-10 hover:bg-surface md:grid-cols-[1fr_1.4fr] md:gap-14">
                <div>
                  <span className="flex size-11 items-center justify-center bg-ink">
                    <ServiceIcon name={s.icon} className="size-5 text-brand" />
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    <Link href={`/services/${s.slug}`} className="transition-colors hover:text-brand">
                      {s.title}
                    </Link>
                  </h3>
                </div>
                <div>
                  <p className="max-w-prose text-lg text-muted">{s.shortDesc}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 bg-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-7 inline-block text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
                  >
                    See what is included
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
