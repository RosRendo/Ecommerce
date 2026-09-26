import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateOrderDto {
  userId?: string;
  cartId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: {
    recipientName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: string;
  specialInstructions?: string;
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: dto.cartId },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true },
            },
          },
        },
        coupon: true,
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cannot place an order with an empty cart');
    }

    // Generate exclusive editorial order number
    const timestamp = Date.now().toString().slice(-6);
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `ATL-${new Date().getFullYear()}-${timestamp}-${randomHex}`;

    // Create shipping address record
    const address = await this.prisma.address.create({
      data: {
        userId: dto.userId || 'guest',
        type: 'SHIPPING',
        recipientName: dto.shippingAddress.recipientName,
        company: dto.shippingAddress.company,
        addressLine1: dto.shippingAddress.addressLine1,
        addressLine2: dto.shippingAddress.addressLine2,
        city: dto.shippingAddress.city,
        state: dto.shippingAddress.state,
        postalCode: dto.shippingAddress.postalCode,
        country: dto.shippingAddress.country,
      },
    });

    const taxTotal = Number(cart.subtotal) * 0.08;
    const grandTotal = Number(cart.total) + taxTotal;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId: dto.userId,
        customerEmail: dto.customerEmail,
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        shippingAddressId: address.id,
        shippingMethod: dto.shippingMethod,
        specialInstructions: dto.specialInstructions,
        currency: 'USD',
        subtotal: cart.subtotal,
        discountTotal: cart.discount,
        shippingTotal: cart.shipping,
        taxTotal,
        grandTotal,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        fulfillmentStatus: 'UNFULFILLED',
        items: {
          create: cart.items.map((item) => ({
            variantId: item.variantId,
            productTitle: item.variant.product.title,
            variantTitle: item.variant.title,
            sku: item.variant.sku,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            total: Number(item.unitPrice) * item.quantity,
          })),
        },
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    // Mark cart as converted
    await this.prisma.cart.update({
      where: { id: dto.cartId },
      data: { status: 'CONVERTED' },
    });

    return order;
  }

  async getOrderByNumber(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        shippingAddress: true,
        payments: true,
        shipments: true,
      },
    });

    if (!order) throw new NotFoundException(`Order not found: ${orderNumber}`);
    return order;
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        shipments: true,
      },
    });
  }

  async updateOrderStatus(orderId: string, status: any) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
