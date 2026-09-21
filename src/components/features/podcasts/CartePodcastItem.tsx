'use client';

import React from "react";
import { Play, Pause } from "lucide-react";

export interface ElementPodcast {
  id: string;
  titre: string;
  description: string;
  date: string;
  duree: string;
  ecoutes: string;
  image: string;
  categorie: string;
  audioUrl: string;
}

interface CartePodcastItemProps {
  pod: ElementPodcast;
  activePodcastId: string | null;
  onTogglePlay: (id: string) => void;
}

export default function CartePodcastItem({ pod, activePodcastId, onTogglePlay }: CartePodcastItemProps): React.JSX.Element {
  const estEnLecture = activePodcastId === pod.id;

  return (
    <div 
      onClick={() => onTogglePlay(pod.id)}
      className={`p-4 bg-white rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer group ${
        estEnLecture ? 'border-[#0070CE] bg-slate-50/50 shadow-xs' : 'border-slate-200/60 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 relative flex items-center justify-center">
          {/* 🌟 APPLICATION DU NOUVEAU LOGO WEB P */}
          <img 
            src={pod.image || "/logo-radio-hai.webp"} 
            alt={pod.titre} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="min-w-0 flex-1 space-y-0.5">
          <span className="text-[8px] bg-cyan-50 text-cyan-700 border border-cyan-100 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
            {pod.categorie}
          </span>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide truncate group-hover:text-[#0070CE] transition-colors pt-1">
            {pod.titre}
          </h4>
          <p className="text-[10px] text-slate-400 font-medium line-clamp-1">
            {pod.description}
          </p>
          <p className="text-[9px] font-bold text-slate-400/80 uppercase tracking-wider pt-0.5">
            {pod.date} • {pod.duree} min • {pod.ecoutes}
          </p>
        </div>
      </div>

      <button
        type="button"
        className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 transition-all ${
          estEnLecture 
            ? 'bg-[#0070CE] border-cyan-600 text-white scale-105' 
            : 'bg-slate-50 border-slate-200 text-slate-700 group-hover:bg-[#0070CE] group-hover:border-cyan-600 group-hover:text-white'
        }`}
      >
        {estEnLecture ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
      </button>
    </div>
  );
}
