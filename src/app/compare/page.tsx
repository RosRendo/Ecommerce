'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/store/cart-store';

export default function ComparePage() {
  const { addItem, openCart } = useCart();
  const compareProducts = PRODUCTS.slice(0, 3); // Aether 01, Monolith Speaker, Chrono 01

  const SPECS = [
    {
      category: 'Acoustic & Mechanical Architecture',
      items: [
        {
          label: 'Primary Transducer / Movement',
          values: [
            '50mm High-Flux Planar Magnetic (0.2μm diaphragm)',
            'Dual 6.5" Basalt-Reinforced Woofers + Isodynamic Ribbon',
            'Calibre AT-01 Automatic (28,800 vph, 42h power reserve)',
          ],
        },
        {
          label: 'Effective Frequency Response',
          values: ['5 Hz – 52,000 Hz (±1.5dB)', '22 Hz – 45,000 Hz (Room calibrated)', 'Accuracy: -2/+4 sec/day (COSC)'],
        },
        {
          label: 'Total Harmonic Distortion (THD)',
          values: ['< 0.05% @ 1kHz, 100dB SPL', '< 0.15% @ 90dB SPL', 'Non-magnetic anti-shock escapement'],
        },
        {
          label: 'Nominal Impedance / Power',
          values: ['32 Ohms (High-sensitivity)', '8 Ohms / 250W RMS', 'Self-winding bidirectional tungsten rotor'],
        },
      ],
    },
    {
      category: 'Materials & Physical Metallurgy',
      items: [
        {
          label: 'Chassis Metallurgy',
          values: [
            'Single-billet CNC 6061-T6 Aluminum',
            'Solid Swiss Basalt Stone + Anodized Aluminum',
            'Sintered Black Zirconia High-Tech Ceramic',
          ],
        },
        {
          label: 'Contact & Tactile Surfaces',
          values: [
            'Vegetable-Tanned Tuscan Calfskin & Memory Foam',
            'Acoustically Transparent Wool Linen Baffle',
            'Double-AR Coated Sapphire Crystal Front & Caseback',
          ],
        },
        {
          label: 'Physical Mass (Net Weight)',
          values: ['380 grams (Optimal pressure distribution)', '24.5 kg (Inert anti-resonance mass)', '112 grams'],
        },
        {
          label: 'Provenance & Assembly Location',
          values: ['Zurich Acoustic Atelier, Switzerland', 'Zurich Structural Laboratory, Switzerland', 'Jura Valley Horology Workshop, Switzerland'],
        },
      ],
    },
    {
      category: 'Logistics & Ownership Guarantee',
      items: [
        {
          label: 'Serial Calibration Certificate',
          values: ['Physical Letterpress Certificate Included', 'Hand-numbered Engraved Brass Plaque', 'Individually Numbered Horological Registry'],
        },
        {
          label: 'Atelier Warranty Term',
          values: ['2-Year Comprehensive Calibration', '5-Year Structural & Driver Warranty', '5-Year International Movement Warranty'],
        },
        {
          label: 'Dispatch Methodology',
          values: ['DHL Express Diplomatic Air', 'White Glove In-Room Installation', 'DHL Express Air Insured Handshake'],
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 text-xs uppercase tracking-[0.16em]">
          <Link
            href="/shop"
            className="flex items-center space-x-2 text-[#525252] hover:text-[#000000] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>
          <span className="text-[#A3A3A3]">Technical Comparison Matrix</span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Laboratory Benchmarks
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Specification &amp; Architecture Matrix
          </h1>
          <p className="text-xs text-[#525252] max-w-xl leading-relaxed">
            Side-by-side metallurgical, acoustic, and horological parameters for our core numbered instruments.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border border-[#E5E5E5] overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <th className="p-6 w-1/4 min-w-[200px] text-[10px] uppercase tracking-[0.2em] text-[#525252] font-medium align-bottom">
                  Product Overview
                </th>
                {compareProducts.map((prod) => (
                  <th key={prod.id} className="p-6 w-1/4 min-w-[240px] align-top space-y-3 border-l border-[#E5E5E5]">
                    <div className="relative aspect-square w-full bg-[#FFFFFF] border border-[#E5E5E5] overflow-hidden mb-3">
                      <Image
                        src={prod.images[0]?.url || ''}
                        alt={prod.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link
                      href={`/product/${prod.slug}`}
                      className="text-sm font-normal text-[#000000] tracking-[0.04em] hover:underline block"
                    >
                      {prod.title}
                    </Link>
                    <span className="font-mono text-sm text-[#000000] block">
                      {formatPrice(prod.basePrice)}
                    </span>
                    <button
                      onClick={() => {
                        addItem({
                          productId: prod.id,
                          productTitle: prod.title,
                          productSlug: prod.slug,
                          variantId: prod.variants[0]?.id || prod.id,
                          variantTitle: prod.variants[0]?.title || 'Standard',
                          price: prod.basePrice,
                          image: prod.images[0]?.url || '',
                        });
                        openCart();
                      }}
                      className="w-full h-10 bg-[#000000] text-[#FFFFFF] text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {SPECS.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr className="bg-[#FAFAFA] border-y border-[#E5E5E5]">
                    <td
                      colSpan={4}
                      className="py-3 px-6 text-[10px] uppercase tracking-[0.22em] text-[#000000] font-semibold"
                    >
                      {section.category}
                    </td>
                  </tr>

                  {section.items.map((item, iIdx) => (
                    <tr key={iIdx} className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="p-6 font-medium text-[#000000] bg-[#FFFFFF] border-r border-[#E5E5E5]">
                        {item.label}
                      </td>
                      {item.values.map((val, vIdx) => (
                        <td
                          key={vIdx}
                          className="p-6 text-[#525252] leading-relaxed border-r border-[#E5E5E5] font-light"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
