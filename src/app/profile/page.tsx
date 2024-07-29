import { Container, Typography, Box } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import page_styles from '../page.module.css';
import styles from './profile.module.css';
import CollapsingBox from '@/components/utilities/CollapsingBox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { SignOutButton } from '@/components/auth/SignOutButton';

export default function Profile() {
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
		</>
	);

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
				<SignOutButton />
			</Box>

			<br />

			<CollapsingBox title={title} body={data} />
		</Container>
	);
}
