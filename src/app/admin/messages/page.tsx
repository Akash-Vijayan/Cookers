import React from 'react';
import { prisma } from '@/lib/db';
import MessagesAdminClient from './MessagesAdminClient';

async function getContactMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    return [];
  }
}


export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <MessagesAdminClient initialMessages={messages} />
    </div>
  );
}
