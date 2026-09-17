'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-card border-t border-border/40 text-foreground relative z-10">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-brass text-[10px] font-extrabold tracking-widest uppercase block">
            Client Feedbacks
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">What Our Customers Say</h2>
        </div>

        {/* Testimonial Box */}
        <div className="relative bg-card border border-border p-8 md:p-12 rounded-none shadow-xl transition duration-500">
          <div className="space-y-6">
            {/* Stars */}
            <div className="flex space-x-1 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonials[activeTestimonial].rating
                      ? 'fill-brass text-brass'
                      : 'text-brass/20'
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-lg md:text-xl font-medium leading-relaxed italic text-foreground/80 font-serif">
              &quot;{testimonials[activeTestimonial].text}&quot;
            </p>

            {/* Author details */}
            <div className="flex flex-col items-center justify-center pt-6 border-t border-border/40 space-y-1">
              <p className="font-extrabold text-base text-foreground">
                {testimonials[activeTestimonial].name}
              </p>
              <p className="text-[10px] text-brass tracking-wider uppercase">
                {testimonials[activeTestimonial].date}
              </p>
            </div>
          </div>

          {/* Slider arrows */}
          <div className="flex justify-center space-x-4 pt-8">
            <button
              onClick={() =>
                setActiveTestimonial(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-3 border border-brass/30 hover:border-brass hover:bg-brass/10 rounded-none transition cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4 text-brass" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-3 border border-brass/30 hover:border-brass hover:bg-brass/10 rounded-none transition cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4 text-brass" />
            </button>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center space-x-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === activeTestimonial ? 'w-8 bg-carmine' : 'w-1.5 bg-border'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
