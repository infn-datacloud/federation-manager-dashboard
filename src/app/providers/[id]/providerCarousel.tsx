'use client';

import { Button } from '@/components/buttons';
import {
	Carousel,
	CarouselList,
	CarouselNavigator,
	CarouselPanel,
	CarouselPanels,
	CarouselTab,
} from '@/components/carousel';
import { Stepper } from '@/components/stepper';
import { FormEvent, useState } from 'react';
import { Modal, ModalBody } from '@/components/modal';
import {
	Checkbox,
	Field,
	Form,
	Label,
	Select,
	SelectOption,
} from '@/components/form';
import { Input } from '@/components/inputs';
import {
	IdentificationIcon,
	MapIcon,
	ClipboardDocumentIcon,
	TrashIcon,
	PencilIcon,
	ShieldCheckIcon,
	PlusIcon,
	UserPlusIcon,
	PlayIcon,
	UserIcon,
} from '@heroicons/react/24/solid';
import { toaster } from '@/components/toaster';
import { useParams, useRouter } from 'next/navigation';
import { Options, Option } from '@/components/options';
import ConfirmModal from '@/components/confirm-modal';
import ProviderForm from '../providerForm';

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
	test_flavor_name: string;
	test_network_id?: string;
	floating_ips_enable: boolean;
	tester_name: string;
};

/* IDP */
type idpsProps = Array<{
	id: string;
	name: string;
	protocol: string;
	audience: string;
	groups_claim: string;
}>;

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

