import UserGroupsList from './userGroupList';
import Link from '@/components/link';
import IdpDetail from './idpDetail';

type IdpPageProps = {
	params: Promise<{
		idpId: string;
	}>;
};

export default async function Idp(props: Readonly<IdpPageProps>) {
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

	// retrieve with a get by ID
	const idp = {
		id: '2',
		name: 'IAM Cloud 2',
		description: 'INFN-Cloud identity provider',
		endpoint: 'https://2-iam.cloud.infn.it/',
		protocol: 'openid',
		audience: 'aud',
		groups_claim: 'group',
	};

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
				{idp.name} - ID: {idpId}
			</h1>
			<div className='opacity-80 text-md'>{idp.endpoint}</div>
			<div className='mt-4 text-justify'>{idp.description}</div>
			<IdpDetail item={idp} />
			<UserGroupsList items={items} />
		</>
	);
}
