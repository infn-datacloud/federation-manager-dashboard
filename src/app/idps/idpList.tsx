'use client';

import { Button } from '@/components/buttons';
import Header from '@/components/header';
import List from './components/list';
import { Modal, ModalBody } from '@/components/modal';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Form } from '@/components/form';
import IdpForm from './idpForm';

type Items = {
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

export default function IdpList(props: Readonly<Items>) {
	const { items } = props;

	const [showIdpModal, setShowIdpModal] = useState(false);

	return (
		<>
			<Header
				logo='/logos/infn_logo.png'
				title='Identity Providers'
				subtitle='Identity Providers supported by Data Cloud. Resource providers must support at least one of them. Data Cloud users MUST be registered to at least one of those Identity Providers.'
			/>
			<List items={items} />
			<div className='fixed bottom-0 right-0 py-12 px-8 flex items-center justify-center'>
				<Button
					className='btn btn-primary font-bold uppercase rounded-full w-full lg:fixed lg:bottom-12 lg:right-12 p-8 lg:w-auto text-3xl shadow-[-3px_3px_8px_rgba(0,0,0,0.1)] clickable '
					onClick={() => setShowIdpModal(true)}
				>
					<PlusIcon className='size-10' />
					<div className='hidden md:inline'>&nbsp;Create IDP</div>
				</Button>
			</div>
			<Modal
				show={showIdpModal}
				onClose={() => {
					setShowIdpModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PlusIcon className='size-8' />
						&nbsp;New Identity Provider
					</div>
				}
			>
				<ModalBody>
					<Form>
						<IdpForm />
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
		</>
	);
}
