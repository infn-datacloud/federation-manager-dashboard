import { Container, Typography, Box, IconButton } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import styles from '../page.module.css'

export default function Profile() {
    return (
		<>
			<br /><br />
			<Container className={styles.cardContainer} sx={{padding: '2em 3em!important'}}>
				<Box display='flex' alignItems='center' justifyContent='space-between'>

					<Typography variant='h4' fontWeight='bold'>
						Ettore Serra
					</Typography>
					<IconButton>
						<LogoutRoundedIcon />
					</IconButton>
				</Box>
			</Container>
		</>
    );
}
