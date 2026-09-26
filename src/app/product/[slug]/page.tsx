import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { ProductGallery } from '@/features/products/ProductGallery';
import { ProductInfo } from '@/features/products/ProductInfo';
import { ProductCard } from '@/features/products/ProductCard';
import { AcousticVisualizer } from '@/components/audio/AcousticVisualizer';
import { ProductReviews } from '@/features/reviews/ProductReviews';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Object Not Found | ATELIER' };
  }

  return {
    title: `${product.title} | ATELIER`,
    description: product.description,
    openGraph: {
      title: `${product.title} | ATELIER`,
      description: product.subtitle,
      images: [{ url: product.images[0]?.url || '' }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category.slug === product.category.slug,
  ).slice(0, 4);

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* Top back navigation breadcrumb */}
      <div className="border-b border-[#E5E5E5] py-4">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between text-xs uppercase tracking-[0.16em]">
          <Link
            href="/shop"
            className="flex items-center space-x-2 text-[#525252] hover:text-[#000000] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>

          <span className="text-[#A3A3A3] hidden sm:inline">
            Catalog Reference: {product.variants[0]?.sku || product.id}
          </span>
        </div>
      </div>

      {/* Main PDP Layout: LEFT gallery (7 cols) / RIGHT purchasing details (5 cols) */}
      <section className="py-12 lg:py-20 border-b border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT: Large Product Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} title={product.title} />
            </div>

            {/* RIGHT: Clear Purchasing Hierarchy & Details */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Craftsmanship Vignette */}
      {product.story && (
        <section className="py-20 lg:py-28 border-b border-[#E5E5E5] bg-[#FAFAFA]">
          <div className="max-w-[1000px] mx-auto px-6 text-center space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
              Atelier Engineering Dossier
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000]">
              The Provenance of {product.title}
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-2xl mx-auto font-light">
              {product.story}
            </p>
          </div>
        </section>
      )}

      {/* Interactive Acoustic Laboratory Visualizer (for Audio Instruments) */}
      {product.category.slug === 'acoustic-architecture' && (
        <section className="py-16 lg:py-24 border-b border-[#E5E5E5] bg-[#FFFFFF]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <AcousticVisualizer />
          </div>
        </section>
      )}

      {/* Client Evaluations & Peer Reviews */}
      <ProductReviews
        productId={product.id}
        productTitle={product.title}
        initialRating={product.rating || 4.9}
      />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-baseline mb-12 border-b border-[#E5E5E5] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-1">
                  Complementary Objects
                </span>
                <h3 className="text-2xl font-light tracking-[0.06em] text-[#000000]">
                  Related from {product.category.name}
                </h3>
              </div>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] transition-colors"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
