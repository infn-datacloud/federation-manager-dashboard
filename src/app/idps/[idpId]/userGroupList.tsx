// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
'use client';

import {
	InboxIcon,
	UserGroupIcon,
	PlusIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Button } from '@/components/buttons';
import { useParams } from 'next/navigation';
import { Modal } from '@/components/modal/modal';
import { useState } from 'react';
import { ModalBody } from '@/components/modal';
import { Form } from '@/components/form';
import UserGroupForm from './userGroupForm';

type ListProps = {
	items: Array<{
		id: string;
		name: string;
		description: string;
	}>;
};

export default function UserGroupsList(props: Readonly<ListProps>) {
	const { items } = props;

	const params = useParams();
	const idpId = params.idpId as string;

	const [showUserGroupModal, setShowUserGroupModal] = useState(false);

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
				<Button
					className='btn btn-secondary mt-4 md:mt-0'
					onClick={() => {
						setShowUserGroupModal(true);
					}}
				>
					<PlusIcon className='size-4' />
					Add user group
				</Button>
			</div>
			{listItems}
			<Modal
				show={showUserGroupModal}
				onClose={() => {
					setShowUserGroupModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PlusIcon className='size-8' />
						&nbsp;New User Group
					</div>
				}
			>
				<ModalBody>
					<Form>
						<UserGroupForm />
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setShowUserGroupModal(false);
								}}
							>
								Cancel
							</Button>
							<Button
								className='btn btn-bold btn-primary'
								type='submit'
							>
								Save
							</Button>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</>
	);
}
