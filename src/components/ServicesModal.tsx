'use client';

import React from 'react';
import { X, Check, ShieldCheck, ArrowUpRight, Compass, Home, Key, Layers } from 'lucide-react';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export default function ServicesModal({ isOpen, onClose, onStartProject }: ServicesModalProps) {
  if (!isOpen) return null;

  const services = [
    {
      title: 'Villa Renovation & Transformation',
      description: 'Comprehensive structural redesign, modern elevation updates, facade cladding, infinity pool additions, and complete architectural revitalizations.',
      deliverables: ['Architectural Layout Redesign', 'Facade & Structural Modifications', 'MEP & Lighting Re-engineering', 'Landscape & Outdoor Living Integration']
    },
    {
      title: 'Interior Design & Architecture',
      description: 'Ultra-bespoke interior conceptualization, spatial planning, 3D photorealistic renderings, material curation, and rare stone sourcing.',
      deliverables: ['Custom Concept Design & Moodboards', 'Comprehensive Material Specifications', '3D Architectural Renderings', 'Art & Sculpture Procurement']
    },
    {
      title: 'Turnkey Fit-Out Execution',
      description: 'Single-point accountability from bare-shell handover to fully furnished, move-in key handover. High-precision project management.',
      deliverables: ['Dedicated Senior Site Director', 'Permit Approvals & Authorities Liaison', 'Strict Quality Assurance Protocols', 'Handover White-Glove Staging']
    },
    {
      title: 'Bespoke Italian Joinery & Cabinetry',
      description: 'Handcrafted custom cabinetry, architectural wood paneling, walk-in dressing suites, and custom kitchen joinery fabricated with rare veneers.',
      deliverables: ['Custom Walk-in Wardrobe Suites', 'Architectural Timber Paneling', 'Chef & Show Kitchen Engineering', 'Integrated Concealed Doors']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] border border-[#C5A059]/30 shadow-2xl p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8C8A84] hover:text-[#18181A] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="border-b border-[#C5A059]/20 pb-6 mb-8">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
            Mansour Interiors & Fit-Out
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#18181A] font-semibold mt-1">
            Our Architectural Services & Scope
          </h2>
          <p className="text-sm text-[#6E6D6A] mt-2 max-w-2xl">
            Delivering uncompromised turnkey luxury for private residences, palatial villas, and high-rise penthouses across Dubai.
          </p>
        </div>

        {/* Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-semibold">
                  Scope 0{index + 1}
                </span>
                <h3 className="font-serif-luxury text-xl font-medium text-[#18181A] mt-1 mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-[#6E6D6A] leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="border-t border-[#FAF8F5] pt-4 mt-2">
                <span className="text-[10px] tracking-widest text-[#8C8A84] uppercase block mb-2 font-medium">
                  Key Deliverables:
                </span>
                <ul className="space-y-1.5">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#18181A]">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#F4F0E8] border border-[#C5A059]/20 gap-4">
          <div>
            <h4 className="font-serif-luxury text-lg text-[#18181A] font-medium">
              Ready to explore your property’s potential?
            </h4>
            <p className="text-xs text-[#6E6D6A]">
              Launch our Private Client Concierge to receive an instant architectural brief evaluation.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#C5A059] hover:text-[#18181A] transition-colors shrink-0 flex items-center justify-center gap-2"
          >
            <span>Start Brief Flow</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
