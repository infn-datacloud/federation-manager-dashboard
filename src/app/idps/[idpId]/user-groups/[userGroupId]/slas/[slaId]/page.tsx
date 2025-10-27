import Projects from './projectList';
import Link from '@/components/link';
import SlaDetail from './slaDetail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';

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
		return <Custom401 />
	}

	const { idpId, userGroupId, slaId } = await props.params;

	const items = [
		{
			id: '1',
			name: 'Intertwin',
			provider: 'Provider Test',
		},
		{
			id: '2',
			name: 'Terabit',
			provider: 'Provider Test',
		},
	];

	const sla = await getSla(idpId, userGroupId, slaId);
	// const projects = await getProjects(idpId, userGroupId, slaId);

	return (
		<>
			<div className='mb-12'>
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

			<h1>
				{sla.name}
			</h1>
			<div className='mt-4 text-justify'>{sla.description}</div>
			<SlaDetail item={sla} />
			<Projects items={items} />
		</>
	);
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

/* async function getProjects(idpId: string, userGroupId: string, slaId: string) {
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
} */
