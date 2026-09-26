'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  format: (amountInUSD: number) => string;
  rate: number;
}

const RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 154.5,
};

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('atelier_currency');
      if (stored && ['USD', 'EUR', 'GBP', 'JPY'].includes(stored)) {
        setCurrency(stored as CurrencyCode);
      }
    } catch {
      // Ignore
    }
  }, []);

  const changeCurrency = (c: CurrencyCode) => {
    setCurrency(c);
    try {
      localStorage.setItem('atelier_currency', c);
    } catch {
      // Ignore
    }
  };

  const format = (amountInUSD: number) => {
    const rate = RATES[currency] || 1;
    const converted = amountInUSD * rate;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 0,
      maximumFractionDigits: currency === 'JPY' ? 0 : 0,
    });

    return formatter.format(Math.round(converted));
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: changeCurrency,
        format,
        rate: RATES[currency] || 1,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
