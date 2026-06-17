'use client';

import React from 'react';
import Link from 'next/link';
import { Utensils, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-stone-300 pt-16 pb-8 border-t border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Tagline */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2.5 rounded-xl text-white">
              <Utensils className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Cookers
            </span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            Crafting premium catering experiences and live cooking theater for weddings, corporate events, and private celebrations. Serving culinary excellence since 2012.
          </p>
          {/* WhatsApp Quick Link */}
          <div className="pt-2">
            <a
              href="https://wa.me/15551234567?text=Hi%20Cookers,%20I'd%20like%20to%20inquire%20about%20catering%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Quick Booking</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase">Catering Services</h3>
          <ul className="space-y-3.5 text-sm">
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-200">
                Wedding Catering
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-200">
                Corporate Catering
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-200">
                Birthday & Private Events
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-200">
                Live Cooking Stations
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors duration-200">
                Popcorn & Cotton Candy
              </Link>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase">Business Hours</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-200">Monday - Saturday</p>
                <p className="text-stone-400 text-xs mt-0.5">9:00 AM - 10:00 PM</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-200">Sunday</p>
                <p className="text-stone-400 text-xs mt-0.5">10:00 AM - 8:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-stone-400 leading-relaxed">
                123 Food Street, Culinary Arts District, New York, NY 10001
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href="tel:+15551234567" className="text-stone-400 hover:text-white transition-colors">
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a href="mailto:info@cookers.com" className="text-stone-400 hover:text-white transition-colors">
                info@cookers.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <hr className="border-stone-800 max-w-7xl mx-auto my-12" />

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4">
        <p>&copy; {currentYear} Cookers Catering & Events. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-stone-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-stone-400">Terms of Service</Link>
          <Link href="/contact" className="hover:text-stone-400">Support</Link>
        </div>
      </div>
    </footer>
  );
}
