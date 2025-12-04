import { NextResponse } from "next/server";
import getAuthToken from "@/app/api/ssr/utils";
import { settings } from "@/config";

interface Params {
  params: Promise<{
    id: string;
    testerId: string;
  }>;
}

export async function DELETE(_: Request, { params }: Params) {
  const { id, testerId } = await params;
  const accessToken = await getAuthToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${settings.apiServerUrl}/providers/${id}/testers/${testerId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", res.status, text);
    return NextResponse.json({ error: text }, { status: res.status });
  }

  if (res.status == 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
