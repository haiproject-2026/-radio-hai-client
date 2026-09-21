'use client';

import { useState, useEffect, useRef } from "react";
import { Newspaper, ExternalLink, RefreshCw } from "lucide-react";
import { API_URL } from "../../config/api";

interface Actualite {
  id: string;
  titre: string;
  description: string;
  source: string;
  lienOfficiel: string;
  type: string;
  region: string;
  createdAt: string;
}

const fluxRadios: Actualite[] = [
  { id: "1", titre: "Madagascar : Démantèlement d'un réseau de falsification de diplômes", description: "Coup de filet majeur sur le parvis de l'université d'Antananarivo.", source: "RFI Afrique", lienOfficiel: "https://rfi.fr", type: "info", region: "all", createdAt: "2026-08-19" },
  { id: "2", titre: "RDC : Fin de la mission militaire des pays d'Afrique australe", description: "Les chefs d'État de la SADC et de l'EAC actent le retrait des troupes.", source: "VOA Afrique", lienOfficiel: "https://voaafrique.com", type: "info", region: "fianarantsoa", createdAt: "2026-08-19" },
  { id: "3", titre: "Session Acoustique : Exclusivité Kilalaky Mix et Tsapiky 2026", description: "Pistes exclusives enregistrées par nos invités de la Haute Matsiatra.", source: "Hai Studio Session", lienOfficiel: "https://rfi.fr", type: "musique", region: "fianarantsoa", createdAt: "2026-08-18" }
];

export default function RubriqueActualites({ initialSearch, regionActive }: { initialSearch: string; regionActive?: string }) {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Conserve la longueur des actualités pour éviter d'ajouter le tableau en dépendance du useEffect
  const countRef = useRef(0);

  useEffect(() => {
    const fetchInfos = async () => {
      if (countRef.current === 0) {
        setLoading(true);
      }
      
      try {
        const res = await fetch(`${API_URL}/actualites?search=${encodeURIComponent(initialSearch)}${regionActive ? `&region=${regionActive}` : ""}`);
        const data = await res.json();
        if (data?.length) {
          setActualites(data);
          countRef.current = data.length;
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Échec de récupération des actualités locales :", err);
      }

      // Secours (Fallback) si le backend est indisponible ou vide
      const filteredFallback = fluxRadios.filter(item => 
        (!regionActive || item.region === "all" || item.region === regionActive) &&
        (!initialSearch || item.titre.toLowerCase().includes(initialSearch.toLowerCase()) || item.description.toLowerCase().includes(initialSearch.toLowerCase()))
      );
      
      setActualites(filteredFallback);
      countRef.current = filteredFallback.length;
      setLoading(false);
    };

    fetchInfos();
    const timer = setInterval(fetchInfos, 10000);
    return () => clearInterval(timer);
  }, [initialSearch, regionActive]);

  if (loading) return <div className="py-12 text-center text-xs font-black uppercase text-gray-400 tracking-widest">Chargement...</div>;

  return (
    <div className="space-y-6 font-['Manrope',_sans-serif] text-left">
      <div className="border-b pb-4 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-[#ea7333]" /> Fil d'actualités récents
        </h2>
        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-50 border px-2 py-0.5 rounded flex items-center gap-1">
          <RefreshCw className="h-2.5 w-2.5 text-teal-600 animate-spin" /> Live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actualites.map((item) => (
          <div key={item.id} className="bg-white border p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:shadow-sm transition-shadow">
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-[#ea7333] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">{item.type}</span>
              <h3 className="text-xs font-black text-gray-900 uppercase pt-1 line-clamp-2">{item.titre}</h3>
              <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">{item.description}</p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 pt-2 border-t border-gray-50">
              <span>{new Date(item.createdAt).toLocaleDateString("fr-FR")} — {item.region === "all" ? "Province" : item.region}</span>
              <a href={item.lienOfficiel} target="_blank" rel="noopener noreferrer" className="text-[#ea7333] font-black flex items-center gap-0.5 hover:underline">
                {item.source} <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
