import ProviderCarousel from "./providerCarousel";
import Status from "@/components/status";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Custom401 from "@/app/pages/401";
import { findUserRoles } from "@/utils";
import { settings } from "@/config";
import { toaster } from "@/components/toaster";
import Link from "@/components/link";

type ProviderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Provider({
  params,
}: Readonly<ProviderPageProps>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    // Auth error, show 401 page
    return <Custom401 />;
  }

  const { id } = await params;
  const provider = await getProvider(id);
  provider["tester_name"] = await getProviderTester(provider.site_testers);

  const userId = await getUserId();
  const userRoles = await findUserRoles();

  /* IDPs */
  const idps = await getIdentityProviders();
  const providerIdps = await getProviderIdps(id);

  /* Regions */
  const providerRegions = await getProviderRegions(id);

  /* Projects */
  const providerProjects = await getProviderProjects(id);
  return (
    <>
      <div className="mb-2">
        <Link href="/providers" className="opacity-50 hover:opacity-80">
          Providers
        </Link>
        <span className="opacity-50">
          {" > "}
          Provider
        </span>
      </div>

      <div className="flex flex-col items-center justify-start md:flex-row md:justify-between">
        <div className="mb-4 w-full md:mb-0 md:w-3/4">
          <h1>{provider.name}</h1>
          <div className="opacity-60">
            <span className="font-bold">{provider.type}</span> -{" "}
            <span>{provider.auth_endpoint}</span>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <Status status={provider.status} />
        </div>
      </div>
      <div className="mt-4 text-justify">{provider.description}</div>

      {/* If not REMOVED */}
      {provider.status !== 7 ? (
        <ProviderCarousel
          userRoles={userRoles}
          provider={provider}
          idps={idps}
          providerIdps={providerIdps}
          providerRegions={providerRegions}
          providerProjects={providerProjects}
          userId={userId}
        />
      ) : (
        ""
      )}
    </>
  );

  async function getProvider(id: string) {
    const url = `${settings.fmEndpointUrl}/api/ssr/providers/${id}`;

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: await headers(),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      toaster.error("Failed to fetch provider", errorText);
      throw new Error(`Failed to fetch provider: ${errorText}`);
    }

    const data = await apiResponse.json();

    return data;
  }

  async function getProviderTester(site_testers: Array<string>) {
    if (site_testers.length > 0) {
      const url = `${settings.fmEndpointUrl}/api/ssr/users/${site_testers[0]}`;

      const apiResponse = await fetch(url, {
        method: "GET",
        headers: await headers(),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        toaster.error("Failed to fetch tester", errorText);
        throw new Error(`Failed to fetch tester: ${errorText}`);
      }

      const data = await apiResponse.json();

      return data.name;
    } else {
      return "";
    }
  }

  /* IDPs */
  async function getProviderIdps(providerId: string) {
    const url = `${settings.fmEndpointUrl}/api/ssr/providers/${providerId}/idps`;

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: await headers(),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      toaster.error("Failed to fetch identity providers", errorText);
      throw new Error(
        `Failed to fetch provider's identity providers: ${errorText}`
      );
    }

    const data = await apiResponse.json();

    return data.data;
  }

  async function getIdentityProviders() {
    const url = `${settings.fmEndpointUrl}/api/ssr/idps`;

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: await headers(),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      toaster.error("Failed to fetch identity providers", errorText);
      throw new Error(`Failed to fetch identity providers: ${errorText}`);
    }

    const data = await apiResponse.json();

    return data.data;
  }

  /* Regions */
  async function getProviderRegions(providerId: string) {
    const url = `${settings.fmEndpointUrl}/api/ssr/providers/${providerId}/regions`;

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: await headers(),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      toaster.error("Failed to fetch provider's regions", errorText);
      throw new Error(`Failed to fetch provider's regions: ${errorText}`);
    }

    const data = await apiResponse.json();

    return data.data;
  }

  /* Projects */
  async function getProviderProjects(providerId: string) {
    const url = `${settings.fmEndpointUrl}/api/ssr/providers/${providerId}/projects`;

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: await headers(),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      toaster.error("Failed to fetch provider's projects", errorText);
      throw new Error(`Failed to fetch provider's projects: ${errorText}`);
    }

    const data = await apiResponse.json();
    const projects = data.data;

    for (let i = 0; i < projects.length; i++) {
      const regions = await getProviderProjectRegions(
        providerId,
        projects[i].id
      );
      if (regions.length == 1) {
        projects[i].region = regions[0];
      } else {
        projects[i].region = {};
      }
    }

    return projects;
  }

  /* Project Regions */
  async function getProviderProjectRegions(
    providerId: string,
    projectId: string
  ) {
    const url = `${settings.fmEndpointUrl}/api/ssr/providers/${providerId}/projects/${projectId}/regions`;

    const apiResponse = await fetch(url, {
      method: "GET",
      headers: await headers(),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      toaster.error("Failed to fetch project's regions", errorText);
      throw new Error(
        `Failed to fetch provider project's regions: ${errorText}`
      );
    }

    const data = await apiResponse.json();

    return data.data;
  }

  async function getUserId() {
    const apiResponse = await fetch(
      `${settings.fmEndpointUrl}/api/ssr/users/my-id`,
      {
        method: "GET",
        headers: await headers(),
      }
    );

    const id = await apiResponse.json();

    return id;
  }
}
