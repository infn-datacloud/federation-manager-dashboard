import { auth } from "@/lib/auth";
import { headers as getHeaders } from "next/headers";
import { settings } from "@/config";

export default async function getAuthToken() {
  const headers = await getHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    // Auth error, show 401 page
    return null;
  }

  const accessToken = await auth.api.getAccessToken({
    body: {
      providerId: settings.fmOidcProviderId!,
      userId: session.user.id,
    },
    headers,
  });

  return accessToken.accessToken;
}
