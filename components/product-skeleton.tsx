import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="relative aspect-[4/4.3] bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-7 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-4">
        <Skeleton className="h-9 w-full rounded-full" />
      </div>
    </div>
  );
}
