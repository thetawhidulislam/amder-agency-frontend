import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MOTION_LEVEL } from "@/lib/motion";

export function LoadingSkeleton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("loading-skeleton", className)}
      data-motion-level={MOTION_LEVEL}
    >
      {children}
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("rounded-xl bg-surface", className)} />;
}
