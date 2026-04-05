"use client";

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart-item';
import { CheckoutForm } from '@/components/checkout-form';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const { data: session } = useSession();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user.id || items.length === 0) return;
    
    // Create payment intent
    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: items }),
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, [session, items]);

  if (!session) {
    return <div>Please log in to checkout</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="lg:sticky lg:top-12 lg:h-screen lg:overflow-y-auto">
            <div className="bg-card p-8 rounded-xl border mb-8">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            {clientSecret ? (
              <CheckoutForm clientSecret={clientSecret} />
            ) : (
              <div className="bg-muted p-12 rounded-xl text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-accent mx-auto mb-4"></div>
                <p>Preparing checkout...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

