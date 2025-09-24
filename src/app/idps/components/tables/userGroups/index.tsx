// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
'use client';

import {
	InboxIcon,
	UserGroupIcon,
	PlusIcon,
	TrashIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Button } from '@/components/buttons';
import { useParams } from 'next/navigation';
import { Options, Option } from '@/components/options';

type ListProps = {
	items: Array<{
		id: string;
		name: string;
		description: string;
	}>;
};

export default function UserGroups(props: Readonly<ListProps>) {
	const { items } = props;

	const params = useParams();
	const idpId = params.idpId as string;

	const listItems = items?.map((item) => (
		<div
			key={item.id}
			className='box w-full flex items-start cursor-pointer clickable'
		>
			<Link
				href={`/idps/${idpId}/user-groups/${item.id}`}
				className='w-full'
			>
				<h3 className='truncate font-black'>{item.name}</h3>
				<div className='mt-1 text-sm line-clamp-2 opacity-80'>
					{item.description}
				</div>
			</Link>
			<div className='flex flex-col'>
				<Options>
					<Option>
						<div className='flex items-center'>
							<PencilIcon className='size-4' />
							&nbsp;Edit
						</div>
					</Option>
					<Option data-danger={true}>
						<div className='flex items-center'>
							<TrashIcon className='size-4' />
							&nbsp;Delete
						</div>
					</Option>
				</Options>
			</div>
		</div>
	));

	if (!items || items.length === 0) {
		return (
			<div className='flex flex-col items-center pt-24 opacity-80'>
				<InboxIcon className='size-24 opacity-50' />
				<h2 className='text-center py-4'>No user groups found</h2>
				<p className='w-2/3 text-center'>
					Nothing to display at the moment. As soon as items are
					added, they will be listed here for you to view and manage.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className='mt-12 flex flex-col md:flex-row md: justify-between'>
				<div className='text-xl uppercase font-bold flex items-center'>
					<UserGroupIcon className='size-6' />
					&nbsp;User Groups
				</div>
				<Button className='btn btn-secondary mt-4 md:mt-0'>
					<PlusIcon className='size-4' />
					Add user group
				</Button>
			</div>
			{listItems}
		</>
	);
}
