import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode } from '../types';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountINR: number) => string;
  convertAmount: (amountINR: number) => number;
  rates: Record<CurrencyCode, number>;
  currencySymbols: Record<CurrencyCode, string>;
}

// Approximate indicative exchange rates relative to 1 INR
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  BDT: 1.42,
  EUR: 0.011,
  AED: 0.044,
  GBP: 0.0094,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  BDT: '৳',
  EUR: '€',
  AED: 'AED ',
  GBP: '£',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    return (localStorage.getItem('medtravel_currency') as CurrencyCode) || 'INR';
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem('medtravel_currency', c);
  };

  const convertAmount = (amountINR: number): number => {
    const rate = EXCHANGE_RATES[currency] || 1;
    return Math.round(amountINR * rate);
  };

  const formatPrice = (amountINR: number): string => {
    const converted = convertAmount(amountINR);
    const symbol = CURRENCY_SYMBOLS[currency] || '₹';

    if (currency === 'INR') {
      return `${symbol}${amountINR.toLocaleString('en-IN')}`;
    }
    return `${symbol}${converted.toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertAmount,
        rates: EXCHANGE_RATES,
        currencySymbols: CURRENCY_SYMBOLS,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
