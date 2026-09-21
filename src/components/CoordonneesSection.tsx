'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, PhoneCall } from 'lucide-react';

export default function CoordonneesSection(): React.JSX.Element {
  return (
    <section className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm text-left my-6 font-['Manrope',_sans-serif]">
      {/* 💡 TITRE CORRIGÉ : L'émoji a été supprimé au profit de l'icône PhoneCall */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
        <PhoneCall className="h-4 w-4 text-[#113148]" />
        <span className="text-sm font-black text-[#113148] uppercase tracking-wide">
          Coordonnées & Contacts
        </span>
      </div>

      {/* Grille des fiches d'informations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pl-2">
        
        {/* Standard / Téléphone */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center text-[#1b75bc] shrink-0">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Studio & Standard</h4>
            <p className="text-xs font-bold text-slate-800 mt-0.5">+261 34 12 345 67</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center text-[#1b75bc] shrink-0">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Secrétariat / Rédaction</h4>
            <p className="text-xs font-bold text-slate-800 mt-0.5">contact@radiohai.fm</p>
          </div>
        </div>

        {/* Adresse Physique */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center text-[#1b75bc] shrink-0">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Adresse des Studios</h4>
            <p className="text-xs font-bold text-slate-800 mt-0.5 leading-tight">ambalavao</p>
          </div>
        </div>

        {/* Horaires d'antenne */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center text-[#1b75bc] shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Direct Antenne</h4>
            <p className="text-xs font-bold text-slate-800 mt-0.5">24h/24 – 7j/7</p>
          </div>
        </div>

      </div>
    </section>
  );
}
