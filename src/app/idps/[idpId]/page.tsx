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

	const idp = await getIdentityProvider(idpId);
	const userGroups = await getUserGroups(idpId);

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

			<h1>{idp.name}</h1>
			<div className='opacity-80 text-md'>{idp.endpoint}</div>
			<div className='mt-4 text-justify'>{idp.description}</div>
			<IdpDetail item={idp} />
			<UserGroupsList items={userGroups} />
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
		throw new Error(`Failed to fetch identity provider: ${errorText}`);
	}

	const data = await apiResponse.json();

	return data;
}

async function getUserGroups(id: string) {
	const url = `${process.env.BASE_URL}/api/idps/${id}/user-groups`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.text();
		throw new Error(`Failed to fetch user groups: ${errorText}`);
	}

	const data = await apiResponse.json();

	return data.data;
}
