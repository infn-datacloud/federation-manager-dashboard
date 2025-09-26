import Projects from './projectList';
import Link from '@/components/link';
import SlaDetail from './slaDetail';

type IdpPageProps = {
	params: Promise<{
		idpId: string;
		userGroupId: string;
		slaId: string;
	}>;
};

export default async function Sla(props: Readonly<IdpPageProps>) {
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

	const sla = {
		id: '2',
		name: 'terabit_sla.pdf',
		description: 'SLA for the Terabit project',
		url: 'https://example.com',
		startDate: '08-11-2025',
		endDate: '31-12-2025',
	};

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
				{sla.name} {slaId}, {userGroupId}, {idpId}
			</h1>
			<div className='mt-4 text-justify'>{sla.description}</div>
			<SlaDetail item={sla} />
			<Projects items={items} />
		</>
	);
}
