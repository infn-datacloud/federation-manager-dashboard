'use client';

import { io } from 'socket.io-client';

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
