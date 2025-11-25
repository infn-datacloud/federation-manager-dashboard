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
						className='p-8 rounded-3xl mt-6 w-full flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-4 bg-gray-50 animate-pulse'
					>
						<div className='bg-gray-100 h-5 w-3/4 md:w-1/2 rounded'></div>
						<div className='bg-gray-100 h-9 w-full md:w-42 rounded'></div>
					</div>
				);
            })}
        </>
    );
}
