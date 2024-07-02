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

export default function Provider({
	params,
}: Readonly<{
	params: { providerId: string };
}>) {
	return (
		<Container>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginTop='8em'
				marginBottom='4em'
			>
				<Box display='flex' alignItems='center'>
					<Typography
						variant='h4'
						className={provider_styles.providerInitials}
						width='52px!important'
						height='52px!important'
						padding='12px'
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
					>
						<Typography variant='h3' fontWeight={'bold'}>
							Provider Example {params.providerId}
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

			<ErrorBox></ErrorBox>
			<FormDataBox></FormDataBox>
			<TimelineBox></TimelineBox>
		</Container>
	);

	function user_icon() {
		let user = false;

		if (user) {
			return (
				<>
					<CancelRoundedIcon fontSize='small' />
					&nbsp;
					<Typography lineHeight={'unset'} fontWeight={'600'}>
						Ettore Serra
					</Typography>
				</>
			);
		}

		return (
			<>
				<PersonAddAltRoundedIcon />
				&nbsp;
				<Typography lineHeight={'unset'} fontWeight={'600'}>
					Assign to me
				</Typography>
			</>
		);
	}
}
