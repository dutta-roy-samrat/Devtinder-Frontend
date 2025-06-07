import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_PAGES } from "@constants/app-defaults";

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isRefreshValid = refreshToken ? await isTokenValid(refreshToken) : false;

  if ([...AUTH_PAGES, "/"].includes(request.nextUrl.pathname)) {
    if (refreshToken && isRefreshValid) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    return NextResponse.next();
  }

  if (!refreshToken || !isRefreshValid) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (accessToken || refreshToken) {
      response.cookies.delete("access");
      response.cookies.delete("refresh");
    }
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
