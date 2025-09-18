'use client';

import { Button } from '@/components/buttons';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Slas from '../../../components/tables/slas';
import { useParams } from 'next/navigation';
import Link from '@/components/link';

export default function Idp() {
	const params = useParams();
	const { idpId, userGroupId } = params;

	const items = [
		{
			id: '1',
			name: 'signad_sla.pdf',
			description: 'SLA for the Cygno project',
		},
		{
			id: '2',
			name: 'terabit_sla.pdf',
			description: 'SLA for the Terabit project',
		},
	];

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
				Cygno {userGroupId}, {idpId}
			</h1>
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
			<Slas items={items} />
		</>
	);
}
