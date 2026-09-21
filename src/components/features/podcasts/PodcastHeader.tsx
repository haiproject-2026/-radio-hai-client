'use client';

import type { JSX } from "react";
import { Search } from "lucide-react";

interface PodcastHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function PodcastHeader({ searchTerm, setSearchTerm }: PodcastHeaderProps): JSX.Element {
  return (
    <section className="w-full bg-[#05192c] text-white pt-14 pb-12 px-6 md:px-12 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col lg:flex-row items-center justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(13,68,105,0.4)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="flex-1 space-y-3 max-w-xl relative z-10 w-full">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">PODCASTS</h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-sm">Réécoutez vos émissions et contenus préférés quand vous voulez.</p>
        
        <div className="relative w-full max-w-lg pt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-20" />
          <input 
            type="text" 
            placeholder="Rechercher un podcast, un thème, une émission..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-11 pr-4 py-3.5 bg-white text-slate-800 text-xs rounded-xl focus:outline-none shadow-md font-medium border border-slate-100 placeholder-slate-400 relative z-10" 
          />
        </div>
      </div>

      {/* Illustration à droite sur les grands écrans */}
      <div className="lg:w-[45%] hidden lg:flex justify-end items-center h-52 relative overflow-hidden pointer-events-none">
        {/* 🌟 APPLICATION DE L'IMAGE DU MICRO DE VOTRE DOSSIER PUBLIC */}
        <img 
          src="/radio_haj_micro_webp.webp" 
          alt="Studio" 
          className="h-[180px] object-contain object-bottom filter contrast-110 brightness-110" 
        />
      </div>
    </section>
  );
}
