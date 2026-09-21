'use client';

import { X, ChevronRight } from 'lucide-react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (vue: string) => void;
}

export default function SidebarMenu({ isOpen, onClose, onNavigate }: SidebarMenuProps) {
  if (!isOpen) return null;

  const gererNavigation = (vue: string) => {
    if (onNavigate) onNavigate(vue);
    onClose();
  };

  return (
    <div className="lg:hidden fixed inset-y-0 right-0 w-full sm:w-[360px] bg-white shadow-2xl z-50 flex flex-col justify-between select-none text-left font-['Manrope',_sans-serif]">
      
      {/* EN-TÊTE DE LA BARRE LATÉRALE */}
      <div className="p-5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <div className="bg-[#1d4461] text-white font-black text-sm px-3 py-1 rounded-md tracking-tighter">
            HAI<span className="text-[#ea7333]">RADIO</span>
          </div>
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">MENU</span>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-black transition-colors p-1.5 rounded-full cursor-pointer"
        >
          <X className="h-5 w-5 stroke-[1.5]" />
        </button>
      </div>

      {/* LISTE DES LIENS ÉPURÉE (SANS RADIO/DIRECT ET ALIGNÉE SUR LE CLIENT) */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-1">
        
        <button onClick={() => gererNavigation('accueil')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>ACCUEIL</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

        <button onClick={() => gererNavigation('historique')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>HISTORIQUE</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

        <button onClick={() => gererNavigation('actualites')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>ACTUALITÉS</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

        <button onClick={() => gererNavigation('podcasts')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>PODCASTS</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

        <button onClick={() => gererNavigation('emissions')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>ÉMISSIONS</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

        <button onClick={() => gererNavigation('apropos')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>À PROPOS</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

        <button onClick={() => gererNavigation('contact')} className="w-full flex items-center justify-between py-3 px-2 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer">
          <span>CONTACT</span>
          <ChevronRight className="h-4 w-4 text-slate-300 stroke-[1.5]" />
        </button>

      </div>

      {/* PIED DE PAGE VIDE POUR CONSERVER L'ESPACE SANS BOUTON DISTRACTEUR */}
      <div className="p-4 bg-white" />

    </div>
  );
}
