// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // console.log(token);

  if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*"], // Protect all /tasks routes, including subpaths
};
