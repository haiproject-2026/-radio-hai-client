'use client';

import { plateformes } from "../../data/plateformesData"; // Ajustez le chemin selon votre dossier data

export default function EcoutezPartoutRadio(): React.JSX.Element {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left select-none antialiased font-['Manrope',_sans-serif]">
      <h3 className="text-xs font-black text-[#05192c] uppercase tracking-wider border-b border-slate-100 pb-3">
        ÉCOUTEZ-NOUS PARTOUT
      </h3>
      <p className="text-[10px] font-bold text-slate-400 tracking-tight leading-tight -mt-1 uppercase">
        Disponible sur toutes vos plateformes préférées.
      </p>
      
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 pt-2">
        {plateformes.map((p, idx) => (
          <a
            key={idx}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Écouter sur ${p.label}`}
            className="flex flex-col items-center text-center space-y-1.5 cursor-pointer group no-underline"
          >
            {/* Conteneur d'icône interactif avec effet d'inversion de couleur au survol */}
            <div className="w-8 h-8 bg-slate-50 group-hover:bg-slate-900 border border-slate-100 group-hover:border-slate-900 rounded-xl flex items-center justify-center shadow-inner transition-all duration-200 group-hover:shadow-md">
              {p.icone}
            </div>
            
            {/* Libellé de la plateforme */}
            <span className="text-[9px] font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-tight transition-colors truncate w-full px-1">
              {p.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
