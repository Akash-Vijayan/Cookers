import React from 'react';
import { prisma } from '@/lib/db';
import GalleryClient from './GalleryClient';

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

export const revalidate = 60; // Cache photos for 1 minute

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen">
      <GalleryClient initialItems={items} />
    </div>
  );
}
