import { auth } from '@/auth';
import { NextResponse } from 'next/server';
export const config = {
	matcher:
		'/((?!api/auth|_next/static|_next/image|favicon.ico|fonts|.*\\.png).*)',
};

export default auth((req) => {
	const session = req.auth;

	const sessionNotFound = !session && req.nextUrl.pathname !== '/login';
	if (sessionNotFound) {
		console.log('session not found');
		const newUrl = new URL('/login', req.nextUrl.origin);
		return Response.redirect(newUrl);
	}

	const expiration = new Date(session?.expires ?? 0);
	const now = new Date();
	const sessionExpired = expiration < now;

	if (
		sessionExpired &&
		req.nextUrl.pathname !== '/login' &&
		req.nextUrl.pathname !== '/logout'
	) {
		console.log('access keys expired, logging out');
		const newUrl = new URL('/logout', req.nextUrl.origin);
		return Response.redirect(newUrl);
	}

	return NextResponse.next();
});
