import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CATEGORIES } from '@/lib/data/products';

export async function GET() {
  try {
    const dbCategories = await prisma.category.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (dbCategories.length > 0) {
      return NextResponse.json(dbCategories);
    }

    // Return in-memory fallback if DB empty
    return NextResponse.json(CATEGORIES);
  } catch (error) {
    console.warn('Database offline or table empty, returning fallback categories:', error);
    return NextResponse.json(CATEGORIES);
  }
}
