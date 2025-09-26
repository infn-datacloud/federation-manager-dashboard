import Link from '@/components/link';
import { Options, Option } from '@/components/options';
import { MapPinIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

function Row(
	props: Readonly<{
		data: {
			id: string;
			name: string;
			country: string;
			site: string;
			latitude: number;
			longitude: number;
		};
	}>
) {
	const { data } = props;
	return (
		<li className='flex flex-row justify-between items-start w-full box-sm'>
			<div className='flex flex-col w-9/10 mr-2'>
				<div className='flex flex-col lg:flex-row lg:justify-between'>
					<div className='font-bold text-md truncate'>
						{data.name}
					</div>
					<div className='text-sm flex items-center opacity-80 mb-4 lg:mb-0'>
						<p className='truncate'>
							{data.longitude}, {data.latitude}
						</p>
					</div>
				</div>

				<Link
					href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
					target='_blank'
					className='text-sm flex items-center opacity-80'
				>
					<MapPinIcon className='size-4' />
					&nbsp;
					<p className='lg:truncate'>
						{data.country}, {data.site}
					</p>
				</Link>
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

type RegionsProps = {
	data: {
		id: string;
		name: string;
		country: string;
		site: string;
		latitude: number;
		longitude: number;
	}[];
};

export default function Regions(props: Readonly<RegionsProps>) {
	const { data } = props;

	if (data.length === 0) {
		return (
			<p className='text-gray dark:text-secondary/60 p-2 text-center'>
				This provider has no regions.
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
