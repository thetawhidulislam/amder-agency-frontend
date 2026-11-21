"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

export function FadeImage({ className, onLoad, onError, ...props }: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"server" | "pending" | "loaded" | "error">("server");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (image.complete) {
      setStatus(image.naturalWidth > 0 ? "loaded" : "error");
      return;
    }

    if (reducedMotion) {
      setStatus("loaded");
      return;
    }

    setStatus("pending");
    const timeout = window.setTimeout(() => {
      setStatus((current) => current === "pending" ? "loaded" : current);
    }, 2500);

    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    setStatus("loaded");
    onLoad?.(event);
  }

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    setStatus("error");
    onError?.(event);
  }

  return (
    <>
      <Image
        {...props}
        ref={imageRef}
        className={cn(
          "fade-image bg-surface",
          className,
          status === "pending" && "fade-image-pending",
          status === "loaded" && "fade-image-loaded",
          status === "error" && "hidden"
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      {status === "error" ? (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-surface">
          <Image
            src="/logo.png"
            alt=""
            width={128}
            height={128}
            className="size-28 object-contain opacity-[0.12]"
          />
        </span>
      ) : null}
    </>
  );
}
