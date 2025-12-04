import UserGroupsList from "./userGroupList";
import Link from "@/components/link";
import IdpDetail from "./idpDetail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Custom401 from "@/app/pages/401";
import { Suspense } from "react";
import { LoadingDetail, LoadingList } from "./loading";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { settings } from "@/config";

type IdpPageProps = {
  params: Promise<{
    idpId: string;
  }>;
};

export default async function Idp(props: Readonly<IdpPageProps>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    // Auth error, show 401 page
    return <Custom401 />;
  }

  const { idpId } = await props.params;

  return (
    <>
      <div className="mb-2">
        <Link href="/idps" className="opacity-50 hover:opacity-80">
          Identity Providers
        </Link>
        <span className="opacity-50">
          {" > "}
          Identity Provider
        </span>
      </div>

      <h1 className="mb-6 flex items-center">
        <IdentificationIcon className="mr-4 size-10" />
        Identity Provider
      </h1>

      <Suspense fallback={<LoadingDetail />}>
        <Detail idpId={idpId} />
      </Suspense>
      <Suspense fallback={<LoadingList />}>
        <List idpId={idpId} />
      </Suspense>
    </>
  );
}

async function Detail({ idpId }: { idpId: string }) {
  const idp = await getIdentityProvider(idpId);

  return (
    <>
      <h2>{idp.name}</h2>
      <div className="text-md opacity-80">{idp.endpoint}</div>
      <div className="mt-4 text-justify">{idp.description}</div>
      <IdpDetail item={idp} />
    </>
  );
}

async function List({ idpId }: { idpId: string }) {
  const userGroups = await getUserGroups(idpId);
  return <UserGroupsList items={userGroups} />;
}

async function getIdentityProvider(id: string) {
  const url = `${settings.fmEndpointUrl}/api/ssr/idps/${id}`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: await headers(),
  });

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text();
    throw new Error(`Failed to fetch identity provider: ${errorText}`);
  }

  const data = await apiResponse.json();

  return data;
}

async function getUserGroups(id: string) {
  const url = `${settings.fmEndpointUrl}/api/ssr/idps/${id}/user-groups`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: await headers(),
  });

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text();
    throw new Error(`Failed to fetch user groups: ${errorText}`);
  }

  const data = await apiResponse.json();

  return data.data;
}
