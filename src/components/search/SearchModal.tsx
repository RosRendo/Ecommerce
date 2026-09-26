'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { useSearch } from '@/lib/store/search-store';
import { PRODUCTS, CATEGORIES } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function SearchModal() {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#000000]/60 backdrop-blur-[2px]"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl bg-[#FFFFFF] shadow-2xl border border-[#E5E5E5] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-6 border-b border-[#E5E5E5] flex items-center space-x-3">
              <Search className="w-5 h-5 text-[#525252] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by product, material, or category..."
                className="w-full bg-transparent text-base sm:text-lg text-[#000000] placeholder:text-[#A3A3A3] focus:outline-none tracking-[0.04em]"
              />
              <button
                onClick={closeSearch}
                className="p-1.5 text-[#A3A3A3] hover:text-[#000000] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results or Suggested Categories */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {query.trim() === '' ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3] mb-3">
                      Popular Categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/shop?category=${cat.slug}`}
                          onClick={closeSearch}
                          className="px-3 py-1.5 border border-[#E5E5E5] text-xs text-[#000000] hover:border-[#000000] transition-colors uppercase tracking-[0.1em]"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3] mb-3">
                      Featured Monograph Releases
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PRODUCTS.slice(0, 2).map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          onClick={closeSearch}
                          className="flex items-center space-x-3 p-2 hover:bg-[#FAFAFA] border border-transparent hover:border-[#E5E5E5] transition-all"
                        >
                          <div className="relative w-12 h-14 bg-[#F5F5F5] shrink-0">
                            <Image
                              src={prod.images[0].url}
                              alt={prod.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-normal text-[#000000] tracking-[0.02em]">
                              {prod.title}
                            </p>
                            <p className="text-[11px] font-mono text-[#525252]">
                              {formatPrice(prod.basePrice)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3] mb-2">
                    {filteredProducts.length} Results Found
                  </p>
                  <div className="divide-y divide-[#E5E5E5]">
                    {filteredProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.slug}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between py-3 hover:bg-[#FAFAFA] px-2 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative w-12 h-14 bg-[#F5F5F5] shrink-0 border border-[#E5E5E5]">
                            <Image
                              src={prod.images[0].url}
                              alt={prod.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-normal text-[#000000] group-hover:text-[#525252] transition-colors">
                              {prod.title}
                            </p>
                            <p className="text-[11px] text-[#525252] line-clamp-1">
                              {prod.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono text-[#000000]">
                            {formatPrice(prod.basePrice)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#000000] transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">No results found</p>
                  <p className="text-xs text-[#525252]">
                    No objects matched &ldquo;{query}&rdquo;. Try searching for &ldquo;headphones&rdquo;, &ldquo;ceramic&rdquo;, or &ldquo;titanium&rdquo;.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Hint */}
            <div className="p-3 bg-[#FAFAFA] border-t border-[#E5E5E5] flex justify-between items-center text-[10px] text-[#A3A3A3] uppercase tracking-[0.12em]">
              <span>Press ESC to close</span>
              <span>Atelier Catalog Index 2026</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
