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
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Missing status payload' }, { status: 400 });
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });

    return NextResponse.json({
      success: true,
      message: `Message status updated to ${status}.`,
      contactMessage: updatedMessage,
    });
  } catch (error) {
    console.error('Update Message API Error:', error);
    return NextResponse.json({ error: 'Failed to update message status.' }, { status: 500 });
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

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    console.error('Delete Message API Error:', error);
    return NextResponse.json({ error: 'Failed to delete message.' }, { status: 500 });
  }
}
