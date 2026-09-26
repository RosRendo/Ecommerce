'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  discountAmount: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODES: Record<string, number> = {
  ATELIER10: 0.1,
  ARCHIVE20: 0.2,
  PRIVILEGE: 0.15,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atelier_cart_v1');
      const storedPromo = localStorage.getItem('atelier_promo_v1');
      if (stored) setItems(JSON.parse(stored));
      if (storedPromo) setPromoCode(storedPromo);
    } catch {
      // LocalStorage unavailable
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage on update
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('atelier_cart_v1', JSON.stringify(items));
      if (promoCode) {
        localStorage.setItem('atelier_promo_v1', promoCode);
      } else {
        localStorage.removeItem('atelier_promo_v1');
      }
    } catch {
      // Ignore write errors
    }
  }, [items, promoCode, isHydrated]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (itemData: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === itemData.productId && i.variantId === itemData.variantId,
      );

      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }

      const newItem: CartItem = {
        ...itemData,
        id: `${itemData.productId}-${itemData.variantId}-${Date.now()}`,
        quantity,
      };

      return [...prev, newItem];
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  const applyPromo = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted]) {
      setPromoCode(formatted);
      return { success: true, message: `Code ${formatted} applied.` };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removePromo = () => setPromoCode(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = promoCode ? PROMO_CODES[promoCode] || 0 : 0;
  const discountAmount = subtotal * discountRate;
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 25;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        promoCode,
        discountAmount,
        applyPromo,
        removePromo,
        subtotal,
        shipping,
        tax,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
