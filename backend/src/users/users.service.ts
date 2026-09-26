import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: { items: true },
        },
        wishlist: {
          include: {
            items: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; phone?: string }) {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    const { passwordHash, ...safeUser } = updated;
    return safeUser;
  }

  async addAddress(userId: string, addressData: any) {
    if (addressData.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, type: addressData.type || 'SHIPPING' },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.create({
      data: {
        ...addressData,
        userId,
      },
    });
  }

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  }
}
