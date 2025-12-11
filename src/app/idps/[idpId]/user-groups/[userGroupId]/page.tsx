import SlaList from "./slaList";
import Link from "@/components/link";
import UserGroupDetail from "./userGroupDetail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Custom401 from "@/app/pages/401";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import { LoadingDetail, LoadingList } from "./loading";
import { settings } from "@/config";
import { toaster } from "@/components/toaster";

type IdpPageProps = {
  params: Promise<{
    idpId: string;
    userGroupId: string;
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

  const { idpId, userGroupId } = await props.params;

  return (
    <>
      <div className="mb-2">
        <Link href="/idps" className="opacity-50 hover:opacity-80">
          Identity Providers
        </Link>
        <span className="opacity-50">{" > "}</span>
        <Link href="../" className="opacity-50 hover:opacity-80">
          Identity Provider
        </Link>
        <span className="opacity-50">
          {" > "}
          User Group
        </span>
      </div>

      <h1 className="mb-6 flex items-center">
        <UserGroupIcon className="mr-4 size-10" />
        User Group
      </h1>

      <Suspense fallback={<LoadingDetail />}>
        <Detail idpId={idpId} userGroupId={userGroupId} />
      </Suspense>
      <Suspense fallback={<LoadingList />}>
        <List idpId={idpId} userGroupId={userGroupId} />
      </Suspense>
    </>
  );
}

async function Detail({
  idpId,
  userGroupId,
}: {
  idpId: string;
  userGroupId: string;
}) {
  const userGroup = await getUserGroup(idpId, userGroupId);

  return (
    <>
      <h2>{userGroup.name}</h2>
      <div className="mt-4 text-justify">{userGroup.description}</div>
      <UserGroupDetail item={userGroup} />
    </>
  );
}

async function List({
  idpId,
  userGroupId,
}: {
  idpId: string;
  userGroupId: string;
}) {
  const slas = await getSlas(idpId, userGroupId);
  return <SlaList items={slas} />;
}

async function getUserGroup(idpId: string, userGroupId: string) {
  const url = `${settings.fmEndpointUrl}/api/ssr/idps/${idpId}/user-groups/${userGroupId}`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: await headers(),
  });

  if (!apiResponse.ok) {
    const errorText = await apiResponse.statusText;
    toaster.error("Failed to fetch user group", errorText);
    throw new Error(`Failed to fetch user group: ${errorText}`);
  }

  const data = await apiResponse.json();

  return data;
}

async function getSlas(idpId: string, userGroupId: string) {
  const url = `${settings.fmEndpointUrl}/api/ssr/idps/${idpId}/user-groups/${userGroupId}/slas`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: await headers(),
  });

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text();
    toaster.error("Failed to fetch slas", errorText);
    throw new Error(`Failed to fetch slas: ${errorText}`);
  }

  const data = await apiResponse.json();

  return data.data;
}
