'use client';

import { AppBar, Box, Toolbar } from '@mui/material';

/* Components */
import HomeButton from '@/components/navbar/HomeButton';
import RolesButton from '@/components/navbar/RolesButton';
import NotificationsButton from '@/components/navbar/NotificationsButton';
import ProfileButton from '@/components/navbar/ProfileButton';

import styles from './navbar.module.css';

export default function Navbar(
	props: Readonly<{
		rolesList: Array<string>;
		currentRole: string;
		setCurrentRole: () => void;
	}>
) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed' sx={{ backgroundColor: '#002A48' }}>
				<Toolbar className={styles.navbarContainer}>
					{/* Title */}
					<HomeButton />

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
				</Toolbar>
			</AppBar>
		</Box>
	);
}
