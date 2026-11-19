import { NextResponse, type NextRequest } from "next/server";

// Light gate for /admin: only checks that the login cookie exists.
// The real permission check happens in the API (401 => the admin app sends you to /admin/login).
export function proxy(req: NextRequest) {
  const hasSession = Boolean(req.cookies.get("aa_token")?.value);
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!hasSession && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (hasSession && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
