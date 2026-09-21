'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export type ElementMenu = {
  id: string;
  titre: string;
  description: string;
  date?: string;
  provenance?: string;
  station?: string;
  statut?: string;
  estAlaUne?: boolean;
  categorie?: string;
  imageUrl?: string;
};

type AppContextValue = {
  actualites: ElementMenu[];
  musiques: ElementMenu[];
  emissions: ElementMenu[];
  podcasts: ElementMenu[];
  ajouterElement: (section: 'actualites' | 'musiques' | 'emissions' | 'podcasts', element: Partial<ElementMenu>) => void;
  supprimerElement: (section: 'actualites' | 'musiques' | 'emissions' | 'podcasts', id: string) => void;
  chargerActualites: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [actualites, setActualites] = useState<ElementMenu[]>([]);
  const [musiques, setMusiques] = useState<ElementMenu[]>([]);
  const [emissions, setEmissions] = useState<ElementMenu[]>([]);
  const [podcasts, setPodcasts] = useState<ElementMenu[]>([]);

  const ajouterElement = useCallback((section: 'actualites' | 'musiques' | 'emissions' | 'podcasts', element: Partial<ElementMenu>) => {
    const nouvel: ElementMenu = {
      id: (Date.now() + Math.random()).toString(36),
      titre: element.titre || 'Titre non défini',
      description: element.description || '',
      date: element.date || new Date().toLocaleDateString('fr-FR'),
      provenance: element.provenance || 'admin',
      station: element.station,
      statut: element.statut,
      estAlaUne: !!element.estAlaUne,
      categorie: element.categorie,
      imageUrl: element.imageUrl,
    };

    switch (section) {
      case 'actualites':
        setActualites(prev => [nouvel, ...prev]);
        break;
      case 'musiques':
        setMusiques(prev => [nouvel, ...prev]);
        break;
      case 'emissions':
        setEmissions(prev => [nouvel, ...prev]);
        break;
      case 'podcasts':
        setPodcasts(prev => [nouvel, ...prev]);
        break;
    }
  }, []);

  const supprimerElement = useCallback((section: 'actualites' | 'musiques' | 'emissions' | 'podcasts', id: string) => {
    switch (section) {
      case 'actualites':
        setActualites(prev => prev.filter(p => p.id !== id));
        break;
      case 'musiques':
        setMusiques(prev => prev.filter(p => p.id !== id));
        break;
      case 'emissions':
        setEmissions(prev => prev.filter(p => p.id !== id));
        break;
      case 'podcasts':
        setPodcasts(prev => prev.filter(p => p.id !== id));
        break;
    }
  }, []);

  const chargerActualites = useCallback(() => {
    setActualites(prev => prev);
  }, []);

  const value: AppContextValue = {
    actualites,
    musiques,
    emissions,
    podcasts,
    ajouterElement,
    supprimerElement,
    chargerActualites,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp doit être englobé dans un AppProvider');
  return ctx;
}
