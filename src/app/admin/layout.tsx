'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Calendar, Utensils, MessageSquare, ArrowLeft, LogOut, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks = [
    { name: 'Overview', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Bookings', href: '/admin/bookings', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Menu CRUD', href: '/admin/menu', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Inquiries', href: '/admin/messages', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 border-4 border-brass border-t-transparent rounded-full animate-spin" />
          <p className="text-foreground/60 font-semibold text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Double check auth fallback (middleware handles this, but layout double-checks)
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-border p-8 rounded-3xl text-center shadow-xl space-y-6">
          <div className="mx-auto inline-flex bg-carmine/15 p-4 rounded-2xl text-carmine">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-black text-foreground">Access Denied</h2>
          <p className="text-sm text-foreground/75 leading-relaxed">
            You do not have administrative permissions to access this dashboard. Please log in with an admin credentials account.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/login"
              className="px-5 py-2.5 bg-carmine text-bone font-bold rounded-xl text-xs hover:bg-carmine/90 transition shadow"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 border border-border hover:bg-foreground/5 font-bold rounded-xl text-xs transition text-foreground"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background transition-colors duration-300">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card shadow-sm hidden md:flex flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Admin title */}
          <div className="flex items-center space-x-2">
            <div className="bg-carmine p-2 rounded-xl text-bone shadow">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-black text-brass">
                DD Cookers
              </span>
              <p className="text-[10px] uppercase font-black text-foreground/50 tracking-wider">Admin Control</p>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-carmine text-bone shadow-md'
                    : 'text-foreground/80 hover:bg-foreground/5 hover:text-brass'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer controls */}
        <div className="space-y-4 border-t border-border pt-6">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-bold text-foreground/60 hover:text-brass transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full text-left text-xs font-bold text-carmine hover:bg-carmine/10 p-2.5 rounded-xl transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE PANEL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header Bar */}
        <header className="md:hidden border-b border-border bg-card p-4 flex justify-between items-center">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="bg-carmine p-1.5 rounded-lg text-bone">
              <Utensils className="h-4 w-4" />
            </div>
            <span className="text-base font-black text-bone">Admin Panel</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-1.5 text-xs font-bold">
              <Link href="/admin/bookings" className="p-2 hover:text-brass text-foreground/80">Bookings</Link>
              <Link href="/admin/menu" className="p-2 hover:text-brass text-foreground/80">Menu</Link>
            </nav>
            <button
              onClick={handleLogout}
              className="text-carmine p-2 hover:bg-carmine/10 rounded-lg cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </header>

        {/* Workspace body */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
