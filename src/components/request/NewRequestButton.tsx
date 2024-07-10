'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

import styles from './request.module.css';
import page_styles from '@/app/page.module.css';
import { RoleManagement } from '@/app/layout';

export default function NewRequestButton() {
	const router = useRouter();
	const context = useContext(RoleManagement);

	const handleClick = () => {
		router.push('/providers/request');
	};

	if (context.currentRole === 'admin') {
		return (
			<Box
				display='flex'
				justifyContent='flex-end'
				position='fixed'
				bottom='2em'
				right='1em'
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
						right: '2em',
					}}
					variant='text'
				>
					<Typography
						fontSize='24px'
						fontWeight='bold'
						className={page_styles.textEllipsis}
					>
						+ New Request
					</Typography>
				</Button>
			</Box>
		);
	}
}
