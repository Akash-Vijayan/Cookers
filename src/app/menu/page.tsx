import React from 'react';
import { prisma } from '@/lib/db';
import MenuClient from './MenuClient';

async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Fetch menu items error:', error);
    return [];
  }
}

export const revalidate = 60; // Refresh menu list cache every minute

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen">
      <MenuClient initialItems={menuItems} />
    </div>
  );
}
