import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '@/lib/data/products';

export const metadata = {
  title: 'Curated Collections | ATELIER',
  description: 'Thematic studies in monolithic acoustic architecture, tactile mechanics, and quietude.',
};

export default function CollectionsPage() {
  return (
    <div className="w-full bg-[#FFFFFF] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-10 mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Archival Lookbooks
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.06em] text-[#000000]">
            Curated Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#525252] max-w-xl font-light leading-relaxed">
            Each collection represents a focused architectural inquiry into material weight, acoustic void, and the tactile permanence of honest fabrication.
          </p>
        </div>

        {/* Collection Editorial List */}
        <div className="space-y-24">
          {COLLECTIONS.map((col, idx) => {
            const collectionProducts = PRODUCTS.filter((p) => p.collections?.includes(col.slug));
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-[#E5E5E5] pb-24"
              >
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''}`}>
                  <Link href={`/collections/${col.slug}`} className="block relative aspect-[16/10] bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden group">
                    <Image
                      src={col.heroImage}
                      alt={col.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>

                <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252]">
                    Monograph {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-3xl font-light tracking-[0.06em] text-[#000000]">
                    {col.title}
                  </h2>
                  <p className="text-sm uppercase tracking-[0.1em] text-[#171717] font-normal">
                    {col.tagline}
                  </p>
                  <p className="text-xs text-[#525252] leading-relaxed font-light">
                    {col.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#000000] border-b border-[#000000] pb-1 hover:text-[#525252] hover:border-[#525252] transition-colors"
                    >
                      <span>Explore {collectionProducts.length} Objects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
