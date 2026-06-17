import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/jwt';

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return false;
  const payload = await verifyJWT(token);
  return payload?.role === 'ADMIN';
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Dynamically build update data
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = parseFloat(body.price);
    if (body.category !== undefined) updateData.category = body.category;
    if (body.dietaryTag !== undefined) updateData.dietaryTag = body.dietaryTag.toUpperCase();
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.availability !== undefined) updateData.availability = body.availability;

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Menu item updated successfully.',
      menuItem: updatedItem,
    });
  } catch (error) {
    console.error('Update Menu Item API Error:', error);
    return NextResponse.json({ error: 'Failed to update menu item.' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Menu item deleted successfully.',
    });
  } catch (error) {
    console.error('Delete Menu Item API Error:', error);
    return NextResponse.json({ error: 'Failed to delete menu item.' }, { status: 500 });
  }
}
