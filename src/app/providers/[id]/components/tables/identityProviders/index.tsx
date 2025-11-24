import { Options, Option } from '@/components/options';
import {
	IdentificationIcon,
	TrashIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';

function Row(
	props: Readonly<{
		data: { id: string; name: string; idp: string; protocol: string };
	}>
) {
	const { data } = props;
	return (
		<li className='flex flex-row justify-between items-start lg:items-center w-full box-sm'>
			<div className='flex w-9/10 truncate flex-col lg:flex-row'>
				<div className='font-bold text-md lg:w-1/2 truncate'>
					{data.name}
				</div>
				<div className='text-sm flex items-center opacity-80 lg:w-1/4'>
					<IdentificationIcon className='size-4' />
					&nbsp;<p className='truncate'>{data.idp}</p>
				</div>
				<div className='text-sm mt-2 lg:mt-0 flex items-center opacity-60 lg:w-1/4'>
					<p className='truncate'>{data.protocol}</p>
				</div>
			</div>
			<div className='flex flex-col'>
				<Options>
					<Option>
						<div className='flex items-center'>
							<PencilIcon className='size-4' />
							&nbsp;Edit
						</div>
					</Option>
					<Option data-danger={true}>
						<div className='flex items-center'>
							<TrashIcon className='size-4' />
							&nbsp;Delete
						</div>
					</Option>
				</Options>
			</div>
		</li>
	);
}

export default function IdentityProvidersTable() {
	const data=[
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
	]

	if (data.length === 0) {
		return (
			<p className='text-gray dark:text-secondary/60 p-2 text-center'>
				This provider has no IDP.
			</p>
		);
	}

	return (
		<ul className='w-full mt-6'>
			{data.map((row) => (
				<Row key={row.id} data={row} />
			))}
		</ul>
	);
}
