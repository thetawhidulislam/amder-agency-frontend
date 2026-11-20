import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { buttonClass } from "@/components/ui/button";
import { CtaShapes } from "@/components/graphics/cta-shapes";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

// The one loud block on each page: full brand color.
export function CtaBand({ whatsapp, title = "Let's build, promote and grow, together." }: { whatsapp: string | null; title?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand py-20 text-brand-contrast sm:py-28 lg:py-32">
      <Reveal y={0} className="relative overflow-visible">
        <CtaShapes />
        <Container className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-balance">
            {title}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(buttonClass({ variant: "ink", size: "lg" }), "button-wipe button-wipe-cta-primary")}
            >
              Start a project
              <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" strokeWidth={1.75} />
            </Link>
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="button-wipe button-wipe-cta-outline inline-flex h-13 items-center rounded-sm border border-brand-contrast px-8 text-base font-medium"
              >
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
