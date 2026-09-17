'use client';

import React from 'react';
import { useQuote } from '@/context/QuoteContext';

interface InquireServiceButtonProps {
  label?: string;
  className?: string;
}

export default function InquireServiceButton({
  label = "Quick Quote",
  className = "py-2.5 rounded-xl border border-border hover:bg-foreground/5 text-xs font-bold text-center cursor-pointer transition text-foreground"
}: InquireServiceButtonProps) {
  const { openQuote } = useQuote();

  return (
    <button
      onClick={openQuote}
      className={className}
    >
      {label}
    </button>
  );
}
