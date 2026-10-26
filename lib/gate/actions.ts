"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "node:crypto";
import { GATE_COOKIE, GATE_MAX_AGE, GATE_PATH } from "./config";
import { signToken } from "./token";

export type UnlockState = { error: string | null; failures: number };

const cookieOptions = {
    httpOnly: true,
    secure: true, // required by __Host- prefix (localhost counts as secure)
    sameSite: "lax",
    path: "/",
} as const;

// Internal paths only; never back to the gate.
function safeNext(input: FormDataEntryValue | null) {
    const path = typeof input === "string" ? input : "/";
    if (
        !path.startsWith("/") ||
        path.startsWith("//") ||
        path.includes("\\") ||
        path.startsWith(GATE_PATH)
    ) {
        return "/";
    }
    return path;
}

// Hash first so the comparison is constant-time and length-independent.
function passwordMatches(provided: string, expected: string) {
    const a = createHash("sha256").update(provided).digest();
    const b = createHash("sha256").update(expected).digest();
    return timingSafeEqual(a, b);
}

export async function unlock(prev: UnlockState, formData: FormData): Promise<UnlockState> {
    const password = process.env.SITE_GATE_PASSWORD;
    const secret = process.env.SITE_GATE_COOKIE_SECRET;

    if (!password || !secret) {
        console.error("[gate] Missing SITE_GATE_PASSWORD or SITE_GATE_COOKIE_SECRET");
        return {
            error: "Something went wrong. Please try again later.",
            failures: prev.failures + 1,
        };
    }

    const success = passwordMatches(String(formData.get("password") ?? ""), password);

    // GDPR-safe: timestamp, country, outcome only
    const h = await headers();
    console.log(
        "[gate-event]",
        JSON.stringify({
            at: new Date().toISOString(),
            country: h.get("x-vercel-ip-country"),
            success,
        })
    );

    if (!success) return { error: "Incorrect password.", failures: prev.failures + 1 };

    const exp = Math.floor(Date.now() / 1000) + GATE_MAX_AGE;
    const cookieStore = await cookies();
    cookieStore.set(GATE_COOKIE, await signToken({ exp }, secret), {
        ...cookieOptions,
        maxAge: GATE_MAX_AGE,
    });

    redirect(safeNext(formData.get("next")));
}

export async function lock() {
    const cookieStore = await cookies();
    cookieStore.set(GATE_COOKIE, "", { ...cookieOptions, maxAge: 0 });
    redirect(GATE_PATH);
}