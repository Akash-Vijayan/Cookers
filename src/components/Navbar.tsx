'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useQuote } from '@/context/QuoteContext';
import { Menu, X, Phone, MessageSquare, Mail, MapPin, Clock, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { openQuote } = useQuote();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const root = document.documentElement;
    const initial = savedTheme === 'dark' ? 'dark' : 'light';
    if (initial === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    const timer = setTimeout(() => {
      setTheme(initial);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === 'light') {
      setTheme('dark');
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* 1. Slim Top Bar */}
      <div className="hidden lg:block bg-card/60 backdrop-blur-md border-b border-border/30 text-foreground/75 py-2 text-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-6">
            <a href="tel:+91 94431 56789" className="flex items-center space-x-2 hover:text-primary transition font-semibold">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>+91 94431 56789</span>
            </a>
            <a href="mailto:info@ddcookers.com" className="flex items-center space-x-2 hover:text-primary transition font-semibold">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>info@ddcookers.com</span>
            </a>
          </div>
          
          {/* Right: Location & Operating Hours */}
          <div className="hidden md:flex items-center space-x-6 text-foreground/60 font-medium">
            <span className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary/70" />
              <span>Kovalam, Agastheeswaram</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5 text-primary/70" />
              <span>09:00 AM - 10:00 PM</span>
            </span>
          </div>
        </div>
      </div>
 
      {/* 2. Main Navigation Bar */}
      <div
        className={`backdrop-blur-md border-b border-border/40 transition-all duration-300 ${
          isScrolled ? 'bg-card/90 py-2 shadow-lg' : 'bg-card/40 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo on Left */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-12 w-14 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="DD Cookers Logo"
                  width={56}
                  height={48}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-wider uppercase font-serif text-foreground group-hover:text-brass transition duration-300">
                DD Cookers
              </span>
            </Link>
 
            {/* Navigation Links (Centered) */}
            <nav className="hidden lg:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`text-[10px] uppercase tracking-widest font-extrabold transition-colors duration-200 relative py-1 ${
                      isActive(link.href)
                        ? 'text-brass'
                        : 'text-foreground/80 hover:text-brass'
                    }`}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brass" />
                    )}
                  </Link>
                </div>
              ))}
            </nav>
 
            {/* CTA Button on Right */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2.5 mr-3 text-brass hover:text-foreground transition duration-300 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-brass/25 hover:border-brass/60 rounded-none bg-transparent"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={openQuote}
                className="px-6 py-2.5 border border-brass text-brass hover:bg-carmine hover:border-carmine hover:text-bone font-bold uppercase tracking-widest text-[9px] transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Inquire
              </button>
            </div>
 
            {/* Mobile CTA + hamburger menu button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-brass hover:text-foreground transition duration-300 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-brass/25 hover:border-brass/60 rounded-none bg-transparent"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={openQuote}
                className="px-3.5 py-2 border border-brass text-brass hover:bg-carmine hover:border-carmine hover:text-bone font-bold uppercase tracking-widest text-[9px] transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Inquire
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 border border-primary/20 rounded-none hover:bg-foreground/5 text-foreground/85 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
 
          </div>
        </div>
      </div>
 
      {/* Mobile menu drawer */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-primary/10 animate-fade-in absolute w-full left-0 z-45 shadow-lg transition-colors duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3.5 text-sm uppercase tracking-wider font-bold min-h-[44px] ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/5'
                      : 'hover:bg-foreground/5 text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <hr className="border-primary/10 my-3" />
            <div className="space-y-3 pt-2">
              <a
                href="tel:+91 94431 56789"
                className="flex items-center justify-center space-x-2 py-3.5 border border-primary/25 rounded-none text-xs uppercase tracking-widest font-bold text-foreground hover:bg-foreground/5 min-h-[44px]"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 94431 56789</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openQuote();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 bg-carmine text-bone font-bold uppercase tracking-widest text-[10px] cursor-pointer min-h-[44px] hover:brightness-105"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
