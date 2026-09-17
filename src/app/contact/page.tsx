import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: "Contact Us & Location | DD Cookers Catering Kovalam",
  description: "Get in touch with DD Cookers catering team. Address: 6/20, Chukkuparai Therivilai, Agastheeswaram, Kovalam, Tamil Nadu 629701. Call +91 94431 56789.",
  alternates: {
    canonical: "https://ddcookers.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen text-foreground pb-16">
      
      {/* Banner */}
      <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 bg-card/45 border-b border-border/45 backdrop-blur-sm text-center mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80"
            alt="Contact Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-extrabold text-foreground/50 mb-6 text-left">
            <Link href="/" className="hover:text-brass transition">Home</Link>
            <span className="text-brass/30">&bull;</span>
            <span className="text-brass">Contact Us</span>
          </div>

          <div className="text-center space-y-4 flex flex-col items-center">
            <span className="text-brass text-xs uppercase font-extrabold tracking-widest bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-none">
              Contact <span className="font-serif italic text-brass">DD Cookers</span>
            </h1>
            <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Have an upcoming wedding, house warming, or corporate feast? Call or message our team for a personalized menu estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-brass/15 p-3 rounded-2xl text-brass shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Office Address</h3>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  6/20, Chukkuparai Therivilai,<br />
                  Agastheeswaram, Kovalam,<br />
                  Tamil Nadu 629701
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-carmine/15 p-3 rounded-2xl text-carmine shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Call / WhatsApp</h3>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  <a href="tel:+919443156789" className="hover:text-brass transition font-bold text-foreground">
                    +91 94431 56789
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-brass/15 p-3 rounded-2xl text-brass shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Email Queries</h3>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  <a href="mailto:info@ddcookers.com" className="hover:text-brass transition text-foreground font-medium">
                    info@ddcookers.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-carmine/15 p-3 rounded-2xl text-carmine shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Operating Hours</h3>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  Monday – Sunday: 09:00 AM – 10:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

    </div>
  );
}
