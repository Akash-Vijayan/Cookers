'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  customerName: string;
  content: string;
  rating: number;
  eventDate: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultTestimonials = [
    {
      id: '1',
      customerName: 'Aishwarya Roy',
      content: 'Cookers handled our wedding food for 250 guests. The Gold Package was amazing! The Live Pasta and BBQ tikkas were the highlight. Every single guest praised the taste!',
      rating: 5,
      eventDate: '2026-05-12',
    },
    {
      id: '2',
      customerName: 'Robert D.',
      content: 'We used their Corporate Catering for our company summit. Extremely punctual, professional buffet decoration, and hygienic setup. Highly recommended!',
      rating: 5,
      eventDate: '2026-06-02',
    },
  ];

  const list = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Slider Box */}
      <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-lg relative transition-all duration-500 overflow-hidden">
        {/* Decorative quotes background */}
        <div className="absolute right-8 top-8 opacity-5 text-foreground">
          <Quote className="w-24 h-24" />
        </div>

        <div className="space-y-6 relative z-10">
          {/* Stars */}
          <div className="flex space-x-1 justify-center md:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < list[activeIndex].rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>

          {/* Testimonial Quote */}
          <p className="text-lg md:text-xl font-medium leading-relaxed italic text-foreground/90">
            "{list[activeIndex].content}"
          </p>

          {/* User Details */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div>
              <p className="font-extrabold text-base">{list[activeIndex].customerName}</p>
              <p className="text-xs text-foreground/50 mt-0.5">Event Date: {list[activeIndex].eventDate}</p>
            </div>
            
            {/* Slider Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 border border-border rounded-xl hover:bg-foreground/5 text-foreground/80 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 border border-border rounded-xl hover:bg-foreground/5 text-foreground/80 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {list.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-foreground/15'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
