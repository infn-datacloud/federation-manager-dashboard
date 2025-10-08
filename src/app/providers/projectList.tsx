'use client';

import { Button } from '@/components/buttons';
import Header from '@/components/header';
import List from '@/components/list';
import { Modal, ModalBody } from '@/components/modal';
import { useState, FormEvent } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import ProjectForm from './projectForm'
import { Form } from '@/components/form';

type Items = {
	items: Array<{
		id: string;
		name: string;
		auth_url?: string;
		is_public?: boolean;
		provider_type?: string;
		image_tags?: Array<string>;
		network_tags?: Array<string>;
		support_emails?: Array<string>;
		status: string;
		user_name: string;
		href: string;
	}>;
};

export default function ProjectList(props: Readonly<Items>) {
    const { items } = props;

    const [showProviderModal, setShowProviderModal] = useState(false);

	const createProvider = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		// Prevent the default form submission (page reload)
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const body = Object.fromEntries(formData.entries());

		try {
			const apiResponse = await fetch('/api/providers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			console.log(await apiResponse.json())
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

    return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Providers'
				subtitle='A Provider is a logical resource provider with geographical zones that collects Projects for quota federation and supports one or more identity providers (IdPs).'
			/>
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
						<ProjectForm />
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
