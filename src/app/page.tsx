import Typography from '@mui/material/Typography';
import styles from './page.module.css'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';

import ProviderList from '@/components/providers/ProviderList';
import NewRequestButton from '@/components/request/NewRequestButton';

export default function Home() {
	return (
		<>
			<br /><br />
			<Container>
				<Box display='flex' flexDirection='column' alignItems='center'>
					<img
						src="/logos/logo_INFN.png"
						height={150}
						alt="Logo"
						className={ styles.logoImg }
					/>

					<Typography variant="h4">
						Federation Manager
					</Typography>
					
					<Typography variant="body1" align='center' width='50%'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in tempus lacus. Nunc urna nunc, condimentum sit amet egestas a, vestibulum tempus felis. Suspendisse nec purus lacus.
					</Typography>

				</Box>

				<br /><br />

				<Typography variant="h5" fontWeight='bold' display='flex' alignItems='center'>
					<CloudRoundedIcon />&nbsp;Providers
				</Typography>

				<br />

				<ProviderList />

				<br />
				<NewRequestButton />
			</Container>
		</>
	);
}
