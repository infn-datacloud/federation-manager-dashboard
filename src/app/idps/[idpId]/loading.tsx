import { Button } from "@/components/buttons";
import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import LoadingComponent from '@/components/loading/loading';

export default function Loading() {
    return <LoadingComponent />
}

export function LoadingList() {
	return (
		<>
			<div className='mt-12 flex flex-col md:flex-row md: justify-between'>
				<div className='text-xl uppercase font-bold flex items-center'>
					<UserGroupIcon className='size-6' />
					&nbsp;User Groups
				</div>
				<Button className='btn btn-secondary mt-4 md:mt-0' disabled>
					<PlusIcon className='size-4' />
					Add user group
				</Button>
			</div>
			{Array.from({length: 3}).map((_, index) => {
				return (
					<div
						key={index}
						className='p-8 rounded-3xl mt-6 w-full flex items-start cursor-pointer bg-gray-50 animate-pulse'
					>
						<div className='w-full'>
							<div className='bg-gray-100 h-6 w-32 rounded'></div>
							<div className='bg-gray-100 h-4 w-full rounded mt-2'></div>
							<div className='bg-gray-100 h-4 w-3/4 rounded mt-2'></div>
						</div>
					</div>
				);
			})}
		</>
	);
}

export function LoadingDetail() {
	return (
		<div className="animate-pulse">
			<div className='bg-gray-100 h-8 w-64 rounded'></div>
			<div className='bg-gray-100 h-4 w-1/4 rounded mt-2'></div>
			<div className='bg-gray-100 h-4 w-full rounded mt-8'></div>
			<div className='bg-gray-100 h-4 w-full rounded mt-2'></div>
			<div className='bg-gray-100 h-4 w-3/4 rounded mt-2'></div>
		</div>
	);
}