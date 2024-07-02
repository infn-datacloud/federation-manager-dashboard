'use client'

import { Container, Typography, Box, IconButton } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import styles from '../page.module.css';
import CollapsingBox from '@/components/utilities/CollapsingBox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#162D4D'
        }
    },
});

export default function Profile() {
	let title = (
		<>
			<TuneRoundedIcon />&nbsp;Settings
		</>
	);

	let data = (
		<>
			<Typography variant='h6' display='flex' alignItems='center' >
				<NotificationsActiveRoundedIcon />&nbsp;Notifications
			</Typography>


			<ThemeProvider theme={theme}>
				<Box display='flex' flexWrap='wrap'> 
					<FormControlLabel control={<Checkbox />} color='primary' label="Email" sx={{ minWidth: '200px' }} />
					<FormControlLabel control={<Checkbox />} color='primary' label="Pop up" sx={{ minWidth: '200px' }} />
					<FormControlLabel control={<Checkbox />} color='primary' label="Jira Ticket" sx={{ minWidth: '200px' }} />
				</Box>
			</ThemeProvider>
		</>
	);

    return (
		<>
			<br /><br />
			<Container>
				<Box display='flex' alignItems='center' justifyContent='space-between' className={styles.cardContainer} sx={{padding: '2em 3em!important'}}>

					<Typography variant='h4' fontWeight='bold'>
						Ettore Serra
					</Typography>
					<IconButton>
						<LogoutRoundedIcon />
					</IconButton>
				</Box>

				<br />

            	<CollapsingBox title={title} body={data} />
			</Container>
		</>
    );
}
