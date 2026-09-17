import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/jwt';
import { revalidateTag } from 'next/cache';

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return false;
  const payload = await verifyJWT(token);
  return payload?.role === 'ADMIN';
}

export async function POST(req: Request) {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, price, category, dietaryTag, imageUrl, availability } = await req.json();

    if (!name || !description || price === undefined || !category || !dietaryTag) {
      return NextResponse.json(
        { error: 'Please fill in name, description, price, category, and dietary tag.' },
        { status: 400 }
      );
    }

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        dietaryTag: dietaryTag.toUpperCase(),
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        availability: availability !== undefined ? availability : true,
      },
    });

    revalidateTag('menu-items', 'max');

    return NextResponse.json({
      success: true,
      message: 'New dish created successfully.',
      menuItem: newItem,
    });
  } catch (error) {
    console.error('Create Menu Item API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item. Please try again.' },
      { status: 500 }
    );
  }
}
