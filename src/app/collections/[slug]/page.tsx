import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '@/lib/data/products';
import { ProductCard } from '@/features/products/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) notFound();

  const collectionProducts = PRODUCTS.filter((p) => p.collections?.includes(slug));

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* Header Banner */}
      <div className="border-b border-[#E5E5E5] py-4">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between text-xs uppercase tracking-[0.16em]">
          <Link
            href="/collections"
            className="flex items-center space-x-2 text-[#525252] hover:text-[#000000] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collections</span>
          </Link>
          <span className="text-[#A3A3A3]">Series {collection.title}</span>
        </div>
      </div>

      {/* Hero Visual */}
      <section className="relative w-full aspect-[21/9] max-h-[550px] bg-[#FAFAFA] border-b border-[#E5E5E5] overflow-hidden">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 lg:p-16 text-[#FFFFFF]">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3] block">
              Curated Lookbook
            </span>
            <h1 className="text-3xl sm:text-5xl font-light tracking-[0.06em]">
              {collection.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#E5E5E5] leading-relaxed font-light">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products within collection */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-baseline mb-12 border-b border-[#E5E5E5] pb-4">
            <h2 className="text-xl sm:text-2xl font-light tracking-[0.06em] text-[#000000]">
              Objects within this Edition ({collectionProducts.length})
            </h2>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] transition-colors"
            >
              Explore Full Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
