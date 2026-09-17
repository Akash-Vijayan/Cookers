'use client';

import React, { createContext, useContext, useState } from 'react';

interface QuoteContextType {
  isOpen: boolean;
  openQuote: () => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openQuote = () => setIsOpen(true);
  const closeQuote = () => setIsOpen(false);

  return (
    <QuoteContext.Provider value={{ isOpen, openQuote, closeQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
