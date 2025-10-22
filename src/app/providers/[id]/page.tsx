import ProviderCarousel from './components/carousel';
import Status from '@/components/status';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';


type ProviderPageProps = {
	params: {
		id: string;
	};
};

export default async function Provider({ params }: Readonly<ProviderPageProps>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />;
	}

	const { id } = params;

	const provider = await getProvider(id);
	const idps = await getIdentityProviders(id);

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
					<Status status={ provider.status } />
				</div>
			</div>

			<ProviderCarousel idps={idps} />
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
	
	async function getIdentityProviders(provider_id: string) {
		const url = `${process.env.BASE_URL}/api/providers/${provider_id}/idps`;

		const apiResponse = await fetch(url, {
			method: 'GET',
			headers: await headers(),
		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.text();
			throw new Error(`Failed to fetch identity provider(s): ${errorText}`);
		}

		const data = await apiResponse.json();

		return data.data;
	}
}
