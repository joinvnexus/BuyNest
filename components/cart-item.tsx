"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-sm">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <Link
          href={`/products/${item.id}`}
          className="relative aspect-square w-full max-w-[128px] overflow-hidden rounded-[1.5rem] bg-muted"
        >
          <Image
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            fill
            className="object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link
                  href={`/products/${item.id}`}
                  className="text-lg font-semibold leading-tight hover:text-custom-accent"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  Stored in your cart and ready for checkout.
                </p>
              </div>
              <p className="text-lg font-semibold text-custom-primary">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center rounded-full border border-border/70 bg-background p-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-10 w-10 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="inline-flex min-w-12 justify-center text-sm font-medium">
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-10 w-10 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => removeItem(item.id)}
              className="justify-start rounded-full px-0 text-destructive hover:bg-transparent hover:text-destructive sm:px-4"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove item
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
