'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { QuoteProvider } from '@/context/QuoteContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuoteProvider>
          {children}
        </QuoteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
