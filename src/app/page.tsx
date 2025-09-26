import Header from '@/components/header';
import Box from '@/components/box';
import {
	CloudIcon,
	IdentificationIcon,
} from '@heroicons/react/24/solid';

export default function Home() {
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
