'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Sun, Moon, Utensils, User, LogOut, LayoutDashboard, Phone } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Menu', href: '/menu' },
    { name: 'Packages', href: '/packages' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Chefs', href: '/about#chefs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary hover:bg-primary-hover p-2.5 rounded-xl text-white transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 shadow-md shadow-primary/20">
              <Utensils className="h-6 w-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cookers
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Secondary Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-foreground/5 text-foreground/80 hover:text-foreground transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Controls */}
            {user ? (
              <div className="flex items-center space-x-3">
                {user.role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    className="flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}

                {/* Booking Button */}
                <Link
                  href="/booking"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Book Catering
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-full hover:bg-red-500/10 text-red-500 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-foreground/5"
                >
                  Login
                </Link>
                <Link
                  href="/booking"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white text-sm font-semibold shadow-md shadow-primary/20 hover:scale-[1.02] transition-all duration-300"
                >
                  Book Catering
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5 text-foreground/85"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-foreground/5 text-foreground/85"
              aria-label="Open Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (with backdrop-blur) */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border animate-fade-in absolute w-full left-0 z-40 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-foreground/5 text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border my-3" />
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2 flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-sm">{user.name}</span>
                </div>
                {user.role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-foreground/5 text-foreground/80 text-base font-semibold"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-foreground/5 text-foreground/80 text-base font-semibold"
                  >
                    <User className="h-5 w-5" />
                    <span>Customer Profile</span>
                  </Link>
                )}
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md"
                >
                  <Phone className="h-5 w-5" />
                  <span>Book Catering</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 font-semibold"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 border border-border rounded-xl text-base font-semibold text-foreground/80 hover:bg-foreground/5"
                >
                  Login
                </Link>
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-base font-semibold shadow-md"
                >
                  Book Catering
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
