'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  Award,
  Download,
  Share2,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  FileText,
  Send,
  MessageSquare,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ConciergeAnswers, LeadIntelligence, ClientBriefData } from '@/lib/types';
import { saveNewLead } from '@/lib/leadStore';
import SpecialistRoutingModal from './SpecialistRoutingModal';

interface ProjectBriefCardProps {
  answers: ConciergeAnswers;
  intelligence: LeadIntelligence;
  briefId: string;
  onRequestConsultation: () => void;
  onReset: () => void;
}

export default function ProjectBriefCard({
  answers,
  intelligence,
  briefId,
  onRequestConsultation,
  onReset
}: ProjectBriefCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [savedToDash, setSavedToDash] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'document'>('card');
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const [assignedSpecialist, setAssignedSpecialist] = useState({
    role: intelligence.specialistRole,
    director: intelligence.assignedDirector
  });

  const locationDisplay = answers.location === 'Other' ? (answers.customLocation || 'Dubai Prime Residence') : answers.location;

  // Auto-save brief to local storage for dashboard sync
  React.useEffect(() => {
    const briefRecord: ClientBriefData = {
      id: briefId,
      createdAt: new Date().toISOString(),
      clientName: answers.clientName || 'Alex Morgan',
      clientEmail: answers.clientEmail || 'alex@example.com',
      clientPhone: answers.clientPhone || '+971 50 000 0000',
      preferredTiming: answers.preferredTiming || '10:00 AM GST',
      projectType: answers.projectType || 'Villa Renovation',
      location: locationDisplay || 'Emirates Hills',
      propertySize: answers.propertySize || '8,000–12,000 sq ft',
      scope: answers.scope || 'Turnkey Transformation',
      budget: answers.budget || 'AED 2M–3M',
      timeline: answers.timeline || '1–3 months',
      requirements: answers.requirements || ['Bespoke Joinery', 'Smart Home', 'Landscaping'],
      notes: answers.notes,
      intelligence: {
        ...intelligence,
        assignedDirector: assignedSpecialist.director,
        specialistRole: assignedSpecialist.role
      },
      status: 'QUALIFIED'
    };
    saveNewLead(briefRecord);
    setSavedToDash(true);
  }, [answers, intelligence, briefId, locationDisplay, assignedSpecialist]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyWhatsApp = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(intelligence.whatsappDraft);
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleConfirmRouting = (role: string, director: string) => {
    setAssignedSpecialist({ role, director });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#F4F0E8] border border-[#C5A059]/30 text-xs gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span className="font-bold text-[#18181A] uppercase tracking-wider">Mansour Private Client System</span>
          <span className="text-[#8C8A84] font-mono hidden sm:inline">• Ref: {briefId}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] bg-[#18181A] text-[#D4AF37] px-2.5 py-1 font-bold uppercase tracking-wider">
            DEMO / SAMPLE CLIENT
          </span>
          {savedToDash && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#C5A059]/20 text-[#A4813D] px-2.5 py-1 font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3" /> Synced to Dashboard
            </span>
          )}
        </div>
      </div>

      {/* Main Luxury Brief Card Frame */}
      <div className="bg-white border-2 border-[#C5A059]/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* Card Header */}
        <div className="border-b border-[#C5A059]/20 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold block">
              Confidential Architectural Brief
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#18181A] font-semibold mt-1">
              MANSOUR PRIVATE CLIENT BRIEF
            </h2>
            <p className="text-xs text-[#6E6D6A] mt-1">
              Client: <span className="font-semibold text-[#18181A]">{answers.clientName || 'Alex Morgan'}</span> • Prepared for Senior Architectural Board
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 border border-[#C5A059]/30 bg-[#FAF8F5] text-[#18181A] hover:bg-[#C5A059]/10 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-wider">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 border border-[#C5A059]/30 bg-[#FAF8F5] text-[#18181A] hover:bg-[#C5A059]/10 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-wider">PDF</span>
            </button>
          </div>
        </div>

        {/* 1. PRIVATE CLIENT BRIEF SECTION */}
        <div className="mb-8">
          <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#18181A] tracking-wider uppercase">
                PRIVATE CLIENT BRIEF
              </h3>
            </div>
            <span className="text-[10px] tracking-widest text-[#8C8A84] uppercase font-bold">
              DEMO CLIENT SPECIFICATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Client Name
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#18181A]">
                {answers.clientName || 'Alex Morgan'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Project Type
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#18181A]">
                {answers.projectType || 'Villa Renovation'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Location
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#18181A] flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                {locationDisplay || 'Emirates Hills'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Property Size
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#18181A]">
                {answers.propertySize || '8,000–12,000 sq ft'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Project Scope
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#18181A]">
                {answers.scope || 'Turnkey Transformation'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Investment Range
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#C5A059]">
                {answers.budget || 'AED 2M–3M'}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Timeline
              </span>
              <p className="font-serif-luxury text-lg font-bold text-[#18181A]">
                {answers.timeline || '1–3 months'}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#FAF8F5] border border-[#C5A059]/15">
            <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-2">
              Requirements:
            </span>
            <div className="flex flex-wrap gap-2">
              {answers.requirements && answers.requirements.length > 0 ? (
                answers.requirements.map((req, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-[#C5A059]/30 text-xs text-[#18181A] font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    {req}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#6E6D6A] italic">
                  Bespoke Joinery, Smart Home, Landscaping
                </span>
              )}
            </div>
          </div>

          {answers.notes && (
            <div className="mt-4 p-4 bg-[#FAF8F5] border border-[#C5A059]/15 text-xs text-[#18181A]">
              <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block mb-1">
                Additional Notes:
              </span>
              <p className="italic text-[#6E6D6A]">“{answers.notes}”</p>
            </div>
          )}
        </div>

        {/* 2. CLIENT INTELLIGENCE SECTION */}
        <div className="p-6 bg-[#18181A] text-white border border-[#C5A059]/40 mb-8 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#C5A059] tracking-widest uppercase">
                CLIENT INTELLIGENCE
              </h3>
            </div>
            <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase bg-white/10 px-2.5 py-1 font-semibold">
              FIT SCORE: {intelligence.intent} — {intelligence.totalScore}/100
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white/5 border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest text-white/60 uppercase font-medium">PROJECT INTENT</span>
                <span className="font-bold text-xs tracking-wider uppercase text-[#D4AF37] bg-[#C5A059]/20 px-2 py-0.5">
                  {intelligence.intent}
                </span>
              </div>
              <p className="text-xs text-white/80 pt-1 leading-relaxed">
                “{intelligence.intentExplanation}”
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest text-white/60 uppercase font-medium">PROJECT VALUE</span>
                <span className="font-bold text-xs tracking-wider uppercase text-white bg-white/10 px-2 py-0.5">
                  {intelligence.projectValue}
                </span>
              </div>
              <p className="text-xs text-white/80 pt-1 leading-relaxed">
                “{intelligence.valueExplanation}”
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest text-white/60 uppercase font-medium">TIMELINE</span>
                <span className="font-bold text-xs tracking-wider uppercase text-white bg-white/10 px-2 py-0.5">
                  {intelligence.timelineScore}
                </span>
              </div>
              <p className="text-xs text-white/80 pt-1 leading-relaxed">
                “{intelligence.timelineExplanation}”
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest text-white/60 uppercase font-medium">PROJECT COMPLEXITY</span>
                <span className="font-bold text-xs tracking-wider uppercase text-white bg-white/10 px-2 py-0.5">
                  {intelligence.projectComplexity}
                </span>
              </div>
              <p className="text-xs text-white/80 pt-1 leading-relaxed">
                “{intelligence.complexityExplanation}”
              </p>
            </div>
          </div>

          <div className="border-t border-white/15 pt-5 space-y-4 text-xs">
            <div>
              <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold block mb-1">
                CONCIERGE RECOMMENDATION
              </span>
              <p className="text-white/90 leading-relaxed font-serif-luxury text-base italic">
                “{intelligence.recommendation}”
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-widest text-white/60 uppercase font-semibold block mb-2">
                WHY THIS LEAD IS HIGH INTENT
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
                {intelligence.whyHighIntent.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. TRANSPARENT FIT SCORE & BREAKDOWN */}
        <div className="p-6 bg-[#FAF8F5] border border-[#C5A059]/25 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#C5A059]/20 pb-3 mb-3">
            <div>
              <span className="text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
                DEMO INTELLIGENCE MODEL
              </span>
              <h4 className="font-serif-luxury text-xl font-bold text-[#18181A]">
                FIT SCORE: {intelligence.intent} — {intelligence.totalScore}/100
              </h4>
            </div>

            <button
              onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
              className="px-3 py-1.5 bg-white border border-[#C5A059]/30 text-[#18181A] text-xs uppercase tracking-wider font-semibold hover:bg-[#C5A059]/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{showScoreBreakdown ? 'Hide Breakdown' : 'VIEW SCORE BREAKDOWN'}</span>
              {showScoreBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showScoreBreakdown && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs mb-4 pt-2 animate-in fade-in">
              {intelligence.scoreBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#C5A059]/15">
                  <span className="text-[10px] text-[#8C8A84] block font-medium uppercase">{item.label}</span>
                  <span className="font-bold text-[#C5A059] text-base mt-0.5 block">+{item.points}</span>
                </div>
              ))}
            </div>
          )}

          <p className="text-[10px] text-[#8C8A84] italic">
            * This score is based on information provided during the project qualification conversation. It is intended to help prioritise enquiries and is not a financial or credit assessment.
          </p>
        </div>

        {/* 4. WHATSAPP / CONTACT FOLLOW-UP DRAFT */}
        <div className="p-6 bg-white border border-[#C5A059]/30 mb-8 space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C5A059]" />
            <h4 className="font-serif-luxury text-lg font-bold text-[#18181A]">
              Prepare WhatsApp Follow-Up
            </h4>
            <span className="text-[9px] bg-[#FAF8F5] border border-[#C5A059]/30 text-[#C5A059] px-2 py-0.5 font-bold uppercase tracking-wider ml-auto">
              DEMO HANDOFF
            </span>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/20 text-xs text-[#18181A] font-sans-luxury leading-relaxed italic whitespace-pre-line">
            {intelligence.whatsappDraft}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={handleCopyWhatsApp}
              className="px-4 py-2 bg-[#FAF8F5] border border-[#C5A059]/30 text-[#18181A] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{copiedWhatsApp ? 'Draft Copied!' : 'COPY MESSAGE'}</span>
            </button>

            <a
              href={`https://wa.me/971500000000?text=${encodeURIComponent(intelligence.whatsappDraft)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#18181A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>OPEN WHATSAPP (DEMO)</span>
            </a>
          </div>
        </div>

        {/* Detailed Document View Mode */}
        {viewMode === 'document' && (
          <div className="p-6 bg-[#FAF8F5] border border-[#C5A059]/20 mb-8 space-y-4 text-xs leading-relaxed text-[#18181A] animate-in fade-in">
            <h4 className="font-serif-luxury text-lg font-bold border-b border-[#C5A059]/20 pb-2 text-[#18181A]">
              Specialist Evaluation Notes
            </h4>
            <p>
              This Private Client Brief synthesizes an architectural qualification for a <strong className="text-[#18181A]">{answers.projectType || 'Villa Renovation'}</strong> project located in <strong className="text-[#C5A059]">{locationDisplay}</strong>. The target footprint of <strong className="text-[#18181A]">{answers.propertySize}</strong> provides structural scale for custom Italian joinery, rare marble masoning, and smart MEP integration.
            </p>
            <p>
              With an investment allocation of <strong className="text-[#C5A059]">{answers.budget}</strong> and a commencement target of <strong className="text-[#18181A]">{answers.timeline}</strong>, the project has been routed to <strong className="text-[#18181A]">{assignedSpecialist.role}</strong> for priority scheduling.
            </p>
          </div>
        )}

        {/* 5. ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          
          <button
            onClick={onRequestConsultation}
            className="group relative flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300 hover:bg-[#C5A059] hover:text-[#18181A] shadow-xl cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:text-[#18181A] transition-colors" />
            <span>REQUEST PRIVATE CONSULTATION</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'card' ? 'document' : 'card')}
            className="inline-flex items-center justify-center px-6 py-4 bg-[#FAF8F5] border border-[#C5A059]/40 text-[#18181A] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#C5A059]/10 transition-all text-center cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#C5A059]" />
            <span className="ml-2">{viewMode === 'card' ? 'VIEW FULL PROJECT BRIEF' : 'BACK TO BRIEF CARD'}</span>
          </button>

          <button
            onClick={() => setIsRoutingModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-4 bg-white border border-[#18181A] text-[#18181A] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#18181A] hover:text-white transition-all text-center cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#C5A059]" />
            <span className="ml-2">ROUTE TO SPECIALIST</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center justify-center p-4 bg-transparent border border-[#C5A059]/20 text-[#6E6D6A] hover:text-[#18181A] hover:border-[#C5A059] transition-all cursor-pointer"
            title="Create New Brief"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Specialist Routing Modal */}
      <SpecialistRoutingModal
        isOpen={isRoutingModalOpen}
        onClose={() => setIsRoutingModalOpen(false)}
        briefId={briefId}
        recommendedRole={intelligence.specialistRole}
        recommendedDirector={intelligence.assignedDirector}
        onConfirmRouting={handleConfirmRouting}
      />
    </div>
  );
}
