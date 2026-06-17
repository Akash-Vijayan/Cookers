import React from 'react';
import { prisma } from '@/lib/db';
import ServicesClient from './ServicesClient';

async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { category: 'asc' },
    });
  } catch (error) {
    console.error('Fetch services error:', error);
    return [];
  }
}

export const revalidate = 60; // Refresh service list Cache every minute

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen">
      <ServicesClient initialServices={services} />
    </div>
  );
}
