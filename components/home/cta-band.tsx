import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { buttonClass } from "@/components/ui/button";

// The one loud block on each page: full brand color.
export function CtaBand({ whatsapp, title = "Let's build, promote and grow, together." }: { whatsapp: string | null; title?: string }) {
  return (
    <section className="bg-brand py-20 text-brand-contrast sm:py-28 lg:py-32">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-6xl">
          {title}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className={buttonClass({ variant: "ink", size: "lg" })}>
            Start a project
            <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" />
          </Link>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center rounded-sm border border-brand-contrast px-8 text-base font-medium hover:bg-brand-contrast hover:text-brand"
            >
              Chat on WhatsApp
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
