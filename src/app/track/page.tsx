'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, Package, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { MilestoneTimeline } from '@/features/tracking/MilestoneTimeline';
import { OrderTrackingInfo } from '@/types';

// Curated mock tracking database
const TRACKING_DATABASE: Record<string, OrderTrackingInfo> = {
  'ATL-2026-891024': {
    orderNumber: 'ATL-2026-891024',
    trackingCode: 'DHL-892410-CH',
    carrier: 'DHL Express Diplomatic Air',
    status: 'In Transit',
    estimatedDelivery: 'September 28, 2026 • by 14:00 EST',
    origin: 'Atelier Systems Zurich (CH)',
    destination: 'New York, NY 10014 (US)',
    items: [
      {
        title: 'Aether 01 Headphones',
        variant: 'Matte Obsidian',
        quantity: 1,
        price: 850,
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        stageName: 'Acquisition Confirmed & Numbered',
        location: 'Zurich Central Registry, Switzerland',
        timestamp: 'Sep 18, 2026 • 11:20 CEST',
        description: 'Order cryptographic verification verified. Serial number assignment #0492 affixed to invoice.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-2',
        stageName: 'Precision Calibration & Acoustic Balancing',
        location: 'Zurich Acoustic Laboratory, Switzerland',
        timestamp: 'Sep 19, 2026 • 14:45 CEST',
        description: 'Planar magnetic transducers matched within ±0.2dB frequency tolerance. Master technician seal stamped.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-3',
        stageName: 'Sealed & Dispatched via Diplomatic Air',
        location: 'Zurich Airport Freight Terminal (ZRH)',
        timestamp: 'Sep 21, 2026 • 18:30 CEST',
        description: 'Encased in custom high-density unbleached linen carton. Transferred to DHL Express Air aircraft LH-402.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-4',
        stageName: 'Customs & Import Duties Pre-Cleared (DDP)',
        location: 'JFK International Airport Cargo Facility, NY',
        timestamp: 'Sep 23, 2026 • 06:15 EST',
        description: 'Customs documents cleared under Atelier Diplomatic Registry. All federal duties and taxes prepaid in full.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-5',
        stageName: 'Designated Air Courier In Transit',
        location: 'Manhattan Regional Sorting Facility, NY',
        timestamp: 'Sep 25, 2026 • 08:30 EST',
        description: 'Package received at regional hub. Allocated to dedicated courier for scheduled White Glove doorstep delivery.',
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 'ms-6',
        stageName: 'Delivered & Signature Verification',
        location: 'Recipient Doorstep, Meatpacking District, NY',
        timestamp: 'Pending Expected Sep 28, 2026',
        description: 'Recipient signature and physical Certificate of Authenticity handover required.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'ATL-2026-614092': {
    orderNumber: 'ATL-2026-614092',
    trackingCode: 'DHL-551029-US',
    carrier: 'DHL Express Air Priority',
    status: 'Delivered',
    estimatedDelivery: 'Delivered on August 04, 2026',
    origin: 'Atelier Systems Zurich (CH)',
    destination: 'Los Angeles, CA 90210 (US)',
    items: [
      {
        title: 'Titanium Mechanical Pencil',
        variant: 'Satin Blasted Titanium',
        quantity: 1,
        price: 185,
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        stageName: 'Acquisition Confirmed',
        location: 'Zurich, Switzerland',
        timestamp: 'Jul 29, 2026 • 09:00 CEST',
        description: 'Payment authorized and single-billet machining inspect verified.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-2',
        stageName: 'Dispatched via Express Air',
        location: 'Zurich Airport (ZRH)',
        timestamp: 'Jul 30, 2026 • 19:10 CEST',
        description: 'Sealed and handed to carrier.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-3',
        stageName: 'Delivered & Signed by Recipient',
        location: 'Los Angeles, CA',
        timestamp: 'Aug 04, 2026 • 11:22 PST',
        description: 'Successfully received and verified at front desk.',
        isCompleted: true,
        isCurrent: true,
      },
    ],
  },
  'ATL-2026-304198': {
    orderNumber: 'ATL-2026-304198',
    trackingCode: 'SWISS-918234-CH',
    carrier: 'Swiss Diplomatic Freight',
    status: 'In Production & Calibration',
    estimatedDelivery: 'October 12, 2026',
    origin: 'Atelier Systems Zurich (CH)',
    destination: 'London, Mayfair (UK)',
    items: [
      {
        title: 'The Monolith Speaker',
        variant: 'Raw Anodized Aluminum',
        quantity: 1,
        price: 3200,
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        stageName: 'Acquisition Confirmed',
        location: 'Zurich Central Registry',
        timestamp: 'Sep 24, 2026 • 16:00 CEST',
        description: 'Numbered casing reserved. Volcanic stone acoustic baffle being fitted.',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'ms-2',
        stageName: 'Precision Calibration & Annealing',
        location: 'Zurich Acoustic Lab',
        timestamp: 'Sep 26, 2026 • Active Now',
        description: 'Undergoing 48-hour acoustic burn-in and harmonic distortion testing.',
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 'ms-3',
        stageName: 'Diplomatic Air Courier Dispatch',
        location: 'Zurich, CH',
        timestamp: 'Scheduled for Sep 30, 2026',
        description: 'Flight booking to London Heathrow.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
};

function TrackContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('order') || '';

  const [query, setQuery] = useState(initialQuery);
  const [currentOrder, setCurrentOrder] = useState<OrderTrackingInfo | null>(
    initialQuery && TRACKING_DATABASE[initialQuery]
      ? TRACKING_DATABASE[initialQuery]
      : TRACKING_DATABASE['ATL-2026-891024'],
  );
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get('order');
    if (param) {
      setQuery(param);
      if (TRACKING_DATABASE[param]) {
        setCurrentOrder(TRACKING_DATABASE[param]);
        setSearchError(null);
      } else {
        setSearchError(`No tracking record found for "${param}".`);
      }
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();

    if (!clean) {
      setSearchError('Please provide an order reference or tracking code.');
      return;
    }

    // Match either by orderNumber or trackingCode
    const found = Object.values(TRACKING_DATABASE).find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.trackingCode.toUpperCase() === clean,
    );

    if (found) {
      setCurrentOrder(found);
      setSearchError(null);
    } else {
      setSearchError(
        `Reference "${clean}" was not found in active dispatches. Please verify the code or contact concierge.`,
      );
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Editorial Heading */}
        <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Dispatch &amp; Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Shipment Milestone Tracker
          </h1>
          <p className="text-xs text-[#525252] max-w-xl leading-relaxed">
            Follow the hand-assembly, acoustic laboratory calibration, and diplomatic air transit of your acquired objects in real time.
          </p>
        </div>

        {/* Tracking Input Bar */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order Reference (e.g. ATL-2026-891024 or DHL-892410-CH)"
                className="w-full h-12 px-4 bg-[#FAFAFA] border border-[#E5E5E5] text-xs font-mono text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:bg-[#FFFFFF] focus:outline-none transition-colors uppercase tracking-[0.08em]"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-8 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Track Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Pre-select Links */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#525252] tracking-[0.08em]">
            <span className="uppercase tracking-[0.16em]">Quick Sample References:</span>
            {Object.keys(TRACKING_DATABASE).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setQuery(key);
                  setCurrentOrder(TRACKING_DATABASE[key]);
                  setSearchError(null);
                }}
                className={`font-mono px-2 py-0.5 border transition-colors cursor-pointer ${
                  currentOrder?.orderNumber === key
                    ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                    : 'border-[#E5E5E5] bg-[#FAFAFA] text-[#000000] hover:border-[#000000]'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {searchError && (
            <div className="p-4 border border-[#000000] bg-[#FAFAFA] text-xs text-[#000000] flex items-center space-x-3">
              <AlertCircle className="w-4 h-4 text-[#000000] flex-shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Milestone Timeline Display */}
        {currentOrder ? (
          <MilestoneTimeline
            milestones={currentOrder.milestones}
            orderNumber={currentOrder.orderNumber}
            trackingCode={currentOrder.trackingCode}
            carrier={currentOrder.carrier}
            estimatedDelivery={currentOrder.estimatedDelivery}
            origin={currentOrder.origin}
            destination={currentOrder.destination}
          />
        ) : (
          <div className="p-16 border border-[#E5E5E5] text-center space-y-4 bg-[#FAFAFA]">
            <Package className="w-8 h-8 text-[#A3A3A3] mx-auto" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#525252]">
              No active shipment selected
            </p>
            <p className="text-xs text-[#A3A3A3] max-w-sm mx-auto">
              Please enter an Order Reference Number above to view its chronological milestone progression.
            </p>
          </div>
        )}

        {/* Post-Purchase Support Links */}
        <div className="pt-8 border-t border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#525252]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#000000] font-medium block">
              30-Day Evaluation Period
            </span>
            <p className="text-[11px] leading-relaxed">
              If an object does not harmonize with your acoustic environment, you may initiate a return anytime within 30 days.
            </p>
            <Link href="/returns" className="text-[#000000] hover:underline font-medium block pt-1">
              Start Return / Exchange →
            </Link>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#000000] font-medium block">
              DDP Customs Guarantee
            </span>
            <p className="text-[11px] leading-relaxed">
              All international duties and customs tariffs are settled directly by the Atelier. No surprise import invoices.
            </p>
            <Link href="/shipping" className="text-[#000000] hover:underline font-medium block pt-1">
              Shipping Guidelines →
            </Link>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#000000] font-medium block">
              Direct Salon Concierge
            </span>
            <p className="text-[11px] leading-relaxed">
              For real-time delivery modifications, White Glove room scheduling, or address corrections.
            </p>
            <Link href="/account" className="text-[#000000] hover:underline font-medium block pt-1">
              Consult Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[50vh] flex items-center justify-center text-xs uppercase tracking-[0.2em] text-[#525252]">
          Loading dispatch records...
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  );
}
