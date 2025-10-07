import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';
import { getMigrations } from 'better-auth/db';
import Database from 'better-sqlite3';

// create or open your SQLite DB
const db = new Database('auth.sqlite');

export const auth = betterAuth({
	database: db,
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

// run migrations
async function ensureSchema() {
	const { runMigrations } = await getMigrations(auth.options);
	await runMigrations();
}

// On startup or before first use
await ensureSchema();
