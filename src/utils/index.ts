import getAuthToken from "@/app/api/ssr/utils";
import { settings } from "@/config";

export async function findUserRoles() {
  const accessToken = await getAuthToken();
  const decoded = decodeJwtPayload(accessToken!);

  type JwtPayloadWithGroups = {
    groups?: string[];
  };

  const groups = (decoded as JwtPayloadWithGroups)?.groups;
  const userRoles: string[] = [];

  const adminGroups = JSON.parse(settings.groupsAdmin!)[
    `${settings.fmOidcUrl!}/`
  ];
  const siteAdminGroups = JSON.parse(settings.groupsSiteAdmin!)[
    `${settings.fmOidcUrl!}/`
  ];
  const siteTesterGroups = JSON.parse(settings.groupsSiteTester!)[
    `${settings.fmOidcUrl!}/`
  ];
  const slaManagerGroups = JSON.parse(settings.groupsSlaManager!)[
    `${settings.fmOidcUrl!}/`
  ];

  groups?.forEach(group => {
    if (adminGroups) {
      if (adminGroups.includes(group) && !userRoles.includes("admin")) {
        userRoles.push("admin");
      }
    }

    if (siteAdminGroups) {
      if (
        siteAdminGroups.includes(group) &&
        !userRoles.includes("site-admin")
      ) {
        userRoles.push("site-admin");
      }
    }

    if (siteTesterGroups) {
      if (
        siteTesterGroups.includes(group) &&
        !userRoles.includes("site-tester")
      ) {
        userRoles.push("site-tester");
      }
    }

    if (slaManagerGroups) {
      if (
        slaManagerGroups.includes(group) &&
        !userRoles.includes("sla-manager")
      ) {
        userRoles.push("sla-manager");
      }
    }
  });

  return userRoles;
}

export function decodeJwtPayload(token: string) {
  if (token) {
    return JSON.parse(atob(token.split(".")[1]));
  } else {
    return {};
  }
}
