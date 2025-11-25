// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

'use client';

import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { FormEvent, useState } from 'react';
import { Modal, ModalBody } from '@/components/modal';
import { Form } from '@/components/form';
import IdpForm from '../idpForm';
import { Button } from '@/components/buttons';
import ConfirmModal from '@/components/confirm-modal';
import { useParams, useRouter } from 'next/navigation';
import { toaster } from '@/components/toaster';

type ItemProps = {
	item: {
		id: string;
		name: string;
		description: string;
		endpoint: string;
		protocol: string;
		audience: string;
		groups_claim: string;
	};
};

export default function IdpDetail(props: Readonly<ItemProps>) {
	const router = useRouter();

	const { item } = props;

	const params = useParams();
	const { idpId } = params;

	const [showIdpModal, setShowIdpModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const deleteIdentityProvider = async (): Promise<void> => {
		try {
			const apiResponse = await fetch(`/api_internal/idps/${idpId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const jsonResponse = await apiResponse; //.json();

			if (jsonResponse.ok) {
				setShowDeleteModal(false);
				router.push('/idps');
				toaster.success('IDP deleted successfully');
			} else {
				toaster.error(
					'Error deleting IDP',
					'Some error occurred while deleting the identity provider. Please try again.'
				);
			}
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

	const updateIdentityProvider = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		// Prevent the default form submission (page reload)
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const entries = Object.fromEntries(formData.entries());

		const body: Record<string, unknown> = { ...entries };

		for (const key in body) {
			const value = body[key];
			if (typeof value === 'string') {
				try {
					const parsed = JSON.parse(value);
					if (Array.isArray(parsed)) {
						body[key] = parsed;
					}
				} catch {
					// ignore invalid JSON
				}
			}
		}

		try {
			const apiResponse = await fetch(`/api_internal/idps/${idpId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const jsonResponse = await apiResponse; //.json();

			if (jsonResponse.ok) {
				setShowIdpModal(false);
				router.refresh();
				toaster.success('IDP updated successfully');
			} else {
				toaster.error('Update failed', 'Please try again.');
			}

			//PrintFormErrors(jsonResponse);
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

	return (
		<>
			<div className='flex flex-col md:flex-row gap-4 mt-8'>
				<Button
					className='w-full md:w-1/2 btn btn-secondary'
					onClick={() => {
						setShowIdpModal(true);
					}}
				>
					<PencilIcon className='size-4' />
					Edit
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
				show={showIdpModal}
				onClose={() => {
					setShowIdpModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PencilIcon className='size-8' />
						&nbsp;Edit Identity Provider
					</div>
				}
			>
				<ModalBody>
					<Form onSubmit={updateIdentityProvider}>
						<IdpForm item={item} />
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setShowIdpModal(false);
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
					deleteIdentityProvider();
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
					Are you sure you want to delete the <b>{item.name}</b> IDP?
					This action is irreversible and you will not be able to
					retrieve your IDP anymore.
				</p>
			</ConfirmModal>
		</>
	);
}
