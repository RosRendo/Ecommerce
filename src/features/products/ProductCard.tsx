'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/store/cart-store';
import { useWishlist } from '@/lib/store/wishlist-store';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const primaryImage = product.images.find((img) => img.isHero) || product.images[0];
  const secondaryImage = product.images.find((img) => img.isSecondary) || product.images[1] || primaryImage;
  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (defaultVariant) {
      addItem({
        productId: product.id,
        productTitle: product.title,
        productSlug: product.slug,
        variantId: defaultVariant.id,
        variantTitle: defaultVariant.title,
        colorName: defaultVariant.colorName,
        size: defaultVariant.size,
        price: defaultVariant.price,
        image: primaryImage.url,
      });
    }
  };

  return (
    <div
      className="group relative flex flex-col w-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden bg-[#FAFAFA]">
        {/* Aspect ratio container (4:5 Editorial Proportion) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F5F5]">
          {/* Wishlist Heart Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E5E5E5] cursor-pointer ${
              isSaved ? 'text-[#000000]' : 'text-[#A3A3A3] hover:text-[#000000]'
            }`}
            aria-label={isSaved ? 'Remove from portfolio' : 'Save to portfolio'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#000000] text-[#000000]' : ''}`} />
          </button>

          {/* Primary Product Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-out ${
              isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* Secondary Hover Image */}
          {secondaryImage && (
            <div
              className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={secondaryImage.url}
                alt={secondaryImage.altText || product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>
          )}

          {/* Minimal Quick-Add Bar - revealed smoothly on hover without obstructing the photo */}
          <div
            className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-200 hidden sm:block ${
              isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={handleQuickAdd}
              className="w-full h-10 bg-[#FFFFFF] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-150 text-[10px] uppercase tracking-[0.2em] font-medium border border-[#E5E5E5] flex items-center justify-center cursor-pointer shadow-sm"
              aria-label={`Quick add ${product.title} to bag`}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </Link>

      {/* Product Metadata: Product Name, Short Descriptor, Price */}
      <div className="pt-4 flex flex-col space-y-1">
        <div className="flex items-baseline justify-between">
          <Link
            href={`/product/${product.slug}`}
            className="text-sm font-normal tracking-[0.04em] text-[#000000] hover:text-[#525252] transition-colors"
          >
            {product.title}
          </Link>
          <span className="text-sm font-light tracking-[0.04em] text-[#000000] font-mono">
            {formatPrice(product.basePrice)}
          </span>
        </div>

        <p className="text-xs text-[#525252] tracking-[0.02em] font-light line-clamp-1">
          {product.subtitle}
        </p>

        {product.variants.length > 1 && (
          <p className="text-[10px] text-[#A3A3A3] tracking-[0.06em] pt-0.5">
            {product.variants.length} colorways
          </p>
        )}
      </div>
    </div>
  );
}
