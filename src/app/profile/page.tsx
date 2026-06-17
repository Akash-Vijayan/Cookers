'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Calendar, MapPin, Users, DollarSign, Clock, FileText, CheckCircle2, User, Mail, Award } from 'lucide-react';

interface Booking {
  id: string;
  eventType: string;
  date: string;
  time: string;
  venue: string;
  guestCount: number;
  estimatedPrice: number;
  status: string;
  specialRequests: string | null;
  optionalServices: string | null;
  package?: {
    name: string;
    price: number;
  } | null;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error loading profile bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-500 border border-red-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
      default:
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-charcoal">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-foreground/75 font-semibold text-sm">Loading profile and bookings...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Statistics calculations
  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter((b) => b.status === 'APPROVED').length;
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
  const totalInvested = bookings
    .filter((b) => b.status === 'APPROVED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.estimatedPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cream dark:bg-charcoal min-h-screen">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white mb-12 shadow-xl shadow-primary/10">
        <div className="relative z-10 max-w-2xl">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Customer Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
            Hello, {user.name}!
          </h1>
          <p className="text-white/80 mt-2 text-base max-w-lg leading-relaxed">
            Welcome to your dashboard. Track active events, print invoices, and view details of your booking inquiries.
          </p>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <Clock className="w-96 h-96" />
        </div>
      </div>

      {/* Info & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {/* User Card */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">Account Details</h3>
                <span className="text-xs text-foreground/60">Registered Member</span>
              </div>
            </div>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center space-x-2 text-foreground/80">
                <Mail className="h-4.5 w-4.5 text-foreground/40" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/80">
                <Award className="h-4.5 w-4.5 text-foreground/40" />
                <span>Role: <b className="text-primary">{user.role}</b></span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-border">
            <button
              onClick={() => router.push('/booking')}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-sm text-center shadow-md hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Book New Event
            </button>
          </div>
        </div>

        {/* Stats 1 */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center space-x-5">
          <div className="bg-amber-500/10 p-4 rounded-xl text-amber-500">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-black">{pendingBookings}</p>
            <p className="text-sm font-semibold text-foreground/65">Pending Requests</p>
          </div>
        </div>

        {/* Stats 2 */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center space-x-5">
          <div className="bg-emerald-500/10 p-4 rounded-xl text-emerald-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-black">{approvedBookings}</p>
            <p className="text-sm font-semibold text-foreground/65">Approved Events</p>
          </div>
        </div>

        {/* Stats 3 */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center space-x-5">
          <div className="bg-primary/10 p-4 rounded-xl text-primary">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-black">${totalInvested.toLocaleString()}</p>
            <p className="text-sm font-semibold text-foreground/65">Approved Value</p>
          </div>
        </div>
      </div>

      {/* Booking History & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookings List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Your Event Bookings</h2>

          {totalBookings === 0 ? (
            <div className="bg-card border border-border p-12 text-center rounded-2xl shadow-sm">
              <Calendar className="mx-auto h-12 w-12 text-foreground/30 mb-4" />
              <h3 className="text-lg font-bold">No Bookings Found</h3>
              <p className="text-sm text-foreground/60 mt-1 max-w-sm mx-auto">
                You haven't submitted any catering requests yet. Get started by designing your package and event details!
              </p>
              <button
                onClick={() => router.push('/booking')}
                className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-md"
              >
                Plan Event Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`bg-card border p-5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                    selectedBooking?.id === booking.id ? 'border-primary ring-2 ring-primary/10' : 'border-border'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-extrabold text-lg text-foreground">{booking.eventType}</span>
                        {booking.package && (
                          <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {booking.package.name}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-sm text-foreground/75">
                        <span className="flex items-center space-x-1.5">
                          <Calendar className="h-4 w-4 text-foreground/40 shrink-0" />
                          <span>{booking.date} @ {booking.time}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <Users className="h-4 w-4 text-foreground/40 shrink-0" />
                          <span>{booking.guestCount} guests</span>
                        </span>
                        <span className="flex items-center space-x-1.5 col-span-2">
                          <MapPin className="h-4 w-4 text-foreground/40 shrink-0" />
                          <span className="truncate">{booking.venue}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                      <span className="font-black text-xl text-primary">${booking.estimatedPrice.toLocaleString()}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase mt-2 ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Booking Panel / Invoicing */}
        <div className="lg:col-span-1">
          {selectedBooking ? (
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-6 sticky top-24">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <h3 className="font-bold text-lg">Booking Details</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${getStatusStyle(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <span className="text-foreground/50 text-xs uppercase font-bold block mb-1">Event Reference</span>
                  <code className="text-xs bg-foreground/5 p-1 rounded text-primary block truncate font-mono">
                    {selectedBooking.id}
                  </code>
                </div>

                <div>
                  <span className="text-foreground/50 text-xs uppercase font-bold block mb-1">Catering Details</span>
                  <p className="font-semibold text-base">{selectedBooking.eventType}</p>
                  <p className="text-foreground/60 text-xs mt-0.5">
                    Package: {selectedBooking.package ? selectedBooking.package.name : 'Custom Selection'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-foreground/50 text-xs uppercase font-bold block mb-0.5">Date & Time</span>
                    <p className="font-medium text-xs">{selectedBooking.date}</p>
                    <p className="text-foreground/60 text-xs font-medium">{selectedBooking.time}</p>
                  </div>
                  <div>
                    <span className="text-foreground/50 text-xs uppercase font-bold block mb-0.5">Guest Count</span>
                    <p className="font-medium text-xs">{selectedBooking.guestCount} Persons</p>
                  </div>
                </div>

                <div>
                  <span className="text-foreground/50 text-xs uppercase font-bold block mb-0.5">Venue Location</span>
                  <p className="text-xs font-medium">{selectedBooking.venue}</p>
                </div>

                {selectedBooking.optionalServices && (
                  <div>
                    <span className="text-foreground/50 text-xs uppercase font-bold block mb-1">Selected Add-ons</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBooking.optionalServices.split(',').map((svc) => (
                        <span key={svc} className="bg-foreground/5 text-foreground/75 px-2 py-0.5 rounded-full text-xs font-medium border border-border">
                          {svc.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBooking.specialRequests && (
                  <div>
                    <span className="text-foreground/50 text-xs uppercase font-bold block mb-0.5">Special Requests</span>
                    <p className="text-xs bg-amber-500/5 text-foreground/80 p-3 rounded-lg border border-amber-500/10 italic">
                      "{selectedBooking.specialRequests}"
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div>
                    <span className="text-foreground/50 text-xs uppercase font-bold">Total Quote</span>
                    <p className="text-2xl font-black text-primary">${selectedBooking.estimatedPrice.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-foreground/5 border border-border hover:bg-foreground/10 rounded-xl text-xs font-bold transition-all"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border border-dashed p-8 text-center rounded-2xl text-foreground/50 flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-10 w-10 text-foreground/20 mb-3" />
              <p className="text-sm font-semibold max-w-[200px]">Select a booking from the list to view full details and print invoices.</p>
            </div>
          )}
        </div>
      </div>

      {/* Embedded printable Invoice styling context */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          header, footer, nav, button {
            display: none !important;
          }
          .sticky {
            position: relative !important;
            top: 0 !important;
          }
          /* Specify exact DOM selection to print */
          .sticky, .sticky * {
            visibility: visible;
          }
          .sticky {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 20px !important;
          }
        }
      `}</style>
      
    </div>
  );
}
