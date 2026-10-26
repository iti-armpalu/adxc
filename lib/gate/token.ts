// Web Crypto HMAC — runs in proxy.ts and server actions alike.
const enc = new TextEncoder();
const dec = new TextDecoder();

type GatePayload = { exp: number };

function toB64url(bytes: Uint8Array) {
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(str: string) {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function hmacKey(secret: string, usage: KeyUsage) {
    return crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        [usage]
    );
}

export async function signToken(payload: GatePayload, secret: string) {
    const data = enc.encode(JSON.stringify(payload));
    const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret, "sign"), data);
    return `${toB64url(data)}.${toB64url(new Uint8Array(sig))}`;
}

export async function verifyToken(
    token: string | undefined,
    secret: string
): Promise<GatePayload | null> {
    if (!token) return null;

    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return null;

    try {
        const data = fromB64url(payloadB64);
        // crypto.subtle.verify is constant-time
        const valid = await crypto.subtle.verify(
            "HMAC",
            await hmacKey(secret, "verify"),
            fromB64url(sigB64),
            data
        );
        if (!valid) return null;

        const payload = JSON.parse(dec.decode(data)) as GatePayload;
        if (!Number.isFinite(payload.exp)) return null;
        if (payload.exp < Math.floor(Date.now() / 1000)) return null;

        return payload;
    } catch {
        return null;
    }
}