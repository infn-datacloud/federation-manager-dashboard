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
import { Input, InputList } from '@/components/inputs';
import {
	IdentificationIcon,
	MapIcon,
	ClipboardDocumentIcon,
	TrashIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';
import ProjectsTable from './tables/projects';
import { toaster } from '@/components/toaster';
import { useParams, useRouter } from 'next/navigation';
import { Options, Option } from '@/components/options';
import ConfirmModal from '@/components/confirm-modal';

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

export default function ProviderCarousel(props: {
	idps: idpsProps;
	providerIdps: providerIdpsProps;
	providerRegions: providerRegionsProps;
}) {
	const router = useRouter();

	const { providerIdps, providerRegions, idps } = props;

	const params = useParams();
	const { id } = params;

	/* Navigator */
	const TOTAL_PAGES = 4;
	const [currentPage, setCurrentPage] = useState(0);
	const back = () => setCurrentPage(Math.max(0, currentPage - 1));
	const next = () =>
		setCurrentPage(Math.min(currentPage + 1, TOTAL_PAGES - 1));

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
				const apiResponse = await fetch(`/api/providers/${id}/regions`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				});

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

	const [newProjectModal, setNewProjectModal] = useState(false);

	return (
		<div className='flex justify-center relative'>
			<Stepper
				currentPage={currentPage}
				totalPages={TOTAL_PAGES}
				className='absolute -left-20 top-20'
			/>
			<Carousel selectedIndex={currentPage} className='w-full'>
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
										Connect at least one identity provider
									</span>
								</div>

								<Button
									className='btn btn-secondary w-full md:w-auto lg:mt-0'
									onClick={() => {
										setProviderIdpData(undefined);
										setShowProviderIdpModal(true);
									}}
								>
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
										setProviderRegionData(undefined);
										setShowProviderRegionModal(true);
									}}
								>
									Add Region
								</Button>
							</div>
						</div>
						<ProviderRegionTable />
					</CarouselPanel>

					{/* STEP 3 */}
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
										setNewProjectModal(true);
									}}
								>
									Add Project
								</Button>
							</div>
						</div>
						<ProjectsTable />
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
										Check everything and submit the request
									</span>
								</div>
							</div>
						</div>

						{/* IDP */}
						<div className='w-full mt-12 mb-8'>
							<div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
								<div className='flex items-center font-black uppercase'>
									<IdentificationIcon className='size-6' />
									&nbsp;Identity Providers
								</div>

								<Button
									className='btn btn-secondary w-full md:w-auto lg:mt-0'
									onClick={() => {
										setProviderIdpData(undefined);
										setShowProviderIdpModal(true);
									}}
								>
									Connect IDP
								</Button>
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

								<Button
									className='btn btn-secondary w-full md:w-auto lg:mt-0'
									onClick={() => {
										setProviderRegionData(undefined);
										setShowProviderRegionModal(true);
									}}
								>
									Add Region
								</Button>
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

								<Button
									className='btn btn-secondary w-full md:w-auto lg:mt-0'
									onClick={() => {
										setNewProjectModal(true);
									}}
								>
									Add Project
								</Button>
							</div>
						</div>
						<ProjectsTable />
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
						currentPage === TOTAL_PAGES - 1 ? 'Submit' : 'Next'
					}
					backButtonDisabled={currentPage === 0}
					nextButtonDisabled={(currentPage == 0 && providerIdps.length == 0) || (currentPage == 1 && providerRegions.length == 0)}
					className='mt-8'
				/>
			</Carousel>

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
					irreversible and you will not be able to retrieve your region
					anymore.
				</p>
			</ConfirmModal>

			{/* Project Modal */}
			<Modal
				show={newProjectModal}
				onClose={() => {
					setNewProjectModal(false);
				}}
				title={
					<div className='flex items-center'>
						<ClipboardDocumentIcon className='size-8' />
						&nbsp;Add New Project
					</div>
				}
			>
				<ModalBody>
					<Form>
						<Field>
							<Input
								label='Name'
								name='name'
								placeholder='Description'
								required
							/>
						</Field>
						<Field className='flex items-center'>
							<Checkbox id='isRoot' name='isRoot' />
							<Label data-required>Is Root</Label>
						</Field>
						<Field>
							<InputList
								id='regionOverrides'
								name='regionOverrides'
								label='Region Overrides'
								placeholder='Add region override'
								originalItems={[]}
							></InputList>
						</Field>
						<div className='flex justify-between w-full'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setNewProjectModal(false);
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
		</div>
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
										<Option
											data-danger={true}
											onClick={() => {
												setProviderIdpData(row);
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
									</Options>
								</div>
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
							{providerIdpData ? 'Edit' : 'Add New'} identity provider
						</div>
					}
				>
					<ModalBody>
						<Form onSubmit={connectProviderIdp}>
							<ProviderIdpForm />
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
						required
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
										<Option
											data-danger={true}
											onClick={() => {
												setProviderRegionData(row);
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
									</Options>
								</div>
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
}
