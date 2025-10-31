import ProviderCarousel from './providerCarousel';
import Status from '@/components/status';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';

type ProviderPageProps = {
	params: {
		id: string;
	};
};

export default async function Provider({
	params,
}: Readonly<ProviderPageProps>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />;
	}

	const { id } = params;
	const provider = await getProvider(id);

	/* IDPs */
	const idps = await getIdentityProviders();
	const providerIdps = await getProviderIdps(id);

	/* Regions */
	const providerRegions = await getProviderRegions(id);
	
	/* Projects */
	const providerProjects = await getProviderProjects(id);

	return (
		<>
			<div className='flex flex-col md:flex-row justify-start md:justify-between items-center'>
				<div className='w-full md:w-3/4 mb-4 md:mb-0'>
					<h1>{provider.name}</h1>
					<div className='opacity-60'>
						<span className='font-bold'>{provider.type}</span> -{' '}
						<span>{provider.auth_endpoint}</span>
					</div>
				</div>
				<div className='w-full md:w-1/4'>
					<Status status={provider.status} />
				</div>
			</div>

			<ProviderCarousel
				idps={idps}
				providerIdps={providerIdps}
				providerRegions={providerRegions}
				providerProjects={providerProjects}
			/>
		</>
	);

	async function getProvider(id: string) {
		const url = `${process.env.BASE_URL}/api/providers/${id}`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(`Failed to fetch provider(s): ${errorText}`);
		}

		const data = await apiResponse.json();

		return data;
	}

	/* IDPs */
	async function getProviderIdps(providerId: string) {
		const url = `${process.env.BASE_URL}/api/providers/${providerId}/idps`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(
				`Failed to fetch provider's identity provider(s): ${errorText}`
			);
		}

		const data = await apiResponse.json();

		return data.data;
	}
	
	async function getIdentityProviders() {
		const url = `${process.env.BASE_URL}/api/idps`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(
				`Failed to fetch identity provider(s): ${errorText}`
			);
		}

		const data = await apiResponse.json();

		return data.data;
	}

	/* Regions */
	async function getProviderRegions(providerId: string) {
		const url = `${process.env.BASE_URL}/api/providers/${providerId}/regions`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(
				`Failed to fetch provider's region(s): ${errorText}`
			);
		}

		const data = await apiResponse.json();

		return data.data;
	}

	/* Projects */
	async function getProviderProjects(providerId: string) {
		const url = `${process.env.BASE_URL}/api/providers/${providerId}/projects`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(
				`Failed to fetch provider's project(s): ${errorText}`
			);
		}

		const data = await apiResponse.json();
		const projects = data.data;

		for (let i = 0; i < projects.length; i++) {
			const regions = await getProviderProjectRegions(providerId, projects[i].id);
			if (regions.length == 1) {
				projects[i].region = regions[0];
			} else {
				projects[i].region = {};
			}
		}

		console.log(projects)

		return projects;
	}

	/* Project Regions */
	async function getProviderProjectRegions(providerId: string, projectId: string) {
		const url = `${process.env.BASE_URL}/api/providers/${providerId}/projects/${projectId}/regions`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(
				`Failed to fetch provider project's region(s) : ${errorText}`
			);
		}

		const data = await apiResponse.json();

		return data.data;
	}
}
