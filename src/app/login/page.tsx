'use client';

import { Container } from '@mui/material';
import PageHeader from '@/components/utilities/PageHeader';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../loading';

export default function Login() {
	const router = useRouter();
	const auth = useAuth();

	useEffect(() => {
		if (auth.isAuthenticated && !auth.isLoading) {
			router.push('/');
		}
	});

	if (!auth.isLoading) {
		if (!auth.isAuthenticated) {
			return (
				<>
					<br />
					<br />
					<br />
					<Container>
						<PageHeader />
					</Container>
					{process.env.CLIENT_ID}
				</>
			);
		}
	} else {
		return <Loading />
	}
}
