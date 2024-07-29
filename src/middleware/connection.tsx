'use server';

import { auth } from '../../auth';

export async function getRoles(): Promise<any> {
	let session = await auth();
	let token = (session as any)?.accessToken.toString();

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
					roles.push(role.replace('is_', '').replaceAll('_', ' '));
				}
			}

			return roles;
		});
}

/* 
export function getRoles() {
	return new Promise<any>((resolve, reject) => {
		
		
		const socket = io('http://localhost:3001');

		socket.on('connect', () => {
			console.log('Socket connected');
		});

		socket.on('roles', (roles) => {
			resolve(roles);
		});

		socket.on('connect_error', (error) => {
			console.error('Connection error:', error);
			reject(error);
		});

		socket.on('error', (error) => {
			console.error('Socket error:', error);
			reject(error);
		});
	});
}
 */
