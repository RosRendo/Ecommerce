import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
      apiVersion: '2026-03-25.acacia' as any,
    });
  }

  async createPaymentIntent(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new NotFoundException('Order not found');

    const amountInCents = Math.round(Number(order.grandTotal) * 100);

    let paymentIntent: Stripe.PaymentIntent;

    try {
      paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInCents,
        currency: (order.currency || 'usd').toLowerCase(),
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerEmail: order.customerEmail,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
    } catch {
      // Graceful fallback for local development / testing without live stripe key
      paymentIntent = {
        id: `pi_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        client_secret: `pi_mock_secret_${Date.now()}`,
        amount: amountInCents,
        currency: order.currency.toLowerCase(),
      } as any;
    }

    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        amount: order.grandTotal,
        currency: order.currency,
        status: 'PENDING',
        provider: 'STRIPE',
        paymentIntentId: paymentIntent.id,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      paymentId: payment.id,
      amount: order.grandTotal,
      currency: order.currency,
    };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
      if (webhookSecret && signature) {
        event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      } else {
        event = JSON.parse(rawBody.toString());
      }
    } catch (err: any) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const orderId = intent.metadata.orderId;

      if (orderId) {
        await this.prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
            fulfillmentStatus: 'PROCESSING',
          },
        });

        await this.prisma.payment.updateMany({
          where: { paymentIntentId: intent.id },
          data: {
            status: 'PAID',
            transactionId: intent.latest_charge as string,
          },
        });
      }
    }

    return { received: true };
  }
}
