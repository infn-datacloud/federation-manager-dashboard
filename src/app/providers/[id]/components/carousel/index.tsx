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
import { useState } from 'react';
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
} from '@heroicons/react/24/solid';
import IdentityProvidersTable from '../tables/identityProviders';
import RegionsTable from '../tables/regions';
import ProjectsTable from '../tables/projects';

export default function ProviderCarousel() {
	const TOTAL_PAGES = 4;

	const [currentPage, setCurrentPage] = useState(0);

	const [newIdentityProviderModal, setNewIdentityProviderModal] =
		useState(false);
	const [newRegionModal, setNewRegionModal] = useState(false);
	const [newProjectModal, setNewProjectModal] = useState(false);

	const back = () => setCurrentPage(Math.max(0, currentPage - 1));
	const next = () =>
		setCurrentPage(Math.min(currentPage + 1, TOTAL_PAGES - 1));

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
					{/* STEP 1 */}
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
										setNewIdentityProviderModal(true);
									}}
								>
									Connect IDP
								</Button>
							</div>
						</div>
						<IdentityProvidersTable
							data={[
								{
									id: '1',
									name: 'Roger Rabbit',
									idp: 'IDP name 1zxv ',
									protocol: 'openiassdd',
								},
								{
									id: '2',
									name: 'Coolest of them all',
									idp: 'IDP',
									protocol: 'opesnid',
								},
								{
									id: '3',
									name: 'Test',
									idp: 'IDP 3',
									protocol: 'id',
								},
							]}
						/>
					</CarouselPanel>

					{/* STEP 2 */}
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
										setNewRegionModal(true);
									}}
								>
									Add Region
								</Button>
							</div>
						</div>
						<RegionsTable
							data={[
								{
									id: '1',
									name: 'INFN Bari',
									country: 'Italia',
									site: 'Istituto di fisica Enrico Fermi',
									latitude: 44.123456,
									longitude: 11.456789,
								},
								{
									id: '2',
									name: 'INFN Bari',
									country: 'Italia',
									site: 'Istituto di fisica Enrico Fermi',
									latitude: 44.123456,
									longitude: 11.456789,
								},
							]}
						/>
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
						<ProjectsTable
							data={[
								{
									id: '1',
									name: 'ReCaS Bari',
									isRoot: true,
									regionOverrides: [
										'92021290-d2a7-48fe-aa4f-9f81737352213',
										'92021290-d2a7-48fe-aa4f-9f81737325223',
										'92021290-d2a7-48fe-aa4f-9f81733735223',
									],
								},
								{
									id: '2',
									name: 'Cygno Experiment',
									isRoot: false,
									regionOverrides: [
										'92021290-d2a7-48fe-aa4f-9f81743735223',
										'92021290-d2a7-48fe-aa4f-9f81753735223',
										'92021290-d2a7-48fe-aa4f-9f81763735223',
										'92021290-d2a7-48fe-aa4f-9f81773735223',
										'92021290-d2a7-48fe-aa4f-9f81783735223',
									],
								},
							]}
						/>
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
							<div className='flex flex-col md:flex-row justify-between items-start'>
								<div className='flex items-center text-2xl font-black uppercase'>
									<IdentificationIcon className='size-8' />
									&nbsp;Identity Providers
								</div>

								<Button
									className='btn btn-secondary w-full md:w-auto lg:mt-0'
									onClick={() => {
										setNewIdentityProviderModal(true);
									}}
								>
									Connect IDP
								</Button>
							</div>
						</div>
						<IdentityProvidersTable
							data={[
								{
									id: '1',
									name: 'Roger Rabbit',
									idp: 'IDP name 1zxv ',
									protocol: 'openiassdd',
								},
								{
									id: '2',
									name: 'Coolest of them all',
									idp: 'IDP',
									protocol: 'opesnid',
								},
								{
									id: '3',
									name: 'Test',
									idp: 'IDP 3',
									protocol: 'id',
								},
							]}
						/>

						{/* Regions */}
						<div className='w-full mt-12 mb-8'>
							<div className='flex flex-col md:flex-row justify-between items-start'>
								<div className='flex items-center text-2xl font-black uppercase'>
									<MapIcon className='size-8' />
									&nbsp;Regions
								</div>

								<Button
									className='btn btn-secondary w-full md:w-auto lg:mt-0'
									onClick={() => {
										setNewRegionModal(true);
									}}
								>
									Add Region
								</Button>
							</div>
						</div>
						<RegionsTable
							data={[
								{
									id: '1',
									name: 'INFN Bari',
									country: 'Italia',
									site: 'Istituto di fisica Enrico Fermi',
									latitude: 44.123456,
									longitude: 11.456789,
								},
								{
									id: '2',
									name: 'INFN Bari',
									country: 'Italia',
									site: 'Istituto di fisica Enrico Fermi',
									latitude: 44.123456,
									longitude: 11.456789,
								},
							]}
						/>

						{/* Projects */}
						<div className='w-full mt-12 mb-8'>
							<div className='flex flex-col md:flex-row justify-between items-start'>
								<div className='flex items-center text-2xl font-black uppercase'>
									<ClipboardDocumentIcon className='size-8' />
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
						<ProjectsTable
							data={[
								{
									id: '1',
									name: 'ReCaS Bari',
									isRoot: true,
									regionOverrides: [
										'92021290-d2a7-48fe-aa4f-9f81737352213',
										'92021290-d2a7-48fe-aa4f-9f81737325223',
										'92021290-d2a7-48fe-aa4f-9f81733735223',
									],
								},
								{
									id: '2',
									name: 'Cygno Experiment',
									isRoot: false,
									regionOverrides: [
										'92021290-d2a7-48fe-aa4f-9f81743735223',
										'92021290-d2a7-48fe-aa4f-9f81753735223',
										'92021290-d2a7-48fe-aa4f-9f81763735223',
										'92021290-d2a7-48fe-aa4f-9f81773735223',
										'92021290-d2a7-48fe-aa4f-9f81783735223',
									],
								},
							]}
						/>
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
					nextButtonDisabled={false}
					className='mt-8'
				/>
			</Carousel>

			{/* IDP Modal */}
			<Modal
				show={newIdentityProviderModal}
				onClose={() => {
					setNewIdentityProviderModal(false);
				}}
				title={
					<div className='flex items-center'>
						<IdentificationIcon className='size-8' />
						&nbsp;Connect Identity Provider
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
						<Field>
							<Input
								label='Protocol'
								name='protocol'
								placeholder='openid'
								required
							/>
						</Field>
						<Field>
							<Select
								label='IDP'
								name='example'
								defaultValue={{
									id: 'option1',
									name: 'Option 1',
								}}
							>
								<SelectOption
									value={{
										id: 'option1',
										name: 'Option 1',
									}}
								>
									Option 1
								</SelectOption>
								<SelectOption
									value={{
										id: 'option2',
										name: 'Option 2',
									}}
								>
									Option 2
								</SelectOption>
								<SelectOption
									value={{
										id: 'option3',
										name: 'Option 3',
									}}
								>
									Option 3
								</SelectOption>
							</Select>
						</Field>
						<div className='flex justify-between w-full'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setNewIdentityProviderModal(false);
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

			{/* Region Modal */}
			<Modal
				show={newRegionModal}
				onClose={() => {
					setNewRegionModal(false);
				}}
				title={
					<div className='flex items-center'>
						<MapIcon className='size-8' />
						&nbsp;Add New Region
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
						<Field>
							<Input
								label='Country'
								name='country'
								placeholder='IT'
								required
							/>
						</Field>
						<Field>
							<Input
								label='Site'
								name='site'
								placeholder='Site name'
								required
							/>
						</Field>
						<div className='flex gap-4'>
							<Field className='w-full'>
								<Input
									label='Latitude'
									name='latitude'
									placeholder='44.123'
									required
								/>
							</Field>
							<Field className='w-full'>
								<Input
									label='Longitude'
									name='longitude'
									placeholder='11.456'
									required
								/>
							</Field>
						</div>
						<div className='flex justify-between w-full'>
							<Button
								className='btn btn-bold btn-danger'
								onClick={() => {
									setNewRegionModal(false);
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
}
