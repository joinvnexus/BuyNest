"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StatePanel } from "@/components/ui/state-panel";

export default function CheckoutError({
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
          badge="Checkout error"
          title="Checkout hit an unexpected problem."
          description="Your cart is still intact. Retry the checkout flow or return to the cart to review the order."
          actionHref="/cart"
          actionLabel="Back to cart"
        />
        <div className="mt-4 text-center">
          <Button variant="outline" className="rounded-full" onClick={reset}>
            Retry checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
