'use server';

import { auth } from '@/auth';

export async function getRoles(): Promise<any> {
	let session = await auth();
	let token = (session as any)?.accessToken.toString();

	if (session?.user) {
		return fetch('http://localhost:8000/roles', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				let roles = [];

				for (let role in res) {
					if (res[role]) {
						roles.push(
							role.replace('is_', '').replaceAll('_', ' ')
						);
					}
				}

				return roles;
			});
	} else {
		return [];
	}
}
