'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import ProviderStatus from '@/components/providers/ProviderStatus';
import ErrorBox from '@/components/providers/ErrorBox';
import FormDataBox from '@/components/providers/FormDataBox';
import TimelineBox from '@/components/providers/TimelineBox';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import styles from './provider.module.css';
import page_styles from '@/app/page.module.css';
import provider_styles from '@/components/providers/providers.module.css';

import { useAuth } from 'react-oidc-context';
import { useContext } from 'react';

import { RoleManagement } from '@/middleware/roles';

export default function Provider({
	params,
}: Readonly<{
	params: { providerId: string };
}>) {
	const auth = useAuth();
	const context = useContext(RoleManagement);

	if (auth.isAuthenticated) {
		return (
			<Container>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					marginTop='8em'
					marginBottom='4em'
					className={styles.headerContainer}
				>
					<Box
						display='flex'
						alignItems='center'
						width='75%'
						className={styles.textHeaderContainer}
					>
						<Typography
							variant='h4'
							className={provider_styles.providerInitials}
							width='72px!important'
							height='72px!important'
							boxSizing='border-box'
							padding='20px'
							margin='4px 32px 4px 0'
							sx={{ backgroundColor: 'lightblue' }}
						>
							PE
						</Typography>
						<Box
							display='flex'
							alignItems='flex-start'
							flexDirection='column'
							justifyContent='center'
							className={page_styles.textEllipsis}
						>
							<Typography
								variant='h3'
								fontWeight={'bold'}
								className={page_styles.textEllipsis}
								maxWidth='100%'
							>
								Provider Example Provider Example Provider
								Example Provider Example Provider Example{' '}
								{params.providerId}
							</Typography>
							<Box
								className={
									styles.user + ' ' + page_styles.textEllipsis
								}
							>
								{user_icon()}
							</Box>
						</Box>
					</Box>
					<ProviderStatus status='Error' />
				</Box>

				<ErrorBox showButtons={context.currentRole == 'site tester'} />
				<FormDataBox showButtons={context.currentRole == 'site admin'} />
				<TimelineBox />
			</Container>
		);
	}

	function user_icon() {
		let user = false;
		let name = 'Ettore Serra';

		if (user) {
			return (
				<Box title={'Assigned to ' + name} display='flex' alignItems='center' >
					<CancelRoundedIcon fontSize='small' />
					&nbsp;
					<Typography lineHeight={'unset'} fontWeight={'600'}>
						{name}
					</Typography>
				</Box>
			);
		}

		return (
			<Box title='Assign to me' display='flex' alignItems='center'>
				<PersonAddAltRoundedIcon />
				&nbsp;
				<Typography lineHeight={'unset'} fontWeight={'600'}>
					Assign to me
				</Typography>
			</Box>
		);
	}
}
