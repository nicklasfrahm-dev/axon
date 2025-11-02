import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();

  // Ensure users are logged in when accessing the app.
  if (!session && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Ensure users are redirected if they are logged in.
  if (session && pathname === "/") {
    return NextResponse.redirect(new URL("/app/dashboard", req.url));
  }

  // Allow access to the app.
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/app/:path*"],
};
