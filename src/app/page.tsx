'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import LandingHero from '@/components/LandingHero';
import ServicesModal from '@/components/ServicesModal';
import SpecialistModal from '@/components/SpecialistModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSpecialistOpen, setIsSpecialistOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      
      {/* Header */}
      <Header
        onOpenServices={() => setIsServicesOpen(true)}
        onOpenSpecialist={() => setIsSpecialistOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Landing Hero Section */}
        <LandingHero
          onOpenServices={() => setIsServicesOpen(true)}
          onOpenSpecialist={() => setIsSpecialistOpen(true)}
        />

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

      {/* Footer */}
      <Footer />
    </div>
  );
}
