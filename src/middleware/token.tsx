'use server';

import { auth } from '@/auth';

export default async function getToken() {
	let session = await auth();

	return (session as any)?.accessToken.toString();
}
