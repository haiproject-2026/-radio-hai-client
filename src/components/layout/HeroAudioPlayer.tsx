'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';

const STREAM_URL = "https://radiohai.mg"; 

export default function HeroAudioPlayer(): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.preload = "none";

    const audio = audioRef.current;
    
    const handleLoadStart = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying || isLoading) {
      audioRef.current.pause();
      audioRef.current.src = ""; 
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.error("Erreur de lecture du direct :", err);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="w-full bg-[#113148] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between shadow-2xl relative border border-white/5 font-['Manrope',_sans-serif] text-left select-none overflow-hidden pb-10 sm:pb-8">
      
      {/* Informations fixes de la Radio unique */}
      <div className="flex flex-col space-y-4 w-full sm:w-auto z-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
            RADIO HAI
          </h1>
          <p className="text-xs font-bold text-[#EA7333] uppercase tracking-widest mt-1">
            97.6 MHz — Haute Matsiatra
          </p>
        </div>

        {/* Badge indicateur de statut simplifié */}
        <div className="w-48 h-10 px-4 bg-[#1a4360] border border-slate-700/60 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isLoading ? 'bg-orange-400 animate-pulse' : isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          {isLoading ? "Connexion au flux..." : isPlaying ? "En antenne direct" : "Radio Hai Madagascar"}
        </div>

        {/* Contrôle du Volume */}
        <div className="flex items-center gap-3 bg-[#16354D]/60 border border-white/5 rounded-xl px-3 py-2 w-48 shadow-inner">
          <button 
            type="button" 
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-full accent-[#EA7333] h-1 bg-slate-700 rounded-lg cursor-pointer appearance-none"
            style={{
              background: `linear-gradient(to right, #EA7333 0%, #EA7333 ${(isMuted ? 0 : volume) * 100}%, #334155 ${(isMuted ? 0 : volume) * 100}%, #334155 100%)`
            }}
          />
        </div>
      </div>

      {/* Disque blanc et bouton Play central */}
      <div className="mt-6 sm:mt-0 relative z-10 flex items-center justify-center">
        
        {isPlaying && (
          <>
            <div className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-emerald-400/40 animate-ping opacity-75" />
            <div className="absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border border-emerald-500/20 animate-[ping_1.5s_infinite] opacity-50" />
          </>
        )}

        <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-full p-2 shadow-2xl relative flex items-center justify-center border-4 border-slate-800/20">
          
          <div className="w-full h-full rounded-full bg-slate-50 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
            <span className="text-[#113148] font-black text-xl tracking-tighter">RADIO</span>
            <span className="text-[#EA7333] font-black text-2xl tracking-tight -mt-1.5">HAI</span>
            <span className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-1">97.6 FM MHz</span>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            disabled={isLoading && !isPlaying}
            className={`absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer text-white border-2 border-white ${
              isLoading ? 'bg-orange-500' : isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6 fill-white text-white" />
            ) : (
              <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Ondes radio décoratives au bas de l'élément */}
      <div className="absolute bottom-0 left-0 right-0 h-3 flex items-end justify-center gap-[3px] px-8 overflow-hidden pointer-events-none opacity-80">
        {Array.from({ length: 45 }).map((_, i) => {
          const baseHeight = 4 + (i % 5) * 2; 
          return (
            <span
              key={i}
              className="w-[3px] bg-gradient-to-t from-[#EA7333] to-teal-400 rounded-t-sm transition-all duration-300"
              style={{
                height: isPlaying ? '100%' : '2px',
                animation: isPlaying 
                  ? `bounce 0.8s ease-in-out infinite alternate ${i * 45}ms` 
                  : isLoading 
                  ? `bounce 1.4s ease-in-out infinite alternate ${i * 90}ms`
                  : 'none',
                transformOrigin: 'bottom',
                maxHeight: isPlaying ? `${baseHeight}px` : '2px'
              }}
            />
          );
        })}
      </div>

    </div>
  );
}
