import { NextResponse } from 'next/server';
import getAuthToken from '../../../utils';

interface Params {
	params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: Params) {
	const { id } = await params;
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await req.json();

	const res = await fetch(
		`${process.env.API_SERVER_URL}/providers/${id}/testers`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		}
	);
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
