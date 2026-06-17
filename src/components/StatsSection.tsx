'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Users, Award, ShieldCheck } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  target: number;
  suffix: string;
}

function CounterItem({ icon, label, target, suffix }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds animation
    const steps = 50;
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
  }, [target]);

  return (
    <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center space-y-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
      <div className="mx-auto inline-flex bg-primary/10 dark:bg-primary/5 p-4 rounded-2xl text-primary">
        {icon}
      </div>
      <div>
        <p className="text-3xl md:text-4xl font-black tracking-tight">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="text-sm font-semibold text-foreground/60 mt-1 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: <Calendar className="h-6 w-6" />,
      label: 'Events Completed',
      target: 500,
      suffix: '+',
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: 'Happy Customers',
      target: 10000,
      suffix: '+',
    },
    {
      icon: <Award className="h-6 w-6" />,
      label: 'Years Experience',
      target: 14,
      suffix: '+',
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      label: 'Master Chefs',
      target: 10,
      suffix: '+',
    },
  ];

  return (
    <section className="py-12 bg-cream dark:bg-charcoal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <CounterItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            target={item.target}
            suffix={item.suffix}
          />
        ))}
      </div>
    </section>
  );
}
