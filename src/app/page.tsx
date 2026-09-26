import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sliders, ShieldCheck, Award } from 'lucide-react';
import { PRODUCTS, COLLECTIONS } from '@/lib/data/products';
import { ProductCard } from '@/features/products/ProductCard';
import { HeroCinematic } from '@/components/home/HeroCinematic';
import { CinematicScrollReel } from '@/components/home/CinematicScrollReel';

export default function HomePage() {
  const featuredCollection = COLLECTIONS[0]; // Series 01: The Monolith
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* 1. Interactive Cinematic Hero with Staggered Motion & Hotspots */}
      <HeroCinematic />

      {/* 2. Featured Collection: Asymmetric Editorial Lookbook */}
      <section className="w-full border-b border-[#E5E5E5] py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section Header with generous whitespace */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-2">
                Curated Series
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
                {featuredCollection.title}
              </h2>
            </div>
            <p className="text-xs text-[#525252] max-w-md leading-relaxed tracking-[0.02em]">
              {featuredCollection.description}
            </p>
          </div>

          {/* Varied Image Proportions & Editorial Compositions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Enormous Tall Editorial Feature (7 Columns) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] w-full bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden group">
                <Image
                  src={featuredCollection.heroImage}
                  alt={featuredCollection.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-[#FFFFFF]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3]">
                    Monolith Lookbook Archive
                  </p>
                  <p className="text-xl sm:text-2xl font-light tracking-[0.06em] mt-1 max-w-md">
                    Machined from single-billet aluminum and cast volcanic stone.
                  </p>
                  <Link
                    href={`/collections/${featuredCollection.slug}`}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] mt-4 text-[#FFFFFF] hover:underline"
                  >
                    <span>View Monolith Lookbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Companion Product Stack (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              {PRODUCTS.filter((p) => p.collections?.includes('the-monolith'))
                .slice(1, 3)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cinematic Scrolling 35mm Master Reel with Motion & Video */}
      <CinematicScrollReel />

      {/* 4. New Arrivals: 4-Column Clean Grid */}
      <section className="w-full border-b border-[#E5E5E5] py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-2">
                Recent Dispatches
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000]">
                Numbered New Arrivals
              </h2>
            </div>

            <Link
              href="/shop?filter=new"
              className="text-xs uppercase tracking-[0.18em] text-[#000000] hover:text-[#525252] transition-colors flex items-center space-x-1"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial Architectural Gateways: Specifications Matrix & Provenance */}
      <section className="w-full border-b border-[#E5E5E5] bg-[#FAFAFA] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gateway 1: Comparison Matrix */}
            <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <Sliders className="w-6 h-6 text-[#000000]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#525252] block">
                  Technical Architecture
                </span>
                <h3 className="text-2xl font-light tracking-[0.06em] text-[#000000]">
                  Specification Comparison Matrix
                </h3>
                <p className="text-xs text-[#525252] leading-relaxed font-light">
                  Direct side-by-side analysis of frequency response curves, transducer topologies, single-billet metallurgies, and physical mass.
                </p>
              </div>

              <Link
                href="/compare"
                className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors inline-flex items-center justify-center space-x-2 w-fit"
              >
                <span>Compare Instruments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Gateway 2: Serial Number Provenance Verification */}
            <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <Award className="w-6 h-6 text-[#000000]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#525252] block">
                  Authenticity Registry
                </span>
                <h3 className="text-2xl font-light tracking-[0.06em] text-[#000000]">
                  Serial Number Provenance Check
                </h3>
                <p className="text-xs text-[#525252] leading-relaxed font-light">
                  Input your engraved laser serial number to verify master artisan sign-off, laboratory batch calibration date, and letterpress Certificate of Authenticity.
                </p>
              </div>

              <Link
                href="/verify"
                className="h-11 px-6 bg-[#FFFFFF] border border-[#000000] text-[#000000] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors inline-flex items-center justify-center space-x-2 w-fit"
              >
                <span>Verify Serial Provenance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Editorial Brand Section: Philosophy of Essentialism */}
      <section className="w-full border-b border-[#E5E5E5] bg-[#FFFFFF] py-24 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Large Image (6 Columns) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
                  alt="Precision Machining at Atelier Zurich"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Short Story & Minimal Typography (6 Columns) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] font-medium">
                The Atelier Manifesto
              </span>

              <h2 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000] leading-snug">
                Form follows void: the permanence of reduction.
              </h2>

              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-light">
                In an era overwhelmed by disposable plastic consumer electronics and ephemeral cycles, we construct permanent physical objects. Each piece is CNC-machined from single billets of aluminum, unglazed ceramics, and volcanic basalt stone.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#000000] hover:text-[#525252] transition-colors border-b border-[#000000] pb-1"
                >
                  <span>Read Full Brand Manifesto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
