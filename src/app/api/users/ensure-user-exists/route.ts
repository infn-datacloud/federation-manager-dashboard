import { NextResponse } from 'next/server';
import getAuthToken from '../../utils';
import { headers } from 'next/headers';

export async function POST(req: Request) {
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await req.json();
	const { email } = body;
	console.log(email);

	if (!email)
		return NextResponse.json({ error: 'Email required' }, { status: 400 });

	const userExists = await ensureUserExists(email);
	return NextResponse.json({ userExists });
}

async function ensureUserExists(email: string) {
	const accessToken = await getAuthToken();

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const apiUrl = `${process.env.API_SERVER_URL}/users`;

	const res = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const users = await res.json();
	const userExists = users.data.some(
		(item: { email: string }) => item.email === email
	);

	if (!userExists) {
		await createApiUser();
	}

	return userExists;
}

async function createApiUser() {
	await fetch(`${process.env.BASE_URL}/api/users`, {
		method: 'POST',
		headers: await headers()
	});
}
