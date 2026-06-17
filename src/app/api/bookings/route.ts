import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/jwt';

// Helper to authenticate request
async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  return await verifyJWT(token);
}

export async function GET() {
  try {
    const payload = await getAuthUser();
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let bookings;
    if (payload.role === 'ADMIN') {
      // Admin sees everything, with user names/emails loaded
      bookings = await prisma.booking.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          package: true,
        },
        orderBy: { date: 'asc' },
      });
    } else {
      // Customer only sees their own bookings
      bookings = await prisma.booking.findMany({
        where: { userId: payload.id },
        include: {
          package: true,
        },
        orderBy: { date: 'desc' },
      });
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Fetch Bookings API Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = await getAuthUser();
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const {
      eventType,
      date,
      time,
      venue,
      guestCount,
      packageId,
      estimatedPrice,
      specialRequests,
      optionalServices,
    } = await req.json();

    // Basic Validations
    if (!eventType || !date || !time || !venue || !guestCount || !estimatedPrice) {
      return NextResponse.json(
        { error: 'Please fill in all required booking fields.' },
        { status: 400 }
      );
    }

    if (guestCount <= 0) {
      return NextResponse.json({ error: 'Guest count must be greater than zero.' }, { status: 400 });
    }

    // Create Booking
    const newBooking = await prisma.booking.create({
      data: {
        userId: payload.id,
        eventType,
        date,
        time,
        venue,
        guestCount: parseInt(guestCount, 10),
        packageId: packageId || null,
        estimatedPrice: parseFloat(estimatedPrice),
        specialRequests: specialRequests || null,
        optionalServices: optionalServices || null,
        status: 'PENDING', // Default state
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully.',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Create Booking API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
}
