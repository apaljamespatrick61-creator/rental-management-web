import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from "jose";

const protectedRoutes = ["/dashboard", "/rent-manager", "/room-overview"];
const authRoute = "/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route: string) => pathname.startsWith(route));
  const isAuthRoute = pathname.startsWith(authRoute);

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  if (isAuthRoute && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }
    return NextResponse.next();

}
export const config = {
  matcher: ["/dashboard/:path*", "/rent-manager/:path*", "/room-overview/:path*", "/settings/:path*", "/login"],
};
