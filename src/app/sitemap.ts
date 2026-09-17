import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ddcookers.com';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/about',
    '/services',
    '/services/catering',
    '/services/cooking',
    '/services/stall',
    '/menu',
    '/gallery',
    '/packages',
    '/booking',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
