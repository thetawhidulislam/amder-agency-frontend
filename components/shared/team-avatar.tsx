"use client";

import { useState } from "react";
import { FadeImage } from "@/components/shared/fade-image";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TeamAvatar({
  name,
  photo,
  sizes,
  className,
}: {
  name: string;
  photo: string | null;
  sizes: string;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return photo && !imageFailed ? (
    <FadeImage
      src={photo}
      alt={name}
      fill
      sizes={sizes}
      className={className}
      onError={() => setImageFailed(true)}
    />
  ) : (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-zinc-100 font-display text-5xl font-semibold text-ink/35"
    >
      {initials(name)}
    </div>
  );
}