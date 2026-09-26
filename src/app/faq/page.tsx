'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ_DATA = [
  {
    category: 'Dispatches & Logistics',
    items: [
      {
        q: 'How does Atelier handle international customs duties and taxes (DDP)?',
        a: 'Every international acquisition is dispatched DDP (Delivery Duty Paid). All customs tariffs, import clearance fees, and regional sales taxes/VAT are settled directly by the Atelier prior to flight boarding. The recipient will never receive surprise courier fee collection requests.',
      },
      {
        q: 'What carriers are utilized for transport?',
        a: 'We partner exclusively with DHL Express Diplomatic Air and Swiss Postal Priority Freight. High-value acoustic columns and heavy architectural pieces are routed through dedicated climate-regulated air cargo.',
      },
      {
        q: 'How do I follow the physical milestones of my shipment?',
        a: 'You can monitor your order at any time via our public Chronological Milestone Tracker at /track by entering your Order Reference Number (e.g. ATL-2026-891024) or carrier tracking code.',
      },
    ],
  },
  {
    category: '30-Day Evaluation & Returns',
    items: [
      {
        q: 'What is the Atelier 30-day unconditioned evaluation window?',
        a: 'We understand that true acoustic fidelity depends on the listener’s unique architectural space. If an instrument does not achieve harmonic balance in your room within 30 calendar days of delivery, you may initiate a return or variant exchange through our self-service portal at /returns.',
      },
      {
        q: 'Who covers return shipping fees?',
        a: 'Complimentary prepaid DHL Express return airbills are provided automatically when you generate a Return Merchandise Authorization (RMA) slip on /returns.',
      },
      {
        q: 'How quickly are refunds or exchanges executed?',
        a: 'Upon arrival at our Zurich facility, master technicians complete a 48-hour mechanical and acoustic inspection. Once sign-off is logged, refunds are credited back to your original payment method immediately.',
      },
    ],
  },
  {
    category: 'Acoustic Science & Instrument Calibration',
    items: [
      {
        q: 'Do planar magnetic transducers require acoustic burn-in?',
        a: 'Every pair of Aether 01 headphones undergoes 48 hours of continuous laboratory sine-wave sweep testing in our Zurich acoustic chamber before packaging. However, an additional 20 hours of varied musical listening will further settle the suspension damping to your preferences.',
      },
      {
        q: 'What amplification output is recommended?',
        a: 'With a 32-Ohm nominal impedance and 102dB/mW sensitivity, our headphones can be driven by high-quality mobile DACs, but achieve maximum dynamic headroom and soundstage when paired with balanced discrete solid-state or OTL tube amplifiers delivering at least 1.5 Watts RMS.',
      },
      {
        q: 'How do I verify the authenticity of an engraved serial number?',
        a: 'Visit our Serial Number Provenance Verification portal at /verify and enter the laser-etched serial code found on your instrument’s chassis.',
      },
    ],
  },
  {
    category: 'Payment, Security & Privé Membership',
    items: [
      {
        q: 'What payment methodologies are supported?',
        a: 'We accept major global cards via Stripe, Apple Pay, and direct wire transfer for four-figure acquisitions. We also support interest-free installment acquisition.',
      },
      {
        q: 'What are the benefits of the Atelier Privé register?',
        a: 'Enrolled clients receive 24-hour advance private reservation windows on numbered archival drops, dedicated concierge lines, and private salon listening bookings in Zurich, Tokyo, New York, and Paris.',
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');

  const filteredCategories = FAQ_DATA.map((cat) => {
    const filteredItems = cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase()),
    );
    return {
      ...cat,
      items: filteredItems,
    };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Client Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Frequently Asked Inquiries &amp; Knowledge Base
          </h1>
          <p className="text-xs text-[#525252] max-w-xl leading-relaxed">
            Direct clarity regarding customs tariffs, dispatch velocity, acoustic pairing recommendations, and return protocols.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries (e.g. customs, burn-in, returns, amplification)..."
            className="w-full h-12 pl-11 pr-4 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:bg-[#FFFFFF] focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-[#525252] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Categorized Accordions */}
        <div className="space-y-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.24em] text-[#000000] font-semibold border-b border-[#E5E5E5] pb-2">
                  {cat.category}
                </h3>

                <Accordion type="multiple" className="w-full">
                  {cat.items.map((item, iIdx) => (
                    <AccordionItem key={iIdx} value={`${cIdx}-${iIdx}`}>
                      <AccordionTrigger className="text-left text-xs font-normal text-[#000000] tracking-[0.02em] hover:text-[#525252]">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-[#525252] leading-relaxed font-light">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <div className="p-12 border border-[#E5E5E5] text-center space-y-3 bg-[#FAFAFA]">
              <p className="text-xs uppercase tracking-[0.16em] text-[#525252]">
                No answers matching "{search}"
              </p>
              <p className="text-xs text-[#A3A3A3]">
                Our private concierge is available to answer custom technical inquiries.
              </p>
              <Link
                href="/contact"
                className="text-xs uppercase tracking-[0.18em] text-[#000000] underline inline-block pt-2"
              >
                Inquire with Concierge →
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="border border-[#000000] bg-[#FFFFFF] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#525252]">
              Unresolved Technical Query?
            </span>
            <h4 className="text-base font-normal tracking-[0.04em] text-[#000000]">
              Direct Salon Acoustic Consultation
            </h4>
            <p className="text-xs text-[#525252] font-light">
              Speak directly with an acoustic engineer at our Zurich laboratory.
            </p>
          </div>

          <Link
            href="/contact"
            className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <span>Contact Concierge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
