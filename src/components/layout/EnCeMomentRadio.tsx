'use client';

import React, { useEffect, useState } from "react";
import { X, Clock, Radio, CloudSun, MapPin } from "lucide-react";
import { API_URL } from "../../config/api";
import { useWidgetInfos } from "../../hooks/useWidgetInfos";

interface ProgrammeType {
  id: string;
  title: string;
  days?: string[];
  day?: string;
  hours: string;
  host?: string;
  imageUrl?: string;
}

interface ProgrammeBD {
  id: string;
  titre: string;
  jours: string[];
  horaire: string;
  animateur: string;
  image_url?: string;
}

export default function EnCeMomentRadio(): React.JSX.Element {
  const [emissionDirect, setEmissionDirect] = useState<ProgrammeType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { heureAffichee, dateAffichee, meteo } = useWidgetInfos();

  useEffect(() => {
    fetch(`${API_URL}/programmes`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur serveur : Statut ${res.status}`);
        return res.json();
      })
      .then((data: ProgrammeBD[]) => {
        if (!Array.isArray(data)) throw new TypeError("Données invalides.");

        const maintenant = new Date();
        const joursFr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const jourActuel = joursFr[maintenant.getDay()].toLowerCase();
        const tempsEnMinutes = maintenant.getHours() * 60 + maintenant.getMinutes();

        const emissionTrouvee = data.find((p) => {
          const tabJours = p.jours ? p.jours.map(j => j.toLowerCase().trim()) : [];
          const correspondAuJour = tabJours.includes(jourActuel) || 
                                   tabJours.some(j => j.includes("tous les jours") || j.includes("touslesjours"));
          
          if (!correspondAuJour || !p.horaire) return false;
          
          const partiesHeures = p.horaire.replace(/h/gi, ":").split(/[-–—]/);
          if (partiesHeures.length !== 2) return false;

          const [hDebut, mDebut] = partiesHeures[0].trim().split(":").map(Number);
          const [hFin, mFin] = partiesHeures[1].trim().split(":").map(Number);

          return tempsEnMinutes >= (hDebut * 60 + (mDebut || 0)) && tempsEnMinutes < (hFin * 60 + (mFin || 0));
        });

        if (emissionTrouvee) {
          // Extraction et nettoyage propre pour forcer la route statique vers le serveur local
          const baseServerUrl = API_URL.replace('/api', '');
          let fileRaw = (emissionTrouvee.image_url || '').trim();

          if (fileRaw.startsWith('http')) {
            const segs = fileRaw.split('/');
            fileRaw = segs[segs.length - 1];
          }
          fileRaw = fileRaw.replace(/^\/?(uploads\/)?(animateurs\/)?(programmes\/)?/, '');

          // Si le fichier existe, on le sert depuis le sous-dossier, sinon fallback
          const localPhotoUrl = fileRaw 
            ? `${baseServerUrl}/uploads/animateurs/${fileRaw}` 
            : "/radio_haj_micro_webp.webp";

          setEmissionDirect({
            id: emissionTrouvee.id,
            title: emissionTrouvee.titre,
            hours: emissionTrouvee.horaire,
            host: emissionTrouvee.animateur,
            imageUrl: localPhotoUrl
          });
        } else {
          setEmissionDirect(null); 
        }
      })
      .catch((err) => {
        console.error("Erreur direct :", err);
        setEmissionDirect(null); 
      });
  }, []);

  const directActuel = emissionDirect || {
    id: "direct-default",
    title: "RADIO HAI EN DIRECT",
    hours: "24H / 24",
    host: "RÉDACTION RADIO HAI",
    imageUrl: "/radio_haj_micro_webp.webp"
  };

  const texteDescriptionLong = "Suivez votre émission d'information et d'opinions sur les sujets d'actualité en direct sur les ondes de Radio Hai. Retrouvez des débats passionnants, des invités exclusifs, des analyses approfondies sur la culture locale, la musique et les questions citoyennes.";

  return (
    <div className="h-full w-full flex flex-col gap-4 font-['Manrope',_sans-serif]">
      
      {/* WIDGETS : HEURE & MÉTÉO */}
      <div className="w-full bg-[#05192c]/40 border border-slate-800/60 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 text-xs text-white">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-cyan-400 animate-pulse" />
          <div>
            <span className="font-black tracking-wide text-sm">{heureAffichee || "--:--:--"}</span>
            <span className="text-[10px] text-slate-400 ml-2 capitalize font-medium">{dateAffichee}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/40 px-3 py-1.5 rounded-xl border border-white/5">
          <CloudSun className="h-4 w-4 text-amber-400" />
          <div className="text-left">
            <div className="flex items-center gap-1 font-bold text-slate-200">
              <span>{meteo.temp}°C</span>
              <span className="text-[10px] text-slate-400 font-medium">({meteo.condition})</span>
            </div>
            <span className="text-[9px] text-slate-500 flex items-center gap-0.5"><MapPin className="h-2 w-2" /> {meteo.ville}</span>
          </div>
        </div>
      </div>

      {/* BLOC ÉMISSION */}
      <div className="bg-[#05192c] text-white p-6 rounded-3xl shadow-sm relative overflow-hidden h-full flex flex-col md:flex-row items-center gap-6 text-left select-none antialiased">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.15)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="w-full md:w-[35%] aspect-video md:aspect-square bg-slate-950 rounded-2xl overflow-hidden shrink-0 relative border border-slate-800/80 shadow-inner">
          <img 
            src={directActuel.imageUrl} 
            alt={directActuel.title} 
            className="w-full h-full object-cover opacity-90" 
          />
        </div>

        <div className="flex-1 space-y-3 relative z-10 w-full">
          <div className="inline-flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest animate-pulse">
            <span className="w-1 h-1 rounded-full bg-white" /> En direct
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight line-clamp-1">{directActuel.title}</h3>
            <p className="text-[11px] font-bold text-cyan-300 mt-0.5 uppercase tracking-wide">
              {directActuel.hours} &bull; Animé par {directActuel.host}
            </p>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 font-medium">
            {texteDescriptionLong}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="text-[10px] font-black uppercase tracking-wider text-white border-b-2 border-white pb-0.5 hover:text-cyan-400 hover:border-cyan-400 transition-colors pt-2 cursor-pointer block bg-transparent border-t-0 border-x-0"
          >
            En savoir plus &rarr;
          </button>
        </div>
      </div>

      {/* POP-UP MODALE : CORRIGÉE ET REFERMÉE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs text-black">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative z-10 shadow-2xl border border-slate-200 flex flex-col gap-4 overflow-hidden">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              type="button"
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border-0"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl border border-red-100">
                <Radio className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-black tracking-widest text-red-600 uppercase block">À l'antenne maintenant</span>
                <h4 className="text-base font-black text-black uppercase tracking-tight">{directActuel.title}</h4>
              </div>
            </div>

            <div className="space-y-2 text-xs font-medium text-slate-700 leading-relaxed">
              <p><span className="font-bold text-black">Horaire :</span> {directActuel.hours}</p>
              <p><span className="font-bold text-black">Animateur :</span> {directActuel.host}</p>
              <p className="border-t border-slate-100 pt-2 text-slate-600 font-normal">{texteDescriptionLong}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
