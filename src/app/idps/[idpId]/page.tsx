import UserGroupsList from './userGroupList';
import Link from '@/components/link';
import IdpDetail from './idpDetail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';

type IdpPageProps = {
	params: Promise<{
		idpId: string;
	}>;
};

export default async function Idp(props: Readonly<IdpPageProps>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />
	}

	const { idpId } = await props.params;

	const items = [
		{
			id: '1',
			name: 'Cygno',
			description:
				'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
		{
			id: '2',
			name: 'Terabit',
			description: 'lorem ipsum dolor sit amet consectetur adipiscing',
		},
		{
			id: '3',
			name: 'ICSC',
			description: 'lorem ipsum dolor sit amet consectetur adipiscing',
		},
	];

	const idp = await getIdentityProvider(idpId);

	return (
		<>
			<div className='mb-12'>
				<Link href='/idps' className='opacity-50 hover:opacity-80'>
					Identity Providers
				</Link>
				<span className='opacity-50'>
					{' > '}
					Identity Provider
				</span>
			</div>

			<h1>
				{idp.name}
			</h1>
			<div className='opacity-80 text-md'>{idp.endpoint}</div>
			<div className='mt-4 text-justify'>{idp.description}</div>
			<IdpDetail item={idp} />
			<UserGroupsList items={items} />
		</>
	);
}

async function getIdentityProvider(id: string) {
	const url = `${process.env.BASE_URL}/api/idps/${id}`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.text();
		throw new Error(`Failed to fetch provider(s): ${errorText}`);
	}

	const data = await apiResponse.json();

	return data;
}
