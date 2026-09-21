'use client';

import React from 'react';

interface VinyleRadioProps {
  isPlaying: boolean;
  isConnecting: boolean;
  stationFrequence: string;
}

export default function VinyleRadio({
  isPlaying,
  isConnecting,
  stationFrequence
}: VinyleRadioProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center relative my-4 md:my-0 select-none">
      <div className="relative w-44 h-44 flex items-center justify-center">
        
        {/* 🔄 ANIMATION DE CHARGEMENT BLANCHE EXTÉRIEURE */}
        {isConnecting && (
          <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin z-20" />
        )}

        {/* ONDES PULSÉES EN LECTURE */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#00a8ff]/10 animate-ping [animation-duration:2s]" />
            <div className="absolute inset-2 rounded-full bg-[#EA7333]/5 animate-ping [animation-duration:3s]" />
            <div className="absolute inset-0 rounded-full border border-[#00a8ff]/20 animate-pulse [animation-duration:1.5s]" />
          </>
        )}
        
        {/* LE VINYLE ET LE LOGO */}
        <div className="w-40 h-40 rounded-full bg-gradient-to-b from-slate-900 via-slate-950 to-black p-1 shadow-2xl relative flex items-center justify-center border border-slate-800/50 z-10">
          
          <div 
            className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center border-4 border-slate-900"
            style={{
              animation: isPlaying ? 'hairadio-spin 12s linear infinite' : 'none'
            }}
          >
            <img 
              src="/logo-radio-hai.webp" 
              alt="Radio Hai Logo" 
              className="w-[85%] h-[85%] object-contain rounded-full bg-white p-2" 
            />
          </div>
          
          {/* BADGE DE FRÉQUENCE */}
          <span className={`absolute bottom-[-8px] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-slate-900 shadow-md transition-colors ${
            isPlaying ? 'bg-[#b33939]' : isConnecting ? 'bg-[#00a8ff]' : 'bg-slate-700'
          }`}>
            {stationFrequence || "97.6 MHz"}
          </span>
        </div>

      </div>

      {/* 🟢 CORRECTION INJECTION COMPATIBLE VITE / INLINE TYPESCRIPT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hairadio-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
