import Header from "@/components/header";
import Box from "@/components/box";
import { CloudIcon, IdentificationIcon } from "@heroicons/react/24/solid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Custom401 from "@/app/pages/401";
import { findUserRoles } from "@/utils";
import logo from "@/assets/infn_logo.png";
import { settings } from "@/config";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    // Auth error, show 401 page
    return <Custom401 />;
  } else {
    if (session?.user?.email) {
      await fetch(
        `${settings.fmEndpointUrl}/api/ssr/users/ensure-user-exists`,
        {
          method: "POST",
          headers: await headers(),
          body: JSON.stringify({ email: session?.user.email }),
        }
      );
    }
  }

  const userRoles = await findUserRoles();

  return (
    <>
      <Header
        logo={logo}
        title="Federation Manager"
        subtitle="Seamlessly integrating providers and communities into DataCloud with simplicity, security, and automated resource management."
      />
      {(userRoles.includes("admin") ||
        userRoles.includes("site-admin") ||
        userRoles.includes("site-tester")) && (
        <Box
          title="Providers"
          subtitle="Logical resource collector with zones, projects, quotas, and IdPs"
          type="small"
          btnText="Show All"
          btnHref="/providers"
          icon={<CloudIcon />}
        />
      )}
      {(userRoles.includes("admin") || userRoles.includes("sla-manager")) && (
        <Box
          title="Identity Providers"
          subtitle="Service that authenticates users and issues trusted credentials"
          type="small"
          btnText="Show All"
          btnHref="/idps"
          icon={<IdentificationIcon />}
        />
      )}
    </>
  );
}
