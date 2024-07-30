import { auth } from '../auth';
import { NextResponse } from 'next/server';
export const config = {
	matcher: '/((?!api/auth|_next/static|_next/image|favicon.ico|fonts|.*\\.png).*)',
};

export default auth((req) => {
	const session = req.auth;

	const sessionNotFound = !session && req.nextUrl.pathname !== '/login';
	if (sessionNotFound) {
		console.log('session not found');
		const newUrl = new URL('/login', req.nextUrl.origin);
		return Response.redirect(newUrl);
	}

	return NextResponse.next();
});

/* export { auth as middleware } from "../auth" */
