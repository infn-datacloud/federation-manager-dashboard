import type { OIDCConfig } from 'next-auth/providers';

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		accessToken: any;
		expires: any;
	}
}

const IamProvider: OIDCConfig<any> = {
	id: 'indigo-iam',
	name: 'Indigo-IAM',
	type: 'oidc',
	issuer: process.env.IAM_AUTHORITY_URL,
	clientId: process.env.IAM_CLIENT_ID,
	clientSecret: process.env.IAM_CLIENT_SECRET,
	authorization: {
		params: {
			scope: process.env.IAM_SCOPE,
		},
	},
};

export const { handlers, signIn, auth } = NextAuth({
	providers: [IamProvider],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account?.access_token;
				token.expiresAt = account?.expires_at;
            }

			return token;
		},
		async session({ session, token }) {
			session.accessToken = token?.accessToken;

			const expiration = Number(token?.expiresAt ?? 0);
			session.expires = new Date(expiration * 1000);

			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
});
