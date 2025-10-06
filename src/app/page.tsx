import Header from '@/components/header';
import Box from '@/components/box';
import {
	CloudIcon,
	IdentificationIcon,
} from '@heroicons/react/24/solid';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />
	}

	return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Federation Manager'
				subtitle='Seamlessly integrating providers and communities into DataCloud with simplicity, security, and automated resource management.'
			/>
			<Box
				title='Providers'
				subtitle='Logical resource collector with zones, projects, quotas, and IdPs'
				type='small'
				btnText='Show All'
				btnHref='/providers'
				icon={<CloudIcon />}
			/>
			<Box
				title='Identity Providers'
				subtitle='Service that authenticates users and issues trusted credentials'
				type='small'
				btnText='Show All'
				btnHref='/idps'
				icon={<IdentificationIcon />}
			/>
		</>
	);
}
