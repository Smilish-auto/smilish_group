import { createBrowserClient } from "@supabase/ssr";

/**
 * Client for use in Client Components ("use client"). Reads the public
 * URL/anon key — safe to expose in the browser, since all access is
 * gated by the Row Level Security policies in supabase/schema.sql.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
