"use client";

import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 p-6 border rounded-lg">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold line-clamp-2 mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">${item.price}</p>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="w-20 h-10"
          />
          <span className="font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
