import { Options, Option } from '@/components/options';
import { IdentificationIcon } from '@heroicons/react/24/solid';

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
					<Option data-danger={true}>Delete</Option>
					<Option>Edit</Option>
				</Options>
			</div>
		</li>
	);
}

type IdentityProvidersTableProps = {
	data: { id: string; name: string; idp: string; protocol: string }[];
};

export default function IdentityProvidersTable(props: Readonly<IdentityProvidersTableProps>) {
	const { data } = props;

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
