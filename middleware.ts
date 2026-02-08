import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin")) {

        const adminCookie = req.cookies.get("admin_auth");

        if (!adminCookie) {
            return NextResponse.rewrite(new URL("/404", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
