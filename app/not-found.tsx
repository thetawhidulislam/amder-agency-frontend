import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-5">
      <h1 className="before:mb-6 before:block before:h-1 before:w-12 before:bg-brand font-display text-5xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className={cn(buttonClass(), "mt-8")}>
        Back to home
      </Link>
    </div>
  );
}
