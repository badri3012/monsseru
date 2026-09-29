'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, MapPin, CheckCircle2, Sparkles, User, Phone, Mail, ShieldCheck, Check } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  briefId: string;
  projectType: string;
  location: string;
  assignedDirector: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  briefId,
  projectType,
  location,
  assignedDirector
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-05');
  const [preferredTime, setPreferredTime] = useState('11:30 AM GST');
  const [meetingType, setMeetingType] = useState('Private Residence Site Visit');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#D4AF37', '#FAF8F5', '#18181A']
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-[#C5A059]/40 shadow-2xl p-6 sm:p-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setSubmitted(false);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-[#8C8A84] hover:text-[#18181A] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <div>
            <div className="border-b border-[#C5A059]/20 pb-4 mb-6">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold block">
                DIRECT ADVISORY SCHEDULING
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#18181A] font-semibold mt-1">
                REQUEST PRIVATE CONSULTATION
              </h2>
              <p className="text-xs text-[#6E6D6A] mt-1">
                Ref ID: <span className="font-mono font-bold text-[#18181A]">{briefId}</span> • {projectType} ({location})
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border border-[#C5A059]/15">
              
              <div className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 text-xs text-[#18181A] flex items-center justify-between">
                <span className="text-[#8C8A84] uppercase tracking-wider font-semibold text-[10px]">Assigned Specialist Role:</span>
                <span className="font-semibold text-[#C5A059]">{assignedDirector}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                    Direct Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="+971 50 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                  Private Email Address *
                </label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                    Preferred Timing Window
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                  >
                    <option value="10:00 AM GST">10:00 AM GST</option>
                    <option value="11:30 AM GST">11:30 AM GST</option>
                    <option value="02:30 PM GST">02:30 PM GST</option>
                    <option value="04:30 PM GST">04:30 PM GST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                  Venue Preference
                </label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                >
                  <option value="Private Residence Site Visit">Private Residence Site Visit ({location})</option>
                  <option value="Mansour Studio — Dubai Design District">Mansour Studio — Dubai Design District (d3)</option>
                  <option value="Virtual Video Briefing">Virtual Directors Briefing (Confidential Link)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Confirm Private Consultation</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#C5A059]/10 border-2 border-[#C5A059] rounded-full flex items-center justify-center mx-auto text-[#C5A059] gold-border-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 bg-[#C5A059]/20 text-[#A4813D] text-[10px] font-bold uppercase tracking-wider">
              DEMO — Consultation request captured locally.
            </span>

            <h3 className="font-serif-luxury text-3xl font-semibold text-[#18181A]">
              Consultation request prepared.
            </h3>

            {/* Checklist items requested by Master Prompt */}
            <div className="p-5 bg-white border border-[#C5A059]/25 max-w-md mx-auto text-left space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#18181A]">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>Project Brief Ready</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#18181A]">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>Specialist Routing Ready ({assignedDirector})</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#18181A]">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>Follow-up Message Ready</span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/20 max-w-md mx-auto text-left space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-[#E8DFD1] pb-1">
                <span className="text-[#8C8A84]">Client:</span>
                <span className="font-bold text-[#18181A]">{name || 'Alex Morgan'}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8DFD1] pb-1">
                <span className="text-[#8C8A84]">Ref ID:</span>
                <span className="font-mono font-bold text-[#18181A]">{briefId}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8DFD1] pb-1">
                <span className="text-[#8C8A84]">Scheduled Date & Timing:</span>
                <span className="font-medium text-[#18181A]">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8A84]">Venue:</span>
                <span className="font-medium text-[#18181A]">{meetingType}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 bg-[#18181A] text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors cursor-pointer"
              >
                Close & Return to Brief
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
