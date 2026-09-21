'use client';

import React, { useEffect, useState } from "react";
import { ChevronRight, Pause } from "lucide-react";
import { API_URL } from "../../config/api";

interface SidebarProps {
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

export default function PodcastSidebar({ activeId, onTogglePlay }: SidebarProps): React.JSX.Element {
  const [topPodcasts, setTopPodcasts] = useState<PodcastBD[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement sécurisé du Top 5 depuis PostgreSQL via NestJS
  useEffect(() => {
    fetch(`${API_URL}/podcasts/top5`)
      .then((res) => {
        if (!res.ok) throw new Error('Endpoint top5 indisponible ou introuvable');
        return res.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setTopPodcasts(data);
        } else {
          setTopPodcasts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failsafe activé pour le top5 podcasts :", err);
        setTopPodcasts([]); 
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-[#05192c] uppercase tracking-wider border-b border-slate-100 pb-3">
          LES PLUS ÉCOUTÉS 🔥
        </h3>
        
        {loading ? (
          <div className="text-center py-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider animate-pulse">
            Calcul du Top...
          </div>
        ) : !Array.isArray(topPodcasts) || topPodcasts.length === 0 ? (
          <div className="text-center py-6 text-[10px] text-slate-400 font-medium uppercase italic">
            Aucune donnée d'écoute disponible.
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {topPodcasts.map((item, index) => {
              const estEnLecture = activeId === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => onTogglePlay(item.id)}
                  className={`flex items-center justify-between py-3 group cursor-pointer rounded-xl px-1.5 transition-colors ${estEnLecture ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg font-black text-[10px] flex items-center justify-center shrink-0 transition-colors ${estEnLecture ? 'bg-[#0070CE] text-white' : 'bg-[#05192c] text-white'}`}>
                      {estEnLecture ? <Pause className="h-3 w-3" /> : index + 1}
                    </div>
                    <div>
                      <h4 className={`text-xs font-black transition-colors leading-tight ${estEnLecture ? 'text-[#0070CE]' : 'text-slate-800 group-hover:text-[#0070CE]'}`}>
                        {item.titre}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                        {item.ecoutes} écoutes • {item.duree}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`h-3 w-3 transition-colors ${estEnLecture ? 'text-[#0070CE]' : 'text-slate-300 group-hover:text-slate-500'}`} />
                </div>
              );
            })}
          </div>
        )}
        
        {/* ❌ LE BOUTON OBSOLÈTE "VOIR TOUS LES PODCASTS" A ÉTÉ ENTIÈREMENT SUPPRIMÉ ICI ❌ */}
      </div>

      {/* ENCART COMPATIBILITÉ DE L'APPLICATION MOBILE */}
      <div className="bg-[#05192c] text-white p-6 rounded-3xl relative overflow-hidden shadow-md flex flex-col justify-between min-h-[180px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(13,68,105,0.6)_0%,_transparent_70%)] pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h4 className="text-xs font-black tracking-wider uppercase text-white/90">ÉCOUTEZ HAI RADIO</h4>
          <h3 className="text-sm font-black tracking-tight uppercase leading-snug text-white">PARTOUT, TOUT LE TEMPS !</h3>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[80%] pt-1">
            Disponible sur toutes vos plateformes préférées.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-4 relative z-10 text-[9px] font-bold text-slate-300">
          <div className="border border-slate-800 px-2 py-1 rounded-md bg-black/20"><span>Spotify</span></div>
          <div className="border border-slate-800 px-2 py-1 rounded-md bg-black/20"><span>Apple</span></div>
          <div className="border border-slate-800 px-2 py-1 rounded-md bg-black/20"><span>Google</span></div>
        </div>
      </div>
    </div>
  );
}
