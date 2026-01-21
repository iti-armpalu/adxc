import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "site_unlocked";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow home page; it will render locked/unlocked on the server
  if (pathname === "/") return NextResponse.next();

  // Allow Next internals + common public assets
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|svg|webp|css|js|ico|txt|map)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Protect everything else
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
