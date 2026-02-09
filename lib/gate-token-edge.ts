const enc = new TextEncoder();

function base64urlToBytes(b64url: string) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  const str = atob(b64 + pad);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

export async function verifyEdge(token: string, secret: string) {
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  const payloadBytes = base64urlToBytes(payloadB64);
  const payload = new TextDecoder().decode(payloadBytes);

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    base64urlToBytes(sigB64),
    enc.encode(payload)
  );

  if (!ok) return null;

  const match = payload.match(/exp=(\d+)/);
  if (!match) return null;

  const exp = Number(match[1]);
  if (!Number.isFinite(exp)) return null;

  return { exp };
}
