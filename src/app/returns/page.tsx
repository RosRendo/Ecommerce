'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Package, RotateCcw, ShieldCheck, Printer } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ReturnsPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedReason, setSelectedReason] = useState('acoustic_mismatch');
  const [resolution, setResolution] = useState<'refund' | 'exchange'>('refund');
  const [notes, setNotes] = useState('');
  const [rmaCode, setRmaCode] = useState('');

  const REASONS = [
    {
      id: 'acoustic_mismatch',
      label: 'Acoustic Characteristic Mismatch',
      desc: 'The soundstage or acoustic profile does not match your specific listening environment.',
    },
    {
      id: 'ergonomics_fit',
      label: 'Ergonomic or Proportions Fit',
      desc: 'The physical dimensions or headband clamping pressure require adjustment.',
    },
    {
      id: 'exchange_variant',
      label: 'Exchange for Alternate Finish',
      desc: 'Wish to exchange for a different material or colorway (e.g. Matte Obsidian to Raw Silver).',
    },
    {
      id: 'flawless_evaluation',
      label: 'General 30-Day Evaluation Return',
      desc: 'Exercising the standard 30-day unconditioned evaluation guarantee.',
    },
  ];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber && email) {
      setStep(2);
    }
  };

  const handleGenerateRMA = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RMA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setRmaCode(code);
    setStep(3);
  };

  const prefillDemo = () => {
    setOrderNumber('ATL-2026-891024');
    setEmail('marcus.vance@atelier-prive.com');
  };

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Client Guarantee
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Self-Service Returns &amp; Exchanges Portal
          </h1>
          <p className="text-xs text-[#525252] max-w-xl leading-relaxed">
            Every numbered instrument from the Atelier includes a complimentary 30-day domestic and international evaluation window. We provide prepaid insured return shipping.
          </p>
        </div>

        {/* Multi-step Flow */}
        {step === 1 && (
          <div className="max-w-xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-lg font-light tracking-[0.06em] text-[#000000]">
                Step 1: Locate Acquisition Record
              </h2>
              <p className="text-xs text-[#525252]">
                Enter the order reference provided on your Certificate of Authenticity or shipping confirmation.
              </p>
            </div>

            <form onSubmit={handleLookup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block">
                  Order Reference Number
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. ATL-2026-891024"
                  className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs font-mono uppercase tracking-[0.08em] text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block">
                  Client Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus.vance@atelier-prive.com"
                  className="w-full h-12 px-4 bg-[#FFFFFF] border border-[#E5E5E5] text-sm text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Verify Order Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={prefillDemo}
                  className="text-[10px] uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] underline underline-offset-4 cursor-pointer"
                >
                  Quick test with recent order (Marcus Vance)
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <div>
                <h2 className="text-lg font-light tracking-[0.06em] text-[#000000]">
                  Step 2: Select Reason &amp; Desired Resolution
                </h2>
                <p className="text-xs text-[#525252]">
                  Order: <strong className="font-mono text-[#000000]">{orderNumber}</strong> ({email})
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#525252] hover:text-[#000000] uppercase tracking-[0.16em]"
              >
                Change Order
              </button>
            </div>

            {/* Selected item card */}
            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]">Acquired Object</span>
                <h3 className="text-base font-normal tracking-[0.04em] text-[#000000]">
                  Aether 01 Headphones
                </h3>
                <p className="text-xs text-[#525252]">
                  Matte Obsidian • Qty: 1 • Serial #0492 • Delivered Sep 2026
                </p>
              </div>
              <span className="font-mono text-sm text-[#000000] font-medium">$850.00</span>
            </div>

            <form onSubmit={handleGenerateRMA} className="space-y-8">
              {/* Reason selector */}
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.18em] text-[#000000] font-medium block">
                  Select Reason for Return
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {REASONS.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReason(r.id)}
                      className={`p-5 border cursor-pointer transition-all ${
                        selectedReason === r.id
                          ? 'border-[#000000] bg-[#FFFFFF] shadow-sm'
                          : 'border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#000000]'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-xs font-medium text-[#000000] tracking-[0.02em]">
                          {r.label}
                        </span>
                        <div
                          className={`w-4 h-4 border flex items-center justify-center ${
                            selectedReason === r.id
                              ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                              : 'border-[#E5E5E5]'
                          }`}
                        >
                          {selectedReason === r.id && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-[#525252] leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution options */}
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.18em] text-[#000000] font-medium block">
                  Preferred Resolution
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setResolution('refund')}
                    className={`p-5 border cursor-pointer transition-all ${
                      resolution === 'refund'
                        ? 'border-[#000000] bg-[#FFFFFF]'
                        : 'border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#000000]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-medium text-[#000000] uppercase tracking-[0.12em]">
                        Full Refund ($850.00)
                      </span>
                      {resolution === 'refund' && <Check className="w-4 h-4 text-[#000000]" />}
                    </div>
                    <p className="text-[11px] text-[#525252]">
                      Credited back to your original payment method (Stripe/Card) upon atelier receipt and inspection.
                    </p>
                  </div>

                  <div
                    onClick={() => setResolution('exchange')}
                    className={`p-5 border cursor-pointer transition-all ${
                      resolution === 'exchange'
                        ? 'border-[#000000] bg-[#FFFFFF]'
                        : 'border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#000000]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-medium text-[#000000] uppercase tracking-[0.12em]">
                        Exchange for Variant
                      </span>
                      {resolution === 'exchange' && <Check className="w-4 h-4 text-[#000000]" />}
                    </div>
                    <p className="text-[11px] text-[#525252]">
                      Receive Raw Silver or Sandblasted Titanium edition with priority calibration queueing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.18em] text-[#525252] block">
                  Additional Craftsman Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your acoustic setup or specific feedback for the Zurich workshop..."
                  className="w-full p-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Generate Return Authorization &amp; Prepaid Label</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="border border-[#000000] bg-[#FFFFFF] p-8 lg:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E5E5] gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
                  Return Authorization Slip
                </span>
                <h2 className="text-2xl font-light tracking-[0.06em] text-[#000000] mt-1">
                  RMA Reference: <strong className="font-mono">{rmaCode}</strong>
                </h2>
              </div>

              <button
                onClick={() => window.print()}
                className="h-10 px-5 border border-[#000000] text-xs uppercase tracking-[0.18em] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Return Label</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#525252] leading-relaxed">
              <p>
                Your return request has been registered in the Atelier Logistics System. A prepaid <strong>DHL Express Return Airway Bill (AWB-891902-RET)</strong> has also been dispatched to your email (<strong className="text-[#000000]">{email}</strong>).
              </p>

              <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#000000] font-medium">
                  Dispatch &amp; Packaging Protocol
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs">
                  <li>Place the instrument along with its magnetic cable box inside the original unbleached linen carton.</li>
                  <li>Affix the printed prepaid DHL Express return label onto the outer carton.</li>
                  <li>Drop off at any DHL Express location or schedule a complimentary courier pickup via <strong className="text-[#000000]">concierge@atelier.design</strong>.</li>
                </ol>
              </div>

              <p className="pt-2 text-[11px] text-[#A3A3A3]">
                Once received at our Zurich Atelier, precision inspection is completed within 48 hours. Your {resolution === 'refund' ? 'full refund of $850.00' : 'replacement variant'} will be processed immediately upon sign-off.
              </p>
            </div>

            <div className="pt-4 flex space-x-4">
              <Link
                href="/account"
                className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
              >
                Return to Account Portal
              </Link>
              <Link
                href="/shop"
                className="h-11 px-6 border border-[#E5E5E5] text-[#000000] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:border-[#000000] transition-colors"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
