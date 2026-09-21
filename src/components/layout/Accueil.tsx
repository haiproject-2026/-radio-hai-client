'use client';

import React, { useState, useEffect, useMemo } from "react";
import { Newspaper } from "lucide-react";
import LecteurLive from "./LecteurLive";
import GrilleActualites from "./GrilleActualites";
import BottomNav from "./BottomNav";
import SectionAnimateurs from "./SectionAnimateurs";
import SectionContactAccueil from "./SectionContactAccueil";

import { useActualitesLive } from "../../hooks/useActualitesLive";
import type { Article } from "../../hooks/useActualitesLive"; 

const getApiUrl = (): string => {
  if (typeof window !== 'undefined') {
    const win = window as unknown as Record<string, { env?: Record<string, string> }>;
    if (win.process?.env?.NEXT_PUBLIC_API_URL) {
      return win.process.env.NEXT_PUBLIC_API_URL;
    }
  }
  return "http://localhost:5000/api";
};

const API_URL = getApiUrl();

interface Station { 
  id: string; 
  nom: string; 
  frequence: string; 
  flux_url: string; 
}

interface BackendRadio {
  id?: string;
  currentTrack?: string;
}

interface AccueilProps {
  articles?: Article[];
  hosts?: unknown[];
  regionFiltre?: string;
  setRegionFiltre?: (region: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Accueil({ regionFiltre = "all", activeTab = "accueil", setActiveTab }: AccueilProps): React.JSX.Element {
  const [stationUnique, setStationUnique] = useState<Station | null>(null);
  const { dbArticles, loading } = useActualitesLive();
  
  const articlesAffiches = useMemo(() => {
    const baseArticles = Array.isArray(dbArticles) ? dbArticles : [];
    return baseArticles
      .filter((art: Article) => {
        if (!regionFiltre || regionFiltre === "all") return true;
        const titre = (art.titre || "").toLowerCase();
        const desc = (art.description || "").toLowerCase();
        const recherche = regionFiltre.toLowerCase().trim();
        return titre.includes(recherche) || desc.includes(recherche);
      })
      .slice(0, 5);
  }, [dbArticles, regionFiltre]);

  useEffect(() => {
    fetch(`${API_URL}/radio/stations`)
      .then(res => res.json())
      .then((data: unknown) => { 
        const arrayData = data as BackendRadio[];
        if (arrayData && arrayData.length > 0) {
          const firstRadio = arrayData[0];
          setStationUnique({
            id: firstRadio.id || "default",
            nom: "HAI RADIO",
            frequence: "97.6 MHz",
            flux_url: firstRadio.currentTrack || "https://soundhelix.com"
          });
        }
      })
      .catch(() => {
        setStationUnique({ id: "default", nom: "HAI RADIO", frequence: "97.6 MHz", flux_url: "https://soundhelix.com" });
      });
  }, []);

  const changeTab = (tab: string) => {
    if (setActiveTab) {
      setActiveTab(tab);
    } else if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/${tab}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="w-full bg-slate-50 font-sans antialiased space-y-2 pb-0 pt-0 overflow-x-hidden text-black">
      
      {/* 1. LECTEUR LIVE */}
      <div className="w-full px-2 sm:px-4">
        <LecteurLive 
          stationNom={stationUnique?.nom || "HAI RADIO"}
          stationFrequence={stationUnique?.frequence || "97.6 MHz"}
        />
      </div>

      {/* 2. BLOC DES ACTUALITÉS */}
      <div className="w-full px-2 sm:px-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <header className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Newspaper className="h-4 w-4 text-black" />
            <h3 className="text-xs font-black text-black uppercase tracking-wider">
              Dernières Actualités
            </h3>
          </header>

          {loading && articlesAffiches.length === 0 ? (
            <p className="text-center py-4 text-xs text-slate-500 font-bold uppercase tracking-wider animate-pulse">
              Chargement...
            </p>
          ) : articlesAffiches.length === 0 ? (
            <p className="text-center py-4 text-xs text-slate-500 font-medium italic">
              Aucune actualité disponible.
            </p>
          ) : (
            <div className="space-y-3">
              <GrilleActualites articles={articlesAffiches} isAccueilView={true} searchTerm={regionFiltre === "all" ? "" : regionFiltre} />
              <div className="text-right pt-2 border-t border-slate-100">
                <a href="/actualites" onClick={(e) => { e.preventDefault(); changeTab('actualites'); }} className="inline-flex items-center gap-1 text-xs font-black text-cyan-600 hover:text-black uppercase tracking-wider transition-colors">
                  Voir toute l'actualité →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. SECTION LES VOIX DE L'ANTENNE */}
      <SectionAnimateurs apiUrl={API_URL} />

      {/* 4. SECTION DES COORDONNÉES COMPACTE */}
      <SectionContactAccueil apiUrl={API_URL} />

      {/* 5. NAVIGATION MOBILE */}
      <BottomNav activeTab={activeTab} changeTab={changeTab} />
    </div>
  );
}
