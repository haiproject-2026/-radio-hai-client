'use client';

import React from "react";
import { useApp } from "../../contexts/app";
import type { ElementMenu } from "../../contexts/app";
import { Trash2, Music, ExternalLink } from "lucide-react";

export default function Musique(): React.JSX.Element {
  const { musiques, supprimerElement } = useApp();

  if (musiques.length === 0) {
    return (
      <div className="w-full p-12 text-center border border-dashed border-gray-200 rounded-2xl bg-white max-w-4xl mx-auto">
        <p className="text-sm text-gray-400 font-medium italic">Aucun morceau répertorié.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-left box-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full box-border">
        {musiques.map((morceau: ElementMenu) => {
          const chaine = morceau.description || "";
          
          // Extraction sécurisée de l'artiste, du genre et du lien
          const artisteMatch = chaine.match(/Artiste:\s*(.*?)(?=\s*\||$)/);
          const genreMatch = chaine.match(/Genre:\s*(.*?)(?=\s*\||$)/);
          
          const artistePartie = artisteMatch ? artisteMatch[1] : "Artiste inconnu";
          const genrePartie = genreMatch ? genreMatch[1] : "Variété";
          const lienPartie = chaine.includes("LIEN:") ? chaine.split("LIEN:").at(1)?.trim() || "aucun" : "aucun";

          return (
            <div key={morceau.id} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-xs flex items-center justify-between gap-4 relative group w-full">
              <div className="flex items-start gap-4 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-[#ea7333]">
                  <Music className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{genrePartie}</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase truncate mt-1.5">{morceau.titre}</h3>
                  <p className="text-xs text-slate-500 font-bold truncate mt-0.5">{artistePartie}</p>
                </div>
              </div>
              
              {lienPartie !== "aucun" && lienPartie !== "" && (
                <a 
                  href={lienPartie} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-slate-50 border border-gray-100 rounded-xl text-slate-600 hover:text-[#ea7333] transition-colors shrink-0 flex items-center justify-center"
                  title="Écouter le morceau"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              
              <button 
                type="button" 
                onClick={() => supprimerElement("musiques", morceau.id)} 
                className="absolute top-3 right-3 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                title="Supprimer de la liste"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
