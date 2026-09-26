import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'usd', orderNumber } = body;

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey && !stripeKey.includes('placeholder')) {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2026-03-25.acacia' as any,
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        metadata: { orderNumber },
        automatic_payment_methods: { enabled: true },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      });
    }

    // Fallback development client secret
    return NextResponse.json({
      clientSecret: `mock_pi_sec_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      id: `pi_mock_${Date.now()}`,
      mock: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Payment intent creation failed' },
      { status: 500 },
    );
  }
}
