'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, X, Phone, Utensils, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  category: string;
}

interface ServicesClientProps {
  initialServices: Service[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Inquiry form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = ['All', 'Catering', 'Live Station', 'Counter'];

  const filteredServices = activeTab === 'All'
    ? services
    : services.filter(s => s.category.toLowerCase() === activeTab.toLowerCase());

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: `Inquiry regarding service "${selectedService?.name}": ${message}`,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => {
          setSuccess(false);
          setSelectedService(null);
        }, 2500);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send inquiry.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      
      {/* Banner */}
      <section className="relative py-12 bg-charcoal text-white text-center mb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Our Catering Services</h1>
          <p className="text-stone-300 text-sm md:text-base max-w-xl mx-auto">
            From formal sit-down corporate buffet dinners to live snack setups and custom food bars, choose the perfect service style.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 border-b border-border pb-4 mb-12 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:bg-foreground/5 text-foreground/75'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-3xl text-foreground/50">
            <Utensils className="mx-auto h-12 w-12 text-foreground/20 mb-4" />
            <p className="font-semibold text-lg">No services found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((svc) => (
              <div
                key={svc.id}
                className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <img
                      src={svc.imageUrl}
                      alt={svc.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {svc.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-xl group-hover:text-primary transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-3.5 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-border bg-foreground/2 dark:bg-foreground/1">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-foreground/50 font-bold uppercase">Setup Price</span>
                    <span className="text-primary font-black text-xl">${svc.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedService(svc)}
                      className="py-2.5 rounded-xl border border-border hover:bg-foreground/5 text-xs font-bold text-center cursor-pointer transition-all"
                    >
                      Request Quote
                    </button>
                    <Link
                      href={`/booking?eventType=${encodeURIComponent(svc.name)}`}
                      className="py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold text-center transition-all flex items-center justify-center space-x-1"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Quote / Inquiry Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Service Inquiry
                </span>
                <h3 className="font-extrabold text-xl mt-2">Inquire: {selectedService.name}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 hover:bg-foreground/10 rounded-full text-foreground/70 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto inline-flex bg-emerald-500/10 p-4 rounded-full text-emerald-500">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h4 className="font-extrabold text-lg">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-foreground/60 max-w-xs mx-auto">
                  Thank you! Our event coordinator will get in touch with you at the email provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {error && (
                  <p className="text-xs text-red-500 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                    {error}
                  </p>
                )}
                
                <div>
                  <label className="block text-xs font-bold uppercase text-foreground/60 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Alice Smith"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-foreground/60 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="alice@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-foreground/60 mb-1">Inquiry / Requirements</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-1 focus:ring-primary focus:outline-none text-sm resize-none"
                    placeholder="Tell us about guest count, event date, venue, or dietary preferences..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Submitting...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}

            {/* Support Hotline Info */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-foreground/60">
              <span className="flex items-center space-x-1">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>Call Us: +1 (555) 123-4567</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Mon-Sat 9AM - 10PM</span>
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
