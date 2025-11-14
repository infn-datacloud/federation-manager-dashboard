'use client';

import {
	IdentificationIcon,
	MapIcon,
	ClipboardDocumentIcon,
	ShieldCheckIcon,
	TrashIcon,
	EyeIcon,
} from '@heroicons/react/24/solid';

import { Button } from '@/components/buttons';
import { Modal, ModalBody } from '@/components/modal';
import ProviderForm from '../providerForm';
import { Form } from '@/components/form';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmModal from '@/components/confirm-modal';
import { toaster } from '@/components/toaster';

/* Provider */
type providerProps = {
	id: string;
	status: number;
	name: string;
	description: string;
	type: string;
	auth_endpoint: string;
	is_public: boolean;
	support_emails: Array<string>;
	image_tags: Array<string>;
	network_tags: Array<string>;
	rally_username: string;
	rally_password: string;
	site_admins: Array<string>;
	site_testers: Array<string>;
	status_name: string;
};

type providerIdpProps = {
	idp_id: string;
	overrides: {
		name: string;
		protocol: string;
		audience: string;
		groups_claim: string;
	};
};

type providerIdpsProps = Array<providerIdpProps>;

/* Region */
type providerRegionProps = {
	id: string;
	name: string;
	description: string;
	overbooking_cpu: number;
	overbooking_ram: number;
	bandwidth_in: number;
	bandwidth_out: number;
};

type providerRegionsProps = Array<providerRegionProps>;

/* Project */
type providerProjectProps = {
	id: string;
	name: string;
	description: string;
	iaas_project_id: string;
	is_root: boolean;
	region: {
		region_id: string;
		overrides: {
			default_public_net: string;
			default_private_net: string;
			private_net_proxy_host: string;
			private_net_proxy_user: string;
		};
	};
};

type providerProjectsProps = Array<providerProjectProps>;

