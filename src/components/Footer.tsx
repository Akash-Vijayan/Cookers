
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import CopyrightYear from '@/components/CopyrightYear';
import { SITE_NAME, SITE_TAGLINE, SOCIAL, CONTACT } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-[#190506] text-bone/80 pt-16 pb-8 border-t border-border/45 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Tagline */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-14 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="DD Cookers Logo"
                width={56}
                height={48}
                className="h-full w-auto object-contain brightness-110"
              />
            </div>
            <span className="text-lg font-bold tracking-wider uppercase font-serif text-bone group-hover:text-brass transition">
              {SITE_NAME}
            </span>
          </Link>
          <p className="text-xs text-bone/70 leading-relaxed font-semibold">
            {SITE_TAGLINE}
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-brass/25 hover:border-brass text-brass hover:text-bone transition"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-brass/25 hover:border-brass text-brass hover:text-bone transition"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-brass/25 hover:border-brass text-brass hover:text-bone transition"
              aria-label="YouTube"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 23 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services Quick Links */}
        <div>
          <h3 className="text-bone text-[10px] font-extrabold mb-6 tracking-widest uppercase border-l-2 border-brass pl-3">
            Catering Offerings
          </h3>
          <ul className="space-y-3.5 text-xs text-bone/80 font-semibold">
            <li>
              <Link href="/services/cooking" className="hover:text-brass transition-colors duration-200">
                Cooking Solutions
              </Link>
            </li>
            <li>
              <Link href="/services/catering" className="hover:text-brass transition-colors duration-200">
                Catering Services
              </Link>
            </li>
            <li>
              <Link href="/services/stall" className="hover:text-brass transition-colors duration-200">
                Live Food Stalls
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-brass transition-colors duration-200">
                All Catering Specialties
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-bone text-[10px] font-extrabold mb-6 tracking-widest uppercase border-l-2 border-brass pl-3">
            Useful Links
          </h3>
          <ul className="space-y-3.5 text-xs text-bone/80 font-semibold">
            <li>
              <Link href="/" className="hover:text-brass transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brass transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-brass transition-colors duration-200">
                Event Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brass transition-colors duration-200">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-bone font-bold text-base mb-6 tracking-wide uppercase border-l-2 border-brass pl-3">
            Contact Details
          </h3>
          <ul className="space-y-4 text-sm text-bone/80">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-brass shrink-0 mt-0.5" />
              <span className="text-bone/75 leading-relaxed">
                {CONTACT.address}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-brass shrink-0" />
              <a href={CONTACT.phoneHref} className="text-bone/75 hover:text-brass transition-colors">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-brass shrink-0" />
              <a href={CONTACT.emailHref} className="text-bone/75 hover:text-brass transition-colors">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center space-x-3 text-bone/75">
              <Clock className="h-4 w-4 text-brass shrink-0" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>

      </div>

      <hr className="border-border/30 max-w-7xl mx-auto my-12" />

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-bone/60 gap-4">
        <p>&copy; <CopyrightYear /> DD Cookers Catering. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="/contact" className="hover:text-bone">Inquire Now</Link>
          <Link href="/about" className="hover:text-bone">Our Profile</Link>
        </div>
      </div>
    </footer>
  );
}
