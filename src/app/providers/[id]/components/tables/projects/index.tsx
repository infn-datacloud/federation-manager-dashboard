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

type ProjectsProps = {
	data: {
		id: string;
		name: string;
		isRoot: boolean;
		regionOverrides: string[];
	}[];
};

export default function Projects(props: Readonly<ProjectsProps>) {
	const { data } = props;

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
