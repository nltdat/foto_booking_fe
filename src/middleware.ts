import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { JwtPayload, UserRole } from "@/types/auth";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "access_token";
const LOGIN_PATH = "/auth/login";
const CUSTOMER_PREFIX = "/customer";
const PHOTOGRAPHER_PREFIX = "/photographer";

function decodeJwtPayload(token: string): JwtPayload | null {
  const tokenParts = token.split(".");

  if (tokenParts.length < 2) {
    return null;
  }

  try {
    const base64Url = tokenParts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const decoded = atob(padded);

    // Edge middleware only needs lightweight claim inspection, not signature verification.
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

function isExpired(exp?: number): boolean {
  if (!exp) {
    return false;
  }

  return exp * 1000 <= Date.now();
}

function getRedirectUrl(request: NextRequest, pathname: string): URL {
  return new URL(pathname, request.url);
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(getRedirectUrl(request, pathname));
}

function resolveAuthorizedHome(role?: UserRole): string {
  if (role === "PHOTOGRAPHER") {
    return PHOTOGRAPHER_PREFIX;
  }

  return CUSTOMER_PREFIX;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isCustomerRoute = pathname.startsWith(CUSTOMER_PREFIX);
  const isPhotographerRoute = pathname.startsWith(PHOTOGRAPHER_PREFIX);

  if (!isCustomerRoute && !isPhotographerRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return redirectTo(request, LOGIN_PATH);
  }

  const payload = decodeJwtPayload(token);
  const role = payload?.role;

  // Invalid or expired token is treated as unauthenticated access.
  if (!payload || isExpired(payload.exp)) {
    const response = redirectTo(request, LOGIN_PATH);
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  // Each dashboard namespace is isolated by role to avoid cross-area access.
  if (isCustomerRoute && role === "PHOTOGRAPHER") {
    return redirectTo(request, PHOTOGRAPHER_PREFIX);
  }

  if (isPhotographerRoute && role === "CUSTOMER") {
    return redirectTo(request, resolveAuthorizedHome(role));
  }

  if (isCustomerRoute && role !== "CUSTOMER") {
    return redirectTo(request, LOGIN_PATH);
  }

  if (isPhotographerRoute && role !== "PHOTOGRAPHER") {
    return redirectTo(request, LOGIN_PATH);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/photographer/:path*"]
};
