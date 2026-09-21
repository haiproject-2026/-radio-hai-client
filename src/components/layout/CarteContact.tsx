'use client';

import React from "react";
import { MapPin, Phone, Mail, Radio } from "lucide-react";

interface CarteContactProps {
  contactData?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export default function CarteContact({ contactData }: CarteContactProps): React.JSX.Element {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
      <h3 className="text-sm font-black text-[#05192c] uppercase tracking-wider border-b border-slate-100 pb-3">
        NOS COORDONNÉES
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Coordonnées textuelles */}
        <div className="md:col-span-12 space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-slate-50 rounded-xl text-[#0d4469] border border-slate-100"><MapPin className="h-4 w-4" /></div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Adresse</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5 whitespace-pre-line leading-relaxed">
                {contactData?.address || "Cité Razafindratandra\nFianarantsoa, Madagascar"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-slate-50 rounded-xl text-[#0d4469] border border-slate-100"><Phone className="h-4 w-4" /></div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Téléphone</h4>
              <p className="text-xs text-slate-500 font-bold mt-0.5">{contactData?.phone || "+261 34 12 345 67"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-slate-50 rounded-xl text-[#0d4469] border border-slate-100"><Mail className="h-4 w-4" /></div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Email</h4>
              {/* 🛠️ MODIFICATION : Remplacement de contact@radiohaj.mg par hairadio.mg */}
              <p className="text-xs text-[#0070CE] font-bold mt-0.5">{contactData?.email || "hairadio.mg"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-slate-50 rounded-xl text-[#0d4469] border border-slate-100"><Radio className="h-4 w-4" /></div>
            <div>
              <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase">Fréquence</h4>
              <p className="text-xs text-slate-500 font-bold mt-0.5">FM 97.6 MHz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
