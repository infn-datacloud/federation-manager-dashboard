import { NextResponse } from "next/server";
import getAuthToken from "@/app/api/ssr/utils";
import { settings } from "@/config";

export async function POST(req: Request) {
  const accessToken = await getAuthToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const res = await fetch(`${settings.apiServerUrl}/idps`, {
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

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiUrl = `${settings.apiServerUrl}/idps`;

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
