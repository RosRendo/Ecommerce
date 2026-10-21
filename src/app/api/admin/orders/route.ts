import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (process.env.NODE_ENV === 'production' && user?.role !== 'ADMIN' && user?.role !== 'CURATOR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') || 20);

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        items: true,
        user: { select: { email: true, firstName: true, lastName: true } },
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}
