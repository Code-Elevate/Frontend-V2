import { NextRequest, NextResponse } from "next/server";

// Routes that only authenticated users can access
const authRoutes = ["/dashboard", "/profile"];
const authRoutesWithId = ["/contests/:id/register"];

// Routes that only non-authenticated users can access
const nonAuthRoutes = ["/login", "/register"];

const isAuthorised = (request: NextRequest) => {
  if (
    authRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) &&
    !request.cookies.has("token")
  ) {
    return false;
  }

  for (let i = 0; i < authRoutesWithId.length; i++) {
    const route = authRoutesWithId[i];
    const routeParts = route.split("/");
    const requestParts = request.nextUrl.pathname.split("/");

    if (routeParts.length !== requestParts.length) {
      continue;
    }

    let match = true;
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i] === ":id") {
        continue;
      }

      if (routeParts[i] !== requestParts[i]) {
        match = false;
        break;
      }
    }

    if (match && !request.cookies.has("token")) {
      return false;
    }
  }

  return true;
};

const isNonAuthorised = (request: NextRequest) => {
  if (
    !nonAuthRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return true;
  }

  if (
    nonAuthRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) &&
    request.cookies.has("token")
  ) {
    return false;
  }

  return true;
};

export function middleware(request: NextRequest) {
  // Special case for the home page
  if (request.nextUrl.pathname === "/") {
    if (request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthorised(request)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url)
    );
  }

  if (!isNonAuthorised(request)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/profile",
    "/contests/:path*",
  ],
};
