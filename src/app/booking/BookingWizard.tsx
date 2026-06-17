'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Users, MapPin, Clock, ArrowRight, ArrowLeft, Send, CheckCircle2, DollarSign, Sparkles } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
  guestCapacity: number;
}

interface Service {
  id: string;
  name: string;
  basePrice: number;
  category: string;
}

interface BookingWizardProps {
  packages: Package[];
  services: Service[];
}

export default function BookingWizard({ packages, services }: BookingWizardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Multi-step states
  const [step, setStep] = useState(1);

  // Form Fields
  const [eventType, setEventType] = useState('Wedding Catering');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [venue, setVenue] = useState('');
  const [guestCount, setGuestCount] = useState(50);
  const [packageId, setPackageId] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');

  // Submit states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill from query parameters
  useEffect(() => {
    const queryPkg = searchParams.get('packageId');
    const queryEvent = searchParams.get('eventType');

    if (queryPkg) {
      setPackageId(queryPkg);
      // Automatically advance to Step 2 if package pre-selected
      setStep(2);
    }
    if (queryEvent) {
      setEventType(queryEvent);
    }
  }, [searchParams]);

  // Pricing calculations
  const selectedPkg = packages.find((p) => p.id === packageId);
  const pricePerGuest = selectedPkg ? selectedPkg.price : 250; // Fallback plate price for custom selection
  const cateringBasePrice = pricePerGuest * guestCount;

  // Addon prices
  const addonsCost = selectedAddons.reduce((sum, name) => {
    const svc = services.find((s) => s.name === name);
    return sum + (svc ? svc.basePrice : 0);
  }, 0);

  const estimatedTotal = cateringBasePrice + addonsCost;

  // Handlers
  const handleAddonToggle = (name: string) => {
    setSelectedAddons((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleNext = () => {
    if (step === 1 && (!date || !venue)) {
      setError('Please fill in event date and venue location.');
      return;
    }
    setError('');
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          date,
          time,
          venue,
          guestCount,
          packageId: packageId || null,
          estimatedPrice: estimatedTotal,
          specialRequests: specialRequests || null,
          optionalServices: selectedAddons.length > 0 ? selectedAddons.join(', ') : null,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/profile');
        }, 2500);
      } else {
        setError(data.error || 'Failed to submit booking request.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const eventOptions = [
    'Wedding Catering',
    'Corporate Dinner',
    'Birthday Bash',
    'Live Station Event',
    'Private Backyard Grill',
    'Social Party / Gathering',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      
      {/* Progress Header */}
      <div className="text-center mb-12 space-y-3">
        <span className="text-primary text-xs uppercase font-extrabold tracking-wider block">Booking Engine</span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Plan Your Event Catering</h1>
        
        {/* Step dots */}
        <div className="flex justify-center items-center space-x-3 pt-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step >= s ? 'bg-primary text-white shadow-md' : 'bg-foreground/10 text-foreground/50'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`h-0.5 w-10 sm:w-16 mx-1 transition-all ${
                    step > s ? 'bg-primary' : 'bg-foreground/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-card border border-border p-6 md:p-10 rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Wizard Form Side */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-xs font-semibold border border-red-500/20">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-16 space-y-4">
              <div className="inline-flex bg-emerald-500/10 p-5 rounded-full text-emerald-500 animate-bounce">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="font-extrabold text-2xl">Booking Request Received!</h3>
              <p className="text-sm text-foreground/60 max-w-sm mx-auto">
                Thank you! Your quote request has been saved. We are redirecting you to your profile page to check your approved status.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: EVENT DETAILS */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-extrabold text-lg flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary shrink-0" />
                    <span>Step 1: Event Context</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/65 mb-2">Event Style</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {eventOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-foreground/65 mb-2">Event Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-foreground/65 mb-2">Setup Time</label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/65 mb-2">Venue Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40" />
                      <input
                        type="text"
                        required
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="e.g. Grand Banquet Hall, 5th Ave NY"
                        className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: GUEST CAPACITY & MENU PLAN */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="font-extrabold text-lg flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary shrink-0" />
                    <span>Step 2: Capacity & Menu Plan</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/65 mb-2">
                      Guest Count ({guestCount} Persons)
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={5}
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-foreground/50 mt-1.5 font-medium">
                      <span>Min: 10</span>
                      <span>Selected: {guestCount} Guests</span>
                      <span>Max: 500</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/65 mb-2.5">Choose Package</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setPackageId(pkg.id)}
                          className={`p-4 border rounded-2xl cursor-pointer hover:border-primary/50 transition-all ${
                            packageId === pkg.id
                              ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                              : 'border-border bg-card'
                          }`}
                        >
                          <p className="font-bold text-sm">{pkg.name}</p>
                          <p className="text-xs text-foreground/60 mt-1">Plate Price: ${pkg.price}/guest</p>
                        </div>
                      ))}
                      <div
                        onClick={() => setPackageId('')}
                        className={`p-4 border rounded-2xl cursor-pointer hover:border-primary/50 transition-all ${
                          packageId === ''
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                            : 'border-border bg-card'
                        }`}
                      >
                        <p className="font-bold text-sm">Custom Structure</p>
                        <p className="text-xs text-foreground/60 mt-1">Capped plate price: $250/guest</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: OPTIONAL ADDONS & SERVICES */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-extrabold text-lg flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary shrink-0" />
                    <span>Step 3: Optional Add-ons</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/65 mb-3">Live counters & extensions</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {services
                        .filter((s) => s.category.toLowerCase() !== 'catering')
                        .map((svc) => (
                          <div
                            key={svc.id}
                            onClick={() => handleAddonToggle(svc.name)}
                            className={`p-4 border rounded-2xl cursor-pointer transition-all flex justify-between items-center ${
                              selectedAddons.includes(svc.name)
                                ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/20'
                                : 'border-border bg-card'
                            }`}
                          >
                            <div>
                              <p className="font-bold text-xs">{svc.name}</p>
                              <p className="text-xs text-foreground/50 mt-0.5">Flat Price: ${svc.basePrice.toLocaleString()}</p>
                            </div>
                            <div
                              className={`h-4.5 w-4.5 border rounded-md flex items-center justify-center shrink-0 ${
                                selectedAddons.includes(svc.name)
                                  ? 'bg-secondary border-secondary text-white'
                                  : 'border-border bg-card'
                              }`}
                            >
                              {selectedAddons.includes(svc.name) && <span className="text-[10px] font-black">✓</span>}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-foreground/65 mb-2">Special Food Requests</label>
                    <textarea
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Jain preparations, separate vegan sections, setup timing restrictions..."
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:ring-1 focus:ring-primary focus:outline-none text-xs resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: SUMMARY & CONFIRM */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-extrabold text-lg flex items-center space-x-2">
                    <Send className="h-5 w-5 text-primary shrink-0" />
                    <span>Step 4: Final Summary</span>
                  </h3>

                  <div className="border border-border p-4.5 rounded-2xl bg-foreground/2 space-y-3.5 text-xs">
                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-foreground/55 font-bold uppercase">Catering Style:</span>
                      <span className="font-bold text-foreground">{eventType}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-foreground/55 font-bold uppercase">Event Schedule:</span>
                      <span className="font-bold text-foreground">{date} @ {time}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-foreground/55 font-bold uppercase">Venue:</span>
                      <span className="font-bold text-foreground truncate max-w-[180px]">{venue}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-foreground/55 font-bold uppercase">Guest Count:</span>
                      <span className="font-bold text-foreground">{guestCount} Persons</span>
                    </div>
                    <div className="flex justify-between border-b border-border/80 pb-2">
                      <span className="text-foreground/55 font-bold uppercase">Package Choice:</span>
                      <span className="font-bold text-primary">{selectedPkg ? selectedPkg.name : 'Custom Selection'}</span>
                    </div>
                    {selectedAddons.length > 0 && (
                      <div className="flex justify-between border-b border-border/80 pb-2">
                        <span className="text-foreground/55 font-bold uppercase">Selected Addons:</span>
                        <span className="font-bold text-secondary text-right truncate max-w-[180px]">{selectedAddons.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-foreground/60 leading-relaxed italic">
                    By submitting, you agree to our event terms. Estimated pricing details are shown adjacent. Our chef coordinator will verify items and issue a final confirmation.
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-border mt-8">
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="flex items-center space-x-1.5 px-5 py-3 border border-border hover:bg-foreground/5 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    <ArrowLeft className="h-4.5 w-4.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-1.5 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center space-x-1.5 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-xl font-bold text-xs transition disabled:opacity-50 cursor-pointer shadow-md shadow-primary/10"
                  >
                    <span>{loading ? 'Submitting...' : 'Confirm & Request Quote'}</span>
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Live Calculation Panel */}
        <div className="lg:col-span-1 bg-foreground/2 dark:bg-foreground/1 border border-border rounded-3xl p-6 space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-border">
            <DollarSign className="h-5 w-5 text-primary shrink-0" />
            <h3 className="font-extrabold text-base">Estimated Cost</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between">
              <span className="text-foreground/60 font-semibold">{guestCount} Guests x ${pricePerGuest}/plate</span>
              <span className="font-bold text-foreground">${cateringBasePrice.toLocaleString()}</span>
            </div>
            
            {selectedAddons.length > 0 && (
              <div className="space-y-2 pt-2.5 border-t border-border/60">
                <span className="text-foreground/50 font-bold uppercase block mb-1">Addons Subtotal</span>
                {selectedAddons.map((addon) => {
                  const s = services.find((sv) => sv.name === addon);
                  return (
                    <div key={addon} className="flex justify-between pl-2 font-medium">
                      <span className="text-foreground/60">{addon}</span>
                      <span>+${s ? s.basePrice.toLocaleString() : 0}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-5 border-t border-border flex justify-between items-end">
              <div>
                <span className="text-foreground/60 text-xs font-bold block mb-0.5 uppercase">Estimated Total</span>
                <span className="text-2xl font-black text-primary">${estimatedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
