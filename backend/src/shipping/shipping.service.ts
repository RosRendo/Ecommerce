import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  getAvailableMethods(subtotal: number): ShippingOption[] {
    const isFreeEligible = subtotal >= 300;

    return [
      {
        id: 'standard',
        name: 'Standard Editorial Delivery',
        description: 'Complimentary carbon-neutral dispatch in signature unbleached linen box.',
        price: isFreeEligible ? 0 : 25,
        estimatedDays: '3–5 business days',
      },
      {
        id: 'express',
        name: 'Priority Air Express',
        description: 'Next-flight out courier service with end-to-end temperature and shock monitoring.',
        price: 45,
        estimatedDays: '1–2 business days',
      },
      {
        id: 'white_glove',
        name: 'Atelier White Glove',
        description: 'Private concierge appointment, unboxing, serial registration, and packaging removal.',
        price: 120,
        estimatedDays: 'Scheduled appointment',
      },
    ];
  }

  async trackShipment(trackingCode: string) {
    const shipment = await this.prisma.shipment.findFirst({
      where: { trackingCode },
      include: {
        order: {
          include: {
            items: true,
            shippingAddress: true,
          },
        },
      },
    });

    if (!shipment) {
      throw new NotFoundException(`Shipment not found with code: ${trackingCode}`);
    }

    return shipment;
  }
}
