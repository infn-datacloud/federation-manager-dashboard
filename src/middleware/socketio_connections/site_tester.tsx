import io from 'socket.io-client';
import getToken from '../token';

export async function connectToSiteTester() {
	let tokenPromise = Promise.resolve(getToken());

	return tokenPromise.then((token) => {
		if (!token) {
			return null;
		}

		const socket = io('ws://localhost:8000/site_tester', {
			reconnectionAttempts: 2,
			reconnectionDelay: 1000,
			transports: ['websocket', 'polling'],
			auth: {
				token: token,
			},
		});

		socket.on('connect', () => {
			console.log('Socket connected');
		});

		socket.on('disconnect', () => {
			console.log('Socket disconnected');
		});

		return socket;
	});
}
