import { type NextRequest, NextResponse } from "next/server";

/**
 * Locale routing. English (default) is served at unprefixed URLs and rewritten
 * internally to /en/...; Vietnamese lives under /vi/... . Requests to /en/...
 * are redirected to the clean unprefixed URL so each page has one canonical URL.
 * (Kept self-contained — proxy should not import app modules.)
 */
const PREFIXED = ["vi"];
const DEFAULT = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (PREFIXED.includes(first)) return NextResponse.next();

  if (first === DEFAULT) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (sitemap.xml, robots.txt, images…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
