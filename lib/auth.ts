import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';

export const auth = betterAuth({
	// ... your other auth config (e.g. session, database, etc.)
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'IAM',
					discoveryUrl: process.env.OAUTH_PROVIDER_DISCOVERY_URL,
					clientId: process.env.OAUTH_PROVIDER_CLIENT_ID!,
					clientSecret: process.env.OAUTH_PROVIDER_CLIENT_SECRET!,
					scopes: ['openid', 'profile', 'email'],
				},
			],
		}),
	],
});
