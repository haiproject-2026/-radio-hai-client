'use client';

import { useRef, useEffect, useState } from "react";
import BarreNavSuperieure from "./BarreNavSuperieure";
import SidebarMenu from "./SidebarMenu"; 
import logoRadioHai from "/logo-radio-hai.webp"; 

interface HeaderProps {
  onNavigate: (vue: string) => void;
  vueActive: string;
  setRegionFiltre: (region: string) => void;
  onToggleSidebar: () => void;
}

export default function Header({ 
  onNavigate, 
  vueActive, 
  setRegionFiltre,
  onToggleSidebar
}: HeaderProps) {
  
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const naviguerVers = (e: React.MouseEvent, vue: string) => {
    e.preventDefault();
    onNavigate(vue);
    setIsMobileMenuOpen(false); 
  };

  const handleRecherche = (texteRecherche: string) => {
    setRegionFiltre(texteRecherche);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    function cliqueExterieur(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", cliqueExterieur);
    return () => document.removeEventListener("mousedown", cliqueExterieur);
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-white font-['Manrope',_sans-serif] shadow-sm box-border border-b border-slate-100 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 md:gap-6 relative z-50 box-border">
        
        {/* =========================
            LOGO DE LA RADIO
        ========================== */}
        <div className="relative shrink-0 flex items-center justify-center">
          <a 
            href="/" 
            onClick={(e) => naviguerVers(e, "accueil")} 
            className="group relative focus:outline-none w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(#0d4469_0deg_90deg,#e63946_90deg_180deg,#f1a80a_180deg_270deg,#4ad66d_270deg_360deg)] opacity-30 animate-[spin_6s_linear_infinite] pointer-events-none blur-[1px] group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0d4469] to-[#e63946] opacity-20 animate-ping pointer-events-none scale-75 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="w-full h-full bg-white flex items-center justify-center p-1 box-border rounded-full shadow-md transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95 z-10">
              <img src={logoRadioHai} alt="Logo Radio Hai" className="w-full h-full object-contain rounded-full" />
            </div>
          </a>
        </div>

        {/* =========================
            BARRE DE NAVIGATION SUPÉRIEURE
        ========================== */}
        <div className="flex-1 min-w-0">
          <BarreNavSuperieure 
            vueActive={vueActive}
            naviguerVers={naviguerVers}
            menuRef={menuRef}
            onSearch={handleRecherche}
            onToggleSidebar={onToggleSidebar} 
            onToggleMobileMenu={handleToggleMobileMenu} 
          />
        </div>
      </div>

      {/* 🛠️ FIX : Suppression de la propriété 'vueActive' non attendue */}
      <SidebarMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNavigate={onNavigate}
      />
    </div>
  );
}
