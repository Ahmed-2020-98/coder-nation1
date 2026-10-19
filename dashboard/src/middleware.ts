import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/lib/session";

export function middleware(request: NextRequest) {
  const authed = request.cookies.has(TOKEN_COOKIE);
  const onLogin = request.nextUrl.pathname === "/login";

  if (!authed && !onLogin) {
    const url = new URL("/login", request.url);
    if (request.nextUrl.pathname !== "/") url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  if (authed && onLogin) return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
