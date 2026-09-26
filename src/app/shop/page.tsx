'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/lib/data/products';
import { ProductCard } from '@/features/products/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialFilter = searchParams.get('filter');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && product.category.slug !== selectedCategory) {
        return false;
      }

      // Query filter (e.g. ?filter=new)
      if (initialFilter === 'new' && !product.isNewArrival) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under-500' && product.basePrice >= 500) return false;
      if (priceFilter === '500-1000' && (product.basePrice < 500 || product.basePrice > 1000)) return false;
      if (priceFilter === 'over-1000' && product.basePrice <= 1000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, initialFilter, priceFilter, sortBy]);

  const activeFilterCount = (selectedCategory ? 1 : 0) + (priceFilter !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceFilter('all');
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Editorial Page Header */}
        <div className="border-b border-[#E5E5E5] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-2">
              Atelier Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
              All Objects &amp; Instruments
            </h1>
          </div>

          <p className="text-xs text-[#525252] max-w-sm tracking-[0.02em]">
            Showing {filteredProducts.length} serialized objects crafted from single-billet metals, stone, and unvarnished hide.
          </p>
        </div>

        {/* Filter & Sorting Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#E5E5E5] text-xs">
          {/* Category Tabs (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 uppercase tracking-[0.14em] transition-colors border ${
                selectedCategory === null
                  ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                  : 'border-[#E5E5E5] text-[#525252] hover:border-[#000000] hover:text-[#000000]'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 uppercase tracking-[0.14em] transition-colors border ${
                  selectedCategory === cat.slug
                    ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                    : 'border-[#E5E5E5] text-[#525252] hover:border-[#000000] hover:text-[#000000]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center space-x-2 border border-[#E5E5E5] px-4 py-2 text-xs uppercase tracking-[0.14em]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          {/* Right: Sort and Price Selectors */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#525252]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[#000000] border-b border-[#E5E5E5] focus:outline-none focus:border-[#000000] pb-1 uppercase tracking-[0.08em] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Ascending</option>
                <option value="price-desc">Price: Descending</option>
                <option value="newest">Newest Editions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer / Collapsible */}
        {mobileFilterOpen && (
          <div className="md:hidden p-5 mb-8 bg-[#FAFAFA] border border-[#E5E5E5] space-y-4">
            <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
              <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#000000]">
                Filter By Category
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-xs uppercase tracking-[0.14em] text-[#525252]"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setMobileFilterOpen(false);
                }}
                className={`text-left text-xs py-1 uppercase tracking-[0.1em] ${
                  selectedCategory === null ? 'font-medium text-[#000000]' : 'text-[#525252]'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setMobileFilterOpen(false);
                  }}
                  className={`text-left text-xs py-1 uppercase tracking-[0.1em] ${
                    selectedCategory === cat.slug ? 'font-medium text-[#000000]' : 'text-[#525252]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filter Clear Pill */}
        {activeFilterCount > 0 && (
          <div className="flex items-center space-x-3 mb-8 text-xs">
            <span className="text-[#525252]">Active filter:</span>
            {selectedCategory && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-[#F5F5F5] text-[#000000] border border-[#E5E5E5]">
                <span className="uppercase tracking-[0.1em]">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                </span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-[#525252]"
                  onClick={() => setSelectedCategory(null)}
                />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-[#525252] hover:text-[#000000] underline uppercase tracking-[0.1em] text-[10px]"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Product Grid (12-Column Responsive) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 border border-[#E5E5E5] p-12 bg-[#FAFAFA]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#A3A3A3]">
              No matching archival objects found
            </p>
            <p className="text-xs text-[#525252] max-w-sm mx-auto">
              Please reset your filters or explore our permanent collection.
            </p>
            <button
              onClick={clearAllFilters}
              className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] py-24 text-center text-xs tracking-[0.2em] text-[#A3A3A3] uppercase">
          Loading Catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
