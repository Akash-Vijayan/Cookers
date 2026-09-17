'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Utensils, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await register(name, email, password);
      if (res.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(res.error || 'Registration failed.');
        setLoading(false);
      }
    } catch {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card border border-border rounded-2xl shadow-xl transition-all duration-300">
        
        {/* Title Block */}
        <div className="text-center">
          <div className="inline-flex bg-carmine p-3 rounded-2xl text-bone mb-4 shadow-lg">
            <Utensils className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Create <span className="font-serif italic text-brass">Account</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/75">
            Join DD Cookers to book gourmet catering for your next big event.
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 bg-carmine/15 text-carmine p-4 rounded-xl text-sm border border-carmine/30 animate-fade-in">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 bg-brass/15 text-brass p-4 rounded-xl text-sm border border-brass/30 animate-fade-in">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase text-brass tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brass/50">
                  <User className="h-5 w-5" />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-carmine focus:ring-1 focus:ring-carmine/30 text-foreground placeholder:text-foreground/40 transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Address Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase text-brass tracking-wider mb-1.5">
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
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase text-brass tracking-wider mb-1.5">
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase text-brass tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brass/50">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-carmine focus:ring-1 focus:ring-carmine/30 text-foreground placeholder:text-foreground/40 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#B32E33] to-[#6E151A] hover:brightness-105 text-bone font-bold rounded-xl shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-foreground/75">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-brass hover:text-brass/80">
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}
