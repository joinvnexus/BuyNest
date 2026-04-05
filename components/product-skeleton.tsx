import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all h-[400px]",
        className
      )}
      {...props}
    >
      <div className="relative h-64 bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
