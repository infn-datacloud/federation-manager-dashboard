'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

import styles from './request.module.css';
import page_styles from '@/app/page.module.css';

export default function NewRequestButton() {
	const router = useRouter();

	const handleClick = () => {
		router.push('/providers/request');
	};

	return (
		<Box
			display='flex'
			justifyContent='flex-end'
			position='sticky'
			bottom='2em'
		>
			<Button
				size='large'
				onClick={handleClick}
				className={styles.requestButton}
				sx={{
					backgroundColor: '#002A48',
					padding: '1.5em 2em',
					color: 'white',
					borderRadius: '50px',
					right: '2em'
				}}
				variant='text'
			>
				<Typography fontSize='24px' fontWeight='bold' className={page_styles.textEllipsis}>
					+ New Request
				</Typography>
			</Button>
		</Box>
	);
}
