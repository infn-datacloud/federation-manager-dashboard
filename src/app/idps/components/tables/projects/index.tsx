// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
'use client';

import {
	InboxIcon,
	PlusIcon,
	PresentationChartLineIcon,
} from '@heroicons/react/24/solid';
import { Button } from '@/components/buttons';
import { Options, Option } from '@/components/options';

type ListProps = {
	items: Array<{
		id: string;
		name: string;
	}>;
};

export default function Projects(props: Readonly<ListProps>) {
	const { items } = props;

	const listItems = items?.map((item) => (
		<div key={item.id} className='box w-full flex items-start justify-between'>
			<h3 className='w-full md:w-1/2 truncate font-black'>{item.name}</h3>
			<div className='flex flex-col'>
				<Options>
					<Option data-danger={true}>Delete</Option>
					<Option>Edit</Option>
				</Options>
			</div>
		</div>
	));

	if (!items || items.length === 0) {
		return (
			<div className='flex flex-col items-center pt-24 opacity-80'>
				<InboxIcon className='size-24 opacity-50' />
				<h2 className='text-center py-4'>No projects found</h2>
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
					<PresentationChartLineIcon className='size-6' />
					&nbsp;Projects
				</div>
				<Button className='btn btn-secondary mt-4 md:mt-0'>
					<PlusIcon className='size-4' />
					Connect project
				</Button>
			</div>
			{listItems}
		</>
	);
}
