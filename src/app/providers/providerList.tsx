'use client';

import { Button } from '@/components/buttons';
import List from './components/list';
import { Modal, ModalBody } from '@/components/modal';
import { useState, FormEvent } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import ProviderForm from './providerForm';
import { Form } from '@/components/form';
import { toaster } from '@/components/toaster';
import { useRouter } from 'next/navigation';

type ProvierListProps = {
	items: Array<{
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
	}>;
	userId: string;
};

export default function ProvierList(props: Readonly<ProvierListProps>) {
	const router = useRouter();
	const { items, userId } = props;

	const [showProviderModal, setShowProviderModal] = useState(false);

	const createProvider = async (
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
			const apiResponse = await fetch('/api/providers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const jsonResponse = await apiResponse.json();

			if (jsonResponse.id) {
				setShowProviderModal(false);
				router.refresh();
				toaster.success('Provider created successfully');
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
			<List items={items} />
			<div className='md:w-full fixed bottom-0 right-0 py-12 px-8 flex items-center justify-center'>
				<Button
					className='btn btn-primary font-bold uppercase rounded-full w-full md:w-3/4 lg:fixed lg:bottom-12 lg:right-12 p-8 lg:w-auto text-3xl shadow-[-3px_3px_8px_rgba(0,0,0,0.1)] clickable '
					onClick={() => setShowProviderModal(true)}
				>
					<PlusIcon className='size-10' />
					<div className='hidden md:inline'>
						&nbsp;Create Provider
					</div>
				</Button>
			</div>
			<Modal
				show={showProviderModal}
				onClose={() => {
					setShowProviderModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PlusIcon className='size-8' />
						&nbsp;Create New Provider
					</div>
				}
			>
				<ModalBody>
					<Form onSubmit={createProvider}>
						<ProviderForm userId={userId} />
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setShowProviderModal(false);
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
