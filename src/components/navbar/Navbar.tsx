'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

/* Components */
import HomeButton from '@/components/navbar/HomeButton';
import RolesButton from '@/components/navbar/RolesButton';
import NotificationsButton from '@/components/navbar/NotificationsButton';
import ProfileButton from '@/components/navbar/ProfileButton';

import styles from './navbar.module.css';

export default function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed' sx={{ backgroundColor: '#002A48' }}>
				<Toolbar className={styles.navbarContainer}>
					{/* Title */}
					<HomeButton />

					<Box className={ styles.navbarActions }>
						{/* Roles */}
						<RolesButton />

						<Box className={ styles.navbarActionsButtons }>
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
