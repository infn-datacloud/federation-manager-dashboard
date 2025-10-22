import { NextResponse } from 'next/server';
import getAuthToken from '../../utils';

interface Params {
	params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
	const { id } = params;
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
