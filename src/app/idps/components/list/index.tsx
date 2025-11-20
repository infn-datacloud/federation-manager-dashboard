// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

'use client';

import { InboxIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type ListProps = {
	items: Array<{
		id: string;
		name: string;
		description: string;
		endpoint: string;
		protocol: string;
		audience: string;
		groups_claim: string;
	}>;
};

export default function List(props: Readonly<ListProps>) {
	const { items } = props;

	const listItems = items?.map((item) => (
		<Link
			key={item.id}
			href={'idps/' + item.id}
			className='w-full box flex flex-col cursor-pointer clickable'
		>
			<h3 className='font-black truncate'>{item.name}</h3>
			<div className='truncate text-sm opacity-80 font-semibold'>
				{item.endpoint}
			</div>
			{item.description && (
				<div className='mt-4 text-sm line-clamp-2 opacity-80'>
					{item.description}
				</div>
			)}
		</Link>
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
