'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (pathname.startsWith('/checkout')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#000000] text-[#FFFFFF] border-t border-[#171717] pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top Newsletter & Membership Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#171717]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3] block">
              The Atelier Gazette
            </span>
            <h2 className="text-2xl lg:text-3xl font-light tracking-[0.08em] text-[#FFFFFF] max-w-lg leading-snug">
              Quiet announcements. Numbered archival releases. Zero promotional noise.
            </h2>
            <p className="text-xs text-[#A3A3A3] max-w-md leading-relaxed">
              Receive curated monographs on industrial design, acoustic science, and advance notice of limited production runs.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            {isSubscribed ? (
              <div className="flex items-center space-x-3 text-sm tracking-[0.12em] text-[#FFFFFF] py-3">
                <Check className="w-4 h-4 text-[#FFFFFF]" />
                <span>You have been added to the private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex border-b border-[#525252] focus-within:border-[#FFFFFF] transition-colors pb-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm text-[#FFFFFF] placeholder:text-[#525252] focus:outline-none tracking-[0.06em]"
                  />
                  <button
                    type="submit"
                    className="text-[11px] uppercase tracking-[0.2em] text-[#FFFFFF] hover:text-[#A3A3A3] transition-colors flex items-center space-x-1 pl-4"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#525252] tracking-[0.04em]">
                  By subscribing you agree to receive editorial correspondences. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-[#171717]">
          {/* Column 1: Catalog */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#525252] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A3A3]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shop?filter=new"
                  className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Atelier */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#525252] font-semibold">
              The House
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A3A3]">
              <li>
                <Link href="/about" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Brand Manifesto
                </Link>
              </li>
              <li>
                <Link href="/collections/the-monolith" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Series 01: The Monolith
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Material Science
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Perpetual Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#525252] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A3A3]">
              <li>
                <Link href="/track" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Track Order (Milestones)
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Worldwide Dispatch &amp; Customs
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  30-Day Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Client Portal &amp; Concierge
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#FFFFFF] transition-colors tracking-[0.04em]">
                  Atelier Privé Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Ateliers */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#525252] font-semibold">
              Atelier Locations
            </h4>
            <div className="space-y-2 text-xs text-[#A3A3A3] tracking-[0.04em]">
              <p className="text-[#FFFFFF]">Zurich</p>
              <p className="text-[11px] text-[#525252]">Bahnhofstrasse 42, 8001</p>
              <p className="text-[#FFFFFF] pt-1">Tokyo</p>
              <p className="text-[11px] text-[#525252]">5-7-22 Minamiaoyama, Minato-ku</p>
              <p className="text-[#FFFFFF] pt-1">New York</p>
              <p className="text-[11px] text-[#525252]">456 West Broadway, SoHo</p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#525252] tracking-[0.1em] uppercase space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <span className="text-[#FFFFFF] tracking-[0.28em] font-normal">ATELIER</span>
            <span>© 2026 Atelier Systems</span>
            <span>All Rights Reserved</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-[#A3A3A3] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#A3A3A3] cursor-pointer transition-colors">Terms of Sale</span>
            <span className="hover:text-[#A3A3A3] cursor-pointer transition-colors">Accessibility</span>
            <span className="text-[#FFFFFF] cursor-pointer border border-[#171717] px-2 py-0.5">
              USD ($)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
