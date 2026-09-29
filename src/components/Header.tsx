'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, LayoutDashboard, PhoneCall, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenServices?: () => void;
  onOpenSpecialist?: () => void;
}

export default function Header({ onOpenServices, onOpenSpecialist }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = pathname.startsWith('/dashboard');

  const handleStartProjectClick = () => {
    router.push('/concierge');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF8F5]/90 border-b border-[#C5A059]/20 transition-all duration-300 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-[#C5A059]/40 flex items-center justify-center bg-white shadow-xs transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif-luxury text-xl tracking-wider text-[#C5A059] font-bold">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.25em] font-semibold text-[#18181A] uppercase leading-none">
              MANSOUR
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#8C8A84] uppercase font-medium mt-1">
              Private Client Concierge
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-[0.15em] uppercase font-medium text-[#4A4A48]">
          <Link
            href="/"
            className={`hover:text-[#C5A059] transition-colors py-1 ${
              pathname === '/' ? 'text-[#C5A059] border-b border-[#C5A059]' : ''
            }`}
          >
            Concierge Home
          </Link>

          <Link
            href="/concierge"
            className={`hover:text-[#C5A059] transition-colors py-1 ${
              pathname === '/concierge' ? 'text-[#C5A059] border-b border-[#C5A059]' : ''
            }`}
          >
            Advisory Flow
          </Link>

          <button
            onClick={onOpenServices}
            className="hover:text-[#C5A059] transition-colors py-1 cursor-pointer"
          >
            Services & Scope
          </button>

          <button
            onClick={onOpenSpecialist}
            className="hover:text-[#C5A059] transition-colors py-1 cursor-pointer flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
            Specialist Direct
          </button>
          
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 px-3 py-1.5 border border-[#C5A059]/30 rounded-none bg-[#F4F0E8]/50 hover:bg-[#C5A059]/10 transition-all ${
              isDashboard ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/10' : 'text-[#18181A]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Client Intelligence</span>
            <span className="bg-[#C5A059] text-white text-[9px] px-1.5 py-0.5 font-bold tracking-widest uppercase">
              DEMO
            </span>
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleStartProjectClick}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-300 hover:bg-[#C5A059] hover:text-[#18181A] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#18181A] transition-colors" />
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#18181A] hover:text-[#C5A059] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#C5A059]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm tracking-widest uppercase font-medium text-[#18181A] py-2"
          >
            Concierge Home
          </Link>
          <Link
            href="/concierge"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm tracking-widest uppercase font-medium text-[#C5A059] py-2"
          >
            Start Advisory Flow
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenServices?.();
            }}
            className="block w-full text-left text-sm tracking-widest uppercase font-medium text-[#18181A] py-2"
          >
            Explore Services
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSpecialist?.();
            }}
            className="block w-full text-left text-sm tracking-widest uppercase font-medium text-[#18181A] py-2"
          >
            Speak to a Specialist
          </button>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm tracking-widest uppercase font-medium text-[#C5A059] py-2 border-t border-[#C5A059]/15 pt-4"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-[#C5A059]" />
              <span>Client Intelligence Dashboard</span>
            </div>
            <span className="bg-[#C5A059] text-white text-[9px] px-1.5 py-0.5 font-bold">DEMO</span>
          </Link>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleStartProjectClick();
              }}
              className="w-full py-3 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
