import { MessageCircle } from "lucide-react";

export function WhatsAppFab({ href }: { href: string | null }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-sm bg-brand text-brand-contrast hover:bg-brand-dark"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
