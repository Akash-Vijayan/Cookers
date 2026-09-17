import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import BookingWizard from './BookingWizard';

export const metadata: Metadata = {
  title: "Online Event Booking & Catering Calculator | DD Cookers Tirunelveli",
  description: "Book your event catering online with DD Cookers. Interactive wizard to select guest counts, event dates, packages, live counters, and instantly submit quote requests.",
  alternates: {
    canonical: "https://ddcookers.com/booking",
  },
};

export const instant = false;

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

export default async function BookingPage() {
  const { packages, services } = await getBookingFormOptions();

  return (
    <div className="bg-background min-h-screen pt-28 lg:pt-36">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-10 w-10 border-4 border-brass border-t-transparent rounded-full animate-spin" />
            <p className="text-foreground/75 font-semibold text-sm">Preparing booking engine...</p>
          </div>
        </div>
      }>
        <BookingWizard packages={packages} services={services} />
      </Suspense>
    </div>
  );
}
