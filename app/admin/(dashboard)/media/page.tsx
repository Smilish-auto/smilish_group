import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy-deep">Media Library</h1>
      <p className="mt-1 text-sm text-navy/55">
        Every image uploaded across the site, in one place — upload, copy a link, or delete.
      </p>
      <div className="mt-8">
        <MediaLibrary />
      </div>
    </div>
  );
}
