'use client';

import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(
	props: Readonly<{
		message?: string;
	}>
) {
	const message = props.message ?? 'Loading...';

	return (
		<Box
			width='100%'
			height='80vh'
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
		>
			<br />
			<br />
			<br />
			<CircularProgress color='primary' />
			<br />
			<Typography variant='h6'>{message}</Typography>
		</Box>
	);
}
