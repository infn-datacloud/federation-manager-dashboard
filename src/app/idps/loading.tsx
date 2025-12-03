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
            className="mt-6 flex w-full animate-pulse cursor-pointer items-start rounded-3xl bg-gray-50 p-8"
          >
            <div className="w-full">
              <div className="h-5 w-32 rounded bg-gray-100"></div>
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-100"></div>
              <div className="mt-4 h-4 w-full rounded bg-gray-100"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-100"></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
