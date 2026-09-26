'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Plane, Box, Clock, Sparkles } from 'lucide-react';

export default function ShippingPage() {
  const TIERS = [
    {
      region: 'North America (US & Canada)',
      transitTime: '2 – 3 Business Days',
      carrier: 'DHL Express Diplomatic Air',
      threshold: 'Complimentary on orders over $300 (Standard: $35)',
      duties: 'DDP Included (All US/CA Tariffs & Taxes Prepaid)',
    },
    {
      region: 'Europe & United Kingdom',
      transitTime: '1 – 2 Business Days',
      carrier: 'Swiss Diplomatic Air / DHL Express',
      threshold: 'Complimentary on orders over €280 / £250 (Standard: €25)',
      duties: 'DDP Included (VAT Pre-cleared, Zero Import Friction)',
    },
    {
      region: 'Asia-Pacific (Japan, Singapore, HK, Australia)',
      transitTime: '3 – 4 Business Days',
      carrier: 'DHL Express Priority Air',
      threshold: 'Complimentary on orders over ¥45,000 (Standard: ¥4,000)',
      duties: 'DDP Included (Customs Pre-cleared at Port of Entry)',
    },
    {
      region: 'Middle East & Rest of World',
      transitTime: '3 – 5 Business Days',
      carrier: 'DHL Express Worldwide Diplomatic',
      threshold: 'Complimentary on orders over $500 (Standard: $55)',
      duties: 'DDP Included (Landed Cost 100% Guaranteed)',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Logistics &amp; Transport
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Worldwide Dispatch &amp; Shipping Guidelines
          </h1>
          <p className="text-xs text-[#525252] max-w-2xl leading-relaxed">
            Every instrument crafted in Zurich is secured in sustainable, shock-absorbent unbleached linen cartons and routed via high-velocity diplomatic air courier corridors.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#E5E5E5] p-6 lg:p-8 space-y-3 bg-[#FAFAFA]">
            <Plane className="w-5 h-5 text-[#000000]" />
            <h3 className="text-sm uppercase tracking-[0.14em] text-[#000000] font-medium">
              Express Diplomatic Air
            </h3>
            <p className="text-xs text-[#525252] leading-relaxed">
              We do not utilize bulk maritime freight. Dispatches travel directly by air to minimize thermal fluctuations and transit shock.
            </p>
          </div>

          <div className="border border-[#E5E5E5] p-6 lg:p-8 space-y-3 bg-[#FAFAFA]">
            <ShieldCheck className="w-5 h-5 text-[#000000]" />
            <h3 className="text-sm uppercase tracking-[0.14em] text-[#000000] font-medium">
              100% DDP Customs Guarantee
            </h3>
            <p className="text-xs text-[#525252] leading-relaxed">
              Delivery Duty Paid. All import tariffs, excise taxes, and customs broker fees are prepaid by Atelier. No surprise courier fee requests upon arrival.
            </p>
          </div>

          <div className="border border-[#E5E5E5] p-6 lg:p-8 space-y-3 bg-[#FAFAFA]">
            <Box className="w-5 h-5 text-[#000000]" />
            <h3 className="text-sm uppercase tracking-[0.14em] text-[#000000] font-medium">
              Full Replacement Insurance
            </h3>
            <p className="text-xs text-[#525252] leading-relaxed">
              Every shipment is privately underwritten for its complete acquisition value from our Zurich workbench until your physical signature is obtained.
            </p>
          </div>
        </div>

        {/* Regional Corridors Table */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
              International Coverage
            </span>
            <h2 className="text-xl font-light tracking-[0.06em] text-[#000000]">
              Transit Windows &amp; Regional Thresholds
            </h2>
          </div>

          <div className="border border-[#E5E5E5] overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[10px] uppercase tracking-[0.18em] text-[#525252]">
                  <th className="py-4 px-6 font-medium">Destination Corridor</th>
                  <th className="py-4 px-6 font-medium">Estimated Transit</th>
                  <th className="py-4 px-6 font-medium">Carrier</th>
                  <th className="py-4 px-6 font-medium">Complimentary Threshold</th>
                  <th className="py-4 px-6 font-medium">Duties &amp; Tariffs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {TIERS.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA]/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#000000]">{tier.region}</td>
                    <td className="py-4 px-6 text-[#525252] font-mono">{tier.transitTime}</td>
                    <td className="py-4 px-6 text-[#525252]">{tier.carrier}</td>
                    <td className="py-4 px-6 text-[#000000]">{tier.threshold}</td>
                    <td className="py-4 px-6 text-[#525252]">{tier.duties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* White Glove Service */}
        <div className="border border-[#000000] bg-[#FFFFFF] p-8 lg:p-12 space-y-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-[#000000]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252]">
              Specialist Service
            </span>
          </div>

          <h2 className="text-2xl font-light tracking-[0.06em] text-[#000000]">
            White Glove Installation for Heavy Acoustic Architecture
          </h2>

          <p className="text-xs text-[#525252] max-w-2xl leading-relaxed">
            For architectural monolithic speakers weighing in excess of 20kg (such as The Monolith Column), we offer private white-glove two-man delivery. Specialists carry the instrument to your designated room, uncrate the volcanic stone baffle, position it for optimal acoustic resonance, and remove all sustainable crating materials.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <Link
              href="/track"
              className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
            >
              Track Active Shipment →
            </Link>
            <Link
              href="/returns"
              className="h-11 px-6 border border-[#E5E5E5] text-[#000000] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:border-[#000000] transition-colors"
            >
              View 30-Day Evaluation Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
