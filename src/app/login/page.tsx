'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Utensils, Mail, Lock, AlertCircle } from 'lucide-react';

function LoginContent() {
  const { user, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '';

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push(callbackUrl || '/profile');
      }
    }
  }, [user, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid credentials');
        setLoading(false);
      }
    } catch {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-card border border-border rounded-2xl shadow-xl transition-all duration-300">
      
      {/* Title Block */}
      <div className="text-center">
        <div className="inline-flex bg-carmine p-3 rounded-2xl text-bone mb-4 shadow-lg">
          <Utensils className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome <span className="font-serif italic text-brass">Back</span>
        </h2>
        <p className="mt-2 text-sm text-foreground/75">
          Log in to manage bookings, view quotes, or configure menus.
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-carmine/15 text-carmine p-4 rounded-xl text-sm border border-carmine/30 animate-fade-in">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase text-brass tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brass/50">
                <Mail className="h-5 w-5" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-carmine focus:ring-1 focus:ring-carmine/30 text-foreground placeholder:text-foreground/40 transition-all text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase text-brass tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brass/50">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-carmine focus:ring-1 focus:ring-carmine/30 text-foreground placeholder:text-foreground/40 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-carmine focus:ring-carmine border-border rounded accent-[#B32E33]"
            />
            <label htmlFor="remember-me" className="ml-2 text-foreground/75 text-xs">
              Remember me
            </label>
          </div>
          <Link href="/login" className="font-semibold text-brass hover:text-brass/80 text-xs">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-[#B32E33] to-[#6E151A] hover:brightness-105 text-bone font-bold rounded-xl shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center mt-6 text-xs text-foreground/75">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-bold text-brass hover:text-brass/80">
          Register now
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <Suspense fallback={
        <div className="max-w-md w-full p-8 bg-card border border-border rounded-2xl shadow-xl flex flex-col items-center justify-center min-h-[300px]">
          <div className="h-10 w-10 border-4 border-brass border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-foreground/60 text-sm font-semibold">Preparing login portal...</p>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
