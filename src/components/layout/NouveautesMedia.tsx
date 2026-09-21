'use client';

import React from 'react';
import { Play, Music, Video, Star } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'music' | 'video';
  titre: string;
  artiste: string;
  illustration: string;
  badge: string;
  lien: string;
}

const MEDIAS_NOUVEAUTES: MediaItem[] = [
  { id: 'm1', type: 'music', titre: "Nouveau Hit 2026", artiste: "Artiste Haute Matsiatra", illustration: "https://unsplash.com", badge: "Exclusivité FM", lien: "#" },
  { id: 'v1', type: 'video', titre: "Clip Officiel - Live à Fianara", artiste: "Gasy Crew", illustration: "https://unsplash.com", badge: "Nouveau Clip", lien: "https://youtube.com" },
  { id: 'm2', type: 'music', titre: "Afro-Gasy Rythme", artiste: "Duo Balavao", illustration: "https://unsplash.com", badge: "Top 10", lien: "#" },
  { id: 'v2', type: 'video', titre: "Reportage Coulisses Studio", artiste: "Équipe Radio Hai", illustration: "https://unsplash.com", badge: "Vidéo Actu", lien: "https://youtube.com" }
];

export default function NouveautesMedia(): React.JSX.Element {
  return (
    <div className="space-y-4 mt-12 border-t border-gray-100 pt-8 font-['Manrope',_sans-serif] text-left">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-sm font-black text-[#165147] uppercase tracking-wider flex items-center gap-1.5">
          <Star className="h-4 w-4 text-orange-500 animate-spin [animation-duration:3s]" /> 
          Nouveautés Musiques & Vidéos
        </h3>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Le son de la nouvelle génération</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {MEDIAS_NOUVEAUTES.map((media) => (
          <div key={media.id} className="bg-gray-50 border border-gray-100/60 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
            
            {/* Zone visuelle */}
            <div className="h-32 w-full bg-gray-200 relative overflow-hidden">
              <img src={media.illustration} alt={media.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                {media.badge}
              </span>

              <span className="absolute top-2 right-2 bg-black/40 text-white p-1 rounded-full backdrop-blur-xs flex items-center justify-center">
                {media.type === 'music' ? <Music className="h-3 w-3" /> : <Video className="h-3 w-3" />}
              </span>

              {/* Bouton de lecture au survol */}
              <a href={media.lien} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="h-4 w-4 fill-orange-500 translate-x-0.5" />
                </div>
              </a>
            </div>

            {/* Légende */}
            <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h4 className="font-extrabold text-[11px] text-gray-800 uppercase tracking-wide leading-tight line-clamp-1">{media.titre}</h4>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5 capitalize">{media.artiste}</p>
              </div>
              <a href={media.lien} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-[#165147] hover:text-orange-500 uppercase tracking-wider block">
                {media.type === 'music' ? 'Écouter le titre →' : 'Regarder le clip →'}
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
