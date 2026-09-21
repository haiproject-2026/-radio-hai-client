'use client';

import React from 'react';

interface AnimateurInfo {
  id?: string | number;
  nom?: string;
  avatar?: string;
}

interface PodcastInfo {
  id: string | number;
  titre: string;
  audioUrl?: string;
}

interface Programme {
  id: string | number;
  nomEmission?: string;
  titre?: string;
  animateur?: AnimateurInfo | string;
  heureDebut?: string;
  heureFin?: string;
  horaire?: string;
  description?: string;
  jour?: string;
}

interface EmissionsProps {
  programmes?: Programme[];
  hosts?: AnimateurInfo[];
  podcasts?: PodcastInfo[];
}

export default function Emissions({ programmes = [] }: EmissionsProps): React.JSX.Element {
  
  // Transformation et nettoyage des données reçues du parent
  const donneesNettoyees = React.useMemo(() => {
    if (!Array.isArray(programmes)) return [];

    return programmes.map((prog: Programme, index: number) => {
      const hDebut = prog.heureDebut ? String(prog.heureDebut) : '';
      const hFin = prog.heureFin ? String(prog.heureFin) : '';
      const plageHoraire = hDebut && hFin ? `${hDebut} — ${hFin}` : (prog.horaire || 'Horaire non défini');

      // Récupération sécurisée du nom de l'animateur sans type any
      let animBrut = '';
      if (prog.animateur) {
        if (typeof prog.animateur === 'object' && prog.animateur !== null && 'nom' in prog.animateur) {
          animBrut = String(prog.animateur.nom || '');
        } else if (typeof prog.animateur === 'string') {
          animBrut = prog.animateur;
        }
      }
      
      const animValide = 
        animBrut.trim() === '' || 
        animBrut.toLowerCase() === 'animateur' || 
        animBrut.toLowerCase() === 'null'
          ? '' 
          : animBrut.trim();

      // Génération d'un ID de secours déterministe et pur (pas de Math.random)
      const fallbackId = `fallback-${index}-${prog.nomEmission || 'emission'}`;
      const idValide = prog.id !== undefined && prog.id !== null ? String(prog.id) : fallbackId;

      return {
        id: idValide,
        titre: String(prog.nomEmission || prog.titre || "Émission sans titre"),
        horaire: plageHoraire,
        description: String(prog.description || "Aucune description fournie."),
        animateur: animValide,
        jour: String(prog.jour || "")
      };
    });
  }, [programmes]);

  return (
    <div className="w-full text-left box-border font-['Manrope',_sans-serif] px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b border-gray-200 pb-4 mb-6">
        Grille des Émissions
      </h1>
      
      {donneesNettoyees.length === 0 ? (
        <div className="p-8 bg-white border border-slate-100 rounded-2xl text-slate-400 text-xs font-bold uppercase tracking-wider shadow-xs">
          📻 Aucune émission planifiée dans la grille pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donneesNettoyees.map((prog) => (
            <div key={prog.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    ⏱️ {prog.horaire}
                  </span>
                  {prog.jour && (
                    <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded-md uppercase">
                      {prog.jour}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">
                  {prog.titre}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>
              </div>
              
              {prog.animateur && (
                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2">
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-600 font-bold uppercase tracking-wider">
                    🎙️ {prog.animateur}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
