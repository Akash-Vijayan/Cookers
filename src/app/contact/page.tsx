'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, AlertCircle, CheckCircle2, Map } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen pb-16">
      
      {/* Banner */}
      <section className="relative py-20 bg-charcoal text-white text-center mb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-secondary text-xs uppercase font-extrabold tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
            Contact Cookers
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-xl mx-auto">
            Got an upcoming wedding, party, or corporate event? Drop us a query. Our catering team replies within 12 hours.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info Grid */}
        <div className="lg:col-span-5 space-y-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Our Offices & Lounges</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* Phone Card */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Call/Text Us</h4>
                <a href="tel:+15551234567" className="text-sm text-foreground/75 hover:text-primary transition-colors block">
                  +1 (555) 123-4567
                </a>
                <span className="text-xs text-foreground/50 block">Mon-Sat (9AM - 10PM)</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Email Inquiries</h4>
                <a href="mailto:info@cookers.com" className="text-sm text-foreground/75 hover:text-primary transition-colors block">
                  info@cookers.com
                </a>
                <span className="text-xs text-foreground/50 block">We respond within 12 hours.</span>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Central Kitchen & Office</h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  123 Food Street, Culinary Arts District, New York, NY 10001
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Working Hours</h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Mon - Sat: 9:00 AM - 10:00 PM <br />
                  Sunday: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Quick WhatsApp Link */}
          <div className="p-6 bg-emerald-600/10 border border-emerald-600/20 rounded-2xl space-y-4">
            <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400">Need Immediate Booking?</h3>
            <p className="text-sm text-foreground/85 leading-relaxed">
              Skip the email form and chat directly with our chef coordinator on WhatsApp to finalize your booking in minutes.
            </p>
            <a
              href="https://wa.me/15551234567?text=Hello%20Cookers,%20I'd%20like%20to%20get%20a%20quick%20quote%252"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Map Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-card border border-border p-8 rounded-3xl shadow-md space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Send Us a Message</h2>

            {error && (
              <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 p-4 rounded-xl text-xs border border-red-500/20">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex bg-emerald-500/10 p-4 rounded-full text-emerald-500">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h4 className="font-extrabold text-xl">Message Sent Successfully!</h4>
                <p className="text-sm text-foreground/60 max-w-sm mx-auto">
                  Thank you for contacting Cookers. Our event planning team will review your requirements and reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Your Message / Event Details</label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the event type, estimated guest count, planned location, and query..."
                    className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Premium Stylized Mock Maps Container */}
          <div className="bg-card border border-border p-5 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs text-foreground/50 font-bold uppercase">
              <span className="flex items-center space-x-1">
                <Map className="h-4 w-4 text-primary shrink-0" />
                <span>central lounge location</span>
              </span>
              <span>Central Manhattan</span>
            </div>
            
            {/* Mock Map Board */}
            <div className="relative h-60 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-border flex flex-col justify-center items-center">
              {/* Abstract grids representing streets */}
              <div className="absolute inset-0 opacity-15 dark:opacity-5 grid grid-cols-8 gap-4 p-4 pointer-events-none">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="border border-foreground h-10 w-full rounded" />
                ))}
              </div>
              
              {/* Map pin */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-primary text-white p-3 rounded-full shadow-xl relative">
                  <MapPin className="h-6 w-6" />
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-secondary rounded-full border border-white animate-ping" />
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-4 bg-charcoal/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold border border-white/10 shadow-lg text-center">
                <p className="font-extrabold">Cookers Central Lounge</p>
                <p className="text-stone-300 font-medium text-[10px] mt-0.5">123 Food Street, New York, NY 10001</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
