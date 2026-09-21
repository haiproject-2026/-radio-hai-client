'use client';

import React from 'react';

interface AnimateurProps {
  nom: string;
  emission: string;
  region: "fianarantsoa" | "ambalavao";
  bio: string;
  avatarUrl: string;
}

export default function CarteAnimateur({ nom, emission, region, bio, avatarUrl }: AnimateurProps): React.JSX.Element {
  const isFianar = region === "fianarantsoa";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left group font-['Manrope',_sans-serif] text-black">
      <div>
        <div className="flex justify-between items-start mb-3">
          
          {/* CORRECTIF : Rendu direct et obligatoire de l'image sans bascule sur initiales textuelles */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm relative bg-slate-50 flex items-center justify-center transition-colors group-hover:border-cyan-500">
            <img 
              src={avatarUrl} 
              alt={nom} 
              className="w-full h-full object-cover transition-all scale-100 group-hover:scale-105"
            />
          </div>

          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border tracking-wider select-none ${
            isFianar ? "bg-cyan-50 text-cyan-700 border-cyan-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            {region}
          </span>
        </div>
        
        {/* Typographies sombres et contrastées pour éliminer la fatigue oculaire */}
        <h4 className="font-black text-sm text-black normal-case mb-1">
          {nom}
        </h4>
        
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 mb-3 select-none">
          {emission}
        </p>
        
        <p className="text-xs text-slate-800 font-normal leading-relaxed normal-case line-clamp-4">
          {bio}
        </p>
      </div>
    </div>
  );
}
