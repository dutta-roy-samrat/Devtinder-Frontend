import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_PAGES } from "@constants/app-defaults";
import { isTokenValid } from "@helpers/jwt";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const isAccessTokenValid = accessToken
    ? await isTokenValid(accessToken)
    : false;

  if ([...AUTH_PAGES, "/"].includes(request.nextUrl.pathname)) {
    if (accessToken && isAccessTokenValid) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    return NextResponse.next();
  }

  if (!accessToken || !isAccessTokenValid) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/feed",
    "/login",
    "/register",
    "/profile",
    "/connections",
    "/profile/:path*",
    "/requests",
  ],
};
