'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Play } from 'lucide-react';

interface PodcastPopulaire {
  id: string | number;
  titre: string;
  thematique: string;
  duree: string;
}

export function PodcastsPopulaires(): React.JSX.Element {
  const [podcasts, setPodcasts] = useState<PodcastPopulaire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const palettesCouleurs = ["bg-[#0b1f3c]", "bg-[#084534]", "bg-[#2c134d]", "bg-[#112d4e]"];

  useEffect(() => {
    fetch('http://localhost:5000/api/podcasts')
      .then((res) => {
        if (!res.ok) throw new Error('Impossible de charger les tendances');
        return res.json();
      })
      .then((data: unknown) => {
        const liste = Array.isArray(data) ? (data.slice(0, 4) as PodcastPopulaire[]) : [];
        setPodcasts(liste);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error('Erreur populaires:', err);
        setPodcasts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-slate-400 p-4 text-xs text-left animate-pulse">Calcul des tendances...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full box-border text-left">
      {podcasts.length === 0 ? (
        <div className="col-span-full text-slate-400 p-4 text-xs italic bg-white border border-slate-100 rounded-xl">
          Aucun podcast disponible pour le moment.
        </div>
      ) : (
        podcasts.map((podcast, index) => {
          const couleurAssignee = palettesCouleurs[index % palettesCouleurs.length];

          return (
            <div 
              key={podcast.id} 
              className={`text-white p-5 rounded-2xl shadow-md flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer border border-transparent hover:scale-[1.02] transition-all ${couleurAssignee}`}
            >
              {/* 🌟 APPLICATION DU NOUVEAU LOGO EN ARRIÈRE PLAN MIX BLEND */}
              <img 
                src="/logo-radio-hai.webp" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none z-0" 
              />

              <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400 mb-1 truncate">
                  {podcast.thematique || "PODCAST"}
                </div>
                <h3 className="text-xs font-black uppercase tracking-wide leading-snug line-clamp-2">
                  {podcast.titre}
                </h3>
              </div>

              <div className="flex justify-between items-center mt-4 relative z-10">
                <span className="text-[9px] font-black bg-black/40 px-2 py-0.5 rounded text-white/90">
                  {podcast.duree} min
                </span>
                
                <div className="bg-white text-slate-900 rounded-full w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Play size={11} className="fill-current text-slate-900 ml-0.5" />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
