import { NextResponse, NextRequest } from "next/server";
import { mainConfig } from "./config/main";

export default function middleware(req: NextRequest) {
	const isSessionCookieEmpty = !req.cookies.has(`${mainConfig.COOKIES_PREFIX}sessionId`);

	if (isSessionCookieEmpty && !req.url.includes("/auth"))
		return NextResponse.redirect(new URL("/auth", req.url));

	if (!isSessionCookieEmpty && req.url.includes("/auth"))
		return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
