import { NextResponse } from "next/server";
import getAuthToken from "@/app/api/ssr/utils";
import { findUserRoles } from "@/utils";
import { settings } from "@/config";

export async function POST(req: Request) {
  const accessToken = await getAuthToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestData = await req.json();
  const body = {
    auth_endpoint: requestData.auth_endpoint,
    description: requestData.description,
    floating_ips_enable: requestData.floating_ips_enable,
    image_tags: requestData.image_tags,
    is_public: requestData.is_public,
    name: requestData.name,
    network_tags: requestData.network_tags,
    rally_password: requestData.rally_password,
    rally_username: requestData.rally_username,
    site_admins: requestData.site_admins,
    support_emails: requestData.support_emails,
    test_flavor_name: requestData.test_flavor_name,
    test_network_id: requestData.test_network_id,
    type: requestData.type,
  };

  const res = await fetch(`${settings.apiServerUrl}/providers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function GET() {
  const accessToken = await getAuthToken();
  const userRoles = await findUserRoles();

  let apiUrl = `${settings.apiServerUrl}/providers`;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!userRoles.includes("admin") && !userRoles.includes("site-admin")) {
    apiUrl = `${settings.apiServerUrl}/providers?
      &status=ready
      &status=evaluation
      &status=pre-production
      &status=active
      &status=deprecated
      &status=removed
      &status=degraded
      &status=maintenance
      &status=re-evaluation`;
  }

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", res.status, text);
    return NextResponse.json({ error: text }, { status: res.status });
  }

  return NextResponse.json(await res.json(), { status: res.status });
}
