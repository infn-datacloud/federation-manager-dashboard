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
            className="mt-6 flex w-full animate-pulse flex-col items-start space-y-4 rounded-3xl bg-gray-50 p-8 md:flex-row md:items-center md:justify-between"
          >
            <div className="h-5 w-3/4 rounded bg-gray-100 md:w-1/2"></div>
            <div className="h-9 w-full rounded bg-gray-100 md:w-42"></div>
          </div>
        );
      })}
    </>
  );
}
