'use client';

import React from 'react';

interface MiniSpectreLiveProps {
  isPlaying: boolean;
  isConnecting: boolean;
}

export default function MiniSpectreLive({ isPlaying, isConnecting }: MiniSpectreLiveProps): React.JSX.Element {
  return (
    <div className="min-h-[44px] flex flex-col items-center md:items-start justify-center">
      
      {/* ÉTAT 1 : CONNEXION ET RECHERCHE DU FLUX */}
      {isConnecting && (
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-wider animate-pulse">
          {/* Badge CSS pur au lieu d'un emoji */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Recherche du signal radio...
        </div>
      )}
      
      {/* ÉTAT 2 : DIFFUSION ET SPECTRE ACTIF */}
      {isPlaying && (
        <div className="space-y-2 w-full">
          <div className="flex items-end gap-[3px] h-4 justify-center md:justify-start">
            <div className="w-[3px] bg-cyan-400 rounded-t animate-[mini-bar_0.8s_ease-in-out_infinite]" />
            <div className="w-[3px] bg-cyan-300 rounded-t animate-[mini-bar_0.5s_ease-in-out_infinite_0.2s]" />
            <div className="w-[3px] bg-cyan-400 rounded-t animate-[mini-bar_0.7s_ease-in-out_infinite_0.4s]" />
            <div className="w-[3px] bg-cyan-300 rounded-t animate-[mini-bar_0.6s_ease-in-out_infinite_0.1s]" />
            <div className="w-[3px] bg-cyan-400 rounded-t animate-[mini-bar_0.9s_ease-in-out_infinite_0.3s]" />
          </div>
          <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block shadow-[0_0_8px_#22d3ee]" />
            Diffusion Audio Active
          </p>
        </div>
      )}

      {/* ÉTAT 3 : LECTEUR EN PAUSE / ARRÊT */}
      {!isPlaying && !isConnecting && (
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Lecteur en attente d'écoute
        </p>
      )}

      {/* INJECTION DU DYNAMIC KEYFRAME POUR LES ANIMS DES BARRES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mini-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}} />
    </div>
  );
}
