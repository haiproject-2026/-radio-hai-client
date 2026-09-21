"use client";

import React, { useEffect, useState } from "react";
import { Info, Tv, Trophy, Music, Moon, Radio } from "lucide-react";
import { useProgrammesAvenir } from "../../hooks/useProgrammesAvenir";
import type { ProgrammeType } from "../../hooks/useProgrammesAvenir";

interface BackendAnimateur {
  id: string | number;
  nom?: string;
  name?: string;
  role?: string;
  photo_url?: string;
  photoUrl?: string;
  photo?: string;
  avatar?: string;
}

// Interface explicitement nommée et exportée pour éviter les confusions avec RadioProps
export interface AvenirAujourdhuiProps {
  apiUrl: string;
}

interface ProgrammeEtendu extends ProgrammeType {
  id?: string | number; 
  animateur?: BackendAnimateur;
  photo_url?: string;
}

const COMPOSANTS_ICONESTYLE: Record<string, { icone: React.JSX.Element; couleur: string }> = {
  INFO: { icone: <Info className="h-4 w-4" />, couleur: "bg-cyan-950 text-cyan-400" },
  CULTURE: { icone: <Tv className="h-4 w-4" />, couleur: "bg-purple-950 text-purple-400" },
  SPORT: { icone: <Trophy className="h-4 w-4" />, couleur: "bg-emerald-950 text-emerald-400" },
  MUSIQUE: { icone: <Music className="h-4 w-4" />, couleur: "bg-amber-950 text-amber-400" },
  SOIR: { icone: <Moon className="h-4 w-4" />, couleur: "bg-slate-950 text-slate-400" },
  DEFAULT: { icone: <Radio className="h-4 w-4" />, couleur: "bg-slate-900 text-cyan-400" }
};

export default function AvenirAujourdhui({ apiUrl }: AvenirAujourdhuiProps): React.JSX.Element {
  const { programmesAvenir, loading: loadingProgrammes } = useProgrammesAvenir();
  const [animateurs, setAnimateurs] = useState<BackendAnimateur[]>([]);
  const [loadingAnimateurs, setLoadingAnimateurs] = useState<boolean>(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/animateurs`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setAnimateurs(data);
        }
        setLoadingAnimateurs(false);
      })
      .catch(() => {
        setAnimateurs([]);
        setLoadingAnimateurs(false);
      });
  }, [apiUrl]);

  const extraireVisuelEmission = (titre: string) => {
    const titreMaj = titre.toUpperCase();
    if (titreMaj.includes("INFO") || titreMaj.includes("JOURNAL") || titreMaj.includes("REVEIL")) return COMPOSANTS_ICONESTYLE.INFO;
    if (titreMaj.includes("CULTURE") || titreMaj.includes("VIBES")) return COMPOSANTS_ICONESTYLE.CULTURE;
    if (titreMaj.includes("SPORT")) return COMPOSANTS_ICONESTYLE.SPORT;
    if (titreMaj.includes("MUSIK") || titreMaj.includes("DRIVE") || titreMaj.includes("MUSIQUE")) return COMPOSANTS_ICONESTYLE.MUSIQUE;
    if (titreMaj.includes("SOIR") || titreMaj.includes("NUIT") || titreMaj.includes("DETENTE")) return COMPOSANTS_ICONESTYLE.SOIR;
    return COMPOSANTS_ICONESTYLE.DEFAULT;
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const isLoading = loadingProgrammes || loadingAnimateurs;

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-left h-full flex flex-col font-['Manrope',_sans-serif] text-black">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 shrink-0">
        <h3 className="text-xs font-black text-black uppercase tracking-wider">
          À VENIR AUJOURD'HUI 🕒
        </h3>
        <span className="text-[9px] bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-extrabold uppercase tracking-wide border border-slate-200">
          {programmesAvenir.length} {programmesAvenir.length > 1 ? "Émissions" : "Émission"}
        </span>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8 text-[10px] text-slate-500 font-bold uppercase tracking-wider animate-pulse flex-1 flex items-center justify-center">
          Synchronisation avec la grille des émissions...
        </div>
      ) : programmesAvenir.length === 0 ? (
        <div className="text-center py-8 text-[10px] text-slate-400 font-bold uppercase tracking-wider flex-1 flex items-center justify-center italic">
          Aucun programme enregistré pour aujourd'hui.
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">
          {(programmesAvenir as ProgrammeEtendu[]).map((p: ProgrammeEtendu, idx: number) => {
            const nomEmission = p.titre || "Émission";
            const visuel = extraireVisuelEmission(nomEmission);
            const uniqueId = String(p.id || idx);
            
            let animateurAssocie = p.animateur;

            if (!animateurAssocie) {
              animateurAssocie = animateurs.find(anim => {
                const nomAnim = (anim.nom ?? anim.name ?? "").toUpperCase();
                const descProg = (p.desc || "").toUpperCase();
                const titreProg = nomEmission.toUpperCase();
                return nomAnim !== "" && (descProg.includes(nomAnim) || titreProg.includes(nomAnim));
              });
            }

            const brutePhoto = p.imageUrl || 
              p.photo_url ||
              animateurAssocie?.photo_url || 
              animateurAssocie?.photoUrl || 
              animateurAssocie?.photo || 
              "";

            const baseServerUrl = apiUrl ? apiUrl.replace('/api', '') : '';
            const fileRaw = typeof brutePhoto === 'string' ? brutePhoto.trim() : '';

            let completePhotoUrl = '';
            if (fileRaw) {
              if (fileRaw.startsWith('http')) {
                completePhotoUrl = fileRaw;
              } else {
                const segments = fileRaw.split('/');
                const fileName = segments[segments.length - 1];
                completePhotoUrl = `${baseServerUrl}/uploads/animateurs/${fileName}`;
              }
            }

            const hasError = imageErrors[uniqueId];

            return (
              <div key={uniqueId} className="flex items-center gap-4 group cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                
                <span className="text-[11px] font-black text-black w-14 shrink-0 whitespace-nowrap">
                  {p.heure}
                </span>

                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex items-center justify-center shrink-0 group-hover:border-cyan-500 transition-colors relative">
                  {completePhotoUrl && !hasError ? (
                    <img 
                      src={completePhotoUrl} 
                      alt={nomEmission} 
                      className="w-full h-full object-cover z-10 relative"
                      onError={() => handleImageError(uniqueId)}
                    />
                  ) : (
                    <div className={`absolute inset-0 rounded-xl ${visuel.couleur} border border-current/10 flex items-center justify-center`}>
                      {visuel.icone}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-black text-black leading-tight group-hover:text-cyan-600 transition-colors truncate uppercase tracking-wide">
                    {nomEmission}
                  </h4>
                  <p className="text-[10px] font-extrabold text-slate-400 mt-0.5 truncate uppercase tracking-wider">
                    {p.desc}
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
