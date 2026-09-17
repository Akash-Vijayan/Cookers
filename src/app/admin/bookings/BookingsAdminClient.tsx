'use client';

import React, { useState } from 'react';
import { Check, X, FileText, Download, Trash, AlertCircle } from 'lucide-react';

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
  user: {
    name: string;
    email: string;
  };
  package?: {
    name: string;
    price: number;
  } | null;
}

interface BookingsAdminClientProps {
  initialBookings: Booking[];
}

export default function BookingsAdminClient({ initialBookings }: BookingsAdminClientProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');

  const statusOptions = ['All', 'PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'];

  // Filter list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || b.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return 'bg-primary/10 text-primary border border-primary/20';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-500 border border-red-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
      default:
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    }
  };

  // Actions API Calls
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setActionError('');
    setLoadingId(id);

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus.toUpperCase() } : b))
        );
        // Sync selected details panel if open
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus.toUpperCase() } : null));
        }
      } else {
        const data = await res.json();
        setActionError(data.error || 'Failed to update booking status.');
      }
    } catch {
      setActionError('An error occurred. Please try again.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking request? This action cannot be undone.')) {
      return;
    }

    setActionError('');
    setLoadingId(id);

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        setSelectedBooking(null);
      } else {
        const data = await res.json();
        setActionError(data.error || 'Failed to delete booking.');
      }
    } catch {
      setActionError('An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = 'Booking ID,Customer,Email,Event Style,Date,Time,Venue,Guests,Price,Status\n';
    const rows = filteredBookings
      .map((b) =>
        `"${b.id}","${b.user.name}","${b.user.email}","${b.eventType}","${b.date}","${b.time}","${b.venue.replace(
          /"/g,
          '""'
        )}",${b.guestCount},${b.estimatedPrice},"${b.status}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cookers_bookings_${statusFilter.toLowerCase()}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 text-foreground">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Manage Event <span className="font-serif italic text-brass">Bookings</span>
          </h1>
          <p className="text-sm text-foreground/60 mt-1">
            Review quote requests, update catering status, and export booking sheets.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={filteredBookings.length === 0}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-carmine hover:bg-carmine/90 text-bone rounded-xl text-xs font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Action Error Alerts */}
      {actionError && (
        <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 p-4 rounded-xl text-xs border border-red-500/20">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search query input */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Search Bookings</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by customer name, event type, or venue location..."
              className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>

          {/* Status selector */}
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status} className="bg-card text-foreground">{status}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main List Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Bookings List Grid */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-20 text-foreground/50 text-sm font-semibold">
              No booking requests found matching filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-foreground/50 font-bold uppercase bg-foreground/2 dark:bg-foreground/1">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Event Details</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className={`hover:bg-foreground/2 cursor-pointer transition-all ${
                        selectedBooking?.id === b.id ? 'bg-primary/5 dark:bg-primary/2' : ''
                      }`}
                    >
                      <td className="p-4">
                        <p className="font-extrabold text-sm text-foreground">{b.user.name}</p>
                        <p className="text-[10px] text-foreground/50 mt-0.5">{b.user.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-foreground">
                          {b.eventType}
                          {b.package && (
                            <span className="ml-2 bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded-full">
                              {b.package.name}
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-foreground/60 mt-1">{b.date} @ {b.time}</p>
                      </td>
                      <td className="p-4 font-black text-primary text-sm">₹{b.estimatedPrice.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${getStatusStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        {b.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'APPROVED')}
                              disabled={loadingId === b.id}
                              className="p-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all"
                              title="Approve Booking"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'REJECTED')}
                              disabled={loadingId === b.id}
                              className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                              title="Reject Booking"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {b.status === 'APPROVED' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                            disabled={loadingId === b.id}
                            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-[10px] transition"
                          >
                            Mark Done
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          disabled={loadingId === b.id}
                          className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg transition"
                          title="Delete Request"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Details Side Panel */}
        <div className="lg:col-span-1">
          {selectedBooking ? (
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6 sticky top-6">
              
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <h3 className="font-extrabold text-base">Booking Inquiries</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getStatusStyle(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-1">Customer Details</span>
                  <p className="font-bold text-sm text-foreground">{selectedBooking.user.name}</p>
                  <p className="text-foreground/60">{selectedBooking.user.email}</p>
                </div>

                <div>
                  <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-0.5">Venue & Address</span>
                  <p className="font-medium">{selectedBooking.venue}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-0.5">Date & Time</span>
                    <p className="font-bold">{selectedBooking.date}</p>
                    <p className="text-foreground/50">{selectedBooking.time}</p>
                  </div>
                  <div>
                    <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-0.5">Guest Count</span>
                    <p className="font-bold">{selectedBooking.guestCount} Persons</p>
                  </div>
                </div>

                {selectedBooking.optionalServices && (
                  <div>
                    <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-1">Selected Add-ons</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedBooking.optionalServices.split(',').map((s) => (
                        <span key={s} className="bg-foreground/5 text-foreground/80 border border-border px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBooking.specialRequests && (
                  <div>
                    <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-0.5">Special Requests</span>
                    <p className="bg-amber-500/5 text-foreground/85 border border-amber-500/10 p-3 rounded-xl italic leading-relaxed">
                      &quot;{selectedBooking.specialRequests}&quot;
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div>
                    <span className="text-foreground/50 text-[10px] uppercase font-bold block">Estimated Revenue</span>
                    <p className="text-2xl font-black text-primary">₹{selectedBooking.estimatedPrice.toLocaleString()}</p>
                  </div>
                  
                  {/* Status operations inside side panel */}
                  {selectedBooking.status === 'PENDING' && (
                    <div className="flex space-x-1.5">
                      <button
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'APPROVED')}
                        className="px-3 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'REJECTED')}
                        className="px-3 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-card border border-border border-dashed p-8 rounded-3xl text-foreground/40 text-center flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-10 w-10 text-foreground/20 mb-3" />
              <p className="text-xs font-bold max-w-[180px] leading-relaxed">Select a booking row to view contact details, custom orders, and approve pricing logs.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
