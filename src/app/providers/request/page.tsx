'use client';

import { Container, Typography, Box, Button, Skeleton } from '@mui/material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import page_styles from '@/app/page.module.css';
import styles from './request.module.css';

import { useRouter } from 'next/navigation';
import { useEffect, useContext, useState } from 'react';
import { SocketManagement } from '@/middleware/contextes/socket';
import CreateForm from '@/components/form/Form';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import dataFormatter from './dataFormatter';

export default function Request() {
	const router = useRouter();
	const socketCtx = useContext(SocketManagement);
	const [formData, setFormData] = useState<any>(null);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const submittedFormData = new FormData(event.target);
		const data: any = Object.fromEntries(submittedFormData.entries());
		
		const formattedData = dataFormatter(data);

		console.log('Form Data:', formattedData, data);

		const res = await fetch('/api/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		// const result = await res.json();
		// console.log('Response:', result);
	};

	let description;
	let body;
	let buttons;

	if (formData == null) {
		description = <Skeleton variant='text' />;

		body = (
			<Skeleton
				variant='rectangular'
				height={250}
				sx={{ borderRadius: '15px' }}
			/>
		);

		buttons = (
			<Box
				sx={{
					marginTop: '2em',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Skeleton
					variant='rectangular'
					height={50}
					width={130}
					sx={{ borderRadius: '25px' }}
				/>
				<Skeleton
					variant='rectangular'
					height={50}
					width={130}
					sx={{ borderRadius: '25px' }}
				/>
			</Box>
		);
	} else {
		body = <CreateForm structure={formData.items.properties} />;
		buttons = getButtons(router);
		description = formData.description;
	}

	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.on('get_form', (res: any) => {
				setFormData(res.provider);
			});

			socketCtx.socket.emit('get_form');

			return () => {
				socketCtx.socket.off('get_form');
			};
		}
	}, [socketCtx.socket]);

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
						<Typography variant='h4' textAlign='center'>
							New Provider Request
						</Typography>

						<Typography
							variant='body1'
							align='center'
							width='50%'
							className={styles.requestText}
						>
							{description}
						</Typography>
					</Box>

					<br />

					<form onSubmit={handleSubmit}>
						{body}

						{buttons}
					</form>
				</Box>
			</Container>
		</>
	);
}

function getButtons(router: AppRouterInstance | string[]) {
	const handleCancelClick = () => {
		router.push('/');
	};

	return (
		<Box display='flex' justifyContent='space-between' marginTop='2em'>
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
				type='submit'
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
	);
}
