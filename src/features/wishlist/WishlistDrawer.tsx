'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWishlist } from '@/lib/store/wishlist-store';
import { useCart } from '@/lib/store/cart-store';
import { PRODUCTS } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function WishlistDrawer() {
  const { wishlistIds, isOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const totalValuation = savedProducts.reduce((sum, p) => sum + p.basePrice, 0);

  const handleMoveToBag = (product: (typeof savedProducts)[0]) => {
    addItem({
      productId: product.id,
      productTitle: product.title,
      productSlug: product.slug,
      variantId: product.variants[0]?.id || product.id,
      variantTitle: product.variants[0]?.title || 'Standard',
      price: product.basePrice,
      image: product.images[0]?.url || '',
    });
    toggleWishlist(product.id);
    closeWishlist();
    openCart();
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
            onClick={closeWishlist}
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-[2px]"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E5E5]"
          >
            {/* Top Bar */}
            <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#525252] block">
                  Atelier Privé Portfolio
                </span>
                <h2 className="text-lg font-light tracking-[0.06em] text-[#000000]">
                  Saved Objects ({savedProducts.length})
                </h2>
              </div>

              <button
                onClick={closeWishlist}
                className="p-2 text-[#525252] hover:text-[#000000] hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                aria-label="Close wishlist drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Saved Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#E5E5E5]">
              {savedProducts.length > 0 ? (
                savedProducts.map((product) => (
                  <div key={product.id} className="pt-6 first:pt-0 flex space-x-4">
                    {/* Thumbnail */}
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeWishlist}
                      className="relative w-20 h-24 bg-[#FAFAFA] border border-[#E5E5E5] flex-shrink-0 overflow-hidden group"
                    >
                      <Image
                        src={product.images[0]?.url || ''}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </Link>

                    {/* Details & Actions */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeWishlist}
                          className="text-xs uppercase tracking-[0.14em] font-medium text-[#000000] hover:underline line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <p className="text-[11px] text-[#525252] line-clamp-1">
                          {product.subtitle}
                        </p>
                        <p className="text-xs font-mono text-[#000000] font-medium pt-0.5">
                          {formatPrice(product.basePrice)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#000000] hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#A3A3A3] hover:text-[#000000] transition-colors p-1 cursor-pointer"
                          title="Remove from portfolio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
                    Your portfolio is currently empty
                  </p>
                  <p className="text-xs text-[#525252] max-w-xs mx-auto leading-relaxed">
                    Click the heart icon on any numbered instrument across the catalog to save it to your private portfolio.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeWishlist}
                    className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
                  >
                    Explore Catalog
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom Summary & Actions */}
            {savedProducts.length > 0 && (
              <div className="p-6 border-t border-[#E5E5E5] bg-[#FAFAFA] space-y-4">
                <div className="flex justify-between items-baseline text-xs uppercase tracking-[0.16em]">
                  <span className="text-[#525252]">Total Valuation:</span>
                  <span className="font-mono text-base font-medium text-[#000000]">
                    {formatPrice(totalValuation)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      savedProducts.forEach((p) => {
                        addItem({
                          productId: p.id,
                          productTitle: p.title,
                          productSlug: p.slug,
                          variantId: p.variants[0]?.id || p.id,
                          variantTitle: p.variants[0]?.title || 'Standard',
                          price: p.basePrice,
                          image: p.images[0]?.url || '',
                        });
                      });
                      closeWishlist();
                      openCart();
                    }}
                    className="w-full h-12 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Move All to Bag</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/account"
                    onClick={closeWishlist}
                    className="w-full h-11 bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#000000] text-xs uppercase tracking-[0.18em] font-medium text-[#000000] transition-colors flex items-center justify-center"
                  >
                    View in Client Portal
                  </Link>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-[#A3A3A3] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#525252]" />
                  <span>Portfolio syncs across devices when logged into Atelier Privé.</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
