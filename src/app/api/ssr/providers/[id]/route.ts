import { NextResponse } from 'next/server';
import getAuthToken from '@/app/api/ssr/utils';

interface Params {
	params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: Params) {
	const { id } = await params;
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const res = await fetch(
			`${process.env.API_SERVER_URL}/providers/${id}`,
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

export async function PATCH(req: Request, { params }: Params) {
	const { id } = await params;
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await req.json();
	const res = await fetch(`${process.env.API_SERVER_URL}/providers/${id}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('API Error:', res.status, text);
		return NextResponse.json({ error: text }, { status: res.status });
	}

	if (res.status == 204) {
		return new NextResponse(null, { status: 204 });
	}

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_: Request, { params }: Params) {
	const { id } = await params;
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const res = await fetch(`${process.env.API_SERVER_URL}/providers/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('API Error:', res.status, text);
		return NextResponse.json({ error: text }, { status: res.status });
	}

	if (res.status == 204) {
		return new NextResponse(null, { status: 204 });
	}

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
