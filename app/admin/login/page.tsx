"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Monogram } from "@/components/Mark";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const notAuthorized = searchParams.get("error") === "not-authorized";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-navy p-8">
        <div className="flex items-center gap-2.5">
          <Monogram className="h-8 w-8" />
          <span className="font-display text-lg font-medium text-white">Smilish Admin</span>
        </div>
        <p className="mt-6 text-sm text-white/55">
          Sign in with the admin account created in Supabase.
        </p>

        {notAuthorized && (
          <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-xs text-gold-soft">
            That account isn&apos;t listed as an admin yet. See the README for how to add one.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-white/50">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold"
              placeholder="you@smilishgroup.com"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-white/50">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
