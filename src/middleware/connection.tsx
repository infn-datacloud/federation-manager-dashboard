import { AuthContextProps } from 'react-oidc-context';

export function getRoles(auth: AuthContextProps): Promise<any> {
	let token = auth.user?.access_token;

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
				let value = res[role];
				if(value) {
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