export default function ProviderCarousel(props: {
	provider: providerProps;
	idps: idpsProps;
	providerIdps: providerIdpsProps;
	providerRegions: providerRegionsProps;
	providerProjects: providerProjectsProps;
	userId: string;
	userRoles: Array<string>;
}) {
	const router = useRouter();

	const {
		provider,
		idps,
		providerIdps,
		providerRegions,
		providerProjects,
		userId,
		userRoles,
	} = props;

	const params = useParams();
	const { id } = params;

	/* Navigator */
	const TOTAL_PAGES = 4;
	const [currentPage, setCurrentPage] = useState(getCurrentPage());
	const back = () => setCurrentPage(Math.max(0, currentPage - 1));
	const next = () => {
		setCurrentPage(Math.min(currentPage + 1, TOTAL_PAGES - 1));

		if (currentPage + 1 == TOTAL_PAGES) {
			submitProvider();
		}
	};

	/* IDP */
	const [showProviderIdpModal, setShowProviderIdpModal] = useState(false);
	const [showProviderIdpDeleteModal, setShowProviderIdpDeleteModal] =
		useState(false);
	const [providerIdpData, setProviderIdpData] = useState<
		providerIdpProps | undefined
	>();

	const connectProviderIdp = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		// Prevent the default form submission (page reload)
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const entries = Object.fromEntries(formData.entries());

		const body: Record<string, unknown> = { ...entries };

		if (providerIdpData == undefined) {
			/* CREATE */
			try {
				const structuredBody = {
					idp_id: body['idp[id]'],
					overrides: body,
				};

				const apiResponse = await fetch(`/api/providers/${id}/idps`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(structuredBody),
				});

				const jsonResponse = await apiResponse.json();

				if (jsonResponse == null) {
					setShowProviderIdpModal(false);
					router.refresh();
					toaster.success('IDP connected successfully');
				}

				//PrintFormErrors(jsonResponse);
			} catch (err) {
				console.error('API Error:', err);
			} finally {
				return;
			}
		} else {
			/* UPDATE */
			try {
				const apiResponse = await fetch(
					`/api/providers/${id}/idps/${providerIdpData.idp_id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					}
				);

				const jsonResponse = await apiResponse;

				if (jsonResponse.ok) {
					setShowProviderIdpModal(false);
					setProviderIdpData(undefined);
					router.refresh();
					toaster.success('Connected IDP updated successfully');
				}

				//PrintFormErrors(jsonResponse);
			} catch (err) {
				console.error('API Error:', err);
			} finally {
				return;
			}
		}
	};

	const deleteProviderIdp = async (): Promise<void> => {
		try {
			const apiResponse = await fetch(
				`/api/providers/${id}/idps/${providerIdpData?.idp_id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const jsonResponse = await apiResponse; //.json();

			if (jsonResponse.ok) {
				setShowProviderIdpDeleteModal(false);
				router.refresh();
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

	/* Region */
	const [showProviderRegionModal, setShowProviderRegionModal] =
		useState(false);
	const [showProviderRegionDeleteModal, setShowProviderRegionDeleteModal] =
		useState(false);
	const [providerRegionData, setProviderRegionData] = useState<
		providerRegionProps | undefined
	>();

	const connectProviderRegion = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		// Prevent the default form submission (page reload)
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const entries = Object.fromEntries(formData.entries());

		const body: Record<string, unknown> = { ...entries };

		if (providerRegionData == undefined) {
			/* CREATE */
			try {
				const apiResponse = await fetch(
					`/api/providers/${id}/regions`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					}
				);

				const jsonResponse = await apiResponse;

				if (jsonResponse.ok) {
					setShowProviderRegionModal(false);
					router.refresh();
					toaster.success('Region created successfully');
				}
			} catch (err) {
				console.error('API Error:', err);
			} finally {
				return;
			}
		} else {
			/* UPDATE */
			try {
				const apiResponse = await fetch(
					`/api/providers/${id}/regions/${providerRegionData.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					}
				);

				const jsonResponse = await apiResponse;

				if (jsonResponse.ok) {
					setShowProviderRegionModal(false);
					setProviderRegionData(undefined);
					router.refresh();
					toaster.success('Region updated successfully');
				}
			} catch (err) {
				console.error('API Error:', err);
			} finally {
				return;
			}
		}
	};

	const deleteProviderRegion = async (): Promise<void> => {
		try {
			const apiResponse = await fetch(
				`/api/providers/${id}/regions/${providerRegionData?.id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const jsonResponse = await apiResponse;

			if (jsonResponse.ok) {
				setShowProviderRegionDeleteModal(false);
				router.refresh();
				toaster.success('Region deleted successfully');
			} else {
				toaster.error(
					'Error deleting region',
					'Some error occurred while deleting the region. Please try again.'
				);
			}
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

	/* Project */
	const [showProviderProjectModal, setShowProviderProjectModal] =
		useState(false);
	const [showProviderProjectDeleteModal, setShowProviderProjectDeleteModal] =
		useState(false);
	const [providerProjectData, setProviderProjectData] = useState<
		providerProjectProps | undefined
	>();

	const connectProviderProject = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		// Prevent the default form submission (page reload)
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const entries = Object.fromEntries(formData.entries());

		const body: Record<string, unknown> = { ...entries };

		if (providerProjectData == undefined) {
			/* CREATE */
			try {
				const apiResponse = await fetch(
					`/api/providers/${id}/projects`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					}
				);

				const jsonResponse = await apiResponse.json();

				if (apiResponse.ok) {
					if (jsonResponse.id) {
						if (
							await createProviderProjectRegion(
								jsonResponse.id,
								body
							)
						) {
							setShowProviderProjectModal(false);
							router.refresh();
							toaster.success('Project created successfully');
						}
					}
				}
			} catch (err) {
				console.error('API Error:', err);
			} finally {
				return;
			}
		} else {
			/* UPDATE */
			try {
				const apiResponse = await fetch(
					`/api/providers/${id}/projects/${providerProjectData.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					}
				);

				if (
					apiResponse.ok &&
					(await updateProviderProjectRegion(body))
				) {
					setShowProviderProjectModal(false);
					setProviderProjectData(undefined);
					router.refresh();
					toaster.success('Project updated successfully');
				}
			} catch (err) {
				console.error('API Error:', err);
			} finally {
				return;
			}
		}
	};

	const deleteProviderProject = async (): Promise<void> => {
		try {
			if (await deleteProviderProjectRegion()) {
				const apiResponse = await fetch(
					`/api/providers/${id}/projects/${providerProjectData?.id}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				const jsonResponse = await apiResponse;

				if (jsonResponse.ok) {
					setShowProviderProjectDeleteModal(false);
					router.refresh();
					toaster.success('Project deleted successfully');
				} else {
					toaster.error(
						'Error deleting project',
						'Some error occurred while deleting the project. Please try again.'
					);
				}
			}
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

	async function createProviderProjectRegion(
		projectId: string,
		data: Record<string, unknown>
	) {
		const body = {
			region_id: data['region_id[id]'],
			overrides: {
				default_public_net: data.default_public_net,
				default_private_net: data.default_private_net,
				private_net_proxy_host: data.private_net_proxy_host,
				private_net_proxy_user: data.private_net_proxy_user,
			},
		};

		const apiResponse = await fetch(
			`/api/providers/${id}/projects/${projectId}/regions`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);

		if (apiResponse.ok) return true;

		return false;
	}

	async function updateProviderProjectRegion(data: Record<string, unknown>) {
		const body = {
			default_public_net: data.default_public_net,
			default_private_net: data.default_private_net,
			private_net_proxy_host: data.private_net_proxy_host,
			private_net_proxy_user: data.private_net_proxy_user,
		};

		const apiResponse = await fetch(
			`/api/providers/${id}/projects/${providerProjectData?.id}/regions/${providerProjectData?.region.region_id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);

		if (apiResponse.ok) return true;

		return false;
	}

	async function deleteProviderProjectRegion() {
		const apiResponse = await fetch(
			`/api/providers/${id}/projects/${providerProjectData?.id}/regions/${providerProjectData?.region.region_id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (apiResponse.ok) return true;

		return false;
	}

	/* Submit */
	async function submitProvider() {
		if (
			currentPage + 1 != TOTAL_PAGES ||
			providerIdps.length == 0 ||
			providerRegions.length == 0 ||
			providerProjects.length == 0
		)
			return;

		try {
			const apiResponse = await fetch(`/api/providers/${id}/submit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (apiResponse.ok) {
				toaster.success('Provider submitted successfully');
				router.push('/providers/' + id);
			}
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	}

	/* Provider */
	const [showProviderModal, setShowProviderModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const editProvider = async (
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
			const apiResponse = await fetch(`/api/providers/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (apiResponse.ok) {
				setShowProviderModal(false);
				router.refresh();
				toaster.success('Provider edited successfully');
			}

			//PrintFormErrors(jsonResponse);
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			return;
		}
	};

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

	const assignProvider = async (): Promise<void> => {
		try {
			const apiResponse = await fetch(`/api/providers/${id}/testers`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: userId }),
			});

			if (apiResponse.ok) {
				router.refresh();
				toaster.success('Provider assigned successfully');
			} else {
				toaster.error(
					'Error assigning Provider',
					'Some error occurred while assigning the provider. Please try again.'
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
			{provider.tester_name != '' && (
				<div className='flex items-center'>
					Assigned to:
					<UserIcon className='size-4 mr-1 ml-4' />
					<b>{provider.tester_name}</b>
				</div>
			)}

			{userRoles.includes('site-admin') && (
				<div className='flex flex-col md:flex-row gap-4 mt-8'>
					<Button
						className='w-full md:w-1/2 btn btn-secondary'
						onClick={() => {
							setShowProviderModal(true);
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
			)}

			{provider.status > 1 && userRoles.includes('site-tester') && (
				<div className='flex flex-col md:flex-row gap-4 mt-8'>
					{provider.tester_name == '' && (
						<Button
							className='w-full md:w-max btn btn-secondary'
							onClick={() => {
								assignProvider();
							}}
						>
							<UserPlusIcon className='size-4' />
							Assign to me
						</Button>
					)}
					<Button className='w-full md:w-max btn btn-primary'>
						<PlayIcon className='size-4' />
						Start Tests
					</Button>
				</div>
			)}

			{/* If provider is in status DRAFT */}
			{provider.status == 0 && (
				<>
					<div className='flex justify-center relative'>
						<Stepper
							currentPage={currentPage}
							totalPages={TOTAL_PAGES}
							className='absolute -left-20 top-20'
						/>
						<Carousel
							selectedIndex={currentPage}
							className='w-full'
						>
							<CarouselList>
								<CarouselTab>STEP 1</CarouselTab>
								<CarouselTab>STEP 2</CarouselTab>
								<CarouselTab>STEP 3</CarouselTab>
								<CarouselTab>STEP 4</CarouselTab>
							</CarouselList>
							<CarouselPanels>
								{/* STEP 1 - IDP */}
								<CarouselPanel>
									<div className='w-full mt-12 mb-8'>
										<div className='flex flex-col md:flex-row justify-between items-center'>
											<div className='flex flex-col w-full lg:w-7/10 mb-2'>
												<span className='text-sm uppercase font-bold text-infn/50 lg:w-full'>
													step 1
												</span>
												<span className='text-xl font-bold lg:w-full lg:truncate'>
													Connect at least one
													identity provider
												</span>
											</div>

											<Button
												className='btn btn-secondary w-full md:w-auto lg:mt-0'
												onClick={() => {
													setProviderIdpData(
														undefined
													);
													setShowProviderIdpModal(
														true
													);
												}}
											>
												<PlusIcon className='size-4' />
												Connect IDP
											</Button>
										</div>
									</div>
									<ProviderIdpTable />
								</CarouselPanel>

								{/* STEP 2 - Region */}
								<CarouselPanel>
									<div className='w-full mt-12 mb-8'>
										<div className='flex flex-col md:flex-row justify-between items-center'>
											<div className='flex flex-col w-full lg:w-7/10 mb-2'>
												<span className='text-sm uppercase font-bold text-infn/50 lg:w-full'>
													step 2
												</span>
												<span className='text-xl font-bold lg:w-full lg:truncate'>
													Add at least one region
												</span>
											</div>

											<Button
												className='btn btn-secondary w-full md:w-auto lg:mt-0'
												onClick={() => {
													setProviderRegionData(
														undefined
													);
													setShowProviderRegionModal(
														true
													);
												}}
											>
												<PlusIcon className='size-4' />
												Add Region
											</Button>
										</div>
									</div>
									<ProviderRegionTable />
								</CarouselPanel>

								{/* STEP 3 - Project */}
								<CarouselPanel>
									<div className='w-full mt-12 mb-8'>
										<div className='flex flex-col md:flex-row justify-between items-center'>
											<div className='flex flex-col w-full lg:w-7/10 mb-2'>
												<span className='text-sm uppercase font-bold text-infn/50 lg:w-full'>
													step 3
												</span>
												<span className='text-xl font-bold lg:w-full lg:truncate'>
													Add at least one project
												</span>
											</div>

											<Button
												className='btn btn-secondary w-full md:w-auto lg:mt-0'
												onClick={() => {
													setProviderProjectData(
														undefined
													);
													setShowProviderProjectModal(
														true
													);
												}}
											>
												<PlusIcon className='size-4' />
												Add Project
											</Button>
										</div>
									</div>
									<ProviderProjectTable />
								</CarouselPanel>

								{/* STEP 4 */}
								<CarouselPanel>
									<div className='w-full mt-12 mb-8'>
										<div className='flex flex-col md:flex-row justify-between items-center'>
											<div className='flex flex-col w-full lg:w-7/10 mb-2'>
												<span className='text-sm uppercase font-bold text-infn/50 lg:w-full'>
													step 4
												</span>
												<span className='text-xl font-bold lg:w-full lg:truncate'>
													Check everything and submit
													the request
												</span>
											</div>
										</div>
									</div>

									<ProviderBody />
								</CarouselPanel>
							</CarouselPanels>

							{/* NAVIGATION */}
							<CarouselNavigator
								currentPage={currentPage}
								totalPages={TOTAL_PAGES}
								onBack={back}
								onNext={next}
								backButtonTitle='Back'
								nextButtonTitle={
									currentPage === TOTAL_PAGES - 1
										? 'Submit'
										: 'Next'
								}
								backButtonDisabled={currentPage === 0}
								nextButtonDisabled={
									(currentPage == 0 &&
										providerIdps.length == 0) ||
									(currentPage == 1 &&
										providerRegions.length == 0) ||
									(currentPage == 2 &&
										providerProjects.length == 0)
								}
								className='mt-8'
							/>
						</Carousel>
					</div>
				</>
			)}

			{/* If provider is in status SUBMITTED */}
			{provider.status == 1 && (
				<>
					<div className='w-full mt-12 mb-8 p-8 bg-gray/10 rounded-3xl flex flex-row text-sm'>
						{/* <ClockIcon className='w-6 mr-2 opacity-30' /> */}
						<div>
							<h3 className='mb-4 flex'>
								The provider has been submitted
							</h3>
							<div>
								The provider has been successfully submitted and
								is now awaiting the next step. The SLA Manager
								must connect the SLA in order to proceed with
								the process.
							</div>
						</div>
					</div>

					<ProviderBody />
				</>
			)}

			{/* If provider is in status READY */}
			{provider.status == 2 && (
				<>
					{!userRoles.includes('site-tester') && (
						<div className='w-full mt-12 mb-8 p-8 bg-gray/10 rounded-3xl flex flex-row text-sm'>
							{/* <ClockIcon className='w-6 mr-2 opacity-30' /> */}
							<div>
								<h3 className='mb-4 flex'>
									The provider is ready for testing
								</h3>
								<div>
									The provider setup has been successfully
									completed and is now ready for validation.
									Both manual and automated tests will be
									conducted by the site tester to ensure
									everything is working as expected.
									<br />
									You will receive a notification once all
									tests have been completed.
								</div>
							</div>
						</div>
					)}

					<ProviderBody />
				</>
			)}

			{/* Edit Provider Modal */}
			<Modal
				show={showProviderModal}
				onClose={() => {
					setShowProviderModal(false);
				}}
				title={
					<div className='flex items-center'>
						<PencilIcon className='size-8' />
						&nbsp;Edit Provider
					</div>
				}
			>
				<ModalBody>
					<Form onSubmit={editProvider}>
						<ProviderForm userId={userId} item={provider} />
						<div className='flex justify-between w-full pt-4'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setShowProviderModal(false);
								}}
							>
								Close
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
					Are you sure you want to delete the <b>{provider.name}</b>{' '}
					provider? This action is irreversible and you will not be
					able to retrieve your provider anymore.
				</p>
			</ConfirmModal>

			{/* IDP */}
			<ProviderIdpModal />

			{/* IDP Delete modal */}
			<ConfirmModal
				onConfirm={() => {
					deleteProviderIdp();
				}}
				onClose={() => {
					setShowProviderIdpDeleteModal(false);
				}}
				confirmButtonText='Yes, delete'
				cancelButtonText='Cancel'
				show={showProviderIdpDeleteModal}
				title={`Delete ${providerIdpData?.overrides.name}`}
				danger={true}
			>
				<p>
					Are you sure you want to delete the{' '}
					<b>{providerIdpData?.overrides.name}</b> IDP? This action is
					irreversible and you will not be able to retrieve your IDP
					anymore.
				</p>
			</ConfirmModal>

			{/* Region */}
			<ProviderRegionModal />

			{/* Region Delete modal */}
			<ConfirmModal
				onConfirm={() => {
					deleteProviderRegion();
				}}
				onClose={() => {
					setShowProviderRegionDeleteModal(false);
				}}
				confirmButtonText='Yes, delete'
				cancelButtonText='Cancel'
				show={showProviderRegionDeleteModal}
				title={`Delete ${providerRegionData?.name}`}
				danger={true}
			>
				<p>
					Are you sure you want to delete the{' '}
					<b>{providerRegionData?.name}</b> region? This action is
					irreversible and you will not be able to retrieve your
					region anymore.
				</p>
			</ConfirmModal>

			{/* Project */}
			<ProviderProjectModal />

			{/* Project Delete modal */}
			<ConfirmModal
				onConfirm={() => {
					deleteProviderProject();
				}}
				onClose={() => {
					setShowProviderProjectDeleteModal(false);
				}}
				confirmButtonText='Yes, delete'
				cancelButtonText='Cancel'
				show={showProviderProjectDeleteModal}
				title={`Delete ${providerProjectData?.name}`}
				danger={true}
			>
				<p>
					Are you sure you want to delete the{' '}
					<b>{providerProjectData?.name}</b> project? This action is
					irreversible and you will not be able to retrieve your
					project anymore.
				</p>
			</ConfirmModal>
		</>
	);

	/* IDP */
	function editProviderIdp(item: providerIdpProps) {
		setProviderIdpData(item);
		setShowProviderIdpModal(true);
	}

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
								</div>
								{userRoles.includes('site-admin') && (
									<div className='flex flex-col'>
										<Options>
											<Option
												onClick={() => {
													editProviderIdp(row);
												}}
											>
												<div className='flex items-center'>
													<PencilIcon className='size-4' />
													&nbsp;Edit
												</div>
											</Option>

											{provider.status != 2 ||
												(provider.status == 2 &&
													providerIdps.length > 1 && (
														<Option
															data-danger={true}
															onClick={() => {
																setProviderIdpData(
																	row
																);
																setShowProviderIdpDeleteModal(
																	true
																);
															}}
														>
															<div className='flex items-center'>
																<TrashIcon className='size-4' />
																&nbsp;Delete
															</div>
														</Option>
													))}
										</Options>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</>
		);
	}

	function ProviderIdpModal() {
		return (
			<>
				<Modal
					show={showProviderIdpModal}
					onClose={() => {
						setShowProviderIdpModal(false);
						setProviderIdpData(undefined);
					}}
					title={
						<div className='flex items-center'>
							<IdentificationIcon className='size-8' />
							&nbsp;
							{providerIdpData ? 'Edit' : 'Add New'} identity
							provider
						</div>
					}
				>
					<ModalBody>
						<Form onSubmit={connectProviderIdp}>
							{idps.length == 0 ? (
								<p>
									No identity providers available. Please ask
									your <b>SLA Manager</b> to add at least one
									identity provider.
								</p>
							) : (
								<ProviderIdpForm />
							)}
							<div className='flex justify-between w-full'>
								<Button
									className='btn btn-bold btn-danger'
									onClick={() => {
										setShowProviderIdpModal(false);
										setProviderIdpData(undefined);
									}}
								>
									Cancel
								</Button>
								{idps.length != 0 && (
									<Button
										className='btn btn-bold btn-primary'
										type='submit'
									>
										Save
									</Button>
								)}
							</div>
						</Form>
					</ModalBody>
				</Modal>
			</>
		);
	}

	function ProviderIdpForm() {
		const selectedIdp = providerIdpData?.idp_id
			? idps.filter((idp) => {
					return idp.id == providerIdpData?.idp_id;
			  })[0]
			: idps[0];

		return (
			<>
				<Field hidden={providerIdpData?.idp_id ? true : false}>
					<Select
						label='IDP'
						name='idp'
						defaultValue={{
							id: selectedIdp.id,
							name: selectedIdp.name,
						}}
					>
						{idps.map((providerIdpData, index) => {
							return (
								<SelectOption
									key={index}
									value={{
										id: providerIdpData.id,
										name: providerIdpData.name,
									}}
								>
									{providerIdpData.name}
								</SelectOption>
							);
						})}
					</Select>
				</Field>
				<Field>
					<Input
						label='Name'
						name='name'
						placeholder='My name'
						defaultValue={providerIdpData?.overrides.name}
					/>
				</Field>
				<Field>
					<Input
						label='Protocol'
						name='protocol'
						placeholder='openid'
						defaultValue={providerIdpData?.overrides.protocol}
					/>
				</Field>
				<Field>
					<Input
						label='Audience'
						name='audience'
						placeholder='my-aud'
						defaultValue={providerIdpData?.overrides.audience}
					/>
				</Field>
				<Field>
					<Input
						label='Groups claim'
						name='groups_claim'
						placeholder='my-group'
						defaultValue={providerIdpData?.overrides.groups_claim}
					/>
				</Field>
			</>
		);
	}

	/* Region */
	function editProviderRegion(item: providerRegionProps) {
		setProviderRegionData(item);
		setShowProviderRegionModal(true);
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

								{userRoles.includes('site-admin') && (
									<div className='flex flex-col'>
										<Options>
											<Option
												onClick={() => {
													editProviderRegion(row);
												}}
											>
												<div className='flex items-center'>
													<PencilIcon className='size-4' />
													&nbsp;Edit
												</div>
											</Option>
											{provider.status != 2 ||
												(provider.status == 2 &&
													providerRegions.length >
														1 && (
														<Option
															data-danger={true}
															onClick={() => {
																setProviderRegionData(
																	row
																);
																setShowProviderRegionDeleteModal(
																	true
																);
															}}
														>
															<div className='flex items-center'>
																<TrashIcon className='size-4' />
																&nbsp;Delete
															</div>
														</Option>
													))}
										</Options>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</>
		);
	}

	function ProviderRegionModal() {
		return (
			<>
				<Modal
					show={showProviderRegionModal}
					onClose={() => {
						setShowProviderRegionModal(false);
					}}
					title={
						<div className='flex items-center'>
							<MapIcon className='size-8' />
							&nbsp;
							{providerRegionData ? 'Edit' : 'Add New'} region
						</div>
					}
				>
					<ModalBody>
						<Form onSubmit={connectProviderRegion}>
							<ProviderRegionForm />
							<div className='flex justify-between w-full'>
								<Button
									className='btn btn-bold btn-danger'
									onClick={() => {
										setShowProviderRegionModal(false);
										setProviderRegionData(undefined);
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

	function ProviderRegionForm() {
		return (
			<>
				<Field>
					<Input
						label='Name'
						name='name'
						placeholder='My name'
						required
						defaultValue={providerRegionData?.name}
					/>
				</Field>
				<Field>
					<Input
						label='Description'
						name='description'
						placeholder='My desc'
						defaultValue={providerRegionData?.description}
					/>
				</Field>
				<Field>
					<Input
						label='Overbooking CPU'
						name='overbooking_cpu'
						placeholder='1'
						type='number'
						required
						defaultValue={providerRegionData?.overbooking_cpu || 1}
					/>
				</Field>
				<Field>
					<Input
						label='Overbooking RAM'
						name='overbooking_ram'
						placeholder='1'
						type='number'
						required
						defaultValue={providerRegionData?.overbooking_ram || 1}
					/>
				</Field>
				<Field>
					<Input
						label='Bandwidth IN'
						name='bandwidth_in'
						placeholder='10'
						type='number'
						required
						defaultValue={providerRegionData?.bandwidth_in || 10}
					/>
				</Field>
				<Field>
					<Input
						label='Bandwidth OUT'
						name='bandwidth_out'
						placeholder='10'
						type='number'
						required
						defaultValue={providerRegionData?.bandwidth_out || 10}
					/>
				</Field>
			</>
		);
	}

	/* Project */
	function editProviderProject(item: providerProjectProps) {
		setProviderProjectData(item);
		setShowProviderProjectModal(true);
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

								{userRoles.includes('site-admin') && (
									<div className='flex flex-col'>
										<Options>
											<Option
												onClick={() => {
													editProviderProject(row);
												}}
											>
												<div className='flex items-center'>
													<PencilIcon className='size-4' />
													&nbsp;Edit
												</div>
											</Option>
											{provider.status != 2 ||
												(provider.status == 2 &&
													providerProjects.length >
														1 && (
														<Option
															data-danger={true}
															onClick={() => {
																setProviderProjectData(
																	row
																);
																setShowProviderProjectDeleteModal(
																	true
																);
															}}
														>
															<div className='flex items-center'>
																<TrashIcon className='size-4' />
																&nbsp;Delete
															</div>
														</Option>
													))}
										</Options>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</>
		);
	}

	function ProviderProjectModal() {
		return (
			<>
				<Modal
					show={showProviderProjectModal}
					onClose={() => {
						setShowProviderProjectModal(false);
					}}
					title={
						<div className='flex items-center'>
							<MapIcon className='size-8' />
							&nbsp;
							{providerProjectData ? 'Edit' : 'Add New'} project
						</div>
					}
				>
					<ModalBody>
						<Form onSubmit={connectProviderProject}>
							<ProviderProjectForm />
							<div className='flex justify-between w-full'>
								<Button
									className='btn btn-bold btn-danger'
									onClick={() => {
										setShowProviderProjectModal(false);
										setProviderProjectData(undefined);
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

	function ProviderProjectForm() {
		const canBeRoot =
			providerProjects.filter((item) => {
				return item.is_root == true;
			}).length == 0;

		const selectedRegion = providerProjectData?.region.region_id
			? providerRegions.filter((region) => {
					return region.id == providerProjectData?.region.region_id;
			  })[0]
			: providerRegions[0];

		return (
			<>
				<Field>
					<Input
						label='Name'
						name='name'
						placeholder='My name'
						required
						defaultValue={providerProjectData?.name}
					/>
				</Field>
				<Field>
					<Input
						label='Description'
						name='description'
						placeholder='My desc'
						defaultValue={providerProjectData?.description}
					/>
				</Field>
				<Field>
					<Input
						label='IAAS Project ID'
						name='iaas_project_id'
						placeholder='xxxx-xxxx-xxxx-xxxx'
						defaultValue={providerProjectData?.iaas_project_id}
						required
					/>
				</Field>
				{canBeRoot || providerProjectData?.is_root ? (
					<Field className='flex items-center'>
						<Checkbox
							id='is_root'
							name='is_root'
							defaultChecked={providerProjectData?.is_root}
						/>
						<Label>Is Root</Label>
					</Field>
				) : (
					''
				)}
				<Field hidden={providerProjectData != undefined}>
					<Select
						label='Region'
						name='region_id'
						defaultValue={{
							id: selectedRegion.id,
							name: selectedRegion.name,
						}}
					>
						{providerRegions.map((region, index) => {
							return (
								<SelectOption
									key={index}
									value={{
										id: region.id,
										name: region.name,
									}}
								>
									{region.name}
								</SelectOption>
							);
						})}
					</Select>
				</Field>
				<Field>
					<Input
						label='Default public net'
						name='default_public_net'
						placeholder='public-net-eu-west-1'
						defaultValue={
							providerProjectData?.region?.overrides
								?.default_public_net
						}
					></Input>
				</Field>
				<Field>
					<Input
						label='Default private net'
						name='default_private_net'
						placeholder='private-net-eu-west-1'
						defaultValue={
							providerProjectData?.region?.overrides
								?.default_private_net
						}
					></Input>
				</Field>
				<Field>
					<Input
						label='Private net proxy host'
						name='private_net_proxy_host'
						placeholder='proxy.internal.company.com'
						defaultValue={
							providerProjectData?.region?.overrides
								?.private_net_proxy_host
						}
					></Input>
				</Field>
				<Field>
					<Input
						label='Private net proxy user'
						name='private_net_proxy_user'
						placeholder='proxyuser'
						defaultValue={
							providerProjectData?.region?.overrides
								?.private_net_proxy_user
						}
					></Input>
				</Field>
			</>
		);
	}

	function ProviderBody() {
		return (
			<>
				{/* IDP */}
				<div className='w-full mt-12 mb-8'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
						<div className='flex items-center font-black uppercase'>
							<IdentificationIcon className='size-6' />
							&nbsp;Identity Providers
						</div>

						{userRoles.includes('site-admin') && (
							<Button
								className='btn btn-secondary w-full md:w-auto lg:mt-0'
								onClick={() => {
									setProviderIdpData(undefined);
									setShowProviderIdpModal(true);
								}}
							>
								<PlusIcon className='size-4' />
								Connect IDP
							</Button>
						)}
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

						{userRoles.includes('site-admin') && (
							<Button
								className='btn btn-secondary w-full md:w-auto lg:mt-0'
								onClick={() => {
									setProviderRegionData(undefined);
									setShowProviderRegionModal(true);
								}}
							>
								<PlusIcon className='size-4' />
								Add Region
							</Button>
						)}
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

						{userRoles.includes('site-admin') && (
							<Button
								className='btn btn-secondary w-full md:w-auto lg:mt-0'
								onClick={() => {
									setProviderProjectData(undefined);
									setShowProviderProjectModal(true);
								}}
							>
								<PlusIcon className='size-4' />
								Add Project
							</Button>
						)}
					</div>
				</div>
				<ProviderProjectTable />
			</>
		);
	}

	function getCurrentPage() {
		switch (true) {
			case providerIdps.length == 0:
				return 0;
			case providerRegions.length == 0:
				return 1;
			case providerProjects.length == 0:
				return 2;
			default:
				return 3;
		}
	}
}
