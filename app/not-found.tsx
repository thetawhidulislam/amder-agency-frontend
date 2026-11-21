import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="relative isolate mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center overflow-hidden px-5">
      <div aria-hidden="true" className="not-found-blush pointer-events-none absolute -inset-x-24 inset-y-0" />
      <div className="relative z-10">
        <SplitHeading
          as="h1"
          text="404"
          className="before:mb-6 before:block before:h-1 before:w-12 before:bg-brand font-display text-[clamp(6rem,20vw,10rem)] font-semibold leading-none tracking-tight"
        />
        <Reveal variant="up" delay={120}>
          <p className="mt-4 text-muted">
            The page you are looking for does not exist or has moved.
          </p>
        </Reveal>
        <Reveal variant="up" delay={240} className="overflow-visible">
          <Magnetic className="mt-8">
            <Link href="/" className={cn(buttonClass())}>
              Back to home
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </div>
  );
}
