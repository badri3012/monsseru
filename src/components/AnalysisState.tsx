'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface AnalysisStateProps {
  onComplete: () => void;
}

export default function AnalysisState({ onComplete }: AnalysisStateProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    'Understanding project scope…',
    'Assessing architectural requirements…',
    'Evaluating project readiness & capital allocation…',
    'Preparing specialist brief for Mansour Directors…'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        const next = prev + 2;
        if (next >= 25 && next < 50) setStageIndex(1);
        if (next >= 50 && next < 80) setStageIndex(2);
        if (next >= 80) setStageIndex(3);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="relative min-h-[480px] flex flex-col items-center justify-center p-8 bg-white border border-[#C5A059]/30 shadow-xl overflow-hidden text-center my-4">
      
      {/* Animated Scan Bar Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent animate-scan" />

      {/* Luxury Crest Icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-[#C5A059]/40 flex items-center justify-center bg-[#FAF8F5] gold-border-glow">
          <Sparkles className="w-8 h-8 text-[#C5A059] animate-pulse" />
        </div>
        <div className="absolute -inset-2 rounded-full border border-[#C5A059]/20 animate-ping opacity-25" />
      </div>

      {/* Header Tagline */}
      <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold mb-2">
        MANSOUR CONCIERGE ENGINE
      </span>

      <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#18181A] mb-3">
        Preparing your private project brief…
      </h2>

      {/* Animated Stage Label */}
      <p className="text-xs text-[#6E6D6A] font-medium h-6 max-w-md transition-all duration-300 italic">
        {stages[stageIndex]}
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md mt-8">
        <div className="flex justify-between items-center text-[10px] tracking-widest text-[#8C8A84] uppercase mb-2 font-semibold">
          <span>Synthesizing Parameters</span>
          <span className="text-[#C5A059] font-mono font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#FAF8F5] border border-[#C5A059]/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#9E7D3B] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-10 flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#8C8A84]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Confidential Private Client Protocol • Dubai Design District</span>
      </div>

    </div>
  );
}
