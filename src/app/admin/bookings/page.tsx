import React from 'react';
import { prisma } from '@/lib/db';
import BookingsAdminClient from './BookingsAdminClient';

async function getAllBookings() {
  try {
    return await prisma.booking.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
        package: {
          select: { name: true, price: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return [];
  }
}


export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <BookingsAdminClient initialBookings={bookings} />
    </div>
  );
}
