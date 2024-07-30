import { useRoles } from './roles';
import { RoleManagement } from '@/middleware/roles';
import React, { useContext, useEffect } from 'react';
import { connectToSiteAdmin } from '@/middleware/socketio_connections/site_admin';
import { SocketManagement } from '@/middleware/contextes/socket';
import { connectToSiteTester } from '@/middleware/socketio_connections/site_tester';
import Navbar from '@/components/navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#162D4D',
		},
	},
});

export default function PageContent({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	/* Set user roles */
	useRoles();
	const roleCtx = useContext(RoleManagement);

	/*  Set socket context */
	const socketCtx = useContext(SocketManagement);
	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.disconnect();
			socketCtx.setSocket(null);
		}

		switch (roleCtx.currentRole) {
			case 'site admin':
				Promise.resolve(connectToSiteAdmin()).then((socket) => {
					socketCtx.setSocket(socket);
				});
				break;

			case 'site tester':
				Promise.resolve(connectToSiteTester()).then((socket) => {
					socketCtx.setSocket(socket);
				});
				break;
		}
	}, [roleCtx.currentRole]);

	return (
		<ThemeProvider theme={theme}>
			{/* Navbar */}
			<header>
				<Navbar
					rolesList={roleCtx.rolesList}
					currentRole={roleCtx.currentRole}
					setCurrentRole={roleCtx.setCurrentRole}
				/>
			</header>

			{/* Body */}
			{children}

			{/* Footer */}
			{/* <footer>Footer</footer> */}
		</ThemeProvider>
	);
}
