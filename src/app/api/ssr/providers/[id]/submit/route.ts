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

  const res = await fetch(`${settings.apiServerUrl}/providers/${id}/submit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return NextResponse.json(res, { status: res.status });
}
