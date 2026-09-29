'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { ARCHITECTURAL_IMAGES } from '@/lib/conciergeData';

interface LandingHeroProps {
  onOpenServices: () => void;
  onOpenSpecialist: () => void;
}

export default function LandingHero({ onOpenServices, onOpenSpecialist }: LandingHeroProps) {
  const router = useRouter();

  const handleStartProject = () => {
    router.push('/concierge');
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#FAF8F5] pt-8 pb-16">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-arch-grid" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-12">
        
        {/* Top Location Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white border border-[#C5A059]/30 text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold shadow-xs">
            <MapPin className="w-3 h-3 text-[#C5A059]" />
            Dubai Design District & Private Estates
          </span>
          <span className="hidden sm:inline border-t border-[#C5A059]/20 w-12" />
          <span className="hidden sm:inline text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-medium">
            Architectural Concierge Engine
          </span>
        </div>

        {/* Hero Headlines */}
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-[#18181A] font-semibold leading-[1.08] tracking-tight">
            Welcome to <span className="italic font-normal text-[#C5A059]">Mansour</span> Interiors
          </h1>
          
          <p className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl text-[#4A4A48] font-light italic tracking-wide">
            “How may we assist with your project?”
          </p>

          <p className="text-xs sm:text-sm text-[#6E6D6A] max-w-2xl leading-relaxed font-sans-luxury pt-2">
            Pioneering ultra-luxury interior architecture, bespoke Italian joinery, and palatial turnkey transformations across Emirates Hills, Palm Jumeirah, and Dubai Hills.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
          <button
            onClick={handleStartProject}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-semibold overflow-hidden transition-all duration-300 hover:bg-[#C5A059] hover:text-[#18181A] shadow-lg shadow-[#18181A]/10 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:text-[#18181A] transition-colors" />
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenServices}
            className="inline-flex items-center justify-center px-6 py-4 bg-white border border-[#C5A059]/30 text-[#18181A] text-xs tracking-[0.2em] uppercase font-semibold hover:border-[#C5A059] hover:bg-[#F4F0E8]/50 transition-all cursor-pointer"
          >
            Explore Services
          </button>

          <button
            onClick={onOpenSpecialist}
            className="inline-flex items-center justify-center px-6 py-4 bg-transparent border border-transparent text-[#6E6D6A] text-xs tracking-[0.2em] uppercase font-semibold hover:text-[#C5A059] transition-all cursor-pointer"
          >
            Speak to a Specialist
          </button>
        </div>

        {/* Architectural Image Cards Showcase */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden border border-[#C5A059]/20 bg-white p-3 transition-transform duration-500 hover:-translate-y-1">
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={ARCHITECTURAL_IMAGES.villa}
                alt="Emirates Hills Villa Transformation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold block">Palatial Villa</span>
                <h3 className="font-serif-luxury text-lg font-medium">Emirates Hills Residence</h3>
              </div>
            </div>
            <div className="p-3 text-[11px] text-[#6E6D6A] flex justify-between items-center">
              <span>Full Architectural Turnkey</span>
              <span className="font-semibold text-[#18181A]">12,500 sq ft</span>
            </div>
          </div>

          <div className="relative group overflow-hidden border border-[#C5A059]/20 bg-white p-3 transition-transform duration-500 hover:-translate-y-1">
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={ARCHITECTURAL_IMAGES.penthouse}
                alt="Palm Jumeirah Penthouse"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold block">High-Rise Haven</span>
                <h3 className="font-serif-luxury text-lg font-medium">Palm Jumeirah Penthouse</h3>
              </div>
            </div>
            <div className="p-3 text-[11px] text-[#6E6D6A] flex justify-between items-center">
              <span>Bespoke Italian Millwork</span>
              <span className="font-semibold text-[#18181A]">8,200 sq ft</span>
            </div>
          </div>

          <div className="relative group overflow-hidden border border-[#C5A059]/20 bg-white p-3 transition-transform duration-500 hover:-translate-y-1">
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={ARCHITECTURAL_IMAGES.interior}
                alt="Dubai Hills Private Estate"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold block">Interior Architecture</span>
                <h3 className="font-serif-luxury text-lg font-medium">Dubai Hills Estate</h3>
              </div>
            </div>
            <div className="p-3 text-[11px] text-[#6E6D6A] flex justify-between items-center">
              <span>Rare Marble & Smart MEP</span>
              <span className="font-semibold text-[#18181A]">9,500 sq ft</span>
            </div>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="mt-12 pt-8 border-t border-[#C5A059]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#18181A]">
              AED 480M+
            </span>
            <p className="text-[10px] tracking-[0.15em] text-[#8C8A84] uppercase font-medium mt-1">
              Delivered Portfolio Value
            </p>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#18181A]">
              185+
            </span>
            <p className="text-[10px] tracking-[0.15em] text-[#8C8A84] uppercase font-medium mt-1">
              Luxury Estates Transformed
            </p>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#18181A]">
              100%
            </span>
            <p className="text-[10px] tracking-[0.15em] text-[#8C8A84] uppercase font-medium mt-1">
              In-House Turnkey Execution
            </p>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#C5A059]">
              VIP Director
            </span>
            <p className="text-[10px] tracking-[0.15em] text-[#8C8A84] uppercase font-medium mt-1">
              Single Point Confidentiality
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
