'use client';

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface EmissionBD { 
  id: string | number; 
  titre: string; 
  created_at?: string; 
  date?: string; 
  temps?: string; 
  duree?: string;
}

export default function NosDernieresEmissions(): React.JSX.Element {
  const [emissions, setEmissions] = useState<EmissionBD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Connexion sur la route de l'API NestJS (Port 5000)
    fetch("http://localhost:5000/api/programmes")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de récupération");
        return res.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filtrage et mapping des clés brutes de la base de données PostgreSQL
          const emissionsNettoyees = data.slice(0, 3).map((em: Record<string, unknown>) => ({
            id: String(em.id ?? ''),
            titre: String(em.titre ?? em.title ?? ''),
            date: em.created_at 
              ? new Date(String(em.created_at)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) 
              : "Récemment",
            temps: String(em.duree ?? em.temps ?? "00:00") // Récupère le minutage précis configuré par l'admin
          }));
          setEmissions(emissionsNettoyees);
        } else {
          // 🟢 CORRECTIF : Par défaut, si l'admin n'a rien ajouté, la liste reste vide (0 émission de secours)
          setEmissions([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de récupération des dernières émissions :", err);
        setEmissions([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-left text-xs font-bold text-slate-500 animate-pulse uppercase tracking-wider font-['Manrope',_sans-serif]">
        Chargement des émissions d'antenne...
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left box-border w-full font-['Manrope',_sans-serif] text-black">
      
      {/* En-tête de section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h3 className="text-sm font-black text-black uppercase tracking-wide">
          NOS DERNIÈRES ÉMISSIONS
        </h3>
        {emissions.length > 0 && (
          <button className="text-xs font-black text-cyan-600 hover:text-black uppercase tracking-wider cursor-pointer border-0 bg-transparent">
            Voir tout
          </button>
        )}
      </div>

      {/* Rendu des cartes ou message par défaut */}
      {emissions.length === 0 ? (
        <div className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-wider italic">
          Aucune émission récente enregistrée dans l'administration.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative box-border">
          {emissions.map((em) => (
            <div key={em.id} className="space-y-2 cursor-pointer group">
              
              {/* Conteneur Image à aspect ratio fixe */}
              <div className="w-full aspect-[16/10] bg-slate-950 rounded-2xl relative overflow-hidden border border-slate-200 shadow-xs transition-transform group-hover:scale-[1.02]">
                <img 
                  src="/radio_haj_micro_webp.webp" 
                  alt={em.titre} 
                  className="absolute inset-0 w-full h-full object-cover opacity-35 transition-opacity" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* 🟢 Affichage dynamique du minutage de l'admin */}
                <span className="absolute bottom-2 right-2 bg-black/70 text-white font-black text-[9px] px-2 py-0.5 rounded tracking-wide">
                  {em.temps}
                </span>
              </div>
              
              {/* Informations textuelles */}
              <div className="px-1">
                <h4 className="text-xs font-black text-black uppercase group-hover:text-cyan-600 transition-colors truncate">
                  {em.titre}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                  {em.date}
                </p>
              </div>

            </div>
          ))}
          
          {emissions.length >= 3 && (
            <button className="absolute -right-4 top-[35%] -translate-y-1/2 bg-white border border-slate-200 p-2 rounded-full shadow-md text-slate-600 hover:bg-slate-50 hidden xl:flex z-10 active:scale-90 transition-transform cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
