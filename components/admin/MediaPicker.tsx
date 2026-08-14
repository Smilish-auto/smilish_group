"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ImageIcon, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface MediaFile {
  name: string;
  path: string;
  url: string;
  updatedAt: string;
}

async function listAllMediaFiles(supabase: ReturnType<typeof createClient>): Promise<MediaFile[]> {
  const { data: topLevel, error } = await supabase.storage.from("media").list("", { limit: 100 });
  if (error) throw error;

  const files: MediaFile[] = [];
  const folders = (topLevel ?? []).filter((item) => item.id === null);

  for (const folder of folders) {
    const { data: inner, error: innerError } = await supabase.storage
      .from("media")
      .list(folder.name, { limit: 200 });
    if (innerError) continue;

    for (const file of inner ?? []) {
      if (file.id === null) continue;
      const path = `${folder.name}/${file.name}`;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      files.push({
        name: file.name,
        path,
        url: data.publicUrl,
        updatedAt: file.updated_at ?? file.created_at ?? "",
      });
    }
  }

  return files.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function MediaPicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      setFiles(await listAllMediaFiles(supabase));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the media library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          <div className="relative w-40 overflow-hidden rounded-lg border border-line bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Selected media" className="aspect-square w-full object-cover" />
          </div>
        ) : (
          <div className="grid h-40 w-40 place-items-center rounded-lg border border-dashed border-line bg-mist text-navy/35">
            <div className="text-center">
              <ImageIcon className="mx-auto" size={22} />
              <span className="mt-2 block text-xs">No image selected</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-deep"
          >
            Choose from Media Library
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full border border-line px-4 py-2 text-sm text-navy/70 hover:border-navy"
            >
              Remove image
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/55 p-4">
          <div className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h3 className="font-display text-lg font-medium text-navy-deep">Choose media</h3>
                <p className="text-xs text-navy/50">Select an image already uploaded to your Media Library.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-mist"
                aria-label="Close media picker"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-sm text-navy/50">
                  <Loader2 size={18} className="animate-spin" /> Loading media…
                </div>
              ) : error ? (
                <div className="py-16 text-center text-sm text-red-500">{error}</div>
              ) : files.length === 0 ? (
                <div className="py-16 text-center text-sm text-navy/50">
                  No media found. Upload an image in Media Library first.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {files.map((file) => {
                    const selected = file.url === value;
                    return (
                      <button
                        type="button"
                        key={file.path}
                        onClick={() => {
                          onChange(file.url);
                          setOpen(false);
                        }}
                        className={`group relative overflow-hidden rounded-xl border text-left transition ${
                          selected ? "border-gold ring-2 ring-gold/40" : "border-line hover:border-navy/40"
                        }`}
                        title={file.name}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={file.url} alt={file.name} className="aspect-square w-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 truncate bg-black/55 px-2 py-2 text-[10px] text-white">
                          {file.name}
                        </div>
                        {selected && (
                          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-gold text-navy-deep">
                            <Check size={15} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
