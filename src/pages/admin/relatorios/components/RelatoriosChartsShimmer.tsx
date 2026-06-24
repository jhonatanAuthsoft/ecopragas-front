import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";

export const RelatoriosChartsShimmer = () => (
  <>
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-[280px] w-full rounded-xs" />
      <Skeleton className="h-[280px] w-full rounded-xs" />
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-[280px] w-full rounded-xs" />
      <Skeleton className="h-[280px] w-full rounded-xs" />
    </div>
  </>
);
