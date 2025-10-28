import LoadingComponent from "@/components/loading/loading";

export default function Loading() {
	return <LoadingComponent />;
}

export function LoadingList() {
	return (
		<>
			{Array.from({ length: 3 }).map((_, index) => {
				return (
					<div
						key={index}
						className='p-8 rounded-3xl mt-6 w-full flex items-start cursor-pointer bg-gray-50 animate-pulse'
					>
						<div className='w-full'>
							<div className='bg-gray-100 h-5 w-32 rounded'></div>
							<div className='bg-gray-100 h-4 w-1/2 rounded mt-2'></div>
							<div className='bg-gray-100 h-4 w-full rounded mt-4'></div>
							<div className='bg-gray-100 h-4 w-3/4 rounded mt-2'></div>
						</div>
					</div>
				);
			})}
		</>
	);
}
