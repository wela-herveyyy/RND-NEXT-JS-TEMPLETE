import { NextRequest, NextResponse } from "next/server";
import { getSessionFromHeaders } from "@/lib/domain/services/auth.service";

const publicPaths = ["/sign-in", "/sign-up"];

function isPublicPath(pathname: string) {
  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const session = await getSessionFromHeaders(request.headers);

  if (session && isPublicPath(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !isPublicPath(pathname)) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackURL", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
