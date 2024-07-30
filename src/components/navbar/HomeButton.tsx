'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Image from 'next/image';

import Typography from '@mui/material/Typography';

import styles from './navbar.module.css';
import page_styles from '@/app/page.module.css';

export default function HomeButton() {
	const router = useRouter();

	const handleClick = () => {
		router.push('/');
	};

	const textClasses =  page_styles.textEllipsis +' '+ styles.navbarLogoText;

	return (
		<Button
			title='Federation Manager homepage'
			onClick={handleClick}
			sx={{ marginRight: 'auto' }}
			className={styles.navbarLogo}
			startIcon={
				<Image
					src='/logos/infn_logo_white.png'
					height={50}
					width={82}
					alt='Logo'
					className={styles.navbarLogoImg}
				/>
			}
		>
			<Typography
				variant='h6'
				component='div'
				sx={{ fontWeight: 'bold', paddingRight: '15px' }}
				className={textClasses}
			>
				Federation Manager
			</Typography>
		</Button>
	);
}
