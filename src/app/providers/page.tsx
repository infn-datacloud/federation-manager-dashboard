'use client';

import { Button } from '@/components/buttons';
import Header from '@/components/header';
import List from '@/components/list';
import { Modal, ModalBody } from '@/components/modal';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import {
	Checkbox,
	Field,
	Form,
} from '@/components/form';
import { Input, InputList } from '@/components/inputs';

export default function Providers() {
	const items = [
		{
			id: '15',
			name: 'Provider One',
			status: '0',
			user_name: '',
			href: '',
		},
		{
			id: '2',
			name: 'Provider One',
			status: 'not ID',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '3',
			name: 'Provider One',
			status: '0',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '4',
			name: 'Provider One',
			status: '1',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '5',
			name: 'Provider One',
			status: '2',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '6',
			name: 'Provider One',
			status: '3',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '7',
			name: 'Provider One',
			status: '4',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '8',
			name: 'Provider One',
			status: '5',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '9',
			name: 'Provider One',
			status: '6',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '10',
			name: 'Provider One',
			status: '7',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '11',
			name: 'Provider One',
			status: '8',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '12',
			name: 'Provider One',
			status: '9',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
		{
			id: '13',
			name: 'Provider One',
			status: '10',
			user_name: 'Jeff Bezos',
			href: '/providers',
		},
	];

	const [newProviderModal, setNewProviderModal] = useState(false);

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
					onClick={() => setNewProviderModal(true)}
				>
					<PlusIcon className='size-10' />
					<div className='hidden md:inline'>
						&nbsp;Create Provider
					</div>
				</Button>
			</div>
			<Modal
				show={newProviderModal}
				onClose={() => {
					setNewProviderModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PlusIcon className='size-8' />
						&nbsp;Create New Provider
					</div>
				}
			>
				<ModalBody>
					<Form>
						<Field>
							<Input
								label='Name'
								name='name'
								placeholder='Provider Example'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Auth URL'
								name='auth-url'
								placeholder='https://auth.example.infn.it'
								required
							/>
						</Field>
						<Field>
							<Checkbox name='checkbox' label='Is public' />
						</Field>
						<Field>
							<Input
								label='Provider type'
								name='provider-type'
								placeholder='OpenStack'
								required
							/>
						</Field>
						<Field>
							<InputList
								label='Image tags'
								name='image-tags'
								placeholder='infn-cloud'
								required
								originalItems={[]}
							></InputList>
						</Field>
						<Field>
							<InputList
								label='Network tags'
								name='network-tags'
								placeholder='infn-cloud'
								required
								originalItems={[]}
							></InputList>
						</Field>
						<Field>
							<InputList
								label='Support Emails'
								name='support-emails'
								placeholder='example@infn.it'
								required
								originalItems={[]}
							></InputList>
						</Field>
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setNewProviderModal(false);
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
