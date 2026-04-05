import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPaymentIntent } from '@/services/stripe';
import { validateCartItems } from '@/lib/api-validators';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured for this environment.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const cartItems = validateCartItems(body.cartItems);
    const paymentIntent = await createPaymentIntent(cartItems, session.user.id);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error && /Cart|amount/.test(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json(
      { error: 'Failed to prepare checkout.' },
      { status: 500 }
    );
  }
}
