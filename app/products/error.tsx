"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StatePanel } from "@/components/ui/state-panel";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center px-4 py-16">
      <div className="w-full">
        <StatePanel
          badge="Catalog error"
          title="The catalog couldn't be loaded."
          description="Something failed while preparing the products view. Retry the request or return to the storefront."
          actionHref="/"
          actionLabel="Back to home"
        />
        <div className="mt-4 text-center">
          <Button variant="outline" className="rounded-full" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
