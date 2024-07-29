import NextAuth from 'next-auth';
import type { OIDCConfig } from 'next-auth/providers';

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

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [IamProvider],
	callbacks: {
		authorized({ request, auth }) {
			return true;
		},
		async jwt({ token, user, account }) {
			return { ...token, ...account, ...user };
		},

		async session({ session, token, user }) {
			(session as any).accessToken = token.access_token;

			return session;
		},
	},
});
