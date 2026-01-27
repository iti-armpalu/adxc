import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verify } from "@/lib/gate-token";

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|svg|webp|css|js|ico|txt|map)$/.test(pathname)
  );
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ✅ Public route: gate page (no header)
  if (pathname === "/gate") return NextResponse.next();

  // ✅ Allow Next internals + public assets
  if (isPublicAsset(pathname)) return NextResponse.next();

  // (Optional) allow public APIs, or gate them too — your choice:
  // if (pathname.startsWith("/api")) return NextResponse.next();

  // ✅ Protect everything else
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/gate";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // ✅ Recommended: verify signature/expiry at the edge too
  const secret = process.env.SITE_GATE_COOKIE_SECRET;
  if (!secret) {
    const url = req.nextUrl.clone();
    url.pathname = "/gate";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  const decoded = verify(token, secret);
  if (!decoded) {
    const url = req.nextUrl.clone();
    url.pathname = "/gate";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp <= now) {
    const url = req.nextUrl.clone();
    url.pathname = "/gate";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
