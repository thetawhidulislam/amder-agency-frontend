import Image from "next/image";
import { cn } from "@/lib/utils";

export function PortfolioEmptyState({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="grid gap-6 sm:grid-cols-3">
        {[0, 1, 2].map((tile) => (
          <div
            key={tile}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white"
            aria-hidden="true"
          >
            <svg className="absolute inset-0 size-full" preserveAspectRatio="none">
              <defs>
                <pattern
                  id={`portfolio-placeholder-lines-${tile}`}
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <path d="M0 0V16" stroke="#0B0B0B" strokeOpacity="0.06" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#portfolio-placeholder-lines-${tile})`} />
            </svg>
            <Image
              src="/logo.png"
              alt=""
              width={128}
              height={128}
              className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12]"
            />
          </div>
        ))}
      </div>
      <p className="mt-6 text-center font-display text-xl font-semibold">Projects coming soon</p>
    </div>
  );
}
