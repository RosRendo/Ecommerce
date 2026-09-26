'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store/cart-store';
import { useAuth } from '@/lib/store/auth-store';
import { CheckoutFormData, CheckoutStep, Address } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ShieldCheck, ArrowRight, ArrowLeft, Check, Lock, PackageCheck, Download, UserCheck } from 'lucide-react';

const INITIAL_FORM: CheckoutFormData = {
  email: '',
  phone: '',
  marketingConsent: false,
  shippingAddress: {
    recipientName: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  },
  shippingMethod: 'standard',
  paymentMethod: 'card',
  billingSameAsShipping: true,
  cardDetails: {
    cardNumber: '•••• •••• •••• 4242',
    cardholderName: '',
    expiryDate: '12/28',
    cvv: '•••',
  },
  packaging: 'essential',
  notes: '',
};

export function CheckoutFlow() {
  const router = useRouter();
  const { items, subtotal, discountAmount, shipping, tax, total, promoCode, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('contact');
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [showManualContactEdit, setShowManualContactEdit] = useState(false);

  // Auto-populate saved client contact and delivery coordinates for authenticated users
  // and automatically advance past redundant contact step
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        phone: prev.phone || '+1 (212) 555-0199',
        shippingAddress: {
          ...prev.shippingAddress,
          recipientName: prev.shippingAddress.recipientName || user.name,
          company: prev.shippingAddress.company || 'Vance Spatial Research',
          addressLine1: prev.shippingAddress.addressLine1 || '450 West 14th Street',
          addressLine2: prev.shippingAddress.addressLine2 || 'Penthouse B',
          city: prev.shippingAddress.city || 'New York',
          state: prev.shippingAddress.state || 'NY',
          postalCode: prev.shippingAddress.postalCode || '10014',
          country: prev.shippingAddress.country || 'United States',
          phone: prev.shippingAddress.phone || '+1 (212) 555-0199',
        },
        cardDetails: {
          ...prev.cardDetails,
          cardNumber: prev.cardDetails?.cardNumber || '•••• •••• •••• 4242',
          cardholderName: prev.cardDetails?.cardholderName || user.name,
          expiryDate: prev.cardDetails?.expiryDate || '12/28',
          cvv: prev.cardDetails?.cvv || '•••',
        },
      }));

      // If user arrives at checkout already authenticated, automatically advance straight to shipping coordinates!
      // This eliminates redundant contact entry for logged-in collectors.
      setCurrentStep((prev) => (prev === 'contact' ? 'shipping' : prev));
    }
  }, [isAuthenticated, user]);

  const steps: { id: CheckoutStep; label: string; num: string }[] = [
    { id: 'contact', label: 'Contact', num: '01' },
    { id: 'shipping', label: 'Shipping', num: '02' },
    { id: 'payment', label: 'Payment', num: '03' },
    { id: 'review', label: 'Review', num: '04' },
    { id: 'confirmation', label: 'Confirmation', num: '05' },
  ];

  const handleInputChange = (field: keyof CheckoutFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value,
      },
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'contact') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('review');
    else if (currentStep === 'review') handleFinalizeOrder();
  };

  const handleFinalizeOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderNum = `ATL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderNumber(orderNum);
      clearCart();
      setIsProcessing(false);
      setCurrentStep('confirmation');
    }, 1500);
  };

  // If bag is empty and not on confirmation
  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h2 className="text-sm uppercase tracking-[0.24em] text-[#000000]">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-[#525252] max-w-sm">
          Please select objects from the atelier before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="h-12 px-8 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      {/* Focused Minimal Navigation Bar - Zero Distractions */}
      <nav className="border-b border-[#E5E5E5] bg-[#FFFFFF] py-6 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-base tracking-[0.32em] uppercase font-normal hover:opacity-75 transition-opacity"
          >
            ATELIER
          </Link>

          <div className="flex items-center space-x-2 text-[11px] text-[#525252] uppercase tracking-[0.14em]">
            <Lock className="w-3.5 h-3.5 text-[#171717]" />
            <span>Encrypted Secure Checkout</span>
          </div>

          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </nav>

      {/* Main Body */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        {/* Step Indicator */}
        <div className="border-b border-[#E5E5E5] pb-6 mb-12">
          <div className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto pb-2">
            {steps.map((s, idx) => {
              const isCurrent = currentStep === s.id;
              const isPassed = steps.findIndex((step) => step.id === currentStep) > idx;

              return (
                <div
                  key={s.id}
                  className={`flex items-center space-x-2 text-xs uppercase tracking-[0.18em] shrink-0 ${
                    isCurrent
                      ? 'text-[#000000] font-medium'
                      : isPassed
                      ? 'text-[#525252]'
                      : 'text-[#A3A3A3]'
                  }`}
                >
                  <span className="font-mono text-[11px]">{s.num}</span>
                  <span>{s.label}</span>
                  {idx < steps.length - 1 && <span className="text-[#E5E5E5] pl-2">/</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirmation Screen */}
        {currentStep === 'confirmation' ? (
          <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
            <div className="w-16 h-16 bg-[#FAFAFA] border border-[#000000] mx-auto flex items-center justify-center">
              <PackageCheck className="w-8 h-8 text-[#000000]" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252]">
                Order Confirmed
              </span>
              <h1 className="text-3xl font-light tracking-[0.06em] text-[#000000]">
                Thank you for your acquisition.
              </h1>
              <p className="text-sm font-mono text-[#000000]">
                Order Reference: <strong>{confirmedOrderNumber}</strong>
              </p>
            </div>

            <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] text-left text-xs space-y-3 leading-relaxed text-[#525252]">
              <p>
                A formal receipt and dispatch dossier have been transmitted to{' '}
                <strong className="text-[#000000]">{formData.email || 'your email'}</strong>.
              </p>
              <p>
                Your items are entering individual serial calibration and hand-packaging in our Zurich atelier. You will receive an encrypted DHL tracking URL as soon as the diplomatic courier departs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto h-12 px-8 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center hover:bg-[#171717] transition-colors"
              >
                Continue Exploring
              </Link>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto h-12 px-8 bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#000000] text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left 7 Columns: Focused Form Inputs */}
            <div className="lg:col-span-7">
              <form onSubmit={handleNext} className="space-y-8">
                {/* Step 1: Contact */}
                {currentStep === 'contact' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E5E5E5] pb-4">
                      <h2 className="text-xs uppercase tracking-[0.22em] font-medium text-[#000000]">
                        01. Client Contact
                      </h2>
                      <p className="text-xs text-[#525252] mt-1">
                        Enter your primary communication coordinates for shipping notifications.
                      </p>
                    </div>

                    {/* Authenticated Client Recognition Card */}
                    {isAuthenticated && user ? (
                      <div className="border border-[#000000] bg-[#FAFAFA] p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="w-4 h-4 text-[#000000]" />
                            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#525252]">
                              Identified Atelier Privé Member
                            </span>
                          </div>
                          <span className="px-2 py-0.5 bg-[#000000] text-[#FFFFFF] text-[9px] uppercase tracking-[0.18em] font-mono">
                            {user.memberNumber}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-base font-normal tracking-[0.04em] text-[#000000]">
                            {user.name}
                          </h3>
                          <p className="text-xs font-mono text-[#525252]">
                            {user.email} • {formData.phone || '+1 (212) 555-0199'}
                          </p>
                          <p className="text-xs text-[#525252] pt-1">
                            Default Coordinates: 450 West 14th Street, Penthouse B, New York, NY 10014
                          </p>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentStep('shipping')}
                            className="h-12 px-8 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                          >
                            <span>Fast Proceed to Shipping (Use Saved Profile)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowManualContactEdit(!showManualContactEdit)}
                            className="h-12 px-4 border border-[#E5E5E5] text-[#000000] text-xs uppercase tracking-[0.16em] hover:border-[#000000] transition-colors cursor-pointer"
                          >
                            {showManualContactEdit ? 'Hide Manual Inputs' : 'Edit Contact / Alternate Coordinates'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-4 text-xs flex justify-between items-center">
                        <span className="text-[#525252]">Already an Atelier Privé collector?</span>
                        <Link
                          href="/login?redirect=/checkout"
                          className="text-[#000000] font-medium uppercase tracking-[0.14em] hover:underline"
                        >
                          Sign In to auto-fill profile →
                        </Link>
                      </div>
                    )}

                    {/* Manual Form Inputs (Visible if unauthenticated or when expanding manual edit) */}
                    {(!isAuthenticated || showManualContactEdit) && (
                      <div className="space-y-4 pt-2">
                        <Input
                          label="Email Address"
                          type="email"
                          required
                          placeholder="client@domain.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />

                        <Input
                          label="Phone Number (for Courier SMS alerts)"
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />

                        <label className="flex items-start space-x-3 cursor-pointer pt-2">
                          <input
                            type="checkbox"
                            checked={formData.marketingConsent}
                            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                            className="mt-0.5 rounded-none border-[#E5E5E5] text-[#000000] focus:ring-0"
                          />
                          <span className="text-xs text-[#525252] leading-normal">
                            Keep me updated with Atelier Gazette numbered archival releases and private salon invitations.
                          </span>
                        </label>

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full sm:w-auto h-13 px-10 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2"
                          >
                            <span>Continue to Shipping</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Shipping Address & Method */}
                {currentStep === 'shipping' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E5E5E5] pb-4">
                      <h2 className="text-xs uppercase tracking-[0.22em] font-medium text-[#000000]">
                        02. Dispatch Destination
                      </h2>
                      <p className="text-xs text-[#525252] mt-1">
                        Specify the exact physical delivery address for signature-verified dispatch.
                      </p>
                    </div>

                    {isAuthenticated && user && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FAFAFA] border border-[#000000] text-xs text-[#000000] gap-2">
                        <div className="flex items-center space-x-2.5">
                          <UserCheck className="w-4 h-4 text-[#000000]" />
                          <span className="font-mono uppercase tracking-[0.14em] text-[11px]">
                            Signed in as {user.name} ({user.email}) • Contact Verified
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep('contact')}
                          className="text-[10px] uppercase font-mono tracking-[0.16em] text-[#525252] hover:text-[#000000] underline cursor-pointer text-left"
                        >
                          Review / Edit Contact
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Recipient Name"
                        required
                        placeholder="First and Last Name"
                        value={formData.shippingAddress.recipientName}
                        onChange={(e) => handleAddressChange('recipientName', e.target.value)}
                      />
                      <Input
                        label="Company / Suite (Optional)"
                        placeholder="Studio, Apt, Floor"
                        value={formData.shippingAddress.company}
                        onChange={(e) => handleAddressChange('company', e.target.value)}
                      />
                    </div>

                    <Input
                      label="Street Address"
                      required
                      placeholder="123 Mercer Street"
                      value={formData.shippingAddress.addressLine1}
                      onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        required
                        placeholder="New York"
                        value={formData.shippingAddress.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                      />
                      <Input
                        label="State / Region"
                        required
                        placeholder="NY"
                        value={formData.shippingAddress.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                      />
                      <Input
                        label="Postal Code"
                        required
                        placeholder="10013"
                        value={formData.shippingAddress.postalCode}
                        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                      />
                    </div>

                    {/* Shipping Method Tier Selection */}
                    <div className="pt-4 space-y-3">
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-[#525252]">
                        Delivery Tier
                      </label>

                      <div className="space-y-2.5">
                        <label
                          className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                            formData.shippingMethod === 'standard'
                              ? 'border-[#000000] bg-[#FAFAFA]'
                              : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              checked={formData.shippingMethod === 'standard'}
                              onChange={() => handleInputChange('shippingMethod', 'standard')}
                              className="text-[#000000] focus:ring-0"
                            />
                            <div>
                              <p className="text-xs uppercase tracking-[0.14em] font-medium text-[#000000]">
                                Standard Curated Dispatch
                              </p>
                              <p className="text-[11px] text-[#525252]">3–5 business days via DHL Air Express</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-[#000000]">
                            {subtotal > 300 ? 'Complimentary' : '$25'}
                          </span>
                        </label>

                        <label
                          className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                            formData.shippingMethod === 'express'
                              ? 'border-[#000000] bg-[#FAFAFA]'
                              : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              checked={formData.shippingMethod === 'express'}
                              onChange={() => handleInputChange('shippingMethod', 'express')}
                              className="text-[#000000] focus:ring-0"
                            />
                            <div>
                              <p className="text-xs uppercase tracking-[0.14em] font-medium text-[#000000]">
                                Priority Priority Flight Express
                              </p>
                              <p className="text-[11px] text-[#525252]">Next-day delivery with shock sensor monitoring</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-[#000000]">$45</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#E5E5E5]">
                      <button
                        type="button"
                        onClick={() => setCurrentStep('contact')}
                        className="text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] flex items-center space-x-2"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="h-13 px-10 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#171717] transition-colors flex items-center space-x-2"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 'payment' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E5E5E5] pb-4">
                      <h2 className="text-xs uppercase tracking-[0.22em] font-medium text-[#000000]">
                        03. Payment Method
                      </h2>
                      <p className="text-xs text-[#525252] mt-1">
                        All transactions are processed through end-to-end encrypted banking tokens.
                      </p>
                    </div>

                    {/* Method toggles */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'card')}
                        className={`h-12 border text-xs uppercase tracking-[0.16em] flex items-center justify-center transition-colors ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                            : 'border-[#E5E5E5] text-[#525252] hover:border-[#000000]'
                        }`}
                      >
                        Credit / Debit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'apple_pay')}
                        className={`h-12 border text-xs uppercase tracking-[0.16em] flex items-center justify-center transition-colors ${
                          formData.paymentMethod === 'apple_pay'
                            ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                            : 'border-[#E5E5E5] text-[#525252] hover:border-[#000000]'
                        }`}
                      >
                        Apple Pay / 1-Click
                      </button>
                    </div>

                    {formData.paymentMethod === 'card' ? (
                      <div className="space-y-4 p-5 bg-[#FAFAFA] border border-[#E5E5E5]">
                        <Input
                          label="Card Number"
                          required
                          placeholder="4242 •••• •••• 4242"
                          value={formData.cardDetails?.cardNumber}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cardDetails: { ...prev.cardDetails!, cardNumber: e.target.value },
                            }))
                          }
                        />

                        <Input
                          label="Cardholder Full Name"
                          required
                          placeholder="As printed on card"
                          value={formData.cardDetails?.cardholderName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cardDetails: { ...prev.cardDetails!, cardholderName: e.target.value },
                            }))
                          }
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiration"
                            required
                            placeholder="MM/YY"
                            value={formData.cardDetails?.expiryDate}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                cardDetails: { ...prev.cardDetails!, expiryDate: e.target.value },
                              }))
                            }
                          />
                          <Input
                            label="Security Code (CVV)"
                            required
                            placeholder="CVC"
                            value={formData.cardDetails?.cvv}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                cardDetails: { ...prev.cardDetails!, cvv: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-[#FAFAFA] border border-[#E5E5E5] space-y-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-[#000000]">
                          Apple Pay Fast Checkout
                        </p>
                        <p className="text-xs text-[#525252]">
                          Touch ID or Face ID will be requested upon clicking Authorize.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-[#E5E5E5]">
                      <button
                        type="button"
                        onClick={() => setCurrentStep('shipping')}
                        className="text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] flex items-center space-x-2"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="h-13 px-10 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#171717] transition-colors flex items-center space-x-2"
                      >
                        <span>Review Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Final Review */}
                {currentStep === 'review' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E5E5E5] pb-4">
                      <h2 className="text-xs uppercase tracking-[0.22em] font-medium text-[#000000]">
                        04. Final Review
                      </h2>
                      <p className="text-xs text-[#525252] mt-1">
                        Please verify all details before submitting authorization.
                      </p>
                    </div>

                    <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5] text-xs">
                      <div className="p-4 flex justify-between">
                        <span className="text-[#525252] uppercase tracking-[0.12em]">Client Email:</span>
                        <span className="text-[#000000] font-medium">{formData.email}</span>
                      </div>
                      <div className="p-4 flex justify-between">
                        <span className="text-[#525252] uppercase tracking-[0.12em]">Destination:</span>
                        <span className="text-[#000000] text-right font-medium">
                          {formData.shippingAddress.addressLine1}, {formData.shippingAddress.city},{' '}
                          {formData.shippingAddress.postalCode}
                        </span>
                      </div>
                      <div className="p-4 flex justify-between">
                        <span className="text-[#525252] uppercase tracking-[0.12em]">Payment:</span>
                        <span className="text-[#000000] font-mono">
                          {formData.paymentMethod === 'card' ? 'Visa ending in 4242' : 'Apple Pay'}
                        </span>
                      </div>
                    </div>

                    {/* Packaging Options */}
                    <div className="pt-2 space-y-3">
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-[#525252]">
                        Packaging Presentation
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          className={`p-4 border cursor-pointer transition-colors ${
                            formData.packaging === 'essential'
                              ? 'border-[#000000] bg-[#FAFAFA]'
                              : 'border-[#E5E5E5]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="packaging"
                            checked={formData.packaging === 'essential'}
                            onChange={() => handleInputChange('packaging', 'essential')}
                            className="mr-2 text-[#000000]"
                          />
                          <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#000000]">
                            Essential Minimalist Carton
                          </span>
                          <p className="text-[10px] text-[#525252] mt-1">
                            100% post-consumer unbleached kraft box. Zero plastic.
                          </p>
                        </label>

                        <label
                          className={`p-4 border cursor-pointer transition-colors ${
                            formData.packaging === 'monograph_box'
                              ? 'border-[#000000] bg-[#FAFAFA]'
                              : 'border-[#E5E5E5]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="packaging"
                            checked={formData.packaging === 'monograph_box'}
                            onChange={() => handleInputChange('packaging', 'monograph_box')}
                            className="mr-2 text-[#000000]"
                          />
                          <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#000000]">
                            Signature Linen Presentation Box
                          </span>
                          <p className="text-[10px] text-[#525252] mt-1">
                            Hardbound black linen box with serialized archival seal.
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#E5E5E5]">
                      <button
                        type="button"
                        onClick={() => setCurrentStep('payment')}
                        className="text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] flex items-center space-x-2"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="h-14 px-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#171717] active:bg-[#525252] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        {isProcessing ? (
                          <span>Processing Authorization...</span>
                        ) : (
                          <>
                            <span>Complete Acquisition • {formatPrice(total)}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right 5 Columns: Sticky Order Breakdown */}
            <div className="lg:col-span-5">
              <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] space-y-6 sticky top-28">
                <div className="border-b border-[#E5E5E5] pb-4 flex justify-between items-baseline">
                  <h3 className="text-xs uppercase tracking-[0.22em] font-medium text-[#000000]">
                    Order Summary
                  </h3>
                  <span className="text-[11px] font-mono text-[#525252]">
                    {items.length} {items.length === 1 ? 'Object' : 'Objects'}
                  </span>
                </div>

                {/* Items preview */}
                <div className="divide-y divide-[#E5E5E5] max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-14 bg-[#FFFFFF] border border-[#E5E5E5] shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.productTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-normal text-[#000000] line-clamp-1">
                            {item.productTitle}
                          </p>
                          <p className="text-[10px] text-[#525252]">
                            Qty: {item.quantity} • {item.variantTitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#000000]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Calculation */}
                <div className="space-y-2 border-t border-[#E5E5E5] pt-4 text-xs text-[#525252]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#000000]">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#171717]">
                      <span>Discount ({promoCode})</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Dispatch Carrier</span>
                    <span className="font-mono text-[#000000]">
                      {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-mono text-[#000000]">{formatPrice(tax)}</span>
                  </div>

                  <div className="border-t border-[#E5E5E5] pt-3 flex justify-between text-sm font-medium text-[#000000]">
                    <span className="uppercase tracking-[0.14em]">Grand Total</span>
                    <span className="font-mono text-base">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-[#A3A3A3] leading-relaxed uppercase tracking-[0.08em] border-t border-[#E5E5E5]">
                  Prices inclusive of customs duties. Insured global courier delivery by DHL Express.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
