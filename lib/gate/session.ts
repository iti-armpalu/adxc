import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GATE_COOKIE, GATE_PATH } from "./config";
import { verifyToken } from "./token";

// Second line of defence behind proxy.ts. Use in server layouts/pages.
export async function requireUnlocked() {
    const secret = process.env.SITE_GATE_COOKIE_SECRET;
    const token = (await cookies()).get(GATE_COOKIE)?.value;

    if (!secret || !(await verifyToken(token, secret))) {
        redirect(GATE_PATH);
    }
}