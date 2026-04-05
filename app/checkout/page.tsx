"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { CheckoutForm } from '@/components/checkout-form';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';

interface CheckoutDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

const initialDetails: CheckoutDetails = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
};

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, totalPrice, clearCart } = useCartStore();
  const [details, setDetails] = useState<CheckoutDetails>(initialDetails);
  const [clientSecret, setClientSecret] = useState('');
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    if (session?.user) {
      setDetails((current) => ({
        ...current,
        name: current.name || session.user.name || '',
        email: current.email || session.user.email || '',
      }));
    }
  }, [session]);

  const subtotal = totalPrice;
  const shipping = subtotal >= 250 ? 0 : 18;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = useMemo(() => subtotal + shipping + estimatedTax, [subtotal, shipping, estimatedTax]);

  const activeStep = clientSecret ? 1 : 0;

  const handleDetailsChange = (field: keyof CheckoutDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const startPayment = async () => {
    const hasMissingField = Object.values(details).some((value) => !value.trim());
    if (hasMissingField) {
      toast.error('Complete shipping details first');
      return;
    }

    setLoadingIntent(true);
    setCheckoutError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to prepare checkout');
      }

      setClientSecret(data.clientSecret);
      toast.success('Payment step is ready');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to prepare checkout';
      setCheckoutError(message);
      toast.error(message);
    } finally {
      setLoadingIntent(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="container space-y-6">
          <div className="h-12 w-64 animate-pulse rounded-3xl bg-muted" />
          <div className="h-28 animate-pulse rounded-[2rem] bg-muted" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="h-[420px] animate-pulse rounded-[2rem] bg-muted" />
            <div className="h-[320px] animate-pulse rounded-[2rem] bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen pb-20">
        <section className="border-b border-border/60 bg-muted/30">
          <div className="container px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-4 py-1 text-sm font-medium text-muted-foreground">
                Checkout access
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Sign in before you continue to payment.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Checkout is protected so we can attach orders to your account and keep payment setup consistent.
              </p>
            </div>
          </div>
        </section>

        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-border/60 bg-card p-8 text-center shadow-sm">
            <ShieldCheck className="mx-auto h-12 w-12 text-custom-accent" />
            <h2 className="mt-6 text-3xl font-semibold">Authentication required</h2>
            <p className="mt-3 text-muted-foreground">
              Sign in to continue with checkout, then return here to finish shipping and payment.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-custom-accent hover:bg-blue-600">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20">
        <section className="border-b border-border/60 bg-muted/30">
          <div className="container px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-4 py-1 text-sm font-medium text-muted-foreground">
                Checkout
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Your cart is empty, so checkout can&apos;t start yet.
              </h1>
            </div>
          </div>
        </section>

        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-border/80 bg-card/70 p-10 text-center shadow-sm">
            <p className="text-muted-foreground">
              Add products to your cart first, then come back here to complete shipping and payment.
            </p>
            <Button asChild className="mt-6 rounded-full bg-custom-accent hover:bg-blue-600">
              <Link href="/products">Browse products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link href="/cart" className="inline-flex items-center gap-2 hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to cart
            </Link>
          </div>
          <div className="mt-6 max-w-3xl space-y-5">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-4 py-1 text-sm font-medium text-muted-foreground">
              Secure checkout
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Shipping first, payment second.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Complete delivery details, confirm the order summary, and then unlock the payment step.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <Stepper
          steps={['Shipping details', 'Payment', 'Confirmation']}
          activeStep={activeStep}
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-custom-accent/10 text-custom-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Shipping details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    These details are used for delivery and billing information.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Full name"
                  value={details.name}
                  onChange={(event) => handleDetailsChange('name', event.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={details.email}
                  onChange={(event) => handleDetailsChange('email', event.target.value)}
                />
                <Input
                  className="md:col-span-2"
                  placeholder="Street address"
                  value={details.address}
                  onChange={(event) => handleDetailsChange('address', event.target.value)}
                />
                <Input
                  placeholder="City"
                  value={details.city}
                  onChange={(event) => handleDetailsChange('city', event.target.value)}
                />
                <Input
                  placeholder="Postal code"
                  value={details.postalCode}
                  onChange={(event) => handleDetailsChange('postalCode', event.target.value)}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
                Your payment step will only initialize after these details are complete.
              </div>

              {!clientSecret ? (
                <Button
                  className="mt-6 h-12 rounded-full bg-custom-accent hover:bg-blue-600"
                  onClick={startPayment}
                  disabled={loadingIntent}
                >
                  {loadingIntent ? 'Preparing payment...' : 'Continue to payment'}
                </Button>
              ) : (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Payment step ready
                </div>
              )}
            </div>

            {checkoutError ? (
              <div className="rounded-[2rem] border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive shadow-sm">
                {checkoutError}
              </div>
            ) : null}

            {clientSecret ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-custom-accent/10 text-custom-accent">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Payment</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Complete your card payment to finalize the order.
                    </p>
                  </div>
                </div>
                <CheckoutForm
                  clientSecret={clientSecret}
                  customer={details}
                  onSuccess={() => {
                    clearCart();
                  }}
                />
              </div>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    Order summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Before you pay</h2>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{item.name}</p>
                        <p className="text-muted-foreground">Qty {item.quantity}</p>
                      </div>
                      <span className="font-medium text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border/60 pt-4 text-sm">
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
                  <div className="flex items-center justify-between border-t border-border/60 pt-3 text-base font-semibold">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-muted/30 p-5 shadow-sm">
              <p className="text-sm font-medium text-foreground">Protected payment flow</p>
              <p className="mt-2 text-sm text-muted-foreground">
                This checkout verifies account access, initializes payment on demand, and keeps the order summary visible the whole time.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
