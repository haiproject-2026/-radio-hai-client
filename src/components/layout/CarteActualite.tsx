'use client';

import React from 'react';
import { Heart, MessageSquare, Calendar } from 'lucide-react';

export interface CarteActualiteProps {
  id: string;
  categorie: 'INFORMATION' | 'MUSIQUE' | 'CULTURE' | 'CITOYENNETÉ' | 'SPORTS' | 'MONDE'; // 💡 Ajout de 'MONDE' pour votre flux international
  titre: string;
  description: string;
  date: string;
  imageUrl?: string;
  isPlaceholder?: boolean;
  onAdorer?: (titre: string) => void;
  onCommenter?: (titre: string) => void;
}

export default function CarteActualite({
  categorie,
  titre,
  description,
  date,
  imageUrl,
  isPlaceholder = false,
  onAdorer,
  onCommenter
}: CarteActualiteProps): React.JSX.Element {
  return (
    <div className={`bg-white rounded-[24px] overflow-hidden border p-3.5 flex flex-col justify-between min-h-[350px] transition-all duration-300 hover:shadow-md group font-['Manrope',_sans-serif] ${
      isPlaceholder 
        ? 'border-dashed border-slate-300 bg-slate-50/50' 
        : 'border-slate-200'
    }`}>
      
      {/* Zone Image / Catégorie */}
      <div className="w-full relative aspect-[4/4] bg-slate-100 overflow-hidden rounded-[16px] mb-3.5 flex items-center justify-center border border-slate-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={titre}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full opacity-20 ${
            categorie === 'MUSIQUE' ? 'bg-purple-600' :
            categorie === 'CULTURE' ? 'bg-amber-600' :
            categorie === 'SPORTS' ? 'bg-emerald-600' :
            categorie === 'CITOYENNETÉ' ? 'bg-teal-600' : 'bg-blue-600'
          }`} />
        )}

        <span className="absolute top-2.5 left-2.5 bg-black text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs font-['Manrope',_sans-serif]">
          {categorie}
        </span>
      </div>

      {/* Contenu textuel structuré de façon sémantique et naturelle */}
      <div className="flex-1 flex flex-col justify-between space-y-3 font-['Manrope',_sans-serif]">
        <div className="space-y-1.5 font-['Manrope',_sans-serif]">
          
          {/* 💡 LE TITRE EST ADOSSÉ DANS UNE BALISE HEADER NATURELLE */}
          <header className="font-['Manrope',_sans-serif]">
            <h3 className="text-xs font-black uppercase tracking-wide line-clamp-2 leading-snug text-black">
              {titre}
            </h3>
          </header>

          {/* 💡 LA DESCRIPTION EST STRUCTURÉE DANS UN PARAGRAPHE P */}
          <p className="text-[10px] text-black font-semibold line-clamp-2 leading-relaxed font-['Manrope',_sans-serif]">
            {description}
          </p>

        </div>

        {/* Pied de Carte - Interactions fonctionnelles */}
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 text-black text-[9px] font-bold font-['Manrope',_sans-serif]">
          <div className="flex items-center gap-1.5 font-['Manrope',_sans-serif]">
            <Calendar className="h-3 w-3 text-black" />
            <span className="tracking-wide font-['Manrope',_sans-serif]">{date}</span>
          </div>
          
          <div className="flex items-center gap-2.5 text-black">
            {/* Bouton J'adore */}
            <button 
              onClick={() => onAdorer?.(titre)}
              className="hover:text-red-600 hover:scale-110 transition-all cursor-pointer p-0.5 flex items-center justify-center"
              title="Adorer cette actualité"
            >
              <Heart className="h-3.5 w-3.5 text-black hover:text-red-600" />
            </button>
            
            {/* Bouton Commenter */}
            <button 
              onClick={() => onCommenter?.(titre)}
              className="hover:text-[#1b75bc] hover:scale-110 transition-all cursor-pointer p-0.5 flex items-center justify-center"
              title="Laisser un commentaire"
            >
              <MessageSquare className="h-3.5 w-3.5 text-black hover:text-[#1b75bc]" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
