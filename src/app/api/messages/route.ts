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

export async function GET() {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('Fetch Messages API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please enter your name, email, and message.' },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        status: 'UNREAD',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully.',
      contactMessage: newMessage,
    });
  } catch (error) {
    console.error('Create Message API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
