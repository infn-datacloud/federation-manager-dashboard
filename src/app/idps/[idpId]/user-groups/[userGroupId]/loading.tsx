import { Button } from "@/components/buttons";
import { PlusIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import LoadingComponent from "@/components/loading/loading";

export default function Loading() {
  return <LoadingComponent />;
}

export function LoadingList() {
  return (
    <>
      <div className="md: mt-12 flex flex-col justify-between md:flex-row">
        <div className="flex items-center text-xl font-bold uppercase">
          <DocumentDuplicateIcon className="size-6" />
          &nbsp;SLAS
        </div>
        <Button className="btn btn-secondary mt-4 md:mt-0" disabled>
          <PlusIcon className="size-4" />
          Add SLA
        </Button>
      </div>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div
            key={index}
            className="mt-6 flex w-full animate-pulse cursor-pointer items-start rounded-3xl bg-gray-50 p-8"
          >
            <div className="w-full">
              <div className="h-6 w-32 rounded bg-gray-100"></div>
              <div className="mt-2 h-4 w-full rounded bg-gray-100"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-100"></div>
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
      <div className="h-8 w-64 rounded bg-gray-100"></div>
      <div className="mt-8 h-4 w-full rounded bg-gray-100"></div>
      <div className="mt-2 h-4 w-full rounded bg-gray-100"></div>
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-100"></div>
    </div>
  );
}
