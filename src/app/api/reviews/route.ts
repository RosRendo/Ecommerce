import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'productId query parameter required' }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = reviews.length;
    const averageRating = total > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / total : 5.0;

    return NextResponse.json({
      reviews,
      metrics: {
        total,
        averageRating: Number(averageRating.toFixed(1)),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ reviews: [], metrics: { total: 0, averageRating: 5.0 } });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getCurrentUser();
    const { productId, rating, title, comment, authorName } = body;

    if (!productId || !comment || !rating) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: user?.id || null,
        authorName: authorName || (user ? `${user.firstName} ${user.lastName}` : 'Anonymous Collector'),
        rating: Math.min(5, Math.max(1, Number(rating))),
        title: title || 'Curated Acquisition Note',
        comment,
        verifiedPurchase: !!user,
        isPublished: true,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
