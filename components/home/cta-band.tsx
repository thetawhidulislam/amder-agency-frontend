import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand({ whatsapp, title = "Let's build, promote and grow, together." }: { whatsapp: string | null; title?: string }) {
  return (
    <section className="bg-ink pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
      <Reveal y={0} className="overflow-visible">
        <Container>
          <div className="cta-card relative isolate overflow-hidden rounded-3xl bg-brand p-8 sm:p-12 lg:p-16">
            <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-brand-dark/60" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-48 right-16 size-80 rounded-full bg-brand-dark/60" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white text-balance">
                  {title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-white/85">
                  Tell us about your business and we will plan the next step with you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="public-button inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-medium text-ink sm:px-8"
                >
                  Start a project
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </Link>
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="public-button inline-flex h-12 items-center justify-center rounded-xl border border-white/50 px-6 font-medium text-white hover:bg-white/10 sm:px-8"
                  >
                    Chat on WhatsApp
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
