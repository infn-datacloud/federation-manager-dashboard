import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';
import { getMigrations } from 'better-auth/db';
import Database from 'better-sqlite3';

// create or open your SQLite DB
const db = new Database('auth.sqlite');

export const auth = betterAuth({
	database: db,
	baseURL: process.env.FM_ENDPOINT_URL,
	secret: process.env.FM_AUTH_SECRET,
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: process.env.FM_OIDC_PROVIDER_ID!,
					discoveryUrl: `${process.env.FM_OIDC_URL}/.well-known/openid-configuration`,
					clientId: process.env.FM_OIDC_CLIENT_ID!,
					clientSecret: process.env.FM_OIDC_CLIENT_SECRET!,
					scopes: process.env.FM_OIDC_SCOPES?.split(' '),
				},
			],
		}),
	],
	session: {
		expiresIn: 60 * 60, // 1 hour
		updateAge: 60 * 5,
	},
});

// run migrations
async function ensureSchema() {
	const { runMigrations } = await getMigrations(auth.options);
	await runMigrations();
}

// On startup or before first use
await ensureSchema();
