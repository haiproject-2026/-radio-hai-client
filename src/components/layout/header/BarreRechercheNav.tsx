'use client';

import { useState } from "react"; // 💡 Importation requise pour gérer l'affichage de l'input
import { Menu, X, Radio, Search } from "lucide-react";

interface BarreNavSuperieureProps {
  vueActive: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSidebar: () => void;
  naviguerVers: (e: React.MouseEvent, vue: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  setRegionFiltre: (region: string) => void;
}

export default function BarreNavSuperieure({
  vueActive,
  isSidebarOpen,
  onToggleSidebar,
  naviguerVers,
  menuRef
}: BarreNavSuperieureProps) {
  
  // 💡 GESTION DE L'ÉTAT DE LA RECHERCHE
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const listeMenus = [
    { id: "accueil", label: "ACCUEIL" },
    { id: "actualites", label: "ACTUALITÉS" },
    { id: "emissions", label: "ÉMISSIONS" },
    { id: "podcasts", label: "PODCASTS" },
    { id: "radio", label: "RADIO" },
    { id: "apropos", label: "À PROPOS" },
    { id: "contact", label: "CONTACT" },
  ];

  // 💡 FONCTION LORS DE LA VALIDATION DE LA RECHERCHE (Touche Entrée)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Recherche lancée pour :", searchQuery);
      // Ajoutez ici votre logique (ex: redirection vers /search?q=... ou ouverture d'un modal)
      
      // Optionnel : fermer la barre après recherche
      setIsSearchOpen(false);
    }
  };

  return (
    <div ref={menuRef} className="w-full flex items-center justify-end md:justify-between lg:gap-6 font-['Manrope',_sans-serif] antialiased">
      
      {/* MENU DESKTOP */}
      <nav className="hidden xl:flex items-center gap-5 lg:gap-6 ml-auto mr-4">
        {listeMenus.map((item) => {
          const estActif = vueActive === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => naviguerVers(e, item.id)}
              className={`text-[11px] font-extrabold uppercase tracking-wider pb-1 transition-all duration-200 border-b-2 hover:text-[#0d4469] ${
                estActif 
                  ? "text-[#0d4469] border-[#0d4469] font-black" 
                  : "text-[#0d4469] border-transparent"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* CONTENEUR BOUTON DIRECT + RECHERCHE */}
      <div className="flex items-center gap-4 shrink-0 relative">
        
        {/* BOUTON ÉCOUTER EN DIRECT */}
        <button 
          onClick={(e) => naviguerVers(e, "direct")}
          className="bg-[#052952] hover:bg-[#083a75] text-white text-[10px] lg:text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full flex items-center gap-2 transition-transform active:scale-95 shadow-sm"
        >
          <Radio className="h-3.5 w-3.5 animate-pulse text-white" />
          <span>Écouter en direct</span>
        </button>

        {/* 💡 BLOC DE RECHERCHE DYNAMIQUE */}
        <div className="flex items-center">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-slate-100 rounded-full pl-3 pr-1 py-1 transition-all duration-300">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-sm text-[#0d4469] outline-none w-32 md:w-48 font-medium placeholder-slate-400"
              />
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-[#0d4469] hover:bg-slate-100 p-2 rounded-full transition-colors"
              aria-label="Ouvrir la recherche"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* BOUTON MENU MOBILE */}
      <button
        onClick={onToggleSidebar}
        className="p-2 xl:hidden text-black hover:bg-slate-100 rounded-lg transition-colors ml-2"
        aria-label="Menu"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

    </div>
  );
}
