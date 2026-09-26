'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, User, MapPin, Shield, ArrowRight, Clock } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/lib/store/wishlist-store';
import { useAuth } from '@/lib/store/auth-store';
import { ProductCard } from '@/features/products/ProductCard';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'concierge'>('orders');
  const { wishlistIds } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const mockOrders = [
    {
      orderNumber: 'ATL-2026-891024',
      date: 'September 18, 2026',
      status: 'In Transit via DHL Air',
      trackingCode: 'DHL-892410-CH',
      total: 850,
      items: [
        {
          title: 'Aether 01 Headphones',
          variant: 'Matte Obsidian',
          quantity: 1,
          price: 850,
        },
      ],
    },
    {
      orderNumber: 'ATL-2026-614092',
      date: 'August 04, 2026',
      status: 'Delivered • Signed by Recipient',
      trackingCode: 'DHL-551029-US',
      total: 185,
      items: [
        {
          title: 'Titanium Mechanical Pencil',
          variant: 'Satin Blasted Titanium',
          quantity: 1,
          price: 185,
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-2">
              Atelier Privé Client Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
              {user?.name || 'Client Portal'}
            </h1>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#525252] tracking-[0.08em] uppercase">
            <div>
              Client Tier: <strong className="text-[#000000]">{user?.memberNumber || 'Privé Guest'}</strong>
            </div>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-[11px] uppercase tracking-[0.16em] text-[#525252] hover:text-[#000000] border-l border-[#E5E5E5] pl-4 cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5E5E5] mb-12 overflow-x-auto space-x-8 text-xs uppercase tracking-[0.16em]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'orders'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders &amp; Dispatches ({mockOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'wishlist'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Saved Portfolio ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'addresses'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivery Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('concierge')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'concierge'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Private Concierge</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {mockOrders.map((order) => (
              <div
                key={order.orderNumber}
                className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 lg:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#E5E5E5] pb-4 space-y-2 sm:space-y-0 text-xs">
                  <div>
                    <span className="font-mono text-sm text-[#000000] font-medium">
                      {order.orderNumber}
                    </span>
                    <span className="text-[#525252] block sm:inline sm:ml-4">{order.date}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-[#FFFFFF] border border-[#E5E5E5] uppercase tracking-[0.12em] text-[10px] text-[#171717]">
                      {order.status}
                    </span>
                    <span className="font-mono font-medium text-sm text-[#000000]">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#E5E5E5]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-medium text-[#000000] tracking-[0.02em]">{item.title}</p>
                        <p className="text-[11px] text-[#525252]">
                          {item.variant} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-mono text-[#000000]">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#525252] border-t border-[#E5E5E5] gap-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#171717]" />
                    <span>Tracking Reference: <strong className="font-mono text-[#000000]">{order.trackingCode}</strong></span>
                    <Link
                      href={`/track?order=${order.orderNumber}`}
                      className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[#000000] hover:underline font-medium"
                    >
                      View Live Timeline →
                    </Link>
                  </div>

                  <span className="text-[#000000] hover:underline cursor-pointer uppercase tracking-[0.14em] text-[11px]">
                    Download Certificate of Authenticity (PDF)
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4 border border-[#E5E5E5] p-8 bg-[#FAFAFA]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
                  Your private portfolio is empty
                </p>
                <p className="text-xs text-[#525252] max-w-sm mx-auto">
                  Save archival objects to your portfolio to receive advance notice of serial production batches.
                </p>
                <Link
                  href="/shop"
                  className="h-11 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center hover:bg-[#171717] transition-colors"
                >
                  Explore Catalog
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-[#000000] bg-[#FFFFFF] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#000000] font-medium">
                  Primary Residence (Default)
                </span>
                <span className="text-[10px] font-mono text-[#525252]">Active</span>
              </div>
              <p className="text-xs text-[#000000] font-medium">Marcus Vance</p>
              <p className="text-xs text-[#525252] leading-relaxed">
                450 West 14th Street, Penthouse B<br />
                Meatpacking District, New York, NY 10014<br />
                United States
              </p>
              <p className="text-xs text-[#525252] pt-2">+1 (212) 555-0199</p>
            </div>

            <div className="p-6 border border-[#E5E5E5] bg-[#FAFAFA] flex flex-col items-center justify-center text-center space-y-2 min-h-[160px]">
              <p className="text-xs uppercase tracking-[0.14em] text-[#525252]">Add Secondary Atelier Address</p>
              <button className="h-10 px-6 border border-[#E5E5E5] hover:border-[#000000] text-xs uppercase tracking-[0.16em] text-[#000000] transition-colors">
                + New Address
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Concierge */}
        {activeTab === 'concierge' && (
          <div className="max-w-xl space-y-6 border border-[#E5E5E5] p-8 bg-[#FAFAFA]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#525252]">
                Personal Representative
              </span>
              <h3 className="text-lg font-normal tracking-[0.06em] text-[#000000] mt-1">
                Elena Rostova — Head of Client Relations
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed mt-2">
                Your dedicated concierge is available for acoustic room assessments, private salon bookings in Zurich and Tokyo, or custom engraving requests.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] space-y-2 text-xs text-[#525252]">
              <p>
                Direct Telegram / Signal: <strong className="text-[#000000] font-mono">+41 44 218 90 00</strong>
              </p>
              <p>
                Private Dossier Email: <strong className="text-[#000000]">concierge@atelier.design</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
