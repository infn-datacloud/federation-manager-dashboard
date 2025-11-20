// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { InboxIcon, UserIcon } from '@heroicons/react/24/solid';
import Status from '@/components/status';
import Link from 'next/link';

type ListProps = {
	items?: Array<{
		id: string;
		name: string;
		description: string;
		auth_url?: string;
		is_public?: boolean;
		provider_type?: string;
		image_tags?: Array<string>;
		network_tags?: Array<string>;
		support_emails?: Array<string>;
		site_admins?: Array<string>;
		status: string;
		user_name: string;
		href: string;
		site_tester_name: string;
	}>;
};

export default function List(props: Readonly<ListProps>) {
	const { items } = props;

	const listItems = items?.map((item) =>
		/* DISABLED */
		item.status == '7' ? (
			<div
				key={item.id}
				className='box w-full flex pointer-none opacity-50'
			>
				<div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center'>
					<h3 className='font-black truncate'>{item.name}</h3>
					{item.site_tester_name && (
						<div className='flex items-center opacity-70'>
							<UserIcon className='size-4 mr-2' />
							{item.site_tester_name}
						</div>
					)}
					<p className='w-full md:w-1/4 mt-6 md:mt-0 flex justify-end'>
						<Status status={item.status} />
					</p>
				</div>
			</div>
		) : (
			<Link
				href={'providers/' + item.id}
				key={item.id}
				className='w-full flex flex-col md:flex-row justify-between items-start md:items-center box cursor-pointer clickable'
			>
				<h3 className='font-black truncate md:w-1/3'>{item.name}</h3>
				{item.site_tester_name && (
					<div className='flex items-center opacity-70 md:w-1/3'>
						<UserIcon className='size-4 mr-2' />
						{item.site_tester_name}
					</div>
				)}
				<p className='w-full md:w-1/4 mt-6 md:mt-0 flex justify-end'>
					<Status status={item.status} />
				</p>
			</Link>
		)
	);

	if (!items || items.length === 0) {
		return (
			<div className='flex flex-col items-center pt-24 opacity-80'>
				<InboxIcon className='size-24 opacity-50' />
				<h2 className='text-center py-4'>No items found</h2>
				<p className='w-2/3 text-center'>
					Nothing to display at the moment. As soon as items are
					added, they will be listed here for you to view and manage.
				</p>
			</div>
		);
	}

	return <>{listItems}</>;
}
