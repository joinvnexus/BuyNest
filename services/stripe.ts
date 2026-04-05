import Stripe from 'stripe';
import { CartItem } from '@/types';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function createPaymentIntent(cartItems: CartItem[], userId: string) {
  const amount = cartItems.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0
  );

  return stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userId,
      itemCount: String(cartItems.length),
    },
  });
}

export async function createCheckoutSession(
  cartItems: CartItem[],
  userId: string
) {
  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/stripe/cancel`,
    metadata: {
      userId,
    },
  });
}

export async function verifyWebhook(signature: string, payload: Buffer) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    return stripe.webhooks.constructEvent(payload.toString(), signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed');
    return;
  }
}
