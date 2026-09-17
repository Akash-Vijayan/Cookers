import React from 'react';
import { prisma } from '@/lib/db';
import MenuAdminClient from './MenuAdminClient';

async function getAdminMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  } catch (error) {
    console.error('Error fetching admin menu items:', error);
    return [];
  }
}


export default async function AdminMenuPage() {
  const items = await getAdminMenuItems();

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <MenuAdminClient initialItems={items} />
    </div>
  );
}
