import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function createCheckoutSession(
  cartItems: any[],
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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/stripe/cancel`,
    metadata: {
      userId,
    },
  });

  return session;
}

export async function verifyWebhook(signature: string, payload: Buffer) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(payload.toString(), signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed');
    return;
  }

  return event;
}
