"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { cn } from "@/lib/utils";

export function FadeImage({ className, onLoad, onError, ...props }: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, []);

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    setLoaded(true);
    onLoad?.(event);
  }

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    setLoaded(true);
    onError?.(event);
  }

  return (
    <Image
      {...props}
      ref={imageRef}
      className={cn("fade-image bg-surface", className, loaded && "fade-image-loaded")}
      onLoad={handleLoad}
      onError={handleError}
      data-reveal=""
    />
  );
}
