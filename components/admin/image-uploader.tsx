"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { api, getErrorMessage } from "@/lib/api-client";

/** Uploads images through the API (Cloudinary) and returns their URLs. */
export function ImageUploader({
  value,
  onChange,
  max = 1,
  folder = "portfolio",
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  folder?: string;
}) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canAdd = value.length < max;

  async function onPick(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, max - value.length);
    e.target.value = "";
    if (files.length === 0) return;

    setBusy(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        const res = await api.post<{ data: { url: string } }>(`/admin/upload/image?folder=${folder}`, form);
        urls.push(res.data.data.url);
      }
      onChange([...value, ...urls]);
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {value.map((url) => (
          <div key={url} className="relative size-28 overflow-hidden rounded-sm border border-line bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="size-full object-cover" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange(value.filter((u) => u !== url))}
              className="absolute right-1 top-1 rounded-sm bg-black/70 p-1 text-white hover:bg-black"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        {canAdd ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="flex size-28 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-line text-xs text-muted hover:border-brand hover:text-fg disabled:opacity-50"
          >
            <ImagePlus className="size-5" />
            {busy ? "Uploading..." : "Add image"}
          </button>
        ) : null}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={max > 1} className="hidden" onChange={onPick} />
      <p className="mt-2 text-xs text-muted">JPG, PNG, WEBP or AVIF, up to 5MB each.</p>
    </div>
  );
}
