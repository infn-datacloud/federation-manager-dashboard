import ProjectsList from './projectList';
import Link from '@/components/link';
import SlaDetail from './slaDetail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { Suspense } from 'react';
import { LoadingDetail, LoadingList } from './loading';

type IdpPageProps = {
	params: Promise<{
		idpId: string;
		userGroupId: string;
		slaId: string;
	}>;
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
				User Group
			</h1>

			<Suspense fallback={<LoadingDetail />}>
				<Detail idpId={idpId} userGroupId={userGroupId} slaId={slaId} />
			</Suspense>
			<Suspense fallback={<LoadingList />}>
				<List idpId={idpId} userGroupId={userGroupId} slaId={slaId} />
			</Suspense>
		</>
	);
}

async function Detail({
	idpId,
	userGroupId,
	slaId
}: {
	idpId: string;
	userGroupId: string;
	slaId: string;
}) {
	const sla = await getSla(idpId, userGroupId, slaId);

	return (
		<>
			<h2>{sla.name}</h2>
			<div className='mt-4 text-justify'>{sla.description}</div>
			<SlaDetail item={sla} />
		</>
	);
}

async function List({
	idpId,
	userGroupId,
	slaId
}: {
	idpId: string;
	userGroupId: string;
	slaId: string;
}) {
	const slaProjects = await getSlaProjects(idpId, userGroupId, slaId);
	const projects = await getProjects();

	return <ProjectsList slaProjects={slaProjects} projects={projects} />;
}

async function getSla(idpId: string, userGroupId: string, slaId: string) {
	const url = `${process.env.BASE_URL}/api/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}`;

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

async function getSlaProjects(idpId: string, userGroupId: string, slaId: string) {
	const url = `${process.env.BASE_URL}/api/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}/projects`;

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
	const url = `${process.env.BASE_URL}/api/providers`;

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
		const providerProjects = await getProjectByProvider(item.id);

		for (const proj of providerProjects) {
			proj.provider_name = item.name;
		}

		projects.push(...providerProjects);

		// take Ready only
		/* if (item.status == 1) {
			const providerProjects = await getProjectByProvider(item.id);

			for (const proj of providerProjects) {
				proj.provider_name = item.name;
			}

			projects.push(...providerProjects);
		} */
	}

	return projects;
}

async function getProjectByProvider(providerId: string) {
	const url = `${process.env.BASE_URL}/api/providers/${providerId}/projects`;

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
