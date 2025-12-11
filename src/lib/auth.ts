import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { settings } from "@/config";

export const auth = betterAuth({
  baseURL: settings.fmEndpointUrl,
  secret: settings.fmAuthSecret,
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: settings.fmOidcProviderId!,
          discoveryUrl: `${settings.fmOidcUrl}/.well-known/openid-configuration`,
          clientId: settings.fmOidcClientId!,
          clientSecret: settings.fmOidcClientSecret!,
          scopes: settings.fmOidcScopes?.split(" "),
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
