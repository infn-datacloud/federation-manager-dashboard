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

	const items = [
		{
			id: '1',
			name: 'signad_sla.pdf',
			description: 'SLA for the Cygno project',
			url: 'https://example.com',
			startDate: '08-11-2025',
			endDate: '31-12-2025',
		},
		{
			id: '2',
			name: 'terabit_sla.pdf',
			description: 'SLA for the Terabit project',
			url: 'https://example.com',
			startDate: '08-11-2025',
			endDate: '31-12-2025',
		},
	];

	// retrieve with a get by ID
	const userGroup = {
		id: '1',
		name: 'Cygno',
		description:
			'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	};

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

			<h1>
				{userGroup.name} - UG: {userGroupId}, ID: {idpId}
			</h1>
			<div className='mt-4 text-justify'>
				{userGroup.description}
			</div>
			<UserGroupDetail item={userGroup} />
			<SlaList items={items} />
		</>
	);
}
