import { Options, Option } from '@/components/options';
import {
	ShieldCheckIcon,
	TrashIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';

function Row(
	props: Readonly<{
		data: {
			id: string;
			name: string;
			isRoot: boolean;
			regionOverrides: string[];
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
					{data.isRoot ? (
						<div className='text-xs flex items-center opacity-80 mb-4 lg:mb-0 uppercase font-bold'>
							<ShieldCheckIcon className='size-3' />
							&nbsp;Root
						</div>
					) : (
						''
					)}
				</div>
				<div className='text-xs opacity-80 mt-2'>Region Overrides:</div>
				{data.regionOverrides.map((row) => (
					<div key={row} className='text-sm '>
						{row}
					</div>
				))}
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

export default function Projects() {
	const data=[
		{
			id: '1',
			name: 'ReCaS Bari',
			isRoot: true,
			regionOverrides: [
				'92021290-d2a7-48fe-aa4f-9f81737352213',
				'92021290-d2a7-48fe-aa4f-9f81737325223',
				'92021290-d2a7-48fe-aa4f-9f81733735223',
			],
		},
		{
			id: '2',
			name: 'Cygno Experiment',
			isRoot: false,
			regionOverrides: [
				'92021290-d2a7-48fe-aa4f-9f81743735223',
				'92021290-d2a7-48fe-aa4f-9f81753735223',
				'92021290-d2a7-48fe-aa4f-9f81763735223',
				'92021290-d2a7-48fe-aa4f-9f81773735223',
				'92021290-d2a7-48fe-aa4f-9f81783735223',
			],
		},
	]

	if (data.length === 0) {
		return (
			<p className='text-gray dark:text-secondary/60 p-2 text-center'>
				This provider has no projects.
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
