'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Layers,
  Tag,
  TrendingUp,
  Clock,
  Check,
  AlertCircle,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/lib/data/products';

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  itemTitle: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  trackingNumber: string;
  date: string;
}

interface AdminCoupon {
  code: string;
  discount: string;
  usageCount: number;
  maxUsage: number;
  status: 'ACTIVE' | 'EXPIRED';
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'ATL-2026-891024',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@atelier-prive.com',
    itemTitle: 'Aether 01 Headphones (Matte Obsidian)',
    total: 850,
    status: 'SHIPPED',
    trackingNumber: 'DHL-892410-CH',
    date: 'Sep 18, 2026',
  },
  {
    id: 'ord-2',
    orderNumber: 'ATL-2026-304198',
    customerName: 'Lord Alistair Sterling',
    customerEmail: 'sterling@mayfair-holdings.co.uk',
    itemTitle: 'The Monolith Column Speaker (Raw Basalt)',
    total: 3200,
    status: 'PROCESSING',
    trackingNumber: 'SWISS-918234-CH',
    date: 'Sep 24, 2026',
  },
  {
    id: 'ord-3',
    orderNumber: 'ATL-2026-990142',
    customerName: 'Kenzo Takahashi',
    customerEmail: 'kenzo@minato-arch.jp',
    itemTitle: 'Chrono-01 Ceramic Watch',
    total: 1450,
    status: 'PENDING',
    trackingNumber: '',
    date: 'Sep 26, 2026',
  },
  {
    id: 'ord-4',
    orderNumber: 'ATL-2026-614092',
    customerName: 'Sarah Jenkins',
    customerEmail: 's.jenkins@studio-nyc.com',
    itemTitle: 'Titanium Mechanical Pencil',
    total: 185,
    status: 'DELIVERED',
    trackingNumber: 'DHL-551029-US',
    date: 'Aug 04, 2026',
  },
];

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    code: 'ATELIER10',
    discount: '10% Off Catalog',
    usageCount: 42,
    maxUsage: 100,
    status: 'ACTIVE',
  },
  {
    code: 'ARCHIVE20',
    discount: '20% Archival Drops',
    usageCount: 18,
    maxUsage: 50,
    status: 'ACTIVE',
  },
  {
    code: 'VIPEXCLUSIVE',
    discount: '$200 Concierge Credit',
    usageCount: 9,
    maxUsage: 25,
    status: 'ACTIVE',
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'coupons'>('overview');
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState<AdminCoupon[]>(INITIAL_COUPONS);
  const [inventory, setInventory] = useState(
    PRODUCTS.map((p) => ({
      id: p.id,
      title: p.title,
      sku: p.variants[0]?.sku || 'SKU-ATL',
      stock: p.id === 'the-monolith' ? 4 : p.id === 'aether-01' ? 12 : 28,
      price: p.basePrice,
    })),
  );

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15% Private Collector');

  const updateOrderStatus = (orderNumber: string, newStatus: AdminOrder['status'], tracking?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderNumber === orderNumber) {
          return {
            ...o,
            status: newStatus,
            trackingNumber: tracking || o.trackingNumber || `DHL-${Math.floor(100000 + Math.random() * 900000)}-CH`,
          };
        }
        return o;
      }),
    );
  };

  const adjustStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, stock: Math.max(0, item.stock + delta) };
        }
        return item;
      }),
    );
  };

  const createCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    setCoupons([
      ...coupons,
      {
        code: newCouponCode.toUpperCase().trim(),
        discount: newCouponDiscount,
        usageCount: 0,
        maxUsage: 50,
        status: 'ACTIVE',
      },
    ]);
    setNewCouponCode('');
  };

  return (
    <div className="w-full bg-[#FFFFFF] py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-8 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-2">
              Atelier Zurich Internal Operations
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-[0.06em] text-[#000000]">
              Merchant Console &amp; Fulfillment
            </h1>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-[#525252]">
            <span className="w-2 h-2 bg-[#000000] inline-block animate-pulse" />
            <span>Zurich Logistics Hub • Active Stream</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5E5E5] overflow-x-auto space-x-8 text-xs uppercase tracking-[0.16em]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Overview &amp; KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'orders'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders &amp; Dispatches ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'inventory'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Inventory &amp; Stock Levels</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`pb-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'coupons'
                ? 'border-[#000000] text-[#000000] font-medium'
                : 'border-transparent text-[#525252] hover:text-[#000000]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Promotional Engine</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  Gross Acquisitions (MTD)
                </span>
                <p className="text-3xl font-light font-mono text-[#000000]">$148,920.00</p>
                <p className="text-[11px] text-[#525252]">+18.4% vs previous cycle</p>
              </div>

              <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  Active Dispatches in Transit
                </span>
                <p className="text-3xl font-light font-mono text-[#000000]">
                  {orders.filter((o) => o.status === 'SHIPPED').length}
                </p>
                <p className="text-[11px] text-[#525252]">Average air transit: 2.1 days</p>
              </div>

              <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  Average Order Value (AOV)
                </span>
                <p className="text-3xl font-light font-mono text-[#000000]">$1,421.00</p>
                <p className="text-[11px] text-[#525252]">Top cohort: Acoustic Architecture</p>
              </div>

              <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  Return / Exchange Rate
                </span>
                <p className="text-3xl font-light font-mono text-[#000000]">0.8%</p>
                <p className="text-[11px] text-[#525252]">Industry benchmark: 8.5%</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border border-[#000000] bg-[#FFFFFF] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <h3 className="text-base font-normal tracking-[0.04em] text-[#000000]">
                  Pending Orders Awaiting Calibration Verification
                </h3>
                <p className="text-xs text-[#525252]">
                  {orders.filter((o) => o.status === 'PENDING').length} order requires Zurich workshop sign-off.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="h-10 px-6 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] hover:bg-[#171717] transition-colors cursor-pointer"
              >
                Fulfill Dispatches →
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="border border-[#E5E5E5] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[10px] uppercase tracking-[0.18em] text-[#525252]">
                    <th className="py-4 px-6 font-medium">Order Number</th>
                    <th className="py-4 px-6 font-medium">Customer</th>
                    <th className="py-4 px-6 font-medium">Object Acquired</th>
                    <th className="py-4 px-6 font-medium">Total</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                    <th className="py-4 px-6 font-medium">Tracking Code</th>
                    <th className="py-4 px-6 font-medium text-right">Fulfillment Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {orders.map((ord) => (
                    <tr key={ord.orderNumber} className="hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-medium text-[#000000]">
                        <Link href={`/track?order=${ord.orderNumber}`} className="hover:underline flex items-center space-x-1">
                          <span>{ord.orderNumber}</span>
                          <ExternalLink className="w-3 h-3 text-[#A3A3A3]" />
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-[#000000]">{ord.customerName}</p>
                        <p className="text-[11px] text-[#525252]">{ord.customerEmail}</p>
                      </td>
                      <td className="py-4 px-6 text-[#525252] max-w-xs truncate">{ord.itemTitle}</td>
                      <td className="py-4 px-6 font-mono text-[#000000] font-medium">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-mono border ${
                            ord.status === 'SHIPPED'
                              ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                              : ord.status === 'PROCESSING'
                              ? 'bg-[#FFFFFF] text-[#000000] border-[#000000]'
                              : ord.status === 'DELIVERED'
                              ? 'bg-[#FAFAFA] text-[#525252] border-[#E5E5E5]'
                              : 'bg-[#FAFAFA] text-[#000000] border-[#A3A3A3]'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-[11px] text-[#525252]">
                        {ord.trackingNumber || 'Pending Courier'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {ord.status === 'PENDING' && (
                          <button
                            onClick={() => updateOrderStatus(ord.orderNumber, 'PROCESSING')}
                            className="h-8 px-3 border border-[#000000] text-[10px] uppercase tracking-[0.14em] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                          >
                            Begin Calibration
                          </button>
                        )}
                        {ord.status === 'PROCESSING' && (
                          <button
                            onClick={() => updateOrderStatus(ord.orderNumber, 'SHIPPED')}
                            className="h-8 px-3 bg-[#000000] text-[10px] uppercase tracking-[0.14em] text-[#FFFFFF] hover:bg-[#171717] transition-colors cursor-pointer"
                          >
                            Dispatch Air Courier
                          </button>
                        )}
                        {ord.status === 'SHIPPED' && (
                          <button
                            onClick={() => updateOrderStatus(ord.orderNumber, 'DELIVERED')}
                            className="h-8 px-3 border border-[#E5E5E5] text-[10px] uppercase tracking-[0.14em] text-[#525252] hover:border-[#000000] transition-colors cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {ord.status === 'DELIVERED' && (
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#A3A3A3]">
                            Archived Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Inventory Levels */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="border border-[#E5E5E5] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[10px] uppercase tracking-[0.18em] text-[#525252]">
                    <th className="py-4 px-6 font-medium">Object Name</th>
                    <th className="py-4 px-6 font-medium">SKU Reference</th>
                    <th className="py-4 px-6 font-medium">Unit Price</th>
                    <th className="py-4 px-6 font-medium">Current Stock</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                    <th className="py-4 px-6 font-medium text-right">Quick Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#000000]">{item.title}</td>
                      <td className="py-4 px-6 font-mono text-[#525252]">{item.sku}</td>
                      <td className="py-4 px-6 font-mono text-[#000000]">{formatPrice(item.price)}</td>
                      <td className="py-4 px-6 font-mono font-medium text-sm text-[#000000]">
                        {item.stock} Units
                      </td>
                      <td className="py-4 px-6">
                        {item.stock <= 5 ? (
                          <span className="px-2 py-0.5 border border-[#000000] bg-[#FFFFFF] text-[9px] uppercase tracking-[0.14em] text-[#000000] font-mono">
                            Low Allocation ({item.stock})
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#525252]">
                            Optimal Allocation
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => adjustStock(item.id, -1)}
                          className="w-8 h-8 border border-[#E5E5E5] hover:border-[#000000] text-xs font-mono transition-colors cursor-pointer"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => adjustStock(item.id, 1)}
                          className="w-8 h-8 border border-[#000000] bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] text-xs font-mono transition-colors cursor-pointer"
                        >
                          +1
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Coupons Engine */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 border border-[#E5E5E5] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[10px] uppercase tracking-[0.18em] text-[#525252]">
                    <th className="py-4 px-6 font-medium">Coupon Code</th>
                    <th className="py-4 px-6 font-medium">Terms</th>
                    <th className="py-4 px-6 font-medium">Usage Velocity</th>
                    <th className="py-4 px-6 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {coupons.map((c) => (
                    <tr key={c.code} className="hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-medium text-sm text-[#000000]">{c.code}</td>
                      <td className="py-4 px-6 text-[#525252]">{c.discount}</td>
                      <td className="py-4 px-6 font-mono text-[#000000]">
                        {c.usageCount} / {c.maxUsage} Redeemed
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="px-2 py-0.5 border border-[#000000] text-[9px] uppercase tracking-[0.16em]">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create Coupon Card */}
            <div className="lg:col-span-4 border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#000000] font-medium">
                Issue Promotional Code
              </h3>
              <form onSubmit={createCoupon} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.16em] text-[#525252] block">
                    Promo Code (e.g. MONOLITH15)
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="SUMMERDROP"
                    className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#E5E5E5] text-xs font-mono uppercase tracking-[0.1em] text-[#000000] focus:border-[#000000] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.16em] text-[#525252] block">
                    Discount Terms
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    placeholder="15% Off Archival Release"
                    className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] focus:border-[#000000] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#171717] transition-colors cursor-pointer"
                >
                  Activate Promotional Code
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
