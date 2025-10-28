import Header from '@/components/header';
import IdpList from './idpList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';
import { Suspense } from 'react';
import { LoadingList } from './loading';

export default async function Idps() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />;
	}

	/* const items = [
		{
			id: '1',
			name: 'IAM Cloud 1',
			description:
				'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			endpoint: 'https://iam.cloud.infn.it/',
			protocol: 'openid',
			audience: 'aud',
			groups_claim: 'group',
		},
		{
			id: '2',
			name: 'IAM Cloud 2',
			description: 'INFN-Cloud identity provider',
			endpoint: 'https://2-iam.cloud.infn.it/',
			protocol: 'openid',
			audience: 'aud',
			groups_claim: 'group',
		},
		{
			id: '3',
			name: 'IAM Cloud 3',
			description: 'INFN-Cloud identity provider 2',
			endpoint: 'https://3-iam.cloud.infn.it/',
			protocol: 'openid',
			audience: 'aud',
			groups_claim: 'group',
		},
	]; */

	return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Identity Providers'
				subtitle='Identity Providers supported by Data Cloud. Resource providers must support at least one of them. Data Cloud users MUST be registered to at least one of those Identity Providers.'
			/>
			<Suspense fallback={<LoadingList />}>
				<List />
			</Suspense>
		</>
	);
}

async function List() {
	const idps = await getIdentityProviders();
	return <IdpList items={idps} />;
}

async function getIdentityProviders() {
	const apiResponse = await fetch(`${process.env.BASE_URL}/api/idps`, {
		method: 'GET',
		headers: await headers(),
	});

	const identityProviders = await apiResponse.json();

	return identityProviders.data;
}
