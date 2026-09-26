import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About the House | ATELIER',
  description: 'The philosophy of essentialism, Swiss precision engineering, and monolithic material permanence.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* Editorial Header */}
      <section className="py-20 lg:py-32 border-b border-[#E5E5E5]">
        <div className="max-w-[1000px] mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            The Atelier Monograph
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-[0.04em] text-[#000000] leading-tight">
            Form follows void: the permanence of reduction.
          </h1>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-2xl mx-auto font-light">
            Founded in Zurich in 2026, Atelier operates at the intersection of industrial acoustics, mechanical horology, and architectural minimalism.
          </p>
        </div>
      </section>

      {/* Main Image Spread */}
      <section className="border-b border-[#E5E5E5]">
        <div className="relative aspect-[21/9] w-full bg-[#FAFAFA] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=90"
            alt="Atelier Precision Workshop"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Philosophy & Craftsmanship Section */}
      <section id="craftsmanship" className="py-20 lg:py-32 border-b border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
                01 / Material Truth
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000]">
                Refusal of synthetic composites.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-[#525252] leading-relaxed font-light">
              <p>
                We do not use plastics, faux veneers, or synthetic leather substitutes that degrade within seasons. We source exclusively unadulterated raw materials: solid 6061-T6 aluminum milled with 5-axis CNC cutters, vein-selected Spanish translucent alabaster, high-density polymer concrete, and vegetable-tanned full-grain hide from Santa Croce sull’Arno.
              </p>
              <p>
                Every surface is tactile. Every seam is calibrated to tolerances beneath 0.02 millimeters. The result is an object of unyielding physical presence that settles into a room with quiet authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 lg:py-32 border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-[#FFFFFF] border border-[#E5E5E5]">
              <span className="text-xs font-mono text-[#A3A3A3] block">01</span>
              <h3 className="text-lg font-normal tracking-[0.08em] text-[#000000] uppercase">
                Acoustic Void
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                Sound reproduction without harmonic discoloration. We tune our planar magnetic drivers to mirror acoustic truth rather than artificial bass amplification.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-[#FFFFFF] border border-[#E5E5E5]">
              <span className="text-xs font-mono text-[#A3A3A3] block">02</span>
              <h3 className="text-lg font-normal tracking-[0.08em] text-[#000000] uppercase">
                Tactile Resistance
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                In a touch-screen world, our analog dials, knurled knobs, and mechanical winding calibres reintroduce the visceral satisfaction of physical mechanics.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-[#FFFFFF] border border-[#E5E5E5]">
              <span className="text-xs font-mono text-[#A3A3A3] block">03</span>
              <h3 className="text-lg font-normal tracking-[0.08em] text-[#000000] uppercase">
                Perpetual Service
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                Every object is modularly assembled with non-destructive fasteners. We guarantee component availability and restoration service for a minimum of 25 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Locations Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
              Global Presence
            </span>
            <h2 className="text-3xl font-light tracking-[0.06em] text-[#000000]">
              The Salons &amp; Listening Ateliers
            </h2>
            <p className="text-xs text-[#525252] max-w-md mx-auto leading-relaxed">
              Private acoustic auditions and bespoke consultations by appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="p-6 border border-[#E5E5E5] space-y-2">
              <h4 className="text-sm uppercase tracking-[0.14em] font-medium text-[#000000]">
                Zurich (Headquarters)
              </h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                Bahnhofstrasse 42, 8001 Zurich<br />
                Acoustic Research &amp; Precision Milling
              </p>
            </div>

            <div className="p-6 border border-[#E5E5E5] space-y-2">
              <h4 className="text-sm uppercase tracking-[0.14em] font-medium text-[#000000]">
                Tokyo
              </h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                5-7-22 Minamiaoyama, Minato-ku<br />
                Horology &amp; Titanium Finishing Studio
              </p>
            </div>

            <div className="p-6 border border-[#E5E5E5] space-y-2">
              <h4 className="text-sm uppercase tracking-[0.14em] font-medium text-[#000000]">
                New York
              </h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                456 West Broadway, SoHo, NY 10012<br />
                Listening Salon &amp; Private Viewing
              </p>
            </div>

            <div className="p-6 border border-[#E5E5E5] space-y-2">
              <h4 className="text-sm uppercase tracking-[0.14em] font-medium text-[#000000]">
                Paris
              </h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                18 Rue de Turenne, 75004 Paris<br />
                Architectural Lighting Gallery
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#FFFFFF] bg-[#000000] px-8 py-4 hover:bg-[#171717] transition-colors"
            >
              <span>Explore Archival Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
