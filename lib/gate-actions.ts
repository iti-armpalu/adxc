"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { COOKIE_NAME, MAX_AGE_SECONDS, sign } from "@/lib/gate-token";

/* ---------- helpers ---------- */

// Safer internal-only redirect path (blocks //evil.com)
function safeNextPath(input: string): string {
  if (!input) return "/";
  if (!input.startsWith("/")) return "/";
  if (input.startsWith("//")) return "/";
  if (input.includes("\\")) return "/";
  return input;
}

// Constant-time password check without leaking length:
// compare sha256 hashes of both values.
function passwordMatches(provided: string, expected: string) {
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

// GDPR-safe log (timestamp + country + success only)
function logGateEvent(event: { createdAt: string; country: string | null; success: boolean }) {
  console.log("[gate-event]", JSON.stringify(event));
}

/* ---------- server action ---------- */

type UnlockState = { ok: true } | { ok: false; error: string };

export async function unlockAction(
  _prevState: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const expectedPassword = process.env.SITE_GATE_PASSWORD;
  const secret = process.env.SITE_GATE_COOKIE_SECRET;

  if (!expectedPassword || !secret) {
    return { ok: false, error: "Server misconfigured" };
  }

  const h = await headers();
  const provided = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/");
  const nextPath = safeNextPath(nextRaw);

  const success = passwordMatches(provided, expectedPassword);

  logGateEvent({
    createdAt: new Date().toISOString(),
    country: h.get("x-vercel-ip-country"),
    success,
  });

  if (!success) {
    return { ok: false, error: "Invalid password" };
  }

  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const token = sign(`exp=${exp}`, secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,        // always secure on vercel/prod
    sameSite: "strict",  // stricter gate cookie
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });

  redirect(nextPath);
}
