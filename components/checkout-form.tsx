"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

interface CheckoutFormProps {
  clientSecret: string;
  customer: CustomerDetails;
  onSuccess: () => void;
}

function CheckoutFormInner({ clientSecret, customer, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: customer.name,
          email: customer.email,
          address: {
            line1: customer.address,
            city: customer.city,
            postal_code: customer.postalCode,
          },
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message || 'Payment failed');
      setLoading(false);
      return;
    }

    toast.success('Payment successful');
    onSuccess();
    router.push('/cart');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Payment details</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your card information to complete this order securely.
        </p>
        <div className="mt-5 rounded-2xl border border-border/60 bg-background p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#0f172a',
                  '::placeholder': {
                    color: '#64748b',
                  },
                },
              },
            }}
            className="py-2"
          />
        </div>
      </div>

      <Button type="submit" className="h-12 w-full rounded-full bg-custom-accent hover:bg-blue-600" disabled={!stripe || loading}>
        {loading ? 'Processing payment...' : 'Pay now'}
      </Button>
    </form>
  );
}

export function CheckoutForm(props: CheckoutFormProps) {
  if (!stripePromise || !publishableKey) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
        <h3 className="text-xl font-semibold">Stripe isn&apos;t ready</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to enable card collection in this environment.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner {...props} />
    </Elements>
  );
}
