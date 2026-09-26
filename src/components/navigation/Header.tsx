'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { useSearch } from '@/lib/store/search-store';
import { useAuth } from '@/lib/store/auth-store';
import { useWishlist } from '@/lib/store/wishlist-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalQuantity } = useCart();
  const { openSearch } = useSearch();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistIds, openWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Hide header on checkout for distraction-free focused experience
  if (pathname.startsWith('/checkout')) {
    return null;
  }

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/collections', label: 'Collections' },
    { href: '/shop?filter=new', label: 'New' },
    { href: '/journal', label: 'Journal' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* Top Editorial Notice Bar */}
      <div className="bg-[#000000] text-[#FFFFFF] text-[10px] tracking-[0.24em] uppercase py-2 px-4 text-center font-normal">
        <span>Complimentary dispatch on orders over $300 — Worldwide express delivery</span>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-[#FFFFFF] transition-all duration-200 border-b border-transparent',
          isScrolled
            ? 'h-16 border-[#E5E5E5] bg-[#FFFFFF]/98 shadow-[0_1px_0_0_#E5E5E5]'
            : 'h-20 border-[#E5E5E5]/60',
        )}
      >
        <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-base lg:text-lg font-normal tracking-[0.32em] uppercase text-[#000000] hover:opacity-75 transition-opacity select-none"
            >
              ATELIER
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-xs uppercase tracking-[0.18em] transition-colors duration-150 py-1 relative',
                      isActive
                        ? 'text-[#000000] font-medium'
                        : 'text-[#525252] hover:text-[#000000]',
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#000000]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions (Search, Account, Bag) */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center space-x-2 text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] transition-colors group cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 text-[#171717] group-hover:scale-105 transition-transform" />
              <span className="hidden lg:inline text-[11px]">Search</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-[#A3A3A3] border border-[#E5E5E5] bg-[#FAFAFA]">
                ⌘K
              </kbd>
            </button>

            {/* Account / Client Auth */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 text-xs uppercase tracking-[0.16em] text-[#000000] hover:text-[#525252] transition-colors group"
                  aria-label="Account and orders"
                >
                  <User className="w-4 h-4 text-[#171717] group-hover:scale-105 transition-transform" />
                  <span className="hidden lg:inline text-[11px] font-medium">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden lg:inline text-[9px] uppercase tracking-[0.2em] text-[#A3A3A3] hover:text-[#000000] transition-colors border-l border-[#E5E5E5] pl-2 cursor-pointer"
                  title="Sign out of Atelier Privé"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] transition-colors group"
                aria-label="Client Sign In"
              >
                <User className="w-4 h-4 text-[#171717] group-hover:scale-105 transition-transform" />
                <span className="hidden lg:inline text-[11px]">Sign In</span>
              </Link>
            )}

            {/* Wishlist / Portfolio Trigger */}
            <button
              onClick={openWishlist}
              className="flex items-center space-x-2 text-xs uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] transition-colors group cursor-pointer"
              aria-label={`Saved portfolio containing ${wishlistIds.length} items`}
            >
              <div className="relative">
                <Heart className="w-4 h-4 text-[#171717] group-hover:scale-105 transition-transform" />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#000000] text-[#FFFFFF] text-[9px] w-4 h-4 flex items-center justify-center font-mono">
                    {wishlistIds.length}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-[11px]">Saved</span>
            </button>

            {/* Bag Trigger */}
            <button
              onClick={openCart}
              className="flex items-center space-x-2 text-xs uppercase tracking-[0.16em] text-[#000000] hover:text-[#525252] transition-colors group cursor-pointer"
              aria-label={`Shopping Bag containing ${totalQuantity} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#000000] group-hover:scale-105 transition-transform" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#000000] text-[#FFFFFF] text-[9px] w-4 h-4 flex items-center justify-center font-mono">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[11px] font-medium tracking-[0.18em]">
                Bag {totalQuantity > 0 ? `(${totalQuantity})` : ''}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#000000] hover:text-[#525252] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[112px] bottom-0 z-30 bg-[#FFFFFF] border-t border-[#E5E5E5] flex flex-col justify-between p-8 md:hidden overflow-y-auto"
          >
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">Navigation</p>
              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-light tracking-[0.12em] uppercase text-[#000000] hover:text-[#525252] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-[#E5E5E5] space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="flex items-center space-x-3 text-sm tracking-[0.16em] uppercase text-[#171717]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Catalog</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWishlist();
                  }}
                  className="flex items-center space-x-3 text-sm tracking-[0.16em] uppercase text-[#171717] w-full text-left"
                >
                  <Heart className="w-4 h-4" />
                  <span>Saved Portfolio ({wishlistIds.length})</span>
                </button>
                {isAuthenticated && user ? (
                  <div className="flex items-center justify-between text-sm tracking-[0.16em] uppercase text-[#171717]">
                    <Link href="/account" className="flex items-center space-x-3">
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-xs text-[#525252] hover:text-[#000000] underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center space-x-3 text-sm tracking-[0.16em] uppercase text-[#171717]"
                  >
                    <User className="w-4 h-4" />
                    <span>Client Sign In</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-[#E5E5E5] text-[11px] text-[#A3A3A3] space-y-2 uppercase tracking-[0.16em]">
              <p>Atelier Zurich • Tokyo • New York • Paris</p>
              <p className="text-[10px]">© 2026 Atelier Systems Inc. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
