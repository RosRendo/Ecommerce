'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Check, Printer, Sparkles, Award } from 'lucide-react';

interface CertificateRecord {
  serialNumber: string;
  productTitle: string;
  edition: string;
  calibrationDate: string;
  masterCraftsman: string;
  frequencyMatch: string;
  metallurgyLot: string;
  provenanceStatus: 'VERIFIED_GENUINE' | 'ARCHIVED_COLLECTION';
}

const SERIAL_REGISTRY: Record<string, CertificateRecord> = {
  'SN-AETH-01-0492': {
    serialNumber: 'SN-AETH-01-0492',
    productTitle: 'Aether 01 Planar Magnetic Headphones',
    edition: 'Edition 0492 of 1,000 (First Production Series)',
    calibrationDate: 'September 18, 2026',
    masterCraftsman: 'Stefan Lindemann — Lead Acoustic Physicist',
    frequencyMatch: '±0.18 dB across 20Hz – 20kHz laboratory sweep',
    metallurgyLot: 'Billet 6061-T6 Aluminum / Lot 26-CH-09',
    provenanceStatus: 'VERIFIED_GENUINE',
  },
  'SN-MNLT-02-0104': {
    serialNumber: 'SN-MNLT-02-0104',
    productTitle: 'The Monolith Column Speaker',
    edition: 'Numbered Object #104 of 250 Worldwide',
    calibrationDate: 'August 14, 2026',
    masterCraftsman: 'Marc V. Keller — Master Sculptor & Electroacoustic Engineer',
    frequencyMatch: 'Harmonic distortion < 0.12% at 96dB SPL',
    metallurgyLot: 'Basalt Volcanic Matrix / Grisons Quarry Lot 88',
    provenanceStatus: 'VERIFIED_GENUINE',
  },
  'SN-CHRN-01-0088': {
    serialNumber: 'SN-CHRN-01-0088',
    productTitle: 'Chrono-01 Ceramic Mechanical Watch',
    edition: 'Limited Horological Series #0088 of 500',
    calibrationDate: 'July 29, 2026',
    masterCraftsman: 'Jean-Luc Favarger — Master Horologist (Jura Valley)',
    frequencyMatch: 'COSC Certified: -1.2/+2.1 sec/day average rate',
    metallurgyLot: 'Black Zirconia Ceramic (ZrO2) Sintered Matrix',
    provenanceStatus: 'VERIFIED_GENUINE',
  },
};

export default function VerifyPage() {
  const [query, setQuery] = useState('SN-AETH-01-0492');
  const [record, setRecord] = useState<CertificateRecord | null>(SERIAL_REGISTRY['SN-AETH-01-0492']);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();

    if (SERIAL_REGISTRY[clean]) {
      setRecord(SERIAL_REGISTRY[clean]);
      setError(null);
    } else {
      setRecord(null);
      setError(`Serial number "${clean}" is not registered in the Zurich Central Ledger.`);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Atelier Central Horology &amp; Acoustic Ledger
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
            Serial Number Provenance Verification
          </h1>
          <p className="text-xs text-[#525252] max-w-xl leading-relaxed">
            Verify the authenticity, workshop calibration date, and master artisan signature engraved on your numbered instrument.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. SN-AETH-01-0492"
              className="flex-1 h-12 px-4 bg-[#FAFAFA] border border-[#E5E5E5] text-xs font-mono uppercase tracking-[0.14em] text-[#000000] focus:border-[#000000] focus:bg-[#FFFFFF] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-8 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Verify Provenance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Pre-select Samples */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#525252]">
            <span className="uppercase tracking-[0.16em]">Sample Engraved Serials:</span>
            {Object.keys(SERIAL_REGISTRY).map((sn) => (
              <button
                key={sn}
                onClick={() => {
                  setQuery(sn);
                  setRecord(SERIAL_REGISTRY[sn]);
                  setError(null);
                }}
                className={`font-mono px-2 py-0.5 border cursor-pointer ${
                  record?.serialNumber === sn
                    ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                    : 'border-[#E5E5E5] bg-[#FAFAFA] text-[#000000] hover:border-[#000000]'
                }`}
              >
                {sn}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-4 border border-[#000000] bg-[#FAFAFA] text-xs text-[#000000]">
              {error} If your object was acquired via an unauthorized channel, please contact <strong className="text-[#000000]">concierge@atelier.design</strong>.
            </div>
          )}
        </div>

        {/* Digital Certificate Display */}
        {record && (
          <div className="border-2 border-[#000000] bg-[#FFFFFF] p-8 lg:p-12 space-y-8 relative shadow-[0_2px_0_0_#000000]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-[#000000] gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#525252]">
                  <Award className="w-3.5 h-3.5 text-[#000000]" />
                  <span>Certificate of Authenticity &amp; Provenance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000]">
                  {record.productTitle}
                </h2>
                <p className="text-xs text-[#525252] font-mono pt-1">
                  Serial Number: <strong className="text-[#000000]">{record.serialNumber}</strong>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] font-medium">
                  {record.provenanceStatus}
                </span>
                <button
                  onClick={() => window.print()}
                  className="h-9 px-4 border border-[#000000] text-xs uppercase tracking-[0.16em] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors flex items-center space-x-1.5 cursor-pointer"
                  title="Print Certificate"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
              <div className="space-y-1 border-b border-[#E5E5E5] pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
                  Edition Registry
                </span>
                <p className="text-sm text-[#000000] font-medium">{record.edition}</p>
              </div>

              <div className="space-y-1 border-b border-[#E5E5E5] pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
                  Laboratory Sign-Off Date
                </span>
                <p className="text-sm text-[#000000] font-medium">{record.calibrationDate}</p>
              </div>

              <div className="space-y-1 border-b border-[#E5E5E5] pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
                  Calibrating Master Artisan
                </span>
                <p className="text-sm text-[#000000] font-medium">{record.masterCraftsman}</p>
              </div>

              <div className="space-y-1 border-b border-[#E5E5E5] pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
                  Laboratory Metric Tolerance
                </span>
                <p className="text-sm text-[#000000] font-medium font-mono">{record.frequencyMatch}</p>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
                  Sourced Material Provenance
                </span>
                <p className="text-xs text-[#525252] leading-relaxed">{record.metallurgyLot}</p>
              </div>
            </div>

            {/* Bottom Letterpress Seal */}
            <div className="pt-6 border-t border-[#000000] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#525252] gap-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#000000]" />
                <span className="text-[11px]">
                  Registered in the Permanent Swiss Horological &amp; Acoustic Archive.
                </span>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#000000]">
                Cryptographic Hash: 0x9F42...88A1
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
