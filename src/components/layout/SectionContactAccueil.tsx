'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Radio, Loader2 } from 'lucide-react';

interface CoordonneesBD {
  adresse?: string;
  telephone?: string;
  email?: string;
  frequence?: string;
}

interface SectionContactAccueilProps {
  apiUrl: string;
}

export default function SectionContactAccueil({ apiUrl }: SectionContactAccueilProps): React.JSX.Element {
  const [coordonnees, setCoordonnees] = useState<CoordonneesBD | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${apiUrl}/station-coordonnees`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: unknown) => {
        if (data && typeof data === 'object') {
          setCoordonnees(data as CoordonneesBD);
        }
        setLoading(false);
      })
      .catch(() => {
        // 🟢 Valeurs de secours mises à jour avec le bon e-mail
        setCoordonnees({
          adresse: "Cité Razafindratandra\nFianarantsoa, Madagascar",
          telephone: "+261 34 12 345 67",
          email: "contact@hairadio.mg",
          frequence: "FM 97.6 MHz"
        });
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center py-4 text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 pb-0 pt-0 font-sans text-black">
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        {/* En-tête compact */}
        <header className="border-b border-slate-100 pb-2">
          <h3 className="text-xs font-black text-[#051d33] uppercase tracking-wider">
            Nos Coordonnées
          </h3>
        </header>

        {/* Grille horizontale compacte : 4 blocs alignés proprement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start">
          
          {/* 1. ADRESSE */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] font-black text-[#051d33] uppercase tracking-wide">Adresse</h4>
              <p className="text-xs text-slate-500 font-medium whitespace-pre-line mt-0.5 break-words">
                {coordonnees?.adresse || "Cité Razafindratandra\nFianarantsoa, Madagascar"}
              </p>
            </div>
          </div>

          {/* 2. TÉLÉPHONE */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
              <Phone className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] font-black text-[#051d33] uppercase tracking-wide">Téléphone</h4>
              <a 
                href={`tel:${(coordonnees?.telephone || "+261341234567").replace(/\s+/g, '')}`} 
                className="text-xs text-slate-500 font-bold hover:underline mt-0.5 inline-block truncate w-full"
              >
                {coordonnees?.telephone || "+261 34 12 345 67"}
              </a>
            </div>
          </div>

          {/* 3. EMAIL */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] font-black text-[#051d33] uppercase tracking-wide">Email</h4>
              <a 
                href={`mailto:${coordonnees?.email || "contact@hairadio.mg"}`} 
                className="text-xs text-cyan-600 font-bold hover:underline break-all mt-0.5 inline-block"
              >
                {coordonnees?.email || "contact@hairadio.mg"}
              </a>
            </div>
          </div>

          {/* 4. FRÉQUENCE */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
              <Radio className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] font-black text-[#051d33] uppercase tracking-wide">Fréquence</h4>
              <p className="text-xs text-slate-500 font-bold mt-0.5 truncate w-full">
                {coordonnees?.frequence || "FM 97.6 MHz"}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
