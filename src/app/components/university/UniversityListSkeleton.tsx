import { Skeleton } from "@/app/components/ui/skeleton";

export function UniversityListSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-[#241410] rounded-[20px] overflow-hidden border border-[#E8DDD0] dark:border-white/8">
          <Skeleton className="h-44 w-full rounded-none" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
