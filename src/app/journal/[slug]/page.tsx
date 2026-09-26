import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../page';
import { PRODUCTS } from '@/lib/data/products';
import { ProductCard } from '@/features/products/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedProduct = PRODUCTS[0];

  return (
    <article className="w-full bg-[#FFFFFF]">
      {/* Back Breadcrumb */}
      <div className="border-b border-[#E5E5E5] py-4">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between text-xs uppercase tracking-[0.16em]">
          <Link
            href="/journal"
            className="flex items-center space-x-2 text-[#525252] hover:text-[#000000] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Monograph</span>
          </Link>

          <span className="text-[#A3A3A3] font-mono">{article.date}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-16 lg:py-24 border-b border-[#E5E5E5]">
        <div className="max-w-[860px] mx-auto px-6 space-y-6 text-center">
          <div className="flex items-center justify-center space-x-3 text-[10px] uppercase font-mono tracking-widest text-[#525252]">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.04em] text-[#000000] leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#525252] font-light leading-relaxed max-w-xl mx-auto">
            {article.subtitle}
          </p>
        </div>
      </header>

      {/* Hero Visual */}
      <div className="relative aspect-[21/9] w-full bg-[#FAFAFA] border-b border-[#E5E5E5] overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Editorial Content Body */}
      <div className="py-20 lg:py-28 max-w-[760px] mx-auto px-6 space-y-8 text-sm sm:text-base text-[#525252] font-light leading-relaxed">
        <p className="text-lg text-[#000000] leading-relaxed first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-light first-letter:leading-none">
          True reduction is not a stylistic gimmick; it is an uncompromising moral stance against visual and cognitive clutter. When every superfluous contour is eliminated from a physical object, the remaining geometry must bear absolute mathematical scrutiny.
        </p>

        <p>
          We observed that modern consumer hardware is designed for immediate tactile gratification that deteriorates within weeks. Painted plastics begin to peel; adhesives dry and loosen; internal batteries swell and demand replacement. In contrast, our inquiry begins with raw metallurgy: how can a single ingot of aerospace-grade 6061-T6 aluminum be carved to serve simultaneously as structural chassis, acoustic resonator, and tactile heatsink?
        </p>

        {/* Pull Quote */}
        <blockquote className="my-12 p-8 border-l-2 border-[#000000] bg-[#FAFAFA] text-lg sm:text-xl font-light text-[#000000] italic leading-snug">
          &ldquo;When you strip away ornamentation, you do not create emptiness. You unveil the quiet dignity of pure material truth.&rdquo;
        </blockquote>

        <p>
          The planar magnetic transducer is perhaps the purest acoustic manifestation of this philosophy. By suspending an ultra-thin 2-micron beryllium-vaporized diaphragm between opposing arrays of neodymium magnets, electromagnetic force acts uniformly across the entire surface plane. Phase cancellation vanishes. Transient speed approaches theoretical limits.
        </p>

        <p>
          What you hear is not the acoustic personality of the headphone chamber, but the air, room geometry, and finger friction of the original studio recording session. The instrument ceases to exist as an obstacle between mind and sound.
        </p>
      </div>

      {/* Companion Object Spotlight */}
      <section className="py-20 border-t border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center space-y-3 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
              Companion Object
            </span>
            <h3 className="text-2xl font-light tracking-[0.06em] text-[#000000]">
              The Physical Expression of this Monograph
            </h3>
          </div>

          <div className="max-w-md mx-auto">
            <ProductCard product={relatedProduct} />
          </div>
        </div>
      </section>
    </article>
  );
}
