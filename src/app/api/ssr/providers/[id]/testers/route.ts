import { NextResponse } from "next/server";
import getAuthToken from "@/app/api/ssr/utils";
import { settings } from "@/config";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: Params) {
  const { id } = await params;
  const accessToken = await getAuthToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestData = await req.json();
  const body = { id: requestData.id };

  const res = await fetch(`${settings.apiServerUrl}/providers/${id}/testers`, {
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
