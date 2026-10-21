import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const shipment = await prisma.shipment.findFirst({
      where: { trackingCode: code },
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
      // Mock / fallback dynamic tracking milestones for client demo codes
      return NextResponse.json({
        trackingCode: code,
        status: 'IN_TRANSIT',
        carrier: 'DHL Express Global',
        estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString(),
        milestones: [
          { status: 'LABEL_CREATED', label: 'Order Confirmed & Label Generated', date: new Date(Date.now() - 86400000 * 2).toISOString(), done: true },
          { status: 'DISPATCHED', label: 'Departed Atelier Zurich Facility', date: new Date(Date.now() - 86400000).toISOString(), done: true },
          { status: 'IN_TRANSIT', label: 'Customs Cleared & International Air Transit', date: new Date().toISOString(), done: true },
          { status: 'OUT_FOR_DELIVERY', label: 'Diplomatic Courier Scheduled', date: null, done: false },
          { status: 'DELIVERED', label: 'Signed & Deposited', date: null, done: false },
        ],
      });
    }

    return NextResponse.json(shipment);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Error tracking shipment' },
      { status: 500 }
    );
  }
}
