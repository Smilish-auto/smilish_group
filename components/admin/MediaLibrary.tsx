"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Trash2, UploadCloud, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaFile {
  name: string;
  path: string;
  url: string;
  updatedAt: string;
}

async function listAllFiles(supabase: ReturnType<typeof createClient>): Promise<MediaFile[]> {
  // The bucket is organized into folders (fashion-products/, properties/, etc.)
  // — list top-level folders, then list inside each.
  const { data: topLevel } = await supabase.storage.from("media").list("", { limit: 100 });
  const folders = (topLevel ?? []).filter((item) => item.id === null); // folders have no id

  const files: MediaFile[] = [];

  for (const folder of folders) {
    const { data: inner } = await supabase.storage.from("media").list(folder.name, { limit: 200 });
    for (const file of inner ?? []) {
      if (file.id === null) continue; // skip nested folders
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

export function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    try {
      const result = await listAllFiles(supabase);
      setFiles(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load media.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern
    refresh();
  }, [refresh]);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    const supabase = createClient();
    const path = `uploads/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    refresh();
  }

  async function handleDelete(path: string) {
    if (!confirm("Delete this file? Anything on the site still using it will show a broken image.")) return;
    const supabase = createClient();
    await supabase.storage.from("media").remove([path]);
    setFiles((f) => f.filter((file) => file.path !== path));
  }

  function copyUrl(file: MediaFile) {
    navigator.clipboard.writeText(file.url);
    setCopiedPath(file.path);
    setTimeout(() => setCopiedPath(null), 1500);
  }

  return (
    <div>
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep">
        {uploading ? <Loader2 size={15} className="animate-spin" /> : <UploadCloud size={15} />}
        {uploading ? "Uploading…" : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </label>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-navy/50">Loading…</p>
      ) : files.length === 0 ? (
        <p className="mt-8 text-sm text-navy/50">
          No images uploaded yet. Images you add through product, property, or project forms will
          also show up here automatically.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div key={file.path} className="group relative overflow-hidden rounded-xl border border-line bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file.url} alt="" className="aspect-square w-full object-cover" />
              <div className="absolute inset-0 flex items-end justify-end gap-1.5 bg-gradient-to-t from-black/50 via-transparent to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(file)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-navy-deep hover:bg-white"
                  title="Copy URL"
                >
                  {copiedPath === file.path ? <Check size={13} /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => handleDelete(file.path)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-red-500 hover:bg-white"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
