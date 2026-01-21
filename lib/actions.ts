"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

/* ---------- config ---------- */

const COOKIE_NAME = "site_unlocked";
const MAX_AGE_SECONDS = 24 * 60 * 60;

/* ---------- helpers ---------- */

// Timing-safe string comparison
function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// Sign payload with HMAC
function sign(payload: string, secret: string) {
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

// GDPR-safe log (timestamp + country + success)
function logGateEvent(event: {
  createdAt: string;
  country: string | null;
  success: boolean;
}) {
  console.log("[gate-event]", JSON.stringify(event));
}

/* ---------- server action ---------- */

type UnlockState =
  | { ok: true }
  | { ok: false; error: string };

export async function unlockAction(
  _prevState: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const expectedPassword = process.env.SITE_GATE_PASSWORD;
  const secret = process.env.SITE_GATE_COOKIE_SECRET;

  if (!expectedPassword || !secret) {
    return { ok: false, error: "Server misconfigured" };
  }

  const h = await headers(); // Next.js 16: async
  const provided = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/");
  const nextPath = nextRaw.startsWith("/") ? nextRaw : "/";

  const success = timingSafeEqual(provided, expectedPassword);

  // Log attempt (no personal data)
  logGateEvent({
    createdAt: new Date().toISOString(),
    country: h.get("x-vercel-ip-country"),
    success,
  });

  if (!success) {
    return { ok: false, error: "Invalid password" };
  }

  // Create 24h token
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const token = sign(`exp=${exp}`, secret);

  // Set HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });

  // Redirect after success
  redirect(nextPath);
}
