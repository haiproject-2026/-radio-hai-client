'use client';

import { useRef } from "react";
import type { JSX, ComponentType } from "react"; 

import LecteurPrincipal from "./LecteurPrincipal";
import EnCeMomentRadio from "./EnCeMomentRadio"; 
import AvenirAujourdhui from "./AvenirAujourdhui";
import NosDernieresEmissions from "./NosDernieresEmissions";
import EcoutezPartoutRadio from "./EcoutezPartoutRadio";
import ReseauxSociauxContact from "./ReseauxSociauxContact"; 
import { API_URL } from "../../config/api"; 

// Configuration des types propres pour TypeScript
const AvenirAujourdhuiComponent = AvenirAujourdhui as unknown as ComponentType<{ apiUrl: string }>;
const EnCeMomentRadioComponent = EnCeMomentRadio as unknown as ComponentType<{ programmes?: unknown[] }>;

interface RadioProps {
  programmes?: unknown[];
}

export default function Radio({ programmes = [] }: RadioProps): JSX.Element {
  const programmeRef = useRef<HTMLElement>(null);

  const executerScroll = () => {
    if (programmeRef.current) {
      programmeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full font-['Manrope',_sans-serif] space-y-8 select-none antialiased pb-20 text-left text-black bg-slate-50/50 p-4 rounded-3xl">
      
      {/* 1. LECTEUR LIVE AUDIO PRINCIPAL (Bouton d'écoute tout en haut de la page) */}
      <div className="w-full">
        <LecteurPrincipal />
      </div>

      {/* 2. GRILLE CENTRALE DES PROGRAMMES ET DES INFOS */}
      <section ref={programmeRef} id="section-programmes-grille" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10 w-full">
        
        {/* Colonne de Gauche (8/12) : Grille d'aujourd'hui + Visuel de l'émission actuelle */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Le bloc "À VENIR AUJOURD'HUI" */}
          <div className="w-full bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden">
            <AvenirAujourdhuiComponent apiUrl={API_URL} />
          </div>

          {/* Le bloc vitrine "EN DIRECT / RADIO HAI EN DIRECT" */}
          <div onClick={executerScroll} className="cursor-pointer w-full transform transition-all duration-300 hover:scale-[1.01]">
            <EnCeMomentRadioComponent programmes={programmes} />
          </div>

        </div>
        
        {/* Colonne de Droite (4/12) : Écoute et Réseaux sociaux */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full justify-between">
          <div className="w-full bg-white border border-slate-200 rounded-3xl p-1 shadow-xs flex-1">
            <EcoutezPartoutRadio />
          </div>
          <div className="w-full bg-white border border-slate-200 rounded-3xl p-1 shadow-xs shrink-0">
            <ReseauxSociauxContact />
          </div>
        </div>

      </section>

      {/* 3. REPLAYS ET ÉMISSIONS RÉCENTES */}
      <section className="w-full relative z-10 pt-4 border-t border-slate-200/60">
        <NosDernieresEmissions />
      </section>

    </div>
  );
}
