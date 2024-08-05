import { useRoles } from './roles';
import { RoleManagement } from '@/middleware/roles';
import React, { useContext, useEffect } from 'react';
import { connectToSiteAdmin } from '@/middleware/socketio_connections/site_admin';
import { SocketManagement } from '@/middleware/contextes/socket';
import { connectToSiteTester } from '@/middleware/socketio_connections/site_tester';
import Navbar from '@/components/navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSession } from 'next-auth/react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#162D4D',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '25px'
				}
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					borderRadius: '25px!important'
				},
				input: {
					padding: '16.5px 24px!important'
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					padding: '16px!important'
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					left: '9px!important'
				},
			}
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

	/* Set token */
	const session = useSession();
	const token = session?.data?.accessToken;

	/*  Set socket context */
	const socketCtx = useContext(SocketManagement);
	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.disconnect();
			socketCtx.setSocket(null);
		}

		switch (roleCtx.currentRole) {
			case 'site admin':
				socketCtx.setSocket(connectToSiteAdmin(token));
				break;

			case 'site tester':
				socketCtx.setSocket(connectToSiteTester(token));
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
