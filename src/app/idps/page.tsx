import Header from "@/components/header";
import IdpList from "./idpList";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Custom401 from "@/app/pages/401";
import { Suspense } from "react";
import { LoadingList } from "./loading";
import logo from "@/assets/infn_logo.png";

export default async function Idps() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    // Auth error, show 401 page
    return <Custom401 />;
  }

  return (
    <>
      <Header
        logo={logo}
        title="Identity Providers"
        subtitle="Identity Providers supported by Data Cloud. Resource providers must support at least one of them. Data Cloud users MUST be registered to at least one of those Identity Providers."
      />
      <Suspense fallback={<LoadingList />}>
        <List />
      </Suspense>
    </>
  );
}

async function List() {
  const idps = await getIdentityProviders();
  return <IdpList items={idps} />;
}

async function getIdentityProviders() {
  const apiResponse = await fetch(
    `${process.env.FM_ENDPOINT_URL}/api/ssr/idps`,
    {
      method: "GET",
      headers: await headers(),
    }
  );

  const identityProviders = await apiResponse.json();

  return identityProviders.data;
}
