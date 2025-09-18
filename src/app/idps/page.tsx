'use client';

import { Button } from '@/components/buttons';
import Header from '@/components/header';
import List from './components/list';
import { Modal, ModalBody } from '@/components/modal';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Field, Form } from '@/components/form';
import { Input } from '@/components/inputs';

export default function Idps() {
	const items = [
		{
			id: '1',
			name: 'IAM Cloud',
			description:
				'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			endpoint: 'https://iam.cloud.infn.it/',
		},
		{
			id: '2',
			name: 'IAM Cloud',
			description: 'INFN-Cloud identity provider',
			endpoint: 'https://iam.cloud.infn.it/',
		},
		{
			id: '3',
			name: 'IAM Cloud',
			description: 'INFN-Cloud identity provider',
			endpoint: 'https://iam.cloud.infn.it/',
		},
	];

	const [newIdpModal, setNewIdpModal] = useState(false);

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
					onClick={() => setNewIdpModal(true)}
				>
					<PlusIcon className='size-10' />
					<div className='hidden md:inline'>&nbsp;Create IDP</div>
				</Button>
			</div>
			<Modal
				show={newIdpModal}
				onClose={() => {
					setNewIdpModal(false);
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
						<Field>
							<Input
								label='Name'
								name='name'
								placeholder='IDP name'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Description'
								name='description'
								placeholder='IDP description'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Endpoint'
								name='endpoint'
								placeholder='https://auth.example.infn.it'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Protocol'
								name='protocol'
								placeholder='openid'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Audience'
								name='audience'
								placeholder='my-aud'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Groups Claim'
								name='groups_claim'
								placeholder='groups'
								required
							/>
						</Field>
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setNewIdpModal(false);
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
