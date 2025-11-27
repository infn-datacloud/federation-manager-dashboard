import ProjectsList from './projectList';
import Link from '@/components/link';
import SlaDetail from './slaDetail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';
import {
	CalendarDaysIcon,
	DocumentDuplicateIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { JSX, Suspense } from 'react';
import { LoadingDetail, LoadingList } from './loading';

type IdpPageProps = {
	params: Promise<{
		idpId: string;
		userGroupId: string;
		slaId: string;
	}>;
};

type SlaProps = {
	id: string;
	name: string;
	description: string;
	url: string;
	start_date: string;
	end_date: string;
};

export default async function Sla(props: Readonly<IdpPageProps>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />;
	}

	const { idpId, userGroupId, slaId } = await props.params;

	const sla = await getSla(idpId, userGroupId, slaId);

	return (
		<>
			<div className='mb-2'>
				<Link href='/idps' className='opacity-50 hover:opacity-80'>
					Identity Providers
				</Link>
				<span className='opacity-50'>{' > '}</span>
				<Link href='../../../' className='opacity-50 hover:opacity-80'>
					Identity Provider
				</Link>
				<span className='opacity-50'>{' > '}</span>
				<Link href='../' className='opacity-50 hover:opacity-80'>
					User Group
				</Link>
				<span className='opacity-50'>
					{' > '}
					Sla
				</span>
			</div>

			<h1 className='mb-6 flex items-center'>
				<DocumentDuplicateIcon className='size-10 mr-4' />
				SLA
			</h1>

			<Suspense fallback={<LoadingDetail />}>
				<Detail
					idpId={idpId}
					userGroupId={userGroupId}
					slaId={slaId}
					sla={sla}
				/>
			</Suspense>
			<Suspense fallback={<LoadingList />}>
				<List
					idpId={idpId}
					userGroupId={userGroupId}
					slaId={slaId}
					sla={sla}
				/>
			</Suspense>
		</>
	);
}

async function Detail({
	sla,
}: {
	idpId: string;
	userGroupId: string;
	slaId: string;
	sla: SlaProps;
}) {
	return (
		<>
			<h2>{sla.name}</h2>
			<Link href={sla.url} target='_blank'>
				<div className='mt-2 opacity-50 underline'>{sla.url}</div>
			</Link>
			<div className='mt-4 text-justify'>{sla.description}</div>
			<div className='mt-4 flex flex-col'>
				<div className='flex items-center'>
					<CalendarDaysIcon className='inline size-5 mr-2' />
					<div className='w-16 font-bold'>Start</div>
					{new Date(sla.start_date).toLocaleDateString('it-IT')}
				</div>
				<div className='flex items-center'>
					<CalendarDaysIcon className='inline size-5 mr-2' />
					<div className='w-16 font-bold'>End</div>
					{new Date(sla.end_date).toLocaleDateString('it-IT')}
				</div>

				<div className='text-sm text-gray-500 mt-1'>
					{getRemainingTime(sla.end_date)}
				</div>
			</div>
			<SlaDetail item={sla} />
		</>
	);
}

async function List({
	idpId,
	userGroupId,
	slaId,
	sla,
}: {
	idpId: string;
	userGroupId: string;
	slaId: string;
	sla: SlaProps;
}) {
	const slaProjects = await getSlaProjects(idpId, userGroupId, slaId);
	const projects = await getProjects();

	return (
		<ProjectsList
			slaProjects={slaProjects}
			projects={projects}
			endDate={sla.end_date}
		/>
	);
}

async function getSla(idpId: string, userGroupId: string, slaId: string) {
	const url = `${process.env.FM_ENDPOINT_URL}/api/ssr/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.statusText;
		throw new Error(`Failed to fetch the sla: ${errorText}`);
	}

	const data = await apiResponse.json();

	return data;
}

async function getSlaProjects(
	idpId: string,
	userGroupId: string,
	slaId: string
) {
	const url = `${process.env.FM_ENDPOINT_URL}/api/ssr/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}/projects`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.text();
		throw new Error(`Failed to fetch the projects: ${errorText}`);
	}

	const data = await apiResponse.json();

	return data.data;
}

async function getProjects() {
	const url = `${process.env.FM_ENDPOINT_URL}/api/ssr/providers`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.text();
		throw new Error(`Failed to fetch the projects: ${errorText}`);
	}

	const data = await apiResponse.json();
	const projects = [];

	for (const item of data.data) {
		// Excludes DRAFT, DEPRECATED and REMOVED
		if (![0, 6, 7].includes(item.status)) {
			const providerProjects = await getProjectByProvider(item.id);

			for (const proj of providerProjects) {
				proj.provider_name = item.name;
			}

			projects.push(...providerProjects);
		}
	}

	return projects;
}

async function getProjectByProvider(providerId: string) {
	const url = `${process.env.FM_ENDPOINT_URL}/api/ssr/providers/${providerId}/projects`;

	const apiResponse = await fetch(url, {
		method: 'GET',
		headers: await headers(),
	});

	if (!apiResponse.ok) {
		const errorText = await apiResponse.text();
		throw new Error(`Failed to fetch the project details: ${errorText}`);
	}

	const data = await apiResponse.json();

	return data.data;
}

function getRemainingTime(endDate: string | Date): string | JSX.Element {
	const now = new Date();
	const end = new Date(endDate);

	const diff = end.getTime() - now.getTime();

	if (diff <= 0)
		return (
			<div className='text-white bg-danger/80 rounded-md px-6 py-4 mt-4'>
				<div className='flex items-center mb-1'>
					<ExclamationTriangleIcon className='size-4 mr-1' />
					<div className='font-bold'>SLA Expired</div>
				</div>
				<div>
					This SLA can no longer be associated with any project, as it
					expired on {end.toLocaleDateString('it-IT')}.
				</div>
			</div>
		);

	const oneDay = 1000 * 60 * 60 * 24;
	const daysTotal = diff / oneDay;

	// If it's between 0 and <1 day → return 1d
	if (daysTotal < 1) return '1d';

	const fullDays = Math.floor(daysTotal);

	const years = Math.floor(fullDays / 365);
	const months = Math.floor((fullDays % 365) / 30);
	const days = fullDays % 30;

	const result: string[] = [];
	if (years) result.push(`${years} years`);
	if (months) result.push(`${months} months`);
	if (days) result.push(`${days} days`);

	return result.join(', ') + ' remaining';
}
