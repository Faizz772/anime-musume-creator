import { cookies } from "next/headers";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "amc_admin";
const SESSION_DAYS = 7;

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET,
  );
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();

  return timingSafeEqual(a, b);
}

export function createSession() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `admin.${expires}`;
  const signature = createHmac("sha256", process.env.ADMIN_SESSION_SECRET ?? "")
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifySession(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [role, expiresRaw, signature] = parts;
  if (role !== "admin") return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = createHmac("sha256", secret)
    .update(`${role}.${expiresRaw}`)
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex"),
    );
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}
