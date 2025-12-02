import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
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
          scopes: process.env.FM_OIDC_SCOPES?.split(" "),
        },
      ],
    }),
  ],
  session: {
    expiresIn: 3600, // 1 hour
    strategy: "jwt",
    disableSessionRefresh: true,
    cookieCache: {
      enabled: true,
      maxAge: 3600,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
  },
});
