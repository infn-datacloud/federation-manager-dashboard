import Header from '@/components/header';
import Box from '@/components/box';
import { CloudIcon, IdentificationIcon, DocumentTextIcon } from '@heroicons/react/16/solid';

export default function Home() {
	return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Federation Manager'
				subtitle='Federation Manager: seamlessly integrating providers and communities into DataCloud with simplicity, security, and automated resource management.'
			/>
			<Box
				title='Providers'
				subtitle='Short definition of Providers'
				type='small'
				btnText='Show All'
				btnHref='/providers'
				icon={<CloudIcon />}
			/>
			<Box
				title='Identity Providers'
				subtitle='Short definition of Identity Providers'
				type='small'
				btnText='Show All'
				btnHref='/idps'
				icon={<IdentificationIcon />}
			/>
			<Box
				title='SLAs'
				subtitle='Short definition of SLAs'
				type='small'
				btnText='Show All'
				btnHref='/slas'
				icon={<DocumentTextIcon />}
			/>
		</>
	);
}
