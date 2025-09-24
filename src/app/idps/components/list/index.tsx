// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Options, Option } from '@/components/options';
import { InboxIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type ListProps = {
	items: Array<{
		id: string;
		name: string;
		description: string;
		endpoint: string;
	}>;
};

export default function List(props: Readonly<ListProps>) {
	const { items } = props;

	const listItems = items?.map((item) => (
		<div
			key={item.id}
			className='box w-full flex justify-between items-start cursor-pointer clickable'
		>
			<Link href={'idps/' + item.id} className='w-full'>
				<h3 className='font-black truncate'>{item.name}</h3>
				<div className='truncate text-sm opacity-80 font-semibold'>
					{item.endpoint}
				</div>
				<div className='mt-4 text-sm line-clamp-2 opacity-80'>
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
				<h2 className='text-center py-4'>No IDPs found</h2>
				<p className='w-2/3 text-center'>
					Nothing to display at the moment. As soon as items are
					added, they will be listed here for you to view and manage.
				</p>
			</div>
		);
	}

	return <>{listItems}</>;
}
