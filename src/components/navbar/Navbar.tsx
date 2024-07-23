'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';

/* Components */
import HomeButton from '@/components/navbar/HomeButton';
import RolesButton from '@/components/navbar/RolesButton';
import NotificationsButton from '@/components/navbar/NotificationsButton';
import ProfileButton from '@/components/navbar/ProfileButton';

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import styles from './navbar.module.css';

export default function Navbar(
	props: Readonly<{
		isAuthenticated: boolean;
		isLoading: boolean;
		login: () => void;
		rolesList: Array<string>;
		currentRole: string;
		setCurrentRole: (role: string) => void;
	}>
) {
	let buttons;

	if (!props.isLoading) {
		if (props.isAuthenticated) {
			buttons = (
				<Box className={styles.navbarActions}>
					{/* Roles */}
					<RolesButton
						rolesList={props.rolesList}
						currentRole={props.currentRole}
						handleRoleChange={props.setCurrentRole}
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
						props.login();
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
