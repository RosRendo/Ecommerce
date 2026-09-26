'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    discountAmount,
    total,
    promoCode,
    applyPromo,
    removePromo,
    totalQuantity,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<string | null>(null);

  const freeShippingThreshold = 300;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromo(promoInput);
    setPromoStatus(res.message);
    if (res.success) setPromoInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-[2px]"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#FFFFFF] h-full flex flex-col justify-between shadow-2xl border-l border-[#E5E5E5]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
              <div>
                <h2 className="text-xs uppercase tracking-[0.24em] font-medium text-[#000000]">
                  Shopping Bag
                </h2>
                <p className="text-[11px] text-[#525252] tracking-[0.04em] mt-0.5">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} curated
                </p>
              </div>

              <button
                onClick={closeCart}
                className="p-2 text-[#525252] hover:text-[#000000] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3.5 bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.14em] text-[#525252] mb-1.5">
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#000000]">{formatPrice(remainingForFreeShipping)}</strong> for complimentary express delivery
                  </span>
                ) : (
                  <span className="text-[#000000] font-medium">
                    ✓ Complimentary express delivery unlocked
                  </span>
                )}
              </div>
              <div className="w-full h-1 bg-[#E5E5E5] overflow-hidden">
                <div
                  className="h-full bg-[#000000] transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Item List / Empty State */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E5E5E5]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
                    Your bag is empty
                  </p>
                  <p className="text-xs text-[#525252] max-w-xs leading-relaxed">
                    Explore our permanent collection of acoustic monitors, timepieces, and precision tools.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center h-11 px-6 bg-[#000000] text-[#FFFFFF] text-[11px] uppercase tracking-[0.2em] hover:bg-[#171717] transition-colors"
                  >
                    Explore Shop
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex space-x-4">
                    {/* Item Thumbnail */}
                    <div className="relative w-20 h-24 bg-[#F5F5F5] shrink-0 overflow-hidden border border-[#E5E5E5]">
                      <Image
                        src={item.image}
                        alt={item.productTitle}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${item.productSlug}`}
                            onClick={closeCart}
                            className="text-xs font-normal text-[#000000] hover:text-[#525252] transition-colors line-clamp-1 tracking-[0.02em]"
                          >
                            {item.productTitle}
                          </Link>
                          <span className="text-xs font-mono font-medium text-[#000000] pl-2">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#525252] mt-0.5 tracking-[0.02em]">
                          {item.variantTitle} {item.size ? `• ${item.size}` : ''}
                        </p>
                      </div>

                      {/* Stepper and Remove Action */}
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center border border-[#E5E5E5]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#525252] hover:text-[#000000] hover:bg-[#FAFAFA] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono text-[#000000]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#525252] hover:text-[#000000] hover:bg-[#FAFAFA] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] uppercase tracking-[0.14em] text-[#A3A3A3] hover:text-[#000000] transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#E5E5E5] bg-[#FFFFFF] space-y-4">
                {/* Promo Code Input */}
                {promoCode ? (
                  <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-[#FAFAFA] border border-[#E5E5E5]">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-3.5 h-3.5 text-[#525252]" />
                      <span className="font-mono uppercase tracking-[0.1em] text-[#000000]">
                        {promoCode} applied
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-[10px] uppercase tracking-[0.14em] text-[#525252] hover:text-[#000000]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. ATELIER10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 h-9 px-3 text-xs bg-[#FFFFFF] border border-[#E5E5E5] text-[#000000] placeholder:text-[#A3A3A3] focus:border-[#000000] focus:outline-none uppercase tracking-[0.08em]"
                    />
                    <button
                      type="submit"
                      className="h-9 px-4 bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#000000] text-[10px] uppercase tracking-[0.16em] text-[#000000] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoStatus && (
                  <p className="text-[10px] text-[#525252] tracking-[0.02em]">{promoStatus}</p>
                )}

                {/* Subtotals Breakdown */}
                <div className="space-y-1.5 text-xs text-[#525252]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#000000]">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#171717]">
                      <span>Privilege Discount</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-mono text-[#000000]">
                      {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#E5E5E5] flex justify-between text-sm font-medium text-[#000000]">
                    <span className="uppercase tracking-[0.14em]">Estimated Total</span>
                    <span className="font-mono text-base">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full h-13 bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] active:bg-[#525252] flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-150 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-[#A3A3A3] tracking-[0.1em] uppercase pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Encrypted 256-Bit SSL Checkout • Free 30-Day Returns</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
