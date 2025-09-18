import { Button } from '@/components/buttons';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import UserGroups from '../components/tables/userGroups';
import Link from '@/components/link';

type IdpPageProps = {
	searchParams: Promise<{
		idpId: string;
	}>;
};

export default async function Idp(props: Readonly<IdpPageProps>) {
	const { idpId } = await props.searchParams;

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

			<h1>IAM Cloud {idpId}</h1>
			<div className='opacity-80 text-md'>https://auth.cloud.infn.it</div>
			<div className='mt-4 text-justify'>
				lorem ipsum dolor sit amet consectetur adipiscing elit sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua ut
				enim ad minim veniam quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit
				amet consectetur adipiscing elit sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua ut enim ad minim
				veniam quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
			</div>
			<div className='flex flex-col md:flex-row gap-4 mt-8'>
				<Button className='w-full md:w-1/2 btn btn-secondary'>
					<PencilIcon className='size-4' />
					Details
				</Button>
				<Button className='w-full md:w-1/2 btn btn-danger'>
					<TrashIcon className='size-4' />
					Delete
				</Button>
			</div>
			<UserGroups items={items} />
		</>
	);
}
