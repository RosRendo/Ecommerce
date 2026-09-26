import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics() {
    const [totalOrders, totalUsers, totalProducts, orders] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.user.count(),
      this.prisma.product.count({ where: { deletedAt: null } }),
      this.prisma.order.findMany({
        where: { paymentStatus: 'PAID' },
        select: { grandTotal: true },
      }),
    ]);

    const grossMerchandiseVolume = orders.reduce((sum, o) => sum + Number(o.grandTotal), 0);
    const averageOrderValue = orders.length > 0 ? grossMerchandiseVolume / orders.length : 0;

    const pendingFulfillments = await this.prisma.order.count({
      where: { fulfillmentStatus: 'UNFULFILLED' },
    });

    const lowStockCount = await this.prisma.inventory.count({
      where: { quantity: { lte: 5 } },
    });

    return {
      grossMerchandiseVolume: Number(grossMerchandiseVolume.toFixed(2)),
      totalOrders,
      averageOrderValue: Number(averageOrderValue.toFixed(2)),
      totalUsers,
      totalProducts,
      pendingFulfillments,
      lowStockCount,
    };
  }

  async getRecentOrders(limit = 10) {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        items: true,
        user: { select: { email: true, firstName: true, lastName: true } },
      },
    });
  }

  async getAllInventory() {
    return this.prisma.inventory.findMany({
      include: {
        variant: {
          include: {
            product: { select: { title: true, slug: true } },
          },
        },
      },
      orderBy: { quantity: 'asc' },
    });
  }
}
