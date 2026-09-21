'use client';

import React from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Loader2 
} from "lucide-react";

import MiniSpectreLive from "./MiniSpectreLive";
import { useRadioPlayerAutonome } from "../../hooks/useRadioPlayerAutonome";

interface LecteurLiveProps {
  stationNom?: string;
  stationFrequence?: string;
}

export default function LecteurLive({
  stationNom = "HAI RADIO",
  stationFrequence = "97.6 MHz",
}: LecteurLiveProps): React.JSX.Element {
  
  // Consommation de la logique audio globale
  const {
    isPlaying,
    isLoading,
    volume,
    isMuted,
    toggleLecture,
    toggleMute,
    handleVolumeSlider
  } = useRadioPlayerAutonome();

  return (
    <div className="w-full text-slate-100 rounded-[2rem] shadow-2xl p-6 sm:p-8 bg-[#051d33] border border-slate-800/40 select-none overflow-hidden box-border font-['Manrope',_sans-serif]">
      
      {/* ========================================================
          PARTIE SUPÉRIEURE : INFOS GAUCHE, VINYLE CENTRE, INFOS DROITE
      ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 sm:gap-8 w-full mb-6">
        
        {/* BLOC GAUCHE : IDENTITÉ DE LA STATION */}
        <div className="space-y-3 text-center md:text-left">
          <div>
            <span className="bg-[#b33939] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
              • EN DIRECT
            </span>
          </div>

          <header className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              {stationNom}
            </h1>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
              LA VOIX DE LA JEUNESSE
            </p>
          </header>

          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto md:mx-0">
            Information, musique et culture 24h/24
          </p>

          <div className="pt-2 flex justify-center md:justify-start">
            <button
              type="button"
              onClick={toggleLecture}
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-black text-xs font-black uppercase px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4 fill-black text-black" />
              ) : (
                <Play className="h-4 w-4 fill-black text-black ml-0.5" />
              )}
              <span>ÉCOUTER EN DIRECT</span>
            </button>
          </div>
        </div>

        {/* BLOC CENTRAL : LE DISQUE VINYLE DU DIRECT */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Animation de chargement extérieure */}
            {isLoading && (
              <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin z-20" />
            )}

            {/* Le Vinyle Noir */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-b from-slate-900 via-slate-950 to-black p-1 shadow-2xl relative flex items-center justify-center border-4 border-slate-800/80 z-10">
              <div 
                className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center border-2 border-slate-900"
                style={{
                  animation: isPlaying ? 'spin 12s linear infinite' : 'none'
                }}
              >
                <img 
                  src="/logo-radio-hai.webp" 
                  alt="Radio Hai" 
                  className="w-[75%] h-[75%] object-contain rounded-full bg-white p-1.5" 
                />
              </div>
            </div>
          </div>
          
          {/* Badge Fréquence sous le vinyle */}
          <span className="mt-2 text-slate-300 text-[10px] font-black uppercase tracking-widest bg-slate-950/60 px-3 py-1 rounded-md border border-slate-800">
            {stationFrequence}
          </span>
        </div>

        {/* BLOC DROITE : TEXTE DE BIENVENUE ET HISTOGRAMME MINI */}
        <div className="space-y-2 text-center md:text-left border-l-0 md:border-l border-slate-800/50 pl-0 md:pl-6">
          <div className="flex items-center justify-center md:justify-between w-full">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              À L'ÉCOUTE SUR RADIO HAI
            </p>
            {/* Petit égaliseur rouge décoratif à droite */}
            <div className="flex gap-[2px] h-3 items-end ml-2">
              <span className={`w-[2px] bg-[#b33939] rounded-t ${isPlaying ? 'animate-[mini-wave_0.5s_infinite_alternate]' : 'h-1'}`} />
              <span className={`w-[2px] bg-[#b33939] rounded-t ${isPlaying ? 'animate-[mini-wave_0.7s_infinite_alternate_0.2s]' : 'h-2'}`} />
              <span className={`w-[2px] bg-[#b33939] rounded-t ${isPlaying ? 'animate-[mini-wave_0.4s_infinite_alternate_0.1s]' : 'h-1.5'}`} />
              <span className={`w-[2px] bg-[#b33939] rounded-t ${isPlaying ? 'animate-[mini-wave_0.6s_infinite_alternate_0.3s]' : 'h-2.5'}`} />
            </div>
          </div>
          
          <h3 className="text-base font-black text-white uppercase tracking-wide">
            BIENVENUE SUR NOS ONDES
          </h3>
          <p className="text-xs font-bold text-cyan-400">
            La Voix de la Jeunesse
          </p>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Merci de nous écouter ! Installez-vous confortablement et profitez du meilleur de la musique.
          </p>
        </div>

      </div>

      {/* ========================================================
          PARTIE INFÉRIEURE : BARRE DE CONTROLE ET VOLUME LINÉAIRE
      ========================================================= */}
      <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        
        {/* Bouton de raccourci Play/Pause bas à gauche */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLecture}
            disabled={isLoading}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-slate-950 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4 fill-slate-950 text-slate-950" />
            ) : (
              <Play className="h-4 w-4 fill-slate-950 text-slate-950 ml-0.5" />
            )}
          </button>
          
          {/* Spectre réactif sous-jacent */}
          <MiniSpectreLive isPlaying={isPlaying} isConnecting={isLoading} />
        </div>

        {/* Contrôleur de volume linéaire et Badge Qualité HD */}
        <div className="flex items-center gap-4 w-full sm:w-auto max-w-xs justify-end">
          <div className="flex items-center gap-2 bg-slate-950/40 px-3 py-2 rounded-xl border border-slate-800/40 flex-1 sm:flex-initial w-44">
            <button
              type="button"
              onClick={toggleMute}
              className="text-slate-400 transition hover:text-white cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4 text-red-500" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            
            <input 
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeSlider(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          
          <div className="hidden sm:flex items-center bg-slate-950/40 px-3 py-2 rounded-xl border border-slate-800/40">
            <span className="text-[10px] font-black text-cyan-400 tracking-wider">HD AUDIO</span>
          </div>
        </div>

      </div>
    </div>
  );
}
