'use client';

import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecialistModal({ isOpen, onClose }: SpecialistModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [director, setDirector] = useState('Alexander V. Mansour (Managing Director)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#C5A059]/30 shadow-2xl p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setSubmitted(false);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-[#8C8A84] hover:text-[#18181A] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        {!submitted ? (
          <div>
            <div className="border-b border-[#C5A059]/20 pb-4 mb-6">
              <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
                Direct Client Advisory
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#18181A] font-semibold mt-1">
                Speak to an Architectural Specialist
              </h2>
              <p className="text-xs text-[#6E6D6A] mt-1">
                Direct consultation with our senior project directors in Dubai Design District or on-location.
              </p>
            </div>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white border border-[#C5A059]/20 flex items-start gap-3">
                <div className="p-2 bg-[#FAF8F5] text-[#C5A059]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-[#8C8A84] uppercase font-medium">Private Office Direct</span>
                  <p className="text-sm font-semibold text-[#18181A] mt-0.5">+971 (0)4 800 MANSOUR</p>
                  <p className="text-[11px] text-[#6E6D6A]">Mon–Sat | 9:00 AM – 7:00 PM GST</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#C5A059]/20 flex items-start gap-3">
                <div className="p-2 bg-[#FAF8F5] text-[#C5A059]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-[#8C8A84] uppercase font-medium">Private Advisory Email</span>
                  <p className="text-sm font-semibold text-[#18181A] mt-0.5">concierge@mansour.ae</p>
                  <p className="text-[11px] text-[#6E6D6A]">24-Hour Confidential Response</p>
                </div>
              </div>
            </div>

            {/* Callback Request Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border border-[#C5A059]/15">
              <h3 className="font-serif-luxury text-lg text-[#18181A] font-medium border-b border-[#FAF8F5] pb-2">
                Request a Priority Advisory Callback
              </h3>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                  Full Name / Representative Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Tariq Al-Maktoum"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                  Direct Telephone Number (WhatsApp preferred)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                  Preferred Advisory Director
                </label>
                <select
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                >
                  <option value="Alexander V. Mansour (Managing Director)">Alexander V. Mansour — Managing Director</option>
                  <option value="Helena Rostova (Director of Interior Architecture)">Helena Rostova — Interior Architecture Director</option>
                  <option value="Tariq Al-Mansoor (Principal Architect - Luxury Estates)">Tariq Al-Mansoor — Principal Architect (Palaces & Estates)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Confirm Specialist Callback</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-[#C5A059]/10 border border-[#C5A059] rounded-full flex items-center justify-center mx-auto text-[#C5A059]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-3xl font-semibold text-[#18181A]">
              Callback Request Confirmed
            </h3>
            <p className="text-xs text-[#6E6D6A] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#18181A]">{name}</span>. A senior director from the private office of <span className="text-[#C5A059] font-medium">{director}</span> will reach out to <span className="font-semibold text-[#18181A]">{phone}</span> within 2 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 border border-[#C5A059]/30 text-xs tracking-widest uppercase text-[#18181A] hover:bg-[#C5A059]/10 transition-colors"
              >
                Return to Concierge
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
