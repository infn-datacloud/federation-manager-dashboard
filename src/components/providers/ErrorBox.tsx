import { useContext } from 'react';
import { Button, Box, Typography } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded';

import { RoleManagement } from '@/app/layout';

import styles from './providers.module.css';

export default function ErrorBox() {
	const context = useContext(RoleManagement);
	let buttons = <></>;

	if (context.currentRole === 'tester') {
		buttons = (
			<Box display='flex' justifyContent='flex-end' marginTop='1rem'>
				<Button
					title='Edit error'
					variant='text'
					color='error'
					sx={{
						borderRadius: '25px',
						fontWeight: 'bold',
						display: 'flex',
						alignItems: 'center',
						padding: '5px 32px',
					}}
					endIcon={<EditRoundedIcon />}
				>
					Edit
				</Button>
				<Button
					title='Send error'
					variant='outlined'
					color='error'
					sx={{
						borderRadius: '25px',
						fontWeight: 'bold',
						display: 'flex',
						alignItems: 'center',
						padding: '5px 32px',
					}}
					endIcon={<ShortcutRoundedIcon />}
				>
					Send
				</Button>
			</Box>
		);
	}

	return (
		<Box className={styles.errorContainer}>
			<Typography
				variant='h5'
				fontWeight='bold'
				display='flex'
				alignItems='flex-end'
				marginBottom='1rem'
			>
				<WarningRoundedIcon fontSize='large' />
				&nbsp; Generic Error
			</Typography>
			<Typography>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
				consequuntur illum alias a fugiat, reiciendis ab debitis
				aspernatur excepturi! Nisi a alias maiores voluptatibus nobis
				velit iusto, dolor tempore magnam? Lorem, ipsum dolor sit amet
				consectetur adipisicing elit. Quam molestiae deserunt, optio
				nostrum illo sunt corrupti recusandae velit. Laudantium maiores
				suscipit blanditiis vitae id! Sint corporis modi placeat ipsam
				atque! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Ipsum debitis alias cum fuga unde earum, explicabo deleniti
				mollitia rem iusto esse quidem veritatis veniam deserunt
				architecto assumenda. Sapiente, soluta hic. Lorem ipsum dolor
				sit amet consectetur adipisicing elit. Blanditiis, deserunt
				praesentium. Repudiandae eligendi eveniet sequi perspiciatis
				eius neque rem, fugit, totam in, dolor pariatur libero facilis
				adipisci accusantium. Repellendus, totam.
			</Typography>

			{buttons}
		</Box>
	);
}
