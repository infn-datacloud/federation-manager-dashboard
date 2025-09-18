'use client';

import { Button } from '@/components/buttons';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Projects from '../../../../../components/tables/projects';
import { useParams } from 'next/navigation';
import Link from '@/components/link';

export default function Sla() {
	const params = useParams();
	const { idpId, userGroupId, slaId } = params;

	const items = [
		{
			id: '1',
			name: 'Intertwin'
		},
		{
			id: '2',
			name: 'Terabit',
		},
	];

	return (
		<>
			<div className='mb-12'>
				<Link href='/idps' className='opacity-50 hover:opacity-80'>
					Identity Providers
				</Link>
				<span className='opacity-50'>{' > '}</span>
				<Link href='../../../' className='opacity-50 hover:opacity-80'>
					Identity Provider
				</Link>
				<span className='opacity-50'>{' > '}</span>
				<Link href='../' className='opacity-50 hover:opacity-80'>
					User Group
				</Link>
				<span className='opacity-50'>
					{' > '}
					Sla
				</span>
			</div>

			<h1>
				signed_sla.pdf {slaId}, {userGroupId}, {idpId}
			</h1>
			<div className='mt-4 text-justify'>SLA for the Cygno project</div>
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
			<Projects items={items} />
		</>
	);
}
