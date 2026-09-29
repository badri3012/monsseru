'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { SPECIALIST_ROLES } from '@/lib/conciergeData';

interface SpecialistRoutingModalProps {
  isOpen: boolean;
  onClose: () => void;
  briefId: string;
  recommendedRole: string;
  recommendedDirector: string;
  onConfirmRouting: (role: string, director: string) => void;
}

export default function SpecialistRoutingModal({
  isOpen,
  onClose,
  briefId,
  recommendedRole,
  recommendedDirector,
  onConfirmRouting
}: SpecialistRoutingModalProps) {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [routedSuccess, setRoutedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentSpecialist = SPECIALIST_ROLES[selectedRoleIndex] || SPECIALIST_ROLES[0];

  const handleConfirm = () => {
    onConfirmRouting(currentSpecialist.role, currentSpecialist.role);
    setRoutedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-[#C5A059]/40 shadow-2xl p-6 sm:p-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setRoutedSuccess(false);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-[#8C8A84] hover:text-[#18181A] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!routedSuccess ? (
          <div>
            <div className="border-b border-[#C5A059]/20 pb-4 mb-6">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold block">
                SPECIALIST ROUTING SYSTEM
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#18181A] font-semibold mt-1">
                ROUTE PROJECT TO SPECIALIST
              </h2>
              <p className="text-xs text-[#6E6D6A] mt-1">
                Ref ID: <span className="font-mono font-bold text-[#18181A]">{briefId}</span> • Clearly labelled prototype specialist routing.
              </p>
            </div>

            {/* Recommendation Callout */}
            <div className="p-4 bg-[#F4F0E8] border border-[#C5A059]/30 mb-6 text-xs text-[#18181A]">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059] block mb-1">
                RECOMMENDED ROUTING:
              </span>
              <p className="font-medium">
                Specialist Role: <strong className="text-[#18181A]">{recommendedRole}</strong>
              </p>
              <p className="text-[11px] text-[#6E6D6A] mt-1">
                Reason: High-value, high-complexity, near-term project timeline.
              </p>
            </div>

            {/* Specialist Role Selectors (Generic Roles Only) */}
            <div className="space-y-3 mb-6">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                Select Specialist Role for Assignment:
              </span>

              <div className="space-y-2">
                {SPECIALIST_ROLES.map((sp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedRoleIndex(idx)}
                    className={`w-full p-3.5 text-left border transition-all flex items-center justify-between cursor-pointer ${
                      selectedRoleIndex === idx
                        ? 'bg-[#18181A] text-white border-[#18181A] shadow-md'
                        : 'bg-white text-[#18181A] border-[#C5A059]/20 hover:border-[#C5A059]'
                    }`}
                  >
                    <div>
                      <span className="font-serif-luxury text-base font-semibold block">
                        {sp.role}
                      </span>
                      <p className={`text-[11px] mt-0.5 ${selectedRoleIndex === idx ? 'text-white/80' : 'text-[#6E6D6A]'}`}>
                        {sp.description}
                      </p>
                    </div>

                    {selectedRoleIndex === idx && (
                      <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4 text-[#C5A059]" />
              <span>Confirm Specialist Routing Assignment</span>
            </button>
          </div>
        ) : (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-[#C5A059]/10 border-2 border-[#C5A059] rounded-full flex items-center justify-center mx-auto text-[#C5A059] gold-border-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 bg-[#C5A059]/20 text-[#A4813D] text-[10px] font-bold uppercase tracking-wider">
              DEMO — Specialist Assignment Complete
            </span>

            <h3 className="font-serif-luxury text-3xl font-semibold text-[#18181A]">
              Project Brief Assigned
            </h3>

            <p className="text-xs text-[#6E6D6A] max-w-md mx-auto leading-relaxed">
              Brief <strong className="text-[#18181A]">{briefId}</strong> has been assigned to <span className="text-[#C5A059] font-bold">{currentSpecialist.role}</span>.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  setRoutedSuccess(false);
                  onClose();
                }}
                className="px-8 py-3 bg-[#18181A] text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors cursor-pointer"
              >
                Return to Brief Card
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
