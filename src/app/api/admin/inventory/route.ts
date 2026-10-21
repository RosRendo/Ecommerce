import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (process.env.NODE_ENV === 'production' && user?.role !== 'ADMIN' && user?.role !== 'CURATOR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const inventory = await prisma.inventory.findMany({
      include: {
        variant: {
          include: {
            product: { select: { title: true, slug: true } },
          },
        },
      },
      orderBy: { quantity: 'asc' },
    });

    return NextResponse.json(inventory);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}
