'use client';

import React, { useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { X, Phone, CheckCircle2, MessageSquare, ChevronDown, Calendar, ArrowRight } from 'lucide-react';

export default function FloatingWidgets() {
  const { isOpen, closeQuote } = useQuote();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [guestCount, setGuestCount] = useState('Less than 100');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock form submission
    console.log('Quote Request Submitted:', {
      name,
      phone,
      eventType,
      guestCount,
      date,
      message,
    });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setName('');
      setPhone('');
      setMessage('');
      setDate('');
      setTimeout(() => {
        setSuccess(false);
        closeQuote();
      }, 2500);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. STICKY WHATSAPP CLICK TO CHAT */}
      <a
        href="https://api.whatsapp.com/send?phone=+91 94431 56789&text=Hello%20[BUSINESS%20NAME],%20I'd%20like%20to%20get%20a%20quick%20quote"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group shadow-primary/30"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-bold text-sm whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* 2. STICKY CALL BUTTON */}
      <a
        href="tel:+91 94431 56789"
        className="fixed bottom-6 left-6 z-40 md:hidden bg-primary text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Call Us"
      >
        <Phone className="h-6 w-6" />
      </a>

      {/* 3. POPUP ENQUIRY MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#140404]/90 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="bg-[#240808] border-l border-bordeaux/40 w-full max-w-lg h-full p-8 md:p-10 shadow-2xl relative flex flex-col justify-between overflow-y-auto animate-slide-left">
            
            <div className="space-y-8">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <span className="text-brass text-[10px] font-black uppercase tracking-widest block">
                    Bespoke Inquiries
                  </span>
                  <h3 className="font-serif italic text-3xl text-bone">Create Your Feast</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    Provide event details for your celebration in Tirunelveli, and our director chef will contact you directly.
                  </p>
                </div>
                <button
                  onClick={closeQuote}
                  className="p-1.5 hover:bg-foreground/10 rounded-full text-foreground/75 transition cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {success ? (
                <div className="text-center py-16 space-y-4">
                  <div className="mx-auto inline-flex bg-carmine/15 p-4 rounded-full text-carmine animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-serif italic text-2xl text-bone">Request Received</h4>
                  <p className="text-sm text-foreground/60 max-w-xs mx-auto leading-relaxed">
                    Thank you. We will evaluate our availability and reach out to you within 12 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 text-xs font-semibold">
                  {error && (
                    <p className="text-carmine bg-carmine/10 p-2.5 rounded border border-carmine/20">
                      {error}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-brass text-[9px] font-extrabold uppercase tracking-widest mb-1.5 text-left">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full bg-input-bg border border-border focus:border-carmine focus:ring-1 focus:ring-carmine/30 focus:shadow-[0_0_10px_rgba(179,46,51,0.2)] text-xs text-foreground px-4 py-3 outline-none transition rounded-none appearance-none"
                      />
                    </div>
                    <div>
                      <label className="block text-brass text-[9px] font-extrabold uppercase tracking-widest mb-1.5 text-left">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Number"
                        className="w-full bg-input-bg border border-border focus:border-carmine focus:ring-1 focus:ring-carmine/30 focus:shadow-[0_0_10px_rgba(179,46,51,0.2)] text-xs text-foreground px-4 py-3 outline-none transition rounded-none appearance-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-brass text-[9px] font-extrabold uppercase tracking-widest mb-1.5 text-left">Event Type</label>
                      <div className="relative">
                        <select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="w-full bg-input-bg border border-border focus:border-carmine focus:ring-1 focus:ring-carmine/30 focus:shadow-[0_0_10px_rgba(179,46,51,0.2)] text-xs text-foreground pl-4 pr-10 py-3 outline-none transition rounded-none appearance-none cursor-pointer"
                        >
                          <option value="Wedding">Wedding Feast</option>
                          <option value="Birthday">Private Birthday</option>
                          <option value="Corporate">Corporate Banquet</option>
                          <option value="Housewarming">Housewarming Ceremony</option>
                          <option value="Formal Dinner">VIP Formal Dinner</option>
                          <option value="School/College Event">School/College Event</option>
                          <option value="Other">Other Occasions</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brass pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-brass text-[9px] font-extrabold uppercase tracking-widest mb-1.5 text-left">Guest Count</label>
                      <div className="relative">
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full bg-input-bg border border-border focus:border-carmine focus:ring-1 focus:ring-carmine/30 focus:shadow-[0_0_10px_rgba(179,46,51,0.2)] text-xs text-foreground pl-4 pr-10 py-3 outline-none transition rounded-none appearance-none cursor-pointer"
                        >
                          <option value="Less than 100">Less than 100 guests</option>
                          <option value="101–300">101–300 guests</option>
                          <option value="301–500">301–500 guests</option>
                          <option value="501–1000">501–1000 guests</option>
                          <option value="Above 1000">Above 1000 guests</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brass pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-brass text-[9px] font-extrabold uppercase tracking-widest mb-1.5 text-left">Event Date (Optional)</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-input-bg border border-border focus:border-carmine focus:ring-1 focus:ring-carmine/30 focus:shadow-[0_0_10px_rgba(179,46,51,0.2)] text-xs text-foreground pl-4 pr-10 py-3 outline-none transition rounded-none relative"
                      />
                      <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brass pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-brass text-[9px] font-extrabold uppercase tracking-widest mb-1.5 text-left">Additional Details / Venue</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Venue, catering expectations, custom menu preferences..."
                      className="w-full bg-input-bg border border-border focus:border-carmine focus:ring-1 focus:ring-carmine/30 focus:shadow-[0_0_10px_rgba(179,46,51,0.2)] text-xs text-foreground px-4 py-3 outline-none transition rounded-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#B32E33] to-[#6E151A] hover:brightness-105 active:scale-98 text-bone font-bold uppercase tracking-widest text-[10px] shadow-lg hover:shadow-[#B32E33]/30 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 min-h-[44px] group hover:scale-102 rounded-none"
                  >
                    <span>{loading ? 'Sending Request...' : 'Submit Inquiry'}</span>
                    {!loading && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-primary/10 text-center">
              <span className="text-[10px] text-foreground/40 font-bold tracking-widest uppercase">
                DD Cookers &bull; Est. 2008 &bull; Tirunelveli
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
