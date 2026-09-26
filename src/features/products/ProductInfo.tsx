'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductVariant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/store/cart-store';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Minus, Plus, Shield, Truck, RotateCcw, Check, Bell } from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      sku: 'SKU-DEF',
      title: 'Standard',
      price: product.basePrice,
      inStock: true,
    },
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedToast, setIsAddedToast] = useState(false);

  const primaryImage = product.images.find((img) => img.isHero) || product.images[0];

  const handleAddToBag = () => {
    addItem(
      {
        productId: product.id,
        productTitle: product.title,
        productSlug: product.slug,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        colorName: selectedVariant.colorName,
        size: selectedVariant.size,
        price: selectedVariant.price,
        image: primaryImage.url,
      },
      quantity,
    );

    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2200);
  };

  const handleBuyNow = () => {
    addItem(
      {
        productId: product.id,
        productTitle: product.title,
        productSlug: product.slug,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        colorName: selectedVariant.colorName,
        size: selectedVariant.size,
        price: selectedVariant.price,
        image: primaryImage.url,
      },
      quantity,
    );
    router.push('/checkout');
  };

  return (
    <div className="w-full flex flex-col justify-start space-y-8">
      {/* Category / Collection breadcrumb indicator */}
      <div className="text-[10px] uppercase tracking-[0.24em] text-[#525252]">
        <span>{product.category.name}</span>
        <span className="mx-2">•</span>
        <span>Series Archival Release</span>
      </div>

      {/* Title & Price */}
      <div className="space-y-2 border-b border-[#E5E5E5] pb-6">
        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.06em] text-[#000000]">
          {product.title}
        </h1>
        <p className="text-xs uppercase tracking-[0.14em] text-[#525252]">
          {product.subtitle}
        </p>
        <div className="flex items-baseline space-x-3 pt-2">
          <span className="text-xl font-light font-mono text-[#000000]">
            {formatPrice(selectedVariant.price || product.basePrice)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm font-mono text-[#A3A3A3] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Short Description */}
      <div className="text-xs sm:text-sm text-[#525252] leading-relaxed font-light">
        <p>{product.description}</p>
      </div>

      {/* Variants (Colorways / Finishes) */}
      {product.variants.length > 1 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.16em]">
            <span className="text-[#525252]">Finish:</span>
            <span className="text-[#000000] font-medium">{selectedVariant.title}</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`h-10 px-4 text-xs tracking-[0.1em] uppercase border transition-colors flex items-center space-x-2 ${
                    isSelected
                      ? 'border-[#000000] bg-[#FAFAFA] text-[#000000] font-medium'
                      : 'border-[#E5E5E5] text-[#525252] hover:border-[#A3A3A3] hover:text-[#000000]'
                  }`}
                >
                  {v.colorHex && (
                    <span
                      className="w-3 h-3 rounded-none border border-[#E5E5E5]"
                      style={{ backgroundColor: v.colorHex }}
                    />
                  )}
                  <span>{v.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Stock Status */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.16em]">
          <span className="text-[#525252]">Quantity</span>
          <span className="text-[10px] text-[#525252] flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-[#000000] inline-block" />
            <span>Ready for dispatch</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-[#E5E5E5] h-12">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-full flex items-center justify-center text-[#525252] hover:text-[#000000] hover:bg-[#FAFAFA] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-12 text-center text-xs font-mono text-[#000000]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-full flex items-center justify-center text-[#525252] hover:text-[#000000] hover:bg-[#FAFAFA] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] text-[#A3A3A3] tracking-[0.04em]">
            Limited to 5 pieces per order to guarantee authenticity.
          </div>
        </div>
      </div>

      {/* Purchasing Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToBag}
          className="w-full h-14 bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] active:bg-[#525252] text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-150 flex items-center justify-center space-x-2 cursor-pointer"
        >
          {isAddedToast ? (
            <>
              <Check className="w-4 h-4 text-[#FFFFFF]" />
              <span>Added to Bag</span>
            </>
          ) : (
            <span>Add to Bag</span>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="w-full h-14 bg-[#FFFFFF] text-[#000000] border border-[#E5E5E5] hover:border-[#000000] text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-150 flex items-center justify-center cursor-pointer"
        >
          Buy Now
        </button>

        <button
          type="button"
          onClick={() => setWaitlistOpen(true)}
          className="w-full text-[10px] uppercase tracking-[0.2em] text-[#525252] hover:text-[#000000] transition-colors py-1 flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Bell className="w-3 h-3" />
          <span>Join Allocation Waitlist / Restock Alerts</span>
        </button>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        productTitle={product.title}
        variantTitle={selectedVariant?.title}
      />

      {/* Trust & Guarantee Micro-Bar */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E5E5] text-center text-[10px] uppercase tracking-[0.14em] text-[#525252]">
        <div className="flex flex-col items-center py-2 space-y-1">
          <Truck className="w-3.5 h-3.5 text-[#171717]" />
          <span>Worldwide Express</span>
        </div>
        <div className="flex flex-col items-center py-2 space-y-1 border-x border-[#E5E5E5]">
          <Shield className="w-3.5 h-3.5 text-[#171717]" />
          <span>2-Year Warranty</span>
        </div>
        <div className="flex flex-col items-center py-2 space-y-1">
          <RotateCcw className="w-3.5 h-3.5 text-[#171717]" />
          <span>30-Day Returns</span>
        </div>
      </div>

      {/* Editorial Specifications Accordion */}
      <div className="pt-4">
        <Accordion type="single" collapsible defaultValue="details" className="w-full">
          {/* Details */}
          <AccordionItem value="details">
            <AccordionTrigger>Product Specifications</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 list-disc list-inside text-xs leading-relaxed text-[#525252]">
                {product.details?.map((detail, idx) => (
                  <li key={idx} className="marker:text-[#A3A3A3]">
                    {detail}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Materials */}
          <AccordionItem value="materials">
            <AccordionTrigger>Materials & Origin</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-xs leading-relaxed text-[#525252]">
                <p>
                  <strong className="text-[#000000] uppercase tracking-[0.1em] block mb-1">
                    Composition
                  </strong>
                  {product.materials}
                </p>
                <p>
                  <strong className="text-[#000000] uppercase tracking-[0.1em] block mb-1">
                    Provenance
                  </strong>
                  {product.origin}
                </p>
                {product.careGuide && (
                  <p>
                    <strong className="text-[#000000] uppercase tracking-[0.1em] block mb-1">
                      Maintenance
                    </strong>
                    {product.careGuide}
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Dimensions */}
          <AccordionItem value="dimensions">
            <AccordionTrigger>Dimensions & Weight</AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-[#525252] leading-relaxed">
                {product.dimensions}
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Shipping */}
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & Customs</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-xs text-[#525252] leading-relaxed">
                <p>
                  All shipments are insured for full replacement value and dispatched via DHL Express with signature required upon delivery.
                </p>
                <p>
                  Orders over $300 qualify for complimentary global air freight. Delivery duties are prepaid for European Union, United States, and Japan.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Returns */}
          <AccordionItem value="returns">
            <AccordionTrigger>Complimentary Returns</AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-[#525252] leading-relaxed">
                We extend a 30-day evaluation period. If an object fails to meet your tactile or acoustic expectations, our concierge will arrange complimentary return courier pickup in original unblemished packaging.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
