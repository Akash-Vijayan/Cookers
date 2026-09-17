import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import MenuClient from './MenuClient';

export const metadata: Metadata = {
  title: "Catering Menu & Food Items | DD Cookers Tirunelveli",
  description: "Explore DD Cookers extensive catering menu including traditional South Indian tiffin, royal biryani, non-veg gravies, live snack counters, and artisan desserts.",
  alternates: {
    canonical: "https://ddcookers.com/menu",
  },
};

export const instant = false;

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

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <div className="bg-background min-h-screen">
      <MenuClient initialItems={menuItems} />
    </div>
  );
}
