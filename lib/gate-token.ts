import crypto from "crypto";

export const COOKIE_NAME = "site_unlocked";
export const MAX_AGE_SECONDS = 24 * 60 * 60;

export function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// token = base64url(payload) + "." + base64url(hmac(payload))
export function sign(payload: string, secret: string) {
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verify(token: string, secret: string) {
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;

  const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");

  if (
    Buffer.byteLength(sig) !== Buffer.byteLength(expected) ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return null;
  }

  const match = payload.match(/exp=(\d+)/);
  if (!match) return null;

  const exp = Number(match[1]);
  if (!Number.isFinite(exp)) return null;

  return { exp };
}
