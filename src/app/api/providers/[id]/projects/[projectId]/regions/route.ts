import { NextResponse } from 'next/server';
import getAuthToken from '../../../../../utils';

interface Params {
	params: { id: string; projectId: string };
}

export async function POST(req: Request, { params }: Params) {
	const { id, projectId } = await params;
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await req.json();

	const res = await fetch(
		`${process.env.API_SERVER_URL}/providers/${id}/projects/${projectId}/regions`,
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

export async function GET(_: Request, { params }: Params) {
	const { id, projectId } = await params;
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const res = await fetch(
			`${process.env.API_SERVER_URL}/providers/${id}/projects/${projectId}/regions`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!res.ok) {
			const text = await res.text();
			console.error('API Error:', res.status, text);
			return NextResponse.json({ error: text }, { status: res.status });
		}

		const data = await res.json();
		return NextResponse.json(data, { status: res.status });
	} catch (error) {
		console.error('Fetch error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
