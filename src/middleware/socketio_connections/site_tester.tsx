import { AuthContextProps } from 'react-oidc-context';
import io from 'socket.io-client';

export function connectToSiteTester(auth: AuthContextProps) {
	const socket = io('ws://localhost:8000/site_tester', {
		reconnectionAttempts: 2,
		reconnectionDelay: 1000,
		transports: ['websocket', 'polling'],
		auth: {
			token: auth.user?.access_token,
		},
	});

	socket.on('connect', () => {
		console.log('Socket connected');
	});

	socket.on('disconnect', () => {
		console.log('Socket disconnected');
	});

	/* 
    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        reject(error);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
        reject(error);
    });
    */

	return socket;
}
