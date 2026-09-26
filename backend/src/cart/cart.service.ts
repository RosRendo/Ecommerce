import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId?: string, guestToken?: string) {
    if (!userId && !guestToken) {
      throw new BadRequestException('Either userId or guestToken is required');
    }

    let cart = await this.prisma.cart.findFirst({
      where: {
        OR: [
          ...(userId ? [{ userId, status: 'ACTIVE' as const }] : []),
          ...(guestToken ? [{ guestToken, status: 'ACTIVE' as const }] : []),
        ],
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: { orderBy: { sortOrder: 'asc' } },
                  },
                },
              },
            },
          },
        },
        coupon: true,
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
          guestToken,
          status: 'ACTIVE',
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: { images: true },
                  },
                },
              },
            },
          },
          coupon: true,
        },
      });
    }

    return cart;
  }

  async addItem(cartId: string, variantId: string, quantity: number) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!variant) throw new NotFoundException('Variant not found');

    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId, variantId } },
    });

    if (existing) {
      await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId,
          variantId,
          quantity,
          unitPrice: variant.price,
        },
      });
    }

    return this.recalculateCart(cartId);
  }

  async updateItemQuantity(cartId: string, itemId: string, quantity: number) {
    if (quantity <= 0) {
      await this.prisma.cartItem.delete({
        where: { id: itemId },
      });
    } else {
      await this.prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    }

    return this.recalculateCart(cartId);
  }

  async removeItem(cartId: string, itemId: string) {
    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });
    return this.recalculateCart(cartId);
  }

  async applyCoupon(cartId: string, code: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      throw new BadRequestException('Invalid or expired promotional code');
    }

    await this.prisma.cart.update({
      where: { id: cartId },
      data: { couponId: coupon.id },
    });

    return this.recalculateCart(cartId);
  }

  private async recalculateCart(cartId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
        coupon: true,
      },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    let subtotal = 0;
    for (const item of cart.items) {
      subtotal += Number(item.unitPrice) * item.quantity;
    }

    let discount = 0;
    if (cart.coupon) {
      if (cart.coupon.discountType === 'PERCENTAGE') {
        discount = (subtotal * Number(cart.coupon.discountValue)) / 100;
      } else if (cart.coupon.discountType === 'FIXED_AMOUNT') {
        discount = Math.min(subtotal, Number(cart.coupon.discountValue));
      }
    }

    const shipping = subtotal > 300 || subtotal === 0 ? 0 : 25;
    const total = Math.max(0, subtotal - discount + shipping);

    return this.prisma.cart.update({
      where: { id: cartId },
      data: {
        subtotal,
        discount,
        shipping,
        total,
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
        coupon: true,
      },
    });
  }
}
