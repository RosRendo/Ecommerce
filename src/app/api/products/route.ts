import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');

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
