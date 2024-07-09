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
import { useState } from 'react';

export default function Navbar() {
	const auth = useAuth();
	const [disabledButton, setDisabledButton] = useState(false);

	let buttons;

	if (auth.isAuthenticated) {
		buttons = (
			<Box className={styles.navbarActions}>
				{/* Roles */}
				<RolesButton />

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
				variant='text'
				startIcon={<LoginRoundedIcon />}
				onClick={() => { void auth.signinRedirect(); setDisabledButton(true) }}
				sx={{ color: 'white!important' }}
				disabled={disabledButton}
			>
				Log in
			</Button>
		);
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
