'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronRight,
  MapPin,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Send,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare
} from 'lucide-react';
import {
  ProjectType,
  LocationOption,
  PropertySizeOption,
  ScopeOption,
  BudgetOption,
  TimelineOption,
  RequirementOption,
  ConciergeAnswers,
  StepKey
} from '@/lib/types';
import {
  PROJECT_TYPES,
  LOCATIONS,
  PROPERTY_SIZES,
  SCOPE_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  REQUIREMENT_OPTIONS,
  getAIResponseForStep,
  calculateLeadIntelligence
} from '@/lib/conciergeData';
import AnalysisState from './AnalysisState';
import ProjectBriefCard from './ProjectBriefCard';
import ConsultationModal from './ConsultationModal';

export default function ConciergeInterface() {
  const [currentStep, setCurrentStep] = useState<StepKey>('projectType');
  const [isTyping, setIsTyping] = useState(false);
  
  // Accumulated user answers
  const [answers, setAnswers] = useState<ConciergeAnswers>({
    requirements: []
  });

  // Custom text inputs
  const [customLocationText, setCustomLocationText] = useState('');
  const [notesInput, setNotesInput] = useState('');
  
  // Contact details fields START EMPTY! (Neutral placeholders to prevent developer autofill leak)
  const [clientNameInput, setClientNameInput] = useState('');
  const [clientPhoneInput, setClientPhoneInput] = useState('');
  const [clientEmailInput, setClientEmailInput] = useState('');

  const [briefId, setBriefId] = useState('');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Chat message history trajectory
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'ai' | 'user'; text: string; step?: StepKey }>>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize brief ID & initial greeting
  useEffect(() => {
    const randomId = `MNSR-2026-${Math.floor(100 + Math.random() * 899)}`;
    setBriefId(randomId);

    const initialGreeting = getAIResponseForStep('welcome', { requirements: [] });
    setChatHistory([
      { sender: 'ai', text: initialGreeting, step: 'projectType' }
    ]);
  }, []);

  // Scroll ONLY the chat stream container, NEVER the browser page!
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isTyping, currentStep]);

  // Transition steps with simulated typing delay
  const advanceToStep = (nextStep: StepKey, updatedAnswers: ConciergeAnswers, userChoiceLabel: string) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: userChoiceLabel }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponseForStep(nextStep, updatedAnswers);
      setIsTyping(false);
      setCurrentStep(nextStep);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse, step: nextStep }
      ]);
    }, 550);
  };

  // Step 1: Select Project Type
  const handleSelectProjectType = (type: ProjectType) => {
    const updated = { ...answers, projectType: type };
    setAnswers(updated);
    advanceToStep('location', updated, type);
  };

  // Step 2: Select Location
  const handleSelectLocation = (location: LocationOption) => {
    let locValue = location;
    if (location === 'Other' && customLocationText.trim()) {
      locValue = customLocationText.trim() as LocationOption;
    }
    const updated = { ...answers, location, customLocation: customLocationText };
    setAnswers(updated);
    advanceToStep('propertySize', updated, locValue);
  };

  // Step 3: Select Property Size
  const handleSelectPropertySize = (size: PropertySizeOption) => {
    const updated = { ...answers, propertySize: size };
    setAnswers(updated);
    advanceToStep('scope', updated, size);
  };

  // Step 4: Select Scope
  const handleSelectScope = (scope: ScopeOption) => {
    const updated = { ...answers, scope };
    setAnswers(updated);
    advanceToStep('budget', updated, scope);
  };

  // Step 5: Select Budget
  const handleSelectBudget = (budget: BudgetOption) => {
    const updated = { ...answers, budget };
    setAnswers(updated);
    advanceToStep('timeline', updated, budget);
  };

  // Step 6: Select Timeline
  const handleSelectTimeline = (timeline: TimelineOption) => {
    const updated = { ...answers, timeline };
    setAnswers(updated);
    advanceToStep('requirements', updated, timeline);
  };

  // Step 7: Select Requirements (Multi-select)
  const toggleRequirement = (req: RequirementOption) => {
    const current = answers.requirements || [];
    const exists = current.includes(req);
    const updatedReqs = exists ? current.filter(r => r !== req) : [...current, req];
    setAnswers({ ...answers, requirements: updatedReqs });
  };

  const handleFinishRequirements = () => {
    const selectedList = answers.requirements.length > 0 ? answers.requirements.join(', ') : 'Turnkey & Joinery';
    const updated = { ...answers };
    
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: selectedList }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setCurrentStep('notes');
      const notesPrompt = getAIResponseForStep('notes', updated);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: notesPrompt, step: 'notes' }
      ]);
    }, 550);
  };

  // Step 8: Additional Notes Input
  const handleNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...answers, notes: notesInput.trim() || 'No additional notes specified.' };
    setAnswers(updated);

    advanceToStep('contact', updated, notesInput.trim() ? notesInput.trim() : 'No additional notes.');
  };

  // Step 9: Contact Details & Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ConciergeAnswers = {
      ...answers,
      clientName: clientNameInput.trim() || 'Alex Morgan (Demo Client)',
      clientEmail: clientEmailInput.trim() || 'client@example.com',
      clientPhone: clientPhoneInput.trim() || '+971 50 000 0000'
    };
    setAnswers(updated);

    const reasoningMessage = `Thank you, ${updated.clientName}.\n\nBased on what you’ve shared, this appears to be a substantial ${updated.projectType?.toLowerCase() || 'transformation'} in ${updated.location || 'Dubai'} with multiple specialist requirements and a near-term start.\n\nI’ll prepare a concise private project brief for the Mansour team now.`;

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: `Name: ${updated.clientName} | Phone: ${updated.clientPhone} | Email: ${updated.clientEmail}` },
      { sender: 'ai', text: reasoningMessage }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setCurrentStep('analysis');
    }, 700);
  };

  // Reset Flow with Confirmation
  const handleConfirmReset = () => {
    setAnswers({ requirements: [] });
    setCustomLocationText('');
    setNotesInput('');
    setClientNameInput('');
    setClientPhoneInput('');
    setClientEmailInput('');
    setCurrentStep('projectType');
    setShowResetConfirm(false);

    const randomId = `MNSR-2026-${Math.floor(100 + Math.random() * 899)}`;
    setBriefId(randomId);
    setChatHistory([
      { sender: 'ai', text: getAIResponseForStep('welcome', { requirements: [] }), step: 'projectType' }
    ]);
  };

  const intelligence = calculateLeadIntelligence(answers);

  const stepMap: Record<StepKey, number> = {
    welcome: 1,
    projectType: 1,
    location: 2,
    propertyType: 3,
    propertySize: 3,
    scope: 4,
    budget: 5,
    timeline: 6,
    requirements: 7,
    notes: 8,
    contact: 8,
    analysis: 8,
    brief: 8
  };
  const currentStepNumber = stepMap[currentStep] || 1;
  const progressPercent = Math.min(Math.round((currentStepNumber / 8) * 100), 100);

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full w-full relative">
      
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] border-2 border-[#C5A059]/40 p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#18181A]">
              Start a new project?
            </h3>
            <p className="text-xs text-[#6E6D6A]">
              This will clear your current project choices and reset the concierge conversation.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2.5 bg-[#18181A] text-white text-xs tracking-wider uppercase font-bold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors"
              >
                Yes, Reset Concierge
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2.5 bg-white border border-[#C5A059]/30 text-[#18181A] text-xs tracking-wider uppercase font-semibold hover:bg-[#FAF8F5]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Advisory Status Bar */}
      <div className="shrink-0 mb-3 bg-white border border-[#C5A059]/20 p-3 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#C5A059] bg-[#FAF8F5] flex items-center justify-center font-serif-luxury text-xs text-[#C5A059] font-bold">
            M
          </div>
          <div>
            <span className="text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
              QUALIFICATION ENGINE
            </span>
            <span className="text-xs text-[#18181A] font-semibold">
              {currentStep === 'brief' ? 'Private Client Brief Specification' : `Step ${Math.min(currentStepNumber, 8)} of 8 • ${progressPercent}% Complete`}
            </span>
          </div>
        </div>

        {currentStep !== 'brief' && currentStep !== 'analysis' && (
          <div className="w-full sm:w-56 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-[#FAF8F5] border border-[#C5A059]/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#8C8A84] font-semibold">{progressPercent}%</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#6E6D6A] hover:text-[#18181A] border border-[#C5A059]/20 transition-colors flex items-center gap-1 cursor-pointer"
          title="Reset Flow"
        >
          <RotateCcw className="w-3 h-3 text-[#C5A059]" />
          <span>RESET</span>
        </button>
      </div>

      {/* Screen Content Render */}
      {currentStep === 'analysis' ? (
        <div className="flex-1 overflow-y-auto">
          <AnalysisState onComplete={() => setCurrentStep('brief')} />
        </div>
      ) : currentStep === 'brief' ? (
        <div className="flex-1 overflow-y-auto pr-1">
          <ProjectBriefCard
            answers={answers}
            intelligence={intelligence}
            briefId={briefId}
            onRequestConsultation={() => setIsConsultationModalOpen(true)}
            onReset={() => setShowResetConfirm(true)}
          />

          <ConsultationModal
            isOpen={isConsultationModalOpen}
            onClose={() => setIsConsultationModalOpen(false)}
            briefId={briefId}
            projectType={answers.projectType || 'Villa Renovation'}
            location={answers.location === 'Other' ? (answers.customLocation || 'Dubai') : (answers.location || 'Emirates Hills')}
            assignedDirector={intelligence.assignedDirector}
          />
        </div>
      ) : (
        /* Outer Viewport Shell with Isolated Conversation Container Scroll */
        <div className="flex-1 overflow-hidden flex flex-col bg-white border border-[#C5A059]/30 shadow-xl">
          
          {/* Scrollable Conversation Container ONLY (Does NOT cause page jumps) */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-5 sm:p-6 space-y-5 overflow-y-auto bg-[#FAF8F5]/60"
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } animate-in fade-in duration-300`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 border border-[#C5A059]/40 bg-[#18181A] text-[#C5A059] flex items-center justify-center font-serif-luxury font-bold text-xs shrink-0 shadow-xs mt-1">
                    M
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 sm:p-5 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#18181A] text-white border border-[#18181A]'
                      : 'bg-white text-[#18181A] border border-[#C5A059]/25 shadow-xs font-sans-luxury'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <span className="text-[9px] tracking-[0.2em] text-[#C5A059] uppercase font-bold block mb-1.5">
                      Mansour Private Concierge
                    </span>
                  )}
                  <p className={msg.sender === 'ai' ? 'font-serif-luxury text-base sm:text-lg text-[#18181A] leading-relaxed whitespace-pre-line' : 'text-xs sm:text-sm font-medium'}>
                    {msg.text}
                  </p>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 bg-[#C5A059] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                    YOU
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start animate-in fade-in duration-200">
                <div className="w-8 h-8 border border-[#C5A059]/40 bg-[#18181A] text-[#C5A059] flex items-center justify-center font-serif-luxury font-bold text-xs shrink-0">
                  M
                </div>
                <div className="p-3 bg-white border border-[#C5A059]/20 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse-dot-1" />
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse-dot-2" />
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse-dot-3" />
                  <span className="text-xs text-[#8C8A84] ml-2 italic">Mansour Advisor is thinking…</span>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Interactive Option Selector Dock */}
          <div className="border-t border-[#C5A059]/20 p-4 sm:p-5 bg-white shrink-0">
            
            {/* Step 1: Project Type */}
            {currentStep === 'projectType' && (
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                  Select What You Are Looking to Create:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      key={pt.type}
                      type="button"
                      onClick={() => handleSelectProjectType(pt.type)}
                      className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white text-left transition-all group cursor-pointer"
                    >
                      <span className="font-serif-luxury text-base font-semibold text-[#18181A] group-hover:text-[#C5A059] block">
                        {pt.type}
                      </span>
                      <span className="text-[10px] text-[#6E6D6A] block mt-0.5 line-clamp-1">
                        {pt.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 'location' && (
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                  Select Property Location in Dubai:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => handleSelectLocation(loc)}
                      className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-serif-luxury text-base font-semibold text-[#18181A] group-hover:text-[#C5A059]">
                        {loc}
                      </span>
                      <MapPin className="w-4 h-4 text-[#C5A059]" />
                    </button>
                  ))}
                </div>

                <div className="pt-1 border-t border-[#FAF8F5] flex gap-2">
                  <input
                    type="text"
                    placeholder="Specify custom enclave (e.g. Al Barari, Downtown)..."
                    value={customLocationText}
                    onChange={(e) => setCustomLocationText(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                  />
                  <button
                    type="button"
                    onClick={() => handleSelectLocation('Other')}
                    disabled={!customLocationText.trim()}
                    className="px-5 py-2 bg-[#18181A] text-white text-xs tracking-wider uppercase font-semibold disabled:opacity-50 hover:bg-[#C5A059] hover:text-[#18181A] transition-colors cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Property Size */}
            {currentStep === 'propertySize' && (
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                  Select Approximate Property Size:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PROPERTY_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectPropertySize(size)}
                      className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white text-left transition-all font-serif-luxury text-sm font-semibold text-[#18181A] hover:text-[#C5A059] cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Level of Work / Scope */}
            {currentStep === 'scope' && (
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                  Select Level of Work / Scope:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SCOPE_OPTIONS.map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => handleSelectScope(scope)}
                      className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white text-left transition-all font-serif-luxury text-sm font-semibold text-[#18181A] hover:text-[#C5A059] cursor-pointer"
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Investment Range */}
            {currentStep === 'budget' && (
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                  Select Investment Allocation Range:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {BUDGET_OPTIONS.map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => handleSelectBudget(budget)}
                      className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white text-left transition-all font-serif-luxury text-base font-semibold text-[#18181A] hover:text-[#C5A059] cursor-pointer"
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Target Timeline */}
            {currentStep === 'timeline' && (
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold block">
                  Select Target Commencement Schedule:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINE_OPTIONS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleSelectTimeline(time)}
                      className="p-3 bg-[#FAF8F5] border border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white text-left transition-all font-serif-luxury text-sm font-semibold text-[#18181A] hover:text-[#C5A059] cursor-pointer"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Specific Requirements (Multi-Select) */}
            {currentStep === 'requirements' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.2em] text-[#8C8A84] uppercase font-semibold">
                    Select Specific Requirements (Multi-Select):
                  </span>
                  <span className="text-xs text-[#C5A059] font-semibold">
                    {answers.requirements.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {REQUIREMENT_OPTIONS.map((req) => {
                    const isSelected = answers.requirements.includes(req);
                    return (
                      <button
                        key={req}
                        type="button"
                        onClick={() => toggleRequirement(req)}
                        className={`p-2.5 border transition-all text-left flex items-center justify-between text-xs font-semibold cursor-pointer ${
                          isSelected
                            ? 'bg-[#18181A] text-white border-[#18181A]'
                            : 'bg-[#FAF8F5] text-[#18181A] border-[#C5A059]/20 hover:border-[#C5A059]'
                        }`}
                      >
                        <span className="truncate">{req}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 ml-1" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-[#C5A059]/40 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleFinishRequirements}
                    className="px-6 py-2.5 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Proceed to Project Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Additional Notes Input */}
            {currentStep === 'notes' && (
              <form onSubmit={handleNotesSubmit} className="space-y-3 bg-[#FAF8F5] p-3.5 border border-[#C5A059]/20">
                <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-bold block">
                  Additional Project Specifications / Notes
                </span>
                
                <textarea
                  rows={2}
                  placeholder="Share any specific design themes, floorplan preferences, architectural requests, or custom millwork details..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A] resize-none"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNotesInput('No additional notes.');
                      const updated = { ...answers, notes: 'No additional notes specified.' };
                      setAnswers(updated);
                      advanceToStep('contact', updated, 'Skip notes.');
                    }}
                    className="px-4 py-2 bg-white border border-[#C5A059]/30 text-[#6E6D6A] text-xs uppercase font-medium hover:text-[#18181A]"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#18181A] text-white text-xs tracking-wider uppercase font-bold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Continue to Contact Capture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 9: Contact Details Capture (Starts EMPTY to prevent developer autofill!) */}
            {currentStep === 'contact' && (
              <form onSubmit={handleContactSubmit} className="space-y-3 bg-[#FAF8F5] p-4 border border-[#C5A059]/20">
                <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-bold block">
                  Confidential Advisory Contact Capture
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="Your full name"
                      value={clientNameInput}
                      onChange={(e) => setClientNameInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
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
                      placeholder="+971 XX XXX XXXX"
                      value={clientPhoneInput}
                      onChange={(e) => setClientPhoneInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6E6D6A] mb-1 font-medium">
                      Private Email *
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      placeholder="name@example.com"
                      value={clientEmailInput}
                      onChange={(e) => setClientEmailInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#18181A] text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>SYNTHESIZE PRIVATE BRIEF</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
