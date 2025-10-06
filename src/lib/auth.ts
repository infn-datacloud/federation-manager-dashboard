import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';
import Database from 'better-sqlite3';

export const auth = betterAuth({
	database: new Database('./sqlite.db'),
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'iam',
					discoveryUrl: process.env.IAM_DISCOVERY_URL!,
					clientId: process.env.IAM_CLIENT_ID!,
					clientSecret: process.env.IAM_CLIENT_SECRET!,
					scopes: process.env.IAM_SCOPES?.split(' '),
				},
			],
		}),
	],
});
