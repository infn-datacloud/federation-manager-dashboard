// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

'use client';

import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Modal, ModalBody } from '@/components/modal';
import { Form } from '@/components/form';
import { Button } from '@/components/buttons';
import ConfirmModal from '@/components/confirm-modal';
import UserGroupForm from '../../userGroupForm';

type ItemProps = {
	item: {
		id: string;
		name: string;
		description: string;
	};
};

export default function UserGroupDetail(props: Readonly<ItemProps>) {
	const { item } = props;

	const [showUserGroupModal, setShowUserGroupModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<>
			<div className='flex flex-col md:flex-row gap-4 mt-8'>
				<Button
					className='w-full md:w-1/2 btn btn-secondary'
					onClick={() => {
						setShowUserGroupModal(true);
					}}
				>
					<PencilIcon className='size-4' />
					Details
				</Button>
				<Button
					className='w-full md:w-1/2 btn btn-danger'
					onClick={() => {
						setShowDeleteModal(true);
					}}
				>
					<TrashIcon className='size-4' />
					Delete
				</Button>
			</div>

			{/* Details Modal */}
			<Modal
				show={showUserGroupModal}
				onClose={() => {
					setShowUserGroupModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PencilIcon className='size-8' />
						&nbsp;Edit User Group
					</div>
				}
			>
				<ModalBody>
					<Form>
						<UserGroupForm item={item} />
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

			{/* Delete Modal */}
			<ConfirmModal
				onConfirm={() => {
					setShowDeleteModal(false);
				}}
				onClose={() => {
					setShowDeleteModal(false);
				}}
				confirmButtonText='Yes, delete'
				cancelButtonText='Cancel'
				show={showDeleteModal}
				title={`Delete ${item.name}`}
				danger={true}
			>
				<p>
					Are you sure you want to delete the <b>{item.name}</b> user
					group? This action is irreversible and you will not be able
					to retrieve your user group anymore.
				</p>
			</ConfirmModal>
		</>
	);
}
