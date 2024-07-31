import io from 'socket.io-client';

export function connectToSiteAdmin(token: any) {
	const socket = io('ws://localhost:8000/site_admin', {
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
}
