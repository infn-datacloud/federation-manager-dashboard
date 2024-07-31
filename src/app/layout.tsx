'use client';

import React from 'react';
import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* Roles management */
import RolesContext from '@/middleware/roles';

/* Socket management */
import SocketContext from '@/middleware/contextes/socket';

/* Page content management */
import PageContent from '@/middleware/page_content';

/* Session management client side */
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
			</head>
			<body>
				<SessionProvider>
					<RolesContext>
						<SocketContext>
							<PageContent>{children}</PageContent>
						</SocketContext>
					</RolesContext>
				</SessionProvider>
			</body>
		</html>
	);
}
