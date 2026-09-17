'use client';

import React, { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  label: string;
  target: number;
  suffix: string;
}

function CounterItem({ label, target, suffix }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <div ref={itemRef} className="space-y-1 pt-4 lg:pt-0">
      <h4 className="font-serif italic text-4xl sm:text-5xl text-brass font-light tracking-tight">
        {count.toLocaleString()}{suffix}
      </h4>
      <p className="uppercase tracking-widest text-[9px] text-stats-label font-black">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      label: 'Years of Heritage',
      target: 18,
      suffix: '+',
    },
    {
      label: 'Feasts Conducted',
      target: 1500,
      suffix: '+',
    },
    {
      label: 'Professional Servers',
      target: 50,
      suffix: '+',
    },
    {
      label: 'Traditional Ingredients',
      target: 100,
      suffix: '%',
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-stats-bg border-y border-border/60 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 lg:divide-x divide-border/40">
        {stats.map((item) => (
          <CounterItem
            key={item.label}
            label={item.label}
            target={item.target}
            suffix={item.suffix}
          />
        ))}
      </div>
    </section>
  );
}
