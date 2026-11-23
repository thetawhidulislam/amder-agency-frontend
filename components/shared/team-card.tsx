"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { FadeImage } from "@/components/shared/fade-image";
import type { TeamMember } from "@/lib/types";

const socialProfiles = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "instagram", label: "Instagram", Icon: Instagram },
] as const;

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

export function TeamCard({ member }: { member: TeamMember }) {
  const [imageFailed, setImageFailed] = useState(false);
  const socials = socialProfiles.flatMap(({ key, label, Icon }) => {
    const href = member.socials?.[key];
    return href ? [{ href, label, Icon }] : [];
  });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white text-ink shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        {member.photo && !imageFailed ? (
          <FadeImage
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-zinc-100 font-display text-5xl font-semibold text-ink/35"
          >
            {initials(member.name)}
          </div>
        )}

        {socials.length ? (
          <nav
            aria-label={`${member.name} social links`}
            className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-2 justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent px-3 pb-3 pt-8 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:flex"
          >
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${label}`}
                className="flex size-9 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </nav>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold leading-tight">{member.name}</h3>
        <p className="mt-1 text-sm text-muted">{member.role}</p>
        {member.department ? (
          <span className="mt-3 w-fit rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
            {member.department}
          </span>
        ) : null}
        {member.bio ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{member.bio}</p> : null}

        {socials.length ? (
          <nav
            aria-label={`${member.name} social links`}
            className="mt-4 flex gap-2 [@media(hover:hover)_and_(pointer:fine)]:hidden"
          >
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${label}`}
                className="flex size-9 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </article>
  );
}
