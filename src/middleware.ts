import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies or headers
  const token =
    request.cookies.get("authToken") || request.headers.get("Authorization");

  // Get the path of the request
  const path = request.nextUrl.pathname;

  // If the token exists and the user is trying to access the login page, redirect to the homepage
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the token is not present and the path is protected, redirect to login
  const isProtectedPath = path !== "/login";
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except `/api`, `_next/static`, etc.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|favicon.svg).*)"],
};
