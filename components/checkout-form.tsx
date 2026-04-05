"use client";

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  clientSecret: string;
}

function CheckoutFormInner({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: billingDetails,
      },
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else {
      toast.success('Payment successful!');
      // Create order, clear cart
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Billing Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Full Name"
            value={billingDetails.name}
            onChange={(e) => setBillingDetails({...billingDetails, name: e.target.value})}
          />
          <Input
            placeholder="Email"
            type="email"
            value={billingDetails.email}
            onChange={(e) => setBillingDetails({...billingDetails, email: e.target.value})}
          />
          <Input
            placeholder="Address"
            value={billingDetails.address}
            onChange={(e) => setBillingDetails({...billingDetails, address: e.target.value})}
            className="md:col-span-2"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Payment</h3>
        <div className="bg-muted p-4 rounded-lg">
          <CardElement className="p-3 border rounded-lg bg-background" />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Complete Order'}
      </Button>
    </form>
  );
}

export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner clientSecret={clientSecret} />
    </Elements>
  );
}
