"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

interface CartBadgeProps {
  className?: string;
}

export function CartBadge({ className }: CartBadgeProps) {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <Link
      href="/cart"
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      aria-label={`Open cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
    >
      <ShoppingBag className="h-4 w-4" />
      <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-custom-accent px-1 text-[11px] font-semibold text-white">
        {totalItems}
      </span>
    </Link>
  );
}
