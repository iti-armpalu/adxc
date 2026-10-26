import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, GATE_PATH } from "@/lib/gate/config";
import { verifyToken } from "@/lib/gate/token";

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const secret = process.env.SITE_GATE_COOKIE_SECRET;

  const unlocked = secret
    ? Boolean(await verifyToken(req.cookies.get(GATE_COOKIE)?.value, secret))
    : false;

  // Gate page: let locked visitors in, send unlocked ones home
  if (pathname === GATE_PATH) {
    return unlocked ? NextResponse.redirect(new URL("/", req.url)) : NextResponse.next();
  }

  if (unlocked) return NextResponse.next();

  // Locked: redirect to gate, preserving deep links
  const url = new URL(GATE_PATH, req.url);
  const next = pathname + search;
  if (next !== "/") url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|map|mp4|webm)$).*)",
  ],
};