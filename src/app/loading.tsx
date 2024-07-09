'use client';

import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: {
			main: '#162D4D',
		},
	},
});

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
			<ThemeProvider theme={theme}>
				<CircularProgress color='primary' />
			</ThemeProvider>
			<br />
			<Typography variant='h6'>{message}</Typography>
		</Box>
	);
}
