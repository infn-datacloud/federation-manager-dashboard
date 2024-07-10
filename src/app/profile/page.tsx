'use client';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Container, Typography, Box, IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import page_styles from '../page.module.css';
import styles from './profile.module.css';
import CollapsingBox from '@/components/utilities/CollapsingBox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Loading from '../loading';

const theme = createTheme({
	palette: {
		primary: {
			main: '#162D4D',
		},
	},
});

export default function Profile() {
	const router = useRouter();
	const auth = useAuth();

	useEffect(() => {
		if (!auth.isAuthenticated && !auth.isLoading) {
			router.push('/login');
		}
	});

	if (auth.isLoading) {
		return <Loading />;
	}

	let title = (
		<Box display='flex' alignItems='center'>
			<TuneRoundedIcon />
			&nbsp;<span className={page_styles.textEllipsis}>Settings</span>
		</Box>
	);

	let data = (
		<>
			<Typography variant='h6' display='flex' alignItems='center'>
				<NotificationsActiveRoundedIcon />
				&nbsp;Notifications
			</Typography>

			<ThemeProvider theme={theme}>
				<Box display='flex' flexWrap='wrap'>
					<FormControlLabel
						control={<Checkbox />}
						color='primary'
						title='Toggle Email notifications'
						label='Email'
						sx={{ minWidth: '200px' }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						color='primary'
						title='Toggle Pop up notifications'
						label='Pop up'
						sx={{ minWidth: '200px' }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						color='primary'
						title='Toggle Jira Ticket notifications'
						label='Jira Ticket'
						sx={{ minWidth: '200px' }}
					/>
				</Box>
			</ThemeProvider>
		</>
	);

	if (auth.isAuthenticated) {
		return (
			<Container className={styles.profileContainer}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					className={page_styles.cardContainer}
					sx={{ padding: '2em 3em!important' }}
				>
					<Typography variant='h4' fontWeight='bold'>
						Ettore Serra
					</Typography>
					<IconButton
					    title='Log out'
						onClick={() => {
							void auth.removeUser();
						}}
					>
						<LogoutRoundedIcon />
					</IconButton>
				</Box>
	
				<br />
	
				<CollapsingBox title={title} body={data} />
			</Container>
		);
	}
}