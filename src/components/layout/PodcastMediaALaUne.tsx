'use client';

import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { API_URL } from "../../config/api";

interface MediaALaUneProps {
  activeId: string | null;
  onTogglePlay: (id: string) => void;
}

interface PodcastBD {
  id: string;
  titre: string;
  audio_url: string;
  duree: string;
  thematique: string;
  ecoutes: number;
  created_at: string;
}

export default function PodcastMediaALaUne({ activeId, onTogglePlay }: MediaALaUneProps): React.JSX.Element {
  const [podcasts, setPodcasts] = useState<PodcastBD[]>([]);
  const [loading, setLoading] = useState(true);

  const palettesCouleurs = ["bg-[#0b1f3c]", "bg-[#084534]", "bg-[#2c134d]", "bg-[#112d4e]"];

  useEffect(() => {
    fetch(`${API_URL}/podcasts/top5`)
      .then((res) => {
        if (!res.ok) throw new Error('Endpoint top5 indisponible');
        return res.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setPodcasts(data.slice(0, 4));
        } else {
          setPodcasts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failsafe activé pour les podcasts à la une :", err);
        setPodcasts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Calcul des tendances...</div>;
  }

  if (!Array.isArray(podcasts) || podcasts.length === 0) {
    return <div className="text-center py-6 text-xs text-slate-400 font-medium uppercase italic">Aucun podcast populaire pour le moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-black">
      {podcasts.map((item, index) => {
        const estEnLecture = activeId === item.id;
        const couleurAssignee = palettesCouleurs[index % palettesCouleurs.length];
        const dateTexte = new Date(item.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

        return (
          <div key={item.id} className="space-y-3 text-left">
            <div 
              onClick={() => onTogglePlay(item.id)}
              className={`w-full aspect-[4/3] ${couleurAssignee} rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-sm transition-all hover:scale-[1.02] cursor-pointer group border ${estEnLecture ? 'border-[#0070CE] ring-2 ring-[#0070CE]/30' : 'border-transparent'}`}
            >
              <img 
                src="/radio_haj_micro_webp.webp" 
                alt={item.titre} 
                className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none z-0" 
              />
              
              <h4 className="text-xs font-black text-white tracking-wide uppercase leading-tight max-w-[80%] relative z-10">
                {item.titre}
              </h4>
              <div className="flex items-center justify-between mt-auto relative z-10">
                <span className="text-[9px] font-black text-white/90 bg-black/40 px-2 py-0.5 rounded">
                  {item.duree} min
                </span>
                <div className={`p-2 rounded-full shadow-md group-hover:scale-110 transition-transform flex items-center justify-center ${estEnLecture ? 'bg-[#0070CE] text-white' : 'bg-white text-slate-900'}`}>
                  {estEnLecture ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current ml-0.5" />}
                </div>
              </div>
            </div>
            <div className="space-y-0.5 px-1">
              <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-tight line-clamp-1">{item.titre}</h5>
              <p className="text-[10px] text-slate-400 font-medium leading-normal line-clamp-2">Contenu audio de la catégorie {item.thematique}. Émission disponible en réécoute gratuite.</p>
              <p className="text-[9px] font-bold text-slate-400/70 pt-0.5">{dateTexte} • {item.ecoutes} écoutes</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
