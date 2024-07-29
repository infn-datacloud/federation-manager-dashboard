'use client';

import { Container, Typography, Box, Button, TextField } from '@mui/material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import page_styles from '@/app/page.module.css';
import styles from './request.module.css';

import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { SocketManagement } from '@/middleware/contextes/socket';

export default function Request() {
	const router = useRouter();
	const socketCtx = useContext(SocketManagement);

	const handleCancelClick = () => {
		router.push('/');
	};

	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.on('get_form', (res: any) => {
				console.log('Form', res);
			});
			
			socketCtx.socket.emit('get_form');

			return () => {
				socketCtx.socket.off('get_form');
			}
		}
	}, []);

	return (
		<>
			<br />
			<br />
			<Container>
				<Box
					className={page_styles.cardContainer}
					sx={{ padding: '2em 3em!important', marginTop: '4em' }}
				>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
					>
						<Typography variant='h4'>
							New Provider Request
						</Typography>

						<Typography
							variant='body1'
							align='center'
							width='50%'
							className={styles.requestText}
						>
							Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Nunc in tempus lacus. Nunc urna
							nunc, condimentum sit amet egestas a, vestibulum
							tempus felis. Suspendisse nec purus lacus.
						</Typography>
					</Box>

					<br />

					<Box
						component='form'
						sx={{
							'& .MuiTextField-root': { m: 1 },
						}}
						noValidate
						autoComplete='off'
					>
						<TextField
							label='Title'
							variant='standard'
							color='primary'
							fullWidth
							autoFocus
						/>
						<br />
						<TextField
							label='Request description'
							variant='standard'
							color='primary'
							fullWidth
							multiline
							rows={5}
						/>
						<br />
						<br />
						<Box display='flex' justifyContent='space-between'>
							<Button
								variant='contained'
								color='error'
								sx={{
									borderRadius: '25px',
									fontWeight: 'bold',
								}}
								endIcon={<NotInterestedIcon />}
								onClick={handleCancelClick}
								size='large'
							>
								Cancel
							</Button>
							<Button
								variant='contained'
								sx={{
									borderRadius: '25px',
									fontWeight: 'bold',
									backgroundColor: '#002A48',
									'&:hover': {
										backgroundColor: '#012d4d',
									},
								}}
								endIcon={<AddRoundedIcon />}
								size='large'
							>
								Create
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
}
