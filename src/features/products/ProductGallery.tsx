'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails rail on desktop */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible shrink-0 pb-2 lg:pb-0">
        {images.map((image, idx) => (
          <button
            key={image.id || idx}
            onClick={() => setSelectedIndex(idx)}
            className={cn(
              'relative w-16 h-20 sm:w-20 sm:h-24 bg-[#F5F5F5] overflow-hidden border transition-all cursor-pointer shrink-0',
              selectedIndex === idx
                ? 'border-[#000000] ring-1 ring-[#000000]'
                : 'border-[#E5E5E5] hover:border-[#A3A3A3]',
            )}
            aria-label={`View photo ${idx + 1} of ${title}`}
          >
            <Image
              src={image.url}
              alt={image.altText || `${title} thumbnail ${idx + 1}`}
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Large Editorial Photography View */}
      <div className="flex-1 relative aspect-[4/5] sm:aspect-[4/4.5] w-full bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden group">
        <Image
          src={images[selectedIndex].url}
          alt={images[selectedIndex].altText || `${title} main view`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />

        {/* Quiet index badge */}
        <div className="absolute bottom-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-none px-2.5 py-1 text-[10px] font-mono text-[#525252] border border-[#E5E5E5] tracking-widest">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
