'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative h-60 rounded-none overflow-hidden shadow-md cursor-pointer border border-border hover:border-brass/60 transition duration-300 bg-card"
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-5 text-foreground">
              <div>
                <span className="inline-flex items-center space-x-1 text-xs text-brass font-black mb-1">
                  <Eye className="h-3.5 w-3.5 shrink-0" />
                  <span>Zoom</span>
                </span>
                <p className="font-semibold text-xs leading-snug">{img.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 md:px-12 animate-fade-in select-none">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + images.length) % images.length : null
              )
            }
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-[60vh] max-w-4xl">
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].caption}
                fill
                sizes="100vw"
                className="object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-center text-white max-w-lg">
              <span className="text-brass text-xs font-bold uppercase tracking-wider block mb-1">
                Visual Portfolio
              </span>
              <p className="text-base font-medium leading-relaxed">
                {images[lightboxIndex].caption}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
            }
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
