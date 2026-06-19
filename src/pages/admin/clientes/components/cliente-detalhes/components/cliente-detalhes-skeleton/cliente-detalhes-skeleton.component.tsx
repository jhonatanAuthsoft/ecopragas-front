import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";

export const ClienteDetalhesSkeleton = () => (
  <div className="flex flex-col gap-sm p-lg bg-white rounded-lg shadow-sm border border-grayscale-light">
    <Skeleton className="h-[32px] w-[280px]" />
    <div className="flex flex-wrap gap-sm">
      <Skeleton className="h-[20px] w-[160px]" />
      <Skeleton className="h-[20px] w-[140px]" />
      <Skeleton className="h-[20px] w-[240px]" />
    </div>
    <Skeleton className="h-[1px] w-full" />
    <Skeleton className="h-[24px] w-[140px]" />
    <Skeleton className="h-[80px] w-full" />
    <Skeleton className="h-[1px] w-full" />
    <Skeleton className="h-[24px] w-[140px]" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
    </div>
  </div>
);
