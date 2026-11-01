"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Blossom } from "./blossom";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    setBusy(false);

    if (!response.ok) {
      setError(data.error ?? "Gagal masuk.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-pink to-purple text-night">
          <Blossom className="size-6" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-extrabold">
          Masuk panel admin
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Hanya untuk pengelola clan. Masukkan password admin.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-line bg-night-2 px-4 py-3 text-sm text-text placeholder:text-muted focus:border-pink/60 focus:outline-none"
              placeholder="Password admin"
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="rounded-lg border border-pink/40 bg-pink/10 px-3 py-2 text-xs text-blossom"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink to-purple px-5 py-3 text-sm font-semibold text-night transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
