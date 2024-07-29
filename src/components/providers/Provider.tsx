'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

import { useRouter } from 'next/navigation';
import ProviderStatus from './ProviderStatus';
import styles from './providers.module.css';
import page_styles from '@/app/page.module.css';

export default function Provider(
	props: Readonly<{
		id: string;
		name: string;
		user: string;
		status: string;
	}>
) {
	const router = useRouter();

	const handleClick = () => {
		let id = props.id.split('provider_')[1];

		router.push('/providers/' + id);
	};

	return (
		<Box
			className={styles.providerContainer}
			onClick={handleClick}
			title='Show details'
		>
			<Box display='flex' alignItems='center' width='33%'>
				<Typography
					variant='h5'
					className={styles.providerInitials}
					padding='12px'
					margin='4px 20px 4px 0'
					sx={{ backgroundColor: 'lightblue' }}
				>
					PE
				</Typography>
				<Typography
					variant='h6'
					fontWeight={'bold'}
					className={page_styles.textEllipsis}
				>
					{props.name}
				</Typography>
			</Box>
			<Box
				display='flex'
				alignItems='center'
				width='33%'
				color='#162D4D75'
			>
				<Box
					className={
						page_styles.textEllipsis + ' ' + styles.providerUsers
					}
				>
					{user_icon()}
				</Box>
			</Box>
			<ProviderStatus status={props.status} />
		</Box>
	);

	function user_icon() {
		let users = [
			<Box display='flex' alignItems='center' key='0'>
				<AdminPanelSettingsRoundedIcon />
				&nbsp;
				<Typography
					fontWeight={'600'}
					className={page_styles.textEllipsis}
				>
					Admin
				</Typography>
			</Box>,
		];

		if (props.user !== '') {
			users.push(
				<Box display='flex' alignItems='center' key='1'>
					<PersonIcon />
					&nbsp;
					<Typography
						fontWeight={'600'}
						className={page_styles.textEllipsis}
					>
						{props.user}
					</Typography>
				</Box>
			);
		} else {
			users.push(
				<Box display='flex' alignItems='center' key='2'>
					<PersonOutlineRoundedIcon />
					&nbsp;
					<Typography
						fontWeight={'600'}
						className={page_styles.textEllipsis}
					>
						No user
					</Typography>
				</Box>
			);
		}

		return users;
	}
}
