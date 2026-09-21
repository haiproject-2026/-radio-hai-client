'use client';

import React from 'react';
import { Search, Radio, Menu } from 'lucide-react';

interface BarreNavSuperieureProps {
  vueActive: string;
  naviguerVers: (e: React.MouseEvent, vue: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onSearch: (texteRecherche: string) => void;
  onToggleSidebar: () => void;
  onToggleMobileMenu: () => void;
}

export default function BarreNavSuperieure({
  vueActive,
  naviguerVers,
  menuRef,
  onSearch,
  onToggleSidebar,
  onToggleMobileMenu
}: BarreNavSuperieureProps): React.JSX.Element {

  const itemsMenu = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'emissions', label: 'Émissions' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'historique', label: 'Notre Histoire' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div 
      ref={menuRef} 
      className="flex items-center justify-between w-full gap-4 font-sans select-none"
    >
      {/* 1. LIENS DE NAVIGATION (DESKTOP) */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {itemsMenu.map((item) => {
          const estActif = vueActive === item.id;
          return (
            <a
              key={item.id}
              href={item.id === 'accueil' ? '/' : `/${item.id}`}
              onClick={(e) => naviguerVers(e, item.id)}
              className={`px-3 py-2 text-xs lg:text-sm font-black tracking-tight uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                estActif
                  ? 'bg-slate-100 text-[#0d4469] border border-slate-200/60 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* 2. BARRE DE RECHERCHE DYNAMIQUE */}
      <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-sm group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#0d4469] transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Rechercher une actualité..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full text-xs font-bold bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:bg-white focus:border-[#0d4469] focus:ring-2 focus:ring-slate-100 transition-all placeholder-slate-400 shadow-2xs"
        />
      </div>

      {/* 3. BOUTON LECTEUR LIVE AUDIO (COULEURS CHARTE LOGO) */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="flex items-center gap-2 h-10 px-3 sm:px-4 bg-[#0d4469] hover:bg-[#09324e] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-slate-200 transition-all duration-200 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-300 group"
      >
        <Radio className="h-4 w-4 text-cyan-400 animate-pulse group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Écouter le Direct</span>
      </button>

      {/* 4. BOUTON HAMBURGER MENU MOBILE DÉDIÉ */}
      <button
        type="button"
        onClick={onToggleMobileMenu}
        className="flex md:hidden items-center justify-center h-10 w-10 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl cursor-pointer transition-colors shrink-0 focus:outline-none"
      >
        <Menu className="h-4 w-4" />
      </button>
    </div>
  );
}
