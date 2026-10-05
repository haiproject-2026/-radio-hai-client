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
          // ZÉRO FILTRE : On prend absolument TOUT ce que la base de données renvoie
          const formates: AnimateurBD[] = rawAnimateurs.map((item) => ({
            id: String(item.id),
            nom: item.nom ?? item.name ?? "Membre",
            role: item.role ?? item.specialite ?? "Antenne",
            photo_url: item.photo_url ?? item.photoUrl ?? item.photo ?? item.avatar ?? ""
          }));

          setAnimateurs(formates);
        }
        setLoading(false);
      })
      .catch(() => {
        setAnimateurs([]);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-left h-full flex flex-col font-sans text-black">
      
      <header className="flex items-center gap-2 border-b border-slate-100 pb-2 shrink-0">
        <Users className="h-4 w-4 text-black" />
        <h3 className="text-xs font-black text-black uppercase tracking-wider">
          Les Voix de l'Antenne ({animateurs.length})
        </h3>
      </header>

      {loading ? (
        <p className="text-center py-6 text-xs text-slate-500 font-bold uppercase tracking-wider animate-pulse flex-1 flex items-center justify-center">
          Chargement...
        </p>
      ) : animateurs.length === 0 ? (
        <p className="text-center py-6 text-xs text-slate-400 font-medium italic flex-1 flex items-center justify-center">
          Aucun animateur disponible.
        </p>
      ) : (
        /* Le conteneur possède "overflow-y-auto" pour pouvoir faire défiler une longue liste infinie d'animateurs */
        <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar max-h-[400px]">
          {animateurs.map((animateur) => {
            const baseServerUrl = apiUrl.replace('/api', '');
            const fileRaw = animateur.photo_url.trim();
            
            const localPhotoUrl = fileRaw.startsWith('http')
              ? fileRaw
              : fileRaw !== ""
                ? `${baseServerUrl}/uploads/animateurs/${fileRaw}`
                : `https://ui-avatars.com{encodeURIComponent(animateur.nom)}&background=E0F2FE&color=0369A1&bold=true`;

            return (
              <div 
                key={animateur.id} 
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-row items-center gap-4 relative w-full min-w-0 group cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <span className="absolute top-3 right-3 text-[8px] bg-cyan-50/60 text-cyan-700 border border-cyan-100 font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                  Fianarantsoa
                </span>

                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 relative group-hover:border-cyan-500 transition-all">
                  <img
                    src={localPhotoUrl}
                    alt={animateur.nom}
                    className="w-full h-full object-cover z-10" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com{encodeURIComponent(animateur.nom)}&background=E0F2FE&color=0369A1&bold=true`;
                    }}
                  />
                </div>
                
                <div className="min-w-0 flex-1 pr-16">
                  <h4 className="text-xs font-black text-black uppercase tracking-wide truncate group-hover:text-cyan-600 transition-colors">
                    {animateur.nom}
                  </h4>
                  <p className="text-[9px] font-extrabold text-cyan-600 uppercase tracking-wider truncate mt-0.5">
                    {animateur.role}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
