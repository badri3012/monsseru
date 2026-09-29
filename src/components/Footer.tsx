'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Mail, LayoutDashboard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#18181A] text-white border-t border-[#C5A059]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#C5A059] flex items-center justify-center bg-white/5">
                <span className="font-serif-luxury text-lg text-[#C5A059] font-bold">M</span>
              </div>
              <span className="font-serif-luxury text-xl tracking-[0.2em] font-semibold text-white uppercase">
                MANSOUR
              </span>
            </div>
            <p className="text-xs text-[#8C8A84] leading-relaxed">
              Ultra-luxury architectural fit-out, interior architecture, and bespoke Italian joinery for palatial residences in Dubai.
            </p>
            <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Private Client Protocol</span>
            </div>
          </div>

          {/* Key Enclaves */}
          <div>
            <h4 className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold mb-4">
              Featured Enclaves
            </h4>
            <ul className="space-y-2 text-xs text-[#8C8A84]">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Emirates Hills Estates
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Palm Jumeirah Villas & Penthouses
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Dubai Hills Golf Place
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Jumeirah Beachfront Residences
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold mb-4">
              Concierge Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#8C8A84]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Concierge Home
                </Link>
              </li>
              <li>
                <Link href="/#concierge-section" className="hover:text-white transition-colors">
                  Start Project Brief
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#C5A059] transition-colors flex items-center gap-1 text-[#C5A059] font-medium">
                  <LayoutDashboard className="w-3 h-3" /> Client Intelligence Dashboard (DEMO)
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory Contact */}
          <div>
            <h4 className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold mb-4">
              Advisory Office
            </h4>
            <div className="space-y-2 text-xs text-[#8C8A84]">
              <p className="text-white font-medium">Dubai Design District (d3)</p>
              <p>Building 4, Executive Suite 601</p>
              <p className="pt-2 text-[#C5A059] font-medium flex items-center gap-1">
                <Phone className="w-3 h-3" /> +971 (0)4 800 MANSOUR
              </p>
              <p className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#C5A059]" /> concierge@mansour.ae
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-widest text-[#6E6D6A] uppercase gap-4">
          <p>© 2026 Mansour Interiors & Fit-Out LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Sales Prototype</span>
            <span>Client Intelligence v2.4</span>
            <span>Dubai, UAE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
