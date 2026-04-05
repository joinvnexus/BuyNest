"use client";

import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart-item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartPage() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-custom-accent hover:bg-blue-600">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-xl text-muted-foreground">
            {totalItems} items • ${totalPrice.toFixed(2)}
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-card p-8 rounded-xl border">
          <div className="flex justify-between items-center mb-6 text-2xl font-bold">
            <span>Total: ${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex gap-4">
            <Link href="/checkout">
              <Button size="lg" className="flex-1 bg-custom-accent hover:bg-blue-600">
                Proceed to Checkout
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={clearCart}
              className="px-8"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
