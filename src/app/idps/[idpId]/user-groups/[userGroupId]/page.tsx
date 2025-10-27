import SlaList from './slaList';
import Link from '@/components/link';
import UserGroupDetail from './userGroupDetail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';

type IdpPageProps = {
	params: Promise<{
		idpId: string;
		userGroupId: string;
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
	
	const { idpId, userGroupId } = await props.params;

	const userGroup = await getUserGroup(idpId, userGroupId);
	const slas = await getSlas(idpId, userGroupId);

	return (
		<>
			<div className='mb-12'>
				<Link href='/idps' className='opacity-50 hover:opacity-80'>
					Identity Providers
				</Link>
				<span className='opacity-50'>{' > '}</span>
				<Link href='../' className='opacity-50 hover:opacity-80'>
					Identity Provider
				</Link>
				<span className='opacity-50'>
					{' > '}
					User Group
				</span>
			</div>

			<h1>{userGroup.name}</h1>
			<div className='mt-4 text-justify'>{userGroup.description}</div>
			<UserGroupDetail item={userGroup} />
			<SlaList items={slas} />
		</>
	);
}

async function getUserGroup(idpId: string, userGroupId: string) {
	const url = `${process.env.BASE_URL}/api/idps/${idpId}/user-groups/${userGroupId}`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.statusText;
		throw new Error(`Failed to fetch user group: ${errorText}`);
	}

	const data = await apiResponse.json();

	return data;
}

async function getSlas(idpId: string, userGroupId: string) {
	const url = `${process.env.BASE_URL}/api/idps/${idpId}/user-groups/${userGroupId}/slas`;

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
