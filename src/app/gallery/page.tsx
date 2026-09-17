import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: "Visual Portfolio & Gallery | DD Cookers Catering Tirunelveli",
  description: "Browse photos of grand wedding hall buffets, live cooking counters, dessert spreads, and executive catering setups by DD Cookers in Tirunelveli.",
  alternates: {
    canonical: "https://ddcookers.com/gallery",
  },
};

export const instant = false;

async function getGalleryItems() {
  try {
    return await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Fetch gallery items error:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-background min-h-screen">
      <GalleryClient initialItems={items} />
    </div>
  );
}
