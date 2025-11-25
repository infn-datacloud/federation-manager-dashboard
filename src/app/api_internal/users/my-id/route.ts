import { NextResponse } from 'next/server';
import getAuthToken from '../../utils';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

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
	const user = users.data.filter(
		(item: { email: string }) => item.email === session?.user.email
	);

    if (user.length > 0) {
        return NextResponse.json(user[0].id, { status: 200 });
    }

    return NextResponse.json({ error: 'User ID not found' }, { status: 404 });
}
