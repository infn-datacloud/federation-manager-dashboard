import ProviderCarousel from './components/carousel';
import Status from '@/components/status';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Custom401 from '@/app/pages/401';


type ProviderPageProps = {
	searchParams: Promise<{
		id: string;
	}>;
};

export default async function Provider(props: Readonly<ProviderPageProps>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		// Auth error, show 401 page
		return <Custom401 />
	}
	
	const { id } = await props.searchParams;

	return (
		<>
			<div className='flex flex-col md:flex-row justify-start md:justify-between items-center'>
				<div className='w-full md:w-3/4 mb-4 md:mb-0'>
					<h1>Provider Example {id}</h1>
					<div className='opacity-60'>
						<span className='font-bold'>Openstack</span> -{' '}
						<span>https://auth.cloud.infn.it</span>
					</div>
				</div>
				<div className='w-full md:w-1/4'>
					<Status status='5' />
				</div>
			</div>

			<ProviderCarousel />
		</>
	);
}
