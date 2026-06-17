import React, { Suspense } from 'react';
import { prisma } from '@/lib/db';
import BookingWizard from './BookingWizard';

async function getBookingFormOptions() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { price: 'asc' },
    });
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
    return { packages, services };
  } catch (error) {
    console.error('Error fetching booking wizard options:', error);
    return { packages: [], services: [] };
  }
}

export const dynamic = 'force-dynamic';

export default async function BookingPage() {
  const { packages, services } = await getBookingFormOptions();

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-charcoal">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-foreground/75 font-semibold text-sm">Preparing booking engine...</p>
          </div>
        </div>
      }>
        <BookingWizard packages={packages} services={services} />
      </Suspense>
    </div>
  );
}
