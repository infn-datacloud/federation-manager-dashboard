import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function getAuthToken() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		// Auth error, show 401 page
		return null;
	}

	const accessToken = await auth.api.getAccessToken({
		body: {
			providerId: process.env.FM_OIDC_PROVIDER_ID!,
			userId: session.user.id,
		},
	});

	return accessToken.accessToken;
}
