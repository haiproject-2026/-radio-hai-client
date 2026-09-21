'use client';

import { useState } from 'react';

interface LecteurPrincipalProps {
  titreEmission?: string;
  horaireEmission?: string;
  descriptionEmission?: string;
}

export default function LecteurPrincipal({
  titreEmission = "Émission Live",
  horaireEmission = "En direct",
  descriptionEmission = "Votre radio préférée à Fianarantsoa"
}: LecteurPrincipalProps) {
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className="w-full bg-slate-100 border border-slate-200 text-black p-6 rounded-xl font-['Manrope',_sans-serif] shadow-sm my-4">
      {/* En-tête de l'émission actuelle */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <p className="text-xs font-bold tracking-wider uppercase text-cyan-600">
            {horaireEmission}
          </p>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-1">
          {titreEmission}
        </h2>
        <p className="text-sm text-slate-800 leading-relaxed">
          {descriptionEmission}
        </p>
      </div>

      {/* Contrôles du Lecteur Audio Principal */}
      <div className="bg-white border border-slate-200 p-4 rounded-lg flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Flux Radio
          </span>
          <span className="text-sm font-bold text-slate-900">
            Hai Radio - Live
          </span>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg shadow transition-all active:scale-95 text-sm"
        >
          {isPlaying ? 'Pause' : 'Écouter Direct'}
        </button>
      </div>
    </div>
  );
}
