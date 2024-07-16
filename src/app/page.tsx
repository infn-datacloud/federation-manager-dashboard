'use client';

import { Container, Typography } from '@mui/material';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';

import ProviderList from '@/components/providers/ProviderList';
import NewRequestButton from '@/components/request/NewRequestButton';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';

import Loading from '@/app/loading';
import PageHeader from '@/components/utilities/PageHeader';

import { useEffect } from 'react';
import { useRoles } from '@/middleware/roles';

export default function Home() {
	const auth = useAuth();
	const router = useRouter();

	/* Set user roles */
	useRoles();

	useEffect(() => {
		if (!auth.isAuthenticated && !auth.isLoading) {
			/* Go to login page */
			router.push('/login');
		}
	});

	switch (auth.activeNavigator) {
		case 'signinSilent':
			return <Loading message='Signing you in...' />;
		case 'signoutRedirect':
			return <Loading message='Signing you out...' />;
	}

	if (auth.isLoading) {
		return <Loading />;
	}

	if (auth.error) {
		return <div>Oops... {auth.error.message}</div>;
	}

	if (auth.isAuthenticated) {
		return (
			<>
				<br />
				<br />
				<br />
				<Container>
					<PageHeader />

					<br />
					<br />

					<Typography
						variant='h5'
						fontWeight='bold'
						display='flex'
						alignItems='center'
					>
						<CloudRoundedIcon />
						&nbsp;Providers
					</Typography>

					<br />

					<ProviderList />
				</Container>
				<NewRequestButton />
			</>
		);
	}
}
