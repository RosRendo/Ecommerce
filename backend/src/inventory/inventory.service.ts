import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async checkAvailability(variantId: string, quantity: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { variantId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory record not found for variant');
    }

    if (!inventory.trackQuantity) {
      return { available: true, inStock: 999 };
    }

    const availableStock = inventory.quantity - inventory.reservedQuantity;
    const canFulfill = inventory.allowBackorder || availableStock >= quantity;

    return {
      available: canFulfill,
      availableStock: Math.max(0, availableStock),
      allowBackorder: inventory.allowBackorder,
    };
  }

  async reserveStock(variantId: string, quantity: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { variantId },
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.trackQuantity && !inventory.allowBackorder) {
      const available = inventory.quantity - inventory.reservedQuantity;
      if (available < quantity) {
        throw new BadRequestException('Insufficient inventory available to reserve');
      }
    }

    return this.prisma.inventory.update({
      where: { variantId },
      data: {
        reservedQuantity: { increment: quantity },
      },
    });
  }

  async releaseStock(variantId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { variantId },
      data: {
        reservedQuantity: { decrement: quantity },
      },
    });
  }

  async commitStockDeduction(variantId: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { variantId },
      data: {
        quantity: { decrement: quantity },
        reservedQuantity: { decrement: quantity },
      },
    });
  }

  async getLowStockAlerts() {
    return this.prisma.inventory.findMany({
      where: {
        quantity: { lte: 5 },
      },
      include: {
        variant: {
          include: { product: true },
        },
      },
    });
  }
}
