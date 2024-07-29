'use client';

import { Container, Typography } from '@mui/material';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';

import ProviderList from '@/components/providers/ProviderList';
import NewRequestButton from '@/components/request/NewRequestButton';
import PageHeader from '@/components/utilities/PageHeader';

import { useContext, useEffect } from 'react';
import { RoleManagement } from '@/middleware/roles';
import { SocketManagement } from '@/middleware/contextes/socket';

export default function Home() {
	const context = useContext(RoleManagement);
	const socketCtx = useContext(SocketManagement);

	useEffect(() => {
		if (socketCtx.socket !== null) {
			socketCtx.socket.on('list_provider_federation_requests', (res: any) => {
				console.log('providers_list', res);
			});
			
			socketCtx.socket.emit('list_provider_federation_requests', {});

			return () => {
				socketCtx.socket.off('list_provider_federation_requests');
			}
		}
	}, [socketCtx.socket]);

	let newRequestButton;
	if (context.currentRole === 'site admin') {
		newRequestButton = <NewRequestButton />;
	}

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
			{newRequestButton}
		</>
	);
}
