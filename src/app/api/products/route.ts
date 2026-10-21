import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PRODUCTS } from '@/lib/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');

  try {
    // Attempt database query first if Prisma is populated
    const where: any = { isPublished: true, deletedAt: null };
    if (category) {
      where.category = { slug: category };
    }
    if (collection) {
      where.collections = { some: { collection: { slug: collection } } };
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { subtitle: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    const dbProducts = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { include: { inventory: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      return NextResponse.json({
        items: dbProducts,
        total: dbProducts.length,
      });
    }
  } catch {
    // Seamless fallback to static luxury catalog
  }

  let results = [...PRODUCTS];

  if (category) {
    results = results.filter((p) => p.category.slug === category);
  }

  if (collection) {
    results = results.filter((p) => p.collections?.includes(collection));
  }

  if (featured === 'true') {
    results = results.filter((p) => p.isFeatured);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  return NextResponse.json({
    items: results,
    total: results.length,
  });
}
