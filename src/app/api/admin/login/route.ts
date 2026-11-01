import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSession,
  isAdminConfigured,
  passwordMatches,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin belum dikonfigurasi. Set ADMIN_PASSWORD dan ADMIN_SESSION_SECRET." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { password?: unknown }
    | null;

  const password = typeof body?.password === "string" ? body.password : "";

  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}
