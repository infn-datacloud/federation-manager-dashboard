import { NextResponse } from 'next/server';
import getAuthToken from '@/app/api/ssr/utils';
import { findUserRoles } from '@/utils';

export async function POST(req: Request) {
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await req.json();
	const res = await fetch(`${process.env.API_SERVER_URL}/providers`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}

export async function GET() {
	const accessToken = await getAuthToken();
  const userRoles = await findUserRoles();

	let apiUrl = `${process.env.API_SERVER_URL}/providers?&status=ready&status=evaluation&status=pre-production&status=active&status=deprecated&status=removed&status=degraded&status=maintenance&status=re-evaluation`;

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	if (userRoles.includes('site-admin')) {
		apiUrl = `${process.env.API_SERVER_URL}/providers`;
	}

	const res = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('API Error:', res.status, text);
		return NextResponse.json({ error: text }, { status: res.status });
	}

	return NextResponse.json(await res.json(), { status: res.status });
}
