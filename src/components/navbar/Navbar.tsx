'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';

/* Components */
import HomeButton from '@/components/navbar/HomeButton';
import RolesButton from '@/components/navbar/RolesButton';
import NotificationsButton from '@/components/navbar/NotificationsButton';
import ProfileButton from '@/components/navbar/ProfileButton';

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import styles from './navbar.module.css';
import { useAuth } from 'react-oidc-context';
import { useRoles, RoleManagement } from '@/middleware/roles';
import { useContext, useEffect } from 'react';
import { connectToSiteAdmin } from '@/middleware/socketio_connections/site_admin';
import { SocketManagement } from '@/middleware/contextes/socket';
import { connectToSiteTester } from '@/middleware/socketio_connections/site_tester';

export default function Navbar() {
	const auth = useAuth();

	/* Set user roles */
	useRoles();
	const roleCtx = useContext(RoleManagement);

	// Set socket context
	const socketCtx = useContext(SocketManagement);
	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.disconnect();
			socketCtx.setSocket(null);
		}
		if (auth.isAuthenticated) {
			switch (roleCtx.currentRole) {
				case 'site admin':
					socketCtx.setSocket(connectToSiteAdmin(auth));
					break;

				case 'site tester':
					socketCtx.setSocket(connectToSiteTester(auth));
					break;
			}
		}
	}, [auth.isAuthenticated, roleCtx.currentRole]);

	let buttons;

	if (!auth.isLoading) {
		if (auth.isAuthenticated) {
			buttons = (
				<Box className={styles.navbarActions}>
					{/* Roles */}
					<RolesButton
						rolesList={roleCtx.rolesList}
						currentRole={roleCtx.currentRole}
						handleRoleChange={roleCtx.setCurrentRole}
					/>

					<Box className={styles.navbarActionsButtons}>
						{/* Notifications */}
						<NotificationsButton />

						{/* Account */}
						<ProfileButton />
					</Box>
				</Box>
			);
		} else {
			buttons = (
				<Button
					title='Log in'
					variant='text'
					startIcon={<LoginRoundedIcon />}
					onClick={() => {
						void auth.signinRedirect();
					}}
					sx={{ color: 'white!important' }}
				>
					Log in
				</Button>
			);
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed' sx={{ backgroundColor: '#002A48' }}>
				<Toolbar className={styles.navbarContainer}>
					{/* Title */}
					<HomeButton />

					{buttons}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
