'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { QuoteProvider } from '@/context/QuoteContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QuoteProvider>
        {children}
      </QuoteProvider>
    </AuthProvider>
  );
}
