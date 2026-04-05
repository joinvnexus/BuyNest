"use client";

import Link from 'next/link';
import { ArrowRight, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useEffect } from 'react';
import { CartItem } from '@/components/cart-item';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20">
        <section className="border-b border-border/60 bg-muted/30">
          <div className="container px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-4 py-1 text-sm font-medium text-muted-foreground">
                Your cart
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Nothing here yet. Start building your order.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Add a few products to compare items, review totals, and move into checkout without friction.
              </p>
            </div>
          </div>
        </section>

        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-border/80 bg-card/70 px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-custom-accent/10 text-custom-accent">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-semibold">Your cart is empty</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Explore the catalog, add a few products, and come back here for a cleaner order review and checkout handoff.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-custom-accent hover:bg-blue-600">
                <Link href="/products">Start shopping</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = totalPrice;
  const shipping = subtotal >= 250 ? 0 : 18;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal + shipping + estimatedTax;

  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-4 py-1 text-sm font-medium text-muted-foreground">
              Cart review
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Review your order before checkout.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Adjust quantities, review pricing, and confirm the order summary before moving into payment.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-card/70 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {totalItems} item{totalItems === 1 ? '' : 's'} in your cart
            </p>
            <p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/products">Continue shopping</Link>
            </Button>
            <Button variant="ghost" className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={clearCart}>
              Clear cart
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    Order summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Ready for checkout</h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Estimated tax</span>
                    <span className="text-foreground">${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border/60 pt-3 text-base font-semibold">
                    <div className="flex items-center justify-between">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="h-12 w-full rounded-full bg-custom-accent hover:bg-blue-600">
                  <Link href="/checkout" className="inline-flex items-center justify-center gap-2">
                    Proceed to checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <div className="space-y-4 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-4 w-4 text-custom-accent" />
                    <div>
                      <p className="font-medium text-foreground">Delivery estimate</p>
                      <p>Tracked shipping with updates from dispatch through delivery.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-custom-accent" />
                    <div>
                      <p className="font-medium text-foreground">Secure checkout</p>
                      <p>Encrypted payment flow and transparent order confirmation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-muted/30 p-5 shadow-sm">
              <p className="text-sm font-medium text-foreground">
                Free shipping unlocks at $250
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {subtotal >= 250
                  ? 'You already qualify for free shipping on this order.'
                  : `Add $${(250 - subtotal).toFixed(2)} more to remove shipping charges.`}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
