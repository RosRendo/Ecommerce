'use client';

import React, { useState } from 'react';
import { X, Check, Bell, ShieldCheck } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  variantTitle?: string;
}

export function WaitlistModal({
  isOpen,
  onClose,
  productTitle,
  variantTitle,
}: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#000000] w-full max-w-md p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#525252] hover:text-[#000000] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block">
            Archival Allocation Alert
          </span>
          <h3 className="text-xl font-light tracking-[0.06em] text-[#000000]">
            Reserve Priority Notice
          </h3>
          <p className="text-xs text-[#525252] leading-relaxed pt-1">
            Receive priority allocation notification when the next hand-calibrated batch of{' '}
            <strong className="text-[#000000]">{productTitle}</strong>
            {variantTitle ? ` (${variantTitle})` : ''} is released from the Zurich workshop.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 border border-[#E5E5E5] bg-[#FAFAFA] p-6">
            <Check className="w-6 h-6 text-[#000000] mx-auto" />
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#000000] font-medium">
              Priority Allocation Reserved
            </h4>
            <p className="text-[11px] text-[#525252]">
              You will receive an encrypted dispatch link 24 hours prior to public availability.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#525252] block">
                Client Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@atelier.design"
                className="w-full h-12 px-4 border border-[#E5E5E5] text-xs text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Register for Next Batch</span>
            </button>

            <div className="flex items-center space-x-2 pt-2 text-[10px] text-[#A3A3A3]">
              <ShieldCheck className="w-3 h-3 text-[#525252]" />
              <span>Zero marketing clutter. Single transactional notification only.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
