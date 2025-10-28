// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
'use client';

import {
	InboxIcon,
	PlusIcon,
	PresentationChartLineIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid';
import { Button } from '@/components/buttons';
import { useState } from 'react';
import { Modal, ModalBody } from '@/components/modal';
import { Form } from '@/components/form';
import ProjectForm from './projectForm';
import ConfirmModal from '@/components/confirm-modal';

type ListProps = {
	items: Array<{
		id: string;
		name: string;
		provider: string;
	}>;
};

export default function ProjectsList(props: Readonly<ListProps>) {
	const { items } = props;

	const [showProjectModal, setShowProjectModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState<{
		id: string;
		name: string;
		provider: string;
	} | null>(null);

	const listItems = items?.map((item) => (
		<div
			key={item.id}
			className='box w-full flex items-center justify-between'
		>
			<div className='flex flex-col w-full md:w-1/2'>
				<h3 className='w-full truncate font-black'>{item.name}</h3>
				<div className='w-full truncate'>{item.provider}</div>
			</div>
			<Button
				className='bg-secondary-100 hover:bg-infn/5 w-7 h-7 rounded-full cursor-pointer p-1'
				onClick={() => {
					setSelectedItem(item);
					setShowDeleteModal(true);
				}}
			>
				<XMarkIcon />
			</Button>
		</div>
	));

	return (
		<>
			<div className='mt-12 flex flex-col md:flex-row md: justify-between'>
				<div className='text-xl uppercase font-bold flex items-center'>
					<PresentationChartLineIcon className='size-6' />
					&nbsp;Projects
				</div>
				<Button
					className='btn btn-secondary mt-4 md:mt-0'
					onClick={() => {
						setShowProjectModal(true);
					}}
				>
					<PlusIcon className='size-4' />
					Connect project
				</Button>
			</div>

			{!items || items.length == 0 ? (
				<div className='flex flex-col items-center pt-24 opacity-80'>
					<InboxIcon className='size-24 opacity-50' />
					<h2 className='text-center py-4'>No projects found</h2>
					<p className='w-2/3 text-center'>
						Nothing to display at the moment. As soon as items are
						added, they will be listed here for you to view and
						manage.
					</p>
				</div>
			) : (
				listItems
			)}

			{/* Details Modal */}
			<Modal
				show={showProjectModal}
				onClose={() => {
					setShowProjectModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PresentationChartLineIcon className='size-6' />
						&nbsp;Connect Project
					</div>
				}
			>
				<ModalBody>
					<Form>
						<ProjectForm />
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setShowProjectModal(false);
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
				title={`Delete ${selectedItem?.name}`}
				danger={true}
			>
				<p>
					Are you sure you want to delete the{' '}
					<b>{selectedItem?.name}</b> project? This action is
					irreversible and you will not be able to retrieve your
					project anymore.
				</p>
			</ConfirmModal>
		</>
	);
}
