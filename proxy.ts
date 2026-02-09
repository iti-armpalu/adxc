import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/gate-token";
import { verifyEdge } from "@/lib/gate-token-edge";

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|svg|webp|css|js|ico|txt|map|json)$/.test(pathname)
  );
}

function redirectToGate(req: NextRequest, nextValue: string) {
  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.searchParams.set("next", nextValue);
  return NextResponse.redirect(url);
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Public route: gate page
  if (pathname === "/gate") return NextResponse.next();

  // Allow Next internals + public assets
  if (isPublicAsset(pathname)) return NextResponse.next();

  // If you want /api public, uncomment:
  // if (pathname.startsWith("/api")) return NextResponse.next();

  const nextValue = pathname + search;

  // Require cookie
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return redirectToGate(req, nextValue);

  // Verify at the edge (Web Crypto)
  const secret = process.env.SITE_GATE_COOKIE_SECRET;
  if (!secret) return redirectToGate(req, nextValue);

  const decoded = await verifyEdge(token, secret);
  if (!decoded) return redirectToGate(req, nextValue);

  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp <= now) return redirectToGate(req, nextValue);

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
