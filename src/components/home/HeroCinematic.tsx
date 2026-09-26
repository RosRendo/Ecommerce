'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles, ShoppingBag, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/store/cart-store';
import { useWishlist } from '@/lib/store/wishlist-store';

interface Hotspot {
  id: string;
  number: string;
  title: string;
  desc: string;
  x: number; // percentage
  y: number; // percentage
}

const HERO_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-1',
    number: '01',
    title: '50mm Beryllium Planar Driver',
    desc: 'Sub-0.2μm diaphragm with push-pull neodymium magnets yielding 5Hz–52kHz response.',
    x: 48,
    y: 42,
  },
  {
    id: 'hs-2',
    number: '02',
    title: 'CNC-Milled Aerospace Billet',
    desc: 'Single-piece 6061-T6 aluminum chassis milled with micro-perforated acoustic vents.',
    x: 28,
    y: 58,
  },
  {
    id: 'hs-3',
    number: '03',
    title: 'Tuscan Full-Grain Lambskin',
    desc: 'Hand-finished vegetable-tanned cushions filled with high-resilience memory foam.',
    x: 72,
    y: 52,
  },
];

export function HeroCinematic() {
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mediaMode, setMediaMode] = useState<'render' | 'film'>('render');
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroProductId = 'prod_01';
  const isSaved = isInWishlist(heroProductId);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleHeroQuickBuy = () => {
    addItem({
      productId: 'prod_01',
      productTitle: 'Aether 01 Headphones',
      productSlug: 'aether-01-headphones',
      variantId: 'var_01_obsidian',
      variantTitle: 'Matte Obsidian',
      colorName: 'Obsidian Black',
      price: 850,
      image: '/images/atelier-hero-headphones.jpg',
    });
    openCart();
  };

  return (
    <section className="relative w-full border-b border-[#E5E5E5] bg-[#FFFFFF] overflow-hidden">
      {/* Top Editorial Telemetry Marquee */}
      <div className="w-full bg-[#FAFAFA] border-b border-[#E5E5E5] py-2 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] uppercase font-mono tracking-[0.2em] text-[#525252]">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 bg-[#000000] inline-block animate-pulse" />
            <span>Zurich Atelier • Live Calibration Stream</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <span>Lot: 26-CH-09</span>
            <span>Tolerance: ±0.18 dB Target Curve</span>
            <span>Allocations: 42% Reserved</span>
          </div>

          <span className="text-[#000000] font-medium">Archival Series 01</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Staggered Kinetic Typography (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-6"
          >
            <div className="flex items-center space-x-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] font-semibold">
                Archival Release 2026
              </span>
              <span className="text-[#E5E5E5]">•</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#000000] border border-[#000000] px-2 py-0.5">
                Edition 0492 / 1000
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.04em] text-[#000000] leading-[1.08]">
              Acoustic void &amp; pure mass.
            </h1>

            <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-md font-light">
              Milled from a single block of aerospace-grade aluminum. Engineered without compromise for sound architects who demand clinical acoustic truth and physical calm.
            </p>

            {/* Quick Action Matrix */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleHeroQuickBuy}
                className="h-14 px-8 bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] active:bg-[#525252] text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-150 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Acquire Instrument</span>
                <span className="font-mono text-[11px] text-[#A3A3A3] pl-1 font-normal">($850)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <Link
                href="/product/aether-01-headphones"
                className="h-14 px-8 bg-[#FFFFFF] text-[#000000] border border-[#E5E5E5] hover:border-[#000000] text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-150 flex items-center justify-center"
              >
                Inspect Specs
              </Link>
            </div>

            {/* Live Interactive Waveform Preview Micro-Bar */}
            <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#525252]">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-0.5 h-4">
                  {[4, 12, 8, 16, 10, 14, 6, 12, 18, 9, 15, 7, 11].map((h, i) => (
                    <span
                      key={i}
                      className="w-[2px] bg-[#000000] inline-block transition-all duration-300"
                      style={{
                        height: `${h}px`,
                        opacity: isPlaying ? 0.8 : 0.25,
                      }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                  Transfer Curve: 5Hz – 52kHz ±1.5dB
                </span>
              </div>

              <button
                onClick={() => toggleWishlist(heroProductId)}
                className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.18em] text-[#525252] hover:text-[#000000] cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#000000] text-[#000000]' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Enormous Interactive Cinematic Stage (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full bg-[#000000] border border-[#E5E5E5] overflow-hidden group select-none">
              {/* Media Mode: Studio Photographic Render vs Live 4K Cinema Film */}
              {mediaMode === 'render' ? (
                <Image
                  src="/images/atelier-hero-headphones.jpg"
                  alt="Aether 01 Acoustic Headphone Flagship"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                <video
                  ref={videoRef}
                  src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale contrast-[1.2] brightness-[0.8] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              )}

              {/* Mode Switcher Pill in Top-Right Corner */}
              <div className="absolute top-4 right-4 z-20 flex items-center bg-[#000000]/80 backdrop-blur-md border border-[#404040] p-1 text-[9px] uppercase font-mono tracking-[0.16em]">
                <button
                  type="button"
                  onClick={() => setMediaMode('render')}
                  className={`px-2.5 py-1 transition-colors cursor-pointer ${
                    mediaMode === 'render'
                      ? 'bg-[#FFFFFF] text-[#000000] font-medium'
                      : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
                  }`}
                >
                  Still Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode('film')}
                  className={`px-2.5 py-1 transition-colors cursor-pointer flex items-center space-x-1 ${
                    mediaMode === 'film'
                      ? 'bg-[#FFFFFF] text-[#000000] font-medium'
                      : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse" />
                  <span>4K Film</span>
                </button>
              </div>

              {/* Subtle Atmospheric Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Architectural Hotspot Pins */}
              {HERO_HOTSPOTS.map((hs) => {
                const isActive = activeHotspot?.id === hs.id;
                return (
                  <div
                    key={hs.id}
                    className="absolute z-20"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  >
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : hs)}
                      className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#000000] text-[#FFFFFF] ring-4 ring-[#FFFFFF]/80 scale-110'
                          : 'bg-[#FFFFFF]/90 text-[#000000] hover:bg-[#FFFFFF] hover:scale-110 shadow-lg'
                      }`}
                      aria-label={`Inspect hotspot ${hs.number}: ${hs.title}`}
                    >
                      <span className="w-1.5 h-1.5 bg-[#000000] rounded-full mr-0.5 animate-ping absolute" />
                      <span>{hs.number}</span>
                    </button>

                    {/* Popover Card */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 p-4 bg-[#FFFFFF] border border-[#000000] shadow-2xl text-left space-y-2 z-30"
                        >
                          <div className="flex justify-between items-baseline">
                            <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#525252]">
                              Spec Item {hs.number}
                            </span>
                            <span className="w-1.5 h-1.5 bg-[#000000]" />
                          </div>
                          <h4 className="text-xs font-medium text-[#000000] tracking-[0.02em]">
                            {hs.title}
                          </h4>
                          <p className="text-[11px] text-[#525252] leading-relaxed font-light">
                            {hs.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Bottom Editorial Caption & Hotspot Callout */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#E5E5E5] gap-3 z-10">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs uppercase tracking-[0.16em] font-medium text-[#000000]">
                      Aether 01 Headphones
                    </p>
                    <span className="text-[9px] uppercase tracking-[0.2em] bg-[#000000] text-[#FFFFFF] px-1.5 py-0.5 font-mono">
                      Flagship
                    </span>
                  </div>
                  <p className="text-[11px] text-[#525252] tracking-[0.04em]">
                    Click markers [01, 02, 03] to explore acoustic metallurgy
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-xs font-mono font-medium text-[#000000]">
                    {formatPrice(850)}
                  </span>
                  <button
                    onClick={handleHeroQuickBuy}
                    className="h-9 px-4 bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] text-[10px] uppercase tracking-[0.18em] font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
