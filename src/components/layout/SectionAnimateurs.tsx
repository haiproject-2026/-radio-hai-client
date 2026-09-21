'use client';

import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface AnimateurBD { 
  id: string; 
  nom: string; 
  role: string; 
  photo_url: string; 
}

interface BackendAnimateur {
  id: string | number;
  nom?: string;
  name?: string;
  role?: string;
  specialite?: string;
  photo_url?: string;
  photoUrl?: string;
  photo?: string;
  avatar?: string;
}

interface SectionAnimateursProps {
  apiUrl: string;
}

export default function SectionAnimateurs({ apiUrl }: SectionAnimateursProps): React.JSX.Element {
  const [animateurs, setAnimateurs] = useState<AnimateurBD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${apiUrl}/animateurs`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then((data: unknown) => {
        const rawAnimateurs = data as BackendAnimateur[];
        if (Array.isArray(rawAnimateurs)) {
          const formates: AnimateurBD[] = rawAnimateurs.map((item) => ({
            id: String(item.id),
            nom: item.nom ?? item.name ?? "Membre",
            role: item.role ?? item.specialite ?? "Antenne",
            photo_url: item.photo_url ?? item.photoUrl ?? item.photo ?? item.avatar ?? ""
          }));

          // On filtre pour ne garder que les animateurs avec une vraie photo (longueur de chaîne valide)
          const avecPhotoUniquement = formates.filter((anim) => {
            const raw = anim.photo_url.trim();
            return raw !== "" && raw.length > 2;
          });

          setAnimateurs(avecPhotoUniquement);
        }
        setLoading(false);
      })
      .catch(() => {
        setAnimateurs([]);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="w-full px-2 sm:px-4 pb-0 pt-0 font-sans text-black">
      <div className="bg-slate-50/40 p-4 sm:p-5 rounded-3xl border border-slate-200/60 space-y-4">
        
        <header className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Users className="h-4 w-4 text-black" />
          <h3 className="text-xs font-black text-black uppercase tracking-wider">
            Les Voix de l'Antenne
          </h3>
        </header>

        {loading ? (
          <p className="text-center py-6 text-xs text-slate-500 font-bold uppercase tracking-wider animate-pulse">
            Chargement...
          </p>
        ) : animateurs.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-500 font-medium italic">
            Aucun animateur avec photo disponible.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {animateurs.map((animateur) => {
              const baseServerUrl = apiUrl.replace('/api', '');
              let fileRaw = animateur.photo_url.trim();

              if (fileRaw.startsWith('http')) {
                const segs = fileRaw.split('/');
                fileRaw = segs[segs.length - 1];
              }
              
              fileRaw = fileRaw.replace(/^\/?(uploads\/)?(animateurs\/)?/, '');

              if (fileRaw && !fileRaw.includes('.')) {
                fileRaw = `${fileRaw}.jpg`;
              }

              const localPhotoUrl = `${baseServerUrl}/uploads/animateurs/${fileRaw}`;

              return (
                <div 
                  key={animateur.id} 
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between items-start relative h-[140px] w-full min-w-0 group cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="absolute top-4 right-4 text-[8px] bg-cyan-50/60 text-cyan-700 border border-cyan-100 font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                    Fianarantsoa
                  </span>

                  <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 relative group-hover:border-cyan-500 transition-all">
                    <img
                      src={localPhotoUrl}
                      alt={animateur.nom}
                      className="w-full h-full object-cover z-10 relative" 
                    />
                  </div>
                  
                  <div className="w-full min-w-0 mt-2">
                    <h4 className="text-xs font-black text-black uppercase tracking-wide truncate group-hover:text-cyan-600 transition-colors">
                      {animateur.nom}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] font-extrabold text-cyan-600 uppercase tracking-wider truncate w-full mt-0.5">
                      {animateur.role}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
