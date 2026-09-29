'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ConciergeInterface from '@/components/ConciergeInterface';
import ServicesModal from '@/components/ServicesModal';
import SpecialistModal from '@/components/SpecialistModal';
import Footer from '@/components/Footer';

export default function ConciergePage() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSpecialistOpen, setIsSpecialistOpen] = useState(false);

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-[#FAF8F5]">
      
      {/* Header */}
      <Header
        onOpenServices={() => setIsServicesOpen(true)}
        onOpenSpecialist={() => setIsSpecialistOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Sub-Header Banner */}
        <div className="text-center shrink-0 mb-3 space-y-1">
          <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold block">
            INTERACTIVE ARCHITECTURAL ADVISORY
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#18181A] font-semibold">
            PRIVATE CLIENT CONCIERGE
          </h1>
          <p className="text-xs text-[#6E6D6A] max-w-2xl mx-auto italic">
            “Respond naturally to our conversational advisor below to help us understand your project and prepare a private consultation brief.”
          </p>
        </div>

        {/* Self-Contained Concierge Engine Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ConciergeInterface />
        </div>

      </main>

      {/* Services & Specialist Modals */}
      <ServicesModal
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        onStartProject={() => {}}
      />

      <SpecialistModal
        isOpen={isSpecialistOpen}
        onClose={() => setIsSpecialistOpen(false)}
      />

    </div>
  );
}
