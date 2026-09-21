'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

interface RadioStation {
  nom: string;
  url: string;
}

const RADIOS_PARTENAIRES: RadioStation[] = [
  { nom: 'Radio Hai - Fianarantsoa', url: '#' },
  { nom: 'Radio Hai - Ambalavao', url: '#' },
  { nom: 'RFI (Radio France Internationale)', url: 'https://rfi.fr' },
  { nom: 'VOA (Voice of America)', url: 'https://voaafrique.com' },
  { nom: 'BBC World Service', url: 'https://bbc.co.uk' },
  { nom: 'TF1 Info / Radio', url: 'https://tf1info.fr' },
];

export default function RadioBoxInfo(): React.JSX.Element {
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu flottant si l'utilisateur clique en dehors du composant
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOuvert(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#16354D] text-white rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-md select-none border border-gray-800/20 relative font-['Manrope',_sans-serif]">
      
      {/* Badge statut direct */}
      <div className="bg-red-700/50 text-white text-[9px] font-black uppercase px-4 py-1 rounded-full tracking-widest flex items-center gap-1.5 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        En Ligne Direct
      </div>

      {/* Bouton de lecture central */}
      <div className="mb-6 relative">
        <button 
          type="button" 
          aria-label="Lancer le direct"
          className="w-24 h-24 rounded-full bg-[#EA7333] hover:bg-[#d65f22] flex items-center justify-center mx-auto shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <Play className="w-10 h-12 text-white fill-white ml-2" />
        </button>
      </div>

      {/* Informations de la station */}
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-black tracking-wider uppercase text-white">
          Radio Hai Madagascar
        </h3>
        <p className="text-[10px] font-black text-[#EA7333] uppercase tracking-widest">
          97.6 MHz — Haute Matsiatra
        </p>
      </div>

      <div className="w-full border-t border-slate-700/40 my-3" />

      <p className="text-xs text-gray-200/90 font-medium leading-relaxed max-w-xs mb-6 px-1">
        Écoutez le meilleur de la musique malgache et suivez nos programmes citoyens d'information de proximité en temps réel.
      </p>

      {/* Sélecteur d'antennes */}
      <div ref={menuRef} className="w-full relative mb-6">
        <button 
          type="button"
          onClick={() => setMenuOuvert((prev) => !prev)}
          className="w-full h-11 bg-transparent hover:bg-slate-800/20 border border-slate-600/50 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          Choisir une antenne
        </button>

        {/* Menu flottant */}
        {menuOuvert && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1d4461] border border-slate-700 rounded-xl shadow-xl overflow-hidden z-30 text-left">
            <div className="p-2 bg-slate-900/40 border-b border-slate-700 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Sélectionnez une station :
            </div>
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-700/50">
              {RADIOS_PARTENAIRES.map((radio, index) => (
                <a
                  key={index}
                  href={radio.url}
                  target={radio.url !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  onClick={() => setMenuOuvert(false)}
                  className="block px-4 py-2.5 text-xs font-bold text-white hover:bg-[#EA7333] hover:text-white transition-colors"
                >
                  {radio.nom}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Indicateurs de confiance */}
      <div className="w-full flex items-center justify-between text-[9px] font-bold tracking-wider text-teal-400 uppercase px-1">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-16.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Flux Sécurisé
        </div>
        <div className="flex items-center gap-1 text-pink-400">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Climat Propre
        </div>
      </div>

    </div>
  );
}