export default function ProviderPageSubmitted(props: {
	provider: providerProps;
	providerIdps: providerIdpsProps;
	providerRegions: providerRegionsProps;
	providerProjects: providerProjectsProps;
	userId: string;
}) {
	const router = useRouter();

	const { provider, providerIdps, providerRegions, providerProjects, userId } = props;

	const params = useParams();
	const { id } = params;
	
	const [showProviderModal, setShowProviderModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const deleteProvider = async (): Promise<void> => {
		try {
			const apiResponse = await fetch(`/api/providers/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (apiResponse.ok) {
				setShowDeleteModal(false);
				router.push('/providers');
				toaster.success('Provider deleted successfully');
			} else {
				toaster.error(
					'Error deleting Provider',
					'Some error occurred while deleting the provider. Please try again.'
				);
			}
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

	return (
		<>
			<div className='mt-4 text-justify'>{provider.description}</div>

			<div className='flex flex-col md:flex-row gap-4 mt-8'>
				<Button
					className='w-full md:w-1/2 btn btn-secondary'
					onClick={() => {
						setShowProviderModal(true);
					}}
				>
					<EyeIcon className='size-4' />
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

			<div className='w-full mt-12 mb-8 p-8 bg-gray/10 rounded-3xl flex flex-row text-sm'>
				{/* <ClockIcon className='w-6 mr-2 opacity-30' /> */}
				<div>
					<h3 className='mb-4 flex'>
						The provider is ready for testing
					</h3>
					<div>
						The provider setup has been successfully completed and
						is now ready for validation. Both manual and automated
						tests will be conducted by the site tester to ensure
						everything is working as expected.
						<br />
						You will receive a notification once all tests have been
						completed.
					</div>
				</div>
			</div>

			{/* IDPs */}
			<div className='w-full mt-12 mb-8'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
					<div className='flex items-center font-black uppercase'>
						<IdentificationIcon className='size-6' />
						&nbsp;Identity Providers
					</div>
				</div>
			</div>
			<ProviderIdpTable />

			{/* Regions */}
			<div className='w-full mt-12 mb-8'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
					<div className='flex items-center font-black uppercase'>
						<MapIcon className='size-6' />
						&nbsp;Regions
					</div>
				</div>
			</div>
			<ProviderRegionTable />

			{/* Projects */}
			<div className='w-full mt-12 mb-8'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
					<div className='flex items-center font-black uppercase'>
						<ClipboardDocumentIcon className='size-6' />
						&nbsp;Projects
					</div>
				</div>
			</div>
			<ProviderProjectTable />

			{/* Edit Provider Modal */}
			<Modal
				show={showProviderModal}
				onClose={() => {
					setShowProviderModal(false);
				}}
				title={
					<div className='flex items-center'>
						<EyeIcon className='size-8' />
						&nbsp;Provider Details
					</div>
				}
			>
				<ModalBody>
					<Form>
						<ProviderForm userId={userId} disabled={true} item={{
							id: provider.id,
							name:provider.name,
							description:provider.description,
							auth_endpoint:provider.auth_endpoint,
							is_public: provider.is_public,
							type: provider.type,
							image_tags: provider.image_tags,
							network_tags: provider.network_tags,
							support_emails: provider.support_emails,
							site_admins: provider.site_admins,
							status: provider.status.toString(),
							rally_username: provider.rally_username,
							rally_password: provider.rally_password,
							href:'',
						}} />
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setShowProviderModal(false);
								}}
							>
								Close
							</Button>
							{/* <Button
								className='btn btn-bold btn-primary'
								type='submit'
							>
								Save
							</Button> */}
						</div>
					</Form>
				</ModalBody>
			</Modal>

			{/* Delete Modal */}
			<ConfirmModal
				onConfirm={() => {
					deleteProvider();
				}}
				onClose={() => {
					setShowDeleteModal(false);
				}}
				confirmButtonText='Yes, delete'
				cancelButtonText='Cancel'
				show={showDeleteModal}
				title={`Delete ${provider.name}`}
				danger={true}
			>
				<p>
					Are you sure you want to delete the <b>{provider.name}</b> provider?
					This action is irreversible and you will not be able to
					retrieve your provider anymore.
				</p>
			</ConfirmModal>
		</>
	);

	function ProviderIdpTable() {
		return (
			<>
				{providerIdps.length == 0 ? (
					<p className='text-gray dark:text-secondary/60 p-2 text-center'>
						This provider has no IDP connected.
					</p>
				) : (
					<ul className='w-full mt-6'>
						{providerIdps.map((row) => (
							<li
								key={row.idp_id}
								className='flex flex-row justify-between items-start lg:items-center w-full box-sm'
							>
								<div className='flex w-9/10 truncate flex-col lg:flex-row'>
									<div className='font-bold text-md lg:w-1/2 truncate'>
										{row.overrides.name}
									</div>
									<div className='text-sm flex items-center opacity-80 lg:w-1/4'>
										<IdentificationIcon className='size-4' />
										&nbsp;
										<p className='truncate'>{row.idp_id}</p>
									</div>
									<div className='text-sm mt-2 lg:mt-0 flex items-center opacity-60 lg:w-1/4'>
										<p className='truncate'>
											{row.overrides.protocol}
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</>
		);
	}

	function ProviderRegionTable() {
		return (
			<>
				{providerRegions.length == 0 ? (
					<p className='text-gray dark:text-secondary/60 p-2 text-center'>
						This provider has no regions.
					</p>
				) : (
					<ul className='w-full mt-6'>
						{providerRegions.map((row) => (
							<li
								key={row.id}
								className='flex flex-row justify-between items-start w-full box-sm'
							>
								<div className='flex flex-col w-9/10 mr-2'>
									<div className='font-bold text-md truncate'>
										{row.name}
									</div>
									<div className='text-md truncate'>
										{row.description}
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</>
		);
	}

	function ProviderProjectTable() {
		return (
			<>
				{providerProjects.length == 0 ? (
					<p className='text-gray dark:text-secondary/60 p-2 text-center'>
						This provider has no projects.
					</p>
				) : (
					<ul className='w-full mt-6'>
						{providerProjects.map((row) => (
							<li
								key={row.id}
								className='flex flex-row justify-between items-start w-full box-sm'
							>
								<div className='flex flex-col w-9/10 mr-2'>
									<div className='flex flex-col lg:flex-row lg:justify-between items-start'>
										<div className='w-9/10'>
											<div className='font-bold text-md truncate'>
												{row.name}
											</div>
											<div className='text-md truncate'>
												{row.description}
											</div>
										</div>
										{row.is_root ? (
											<div className='text-xs flex items-center opacity-80 mb-4 lg:mb-0 uppercase font-bold'>
												<ShieldCheckIcon className='size-3' />
												&nbsp;Root
											</div>
										) : (
											''
										)}
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</>
		);
	}
}
