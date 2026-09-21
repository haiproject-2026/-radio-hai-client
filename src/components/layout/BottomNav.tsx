'use client';

import React from 'react';
import { Home, Newspaper, Calendar, Disc, History, Mail } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  changeTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, changeTab }: BottomNavProps): React.JSX.Element {
  
  const onglets = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'historique', label: 'Histoire', icon: History },
    { id: 'actualites', label: 'Actualités', icon: Newspaper },
    { id: 'emissions', label: 'Émissions', icon: Calendar },
    { id: 'podcasts', label: 'Podcasts', icon: Disc },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 select-none shadow-lg">
      <div className="flex items-center justify-around h-16 w-full px-1">
        {onglets.map((onglet) => {
          const estActif = 
            activeTab === onglet.id || 
            (onglet.id === 'emissions' && activeTab === 'emission') ||
            (onglet.id === 'podcasts' && activeTab === 'podcast') ||
            (onglet.id === 'historique' && activeTab === 'apropos');

          const Icone = onglet.icon;

          return (
            <button
              key={onglet.id}
              type="button"
              onClick={() => changeTab(onglet.id)}
              className="flex flex-col items-center justify-center flex-1 h-full py-1 text-center cursor-pointer transition-all focus:outline-none gap-0.5"
            >
              <Icone 
                className={`h-5 w-5 transition-transform duration-200 ${
                  estActif 
                    ? 'text-[#0d4469] scale-110 stroke-[2.5]' 
                    : 'text-slate-400 stroke-[1.8] hover:text-slate-600'
                }`} 
              />
              <span 
                className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${
                  estActif 
                    ? 'text-[#0d4469]' 
                    : 'text-slate-400'
                }`}
              >
                {onglet.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
