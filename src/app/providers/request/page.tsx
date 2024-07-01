'use client'

import { useRouter } from 'next/navigation';

import { Container, Typography, Box, Button } from "@mui/material"
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import styles from '../../page.module.css'

export default function Request() {
	const router = useRouter();

	const handleCancelClick = () => {
		router.push('/');
	};

    return (
		<>
			<br /><br />
			<Container className={styles.cardContainer} sx={{padding: '2em 3em!important'}}>
				<Box display='flex' flexDirection='column' alignItems='center'>
					<Typography variant="h4">
						New Provider Request
					</Typography>
					
					<Typography variant="body1" align='center' width='50%'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in tempus lacus. Nunc urna nunc, condimentum sit amet egestas a, vestibulum tempus felis. Suspendisse nec purus lacus.
					</Typography>
				</Box>

				<form>
					<input type="text" /><br />
					<input type="text" /><br />
					<input type="text" /><br />
					<input type="text" /><br />
					<br />
					<Box display='flex' justifyContent='space-between'>
						<Button 
							variant="contained"
							color="error"
							sx={{borderRadius: '25px', fontWeight: 'bold' }} 
							endIcon={<NotInterestedIcon />}
							onClick={ handleCancelClick } 
						>
							Cancel
						</Button>
						<Button 
							variant="contained" 
							sx={{borderRadius: '25px', fontWeight: 'bold', backgroundColor: '#002A48',
								'&:hover': {
									backgroundColor: '#012d4d',
								}}} 
							endIcon={<AddRoundedIcon />}
						>
							Create
						</Button>
					</Box>
				</form>
			</Container>
		</>
    );
}
