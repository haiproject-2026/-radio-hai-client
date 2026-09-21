'use client';

import { useState, useEffect } from 'react';

export function useWidgetInfos() {
  const [heureAffichee, setHeureAffichee] = useState<string>("");
  const [dateAffichee, setDateAffichee] = useState<string>("");
  const [meteo, setMeteo] = useState<{ temp: number; condition: string; ville: string }>({
    temp: 22,
    condition: "Ensoleillé",
    ville: "Radio Hai Station"
  });

  // 1. Horloge en temps réel
  useEffect(() => {
    const rafraichirHorloge = () => {
      const maintenant = new Date();
      setHeureAffichee(maintenant.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDateAffichee(maintenant.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }));
    };
    
    rafraichirHorloge();
    const intervalle = setInterval(rafraichirHorloge, 1000);
    return () => clearInterval(intervalle);
  }, []);

  // 2. Géolocalisation pour la météo
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setMeteo({ temp: 24, condition: "Partiellement Nuageux", ville: "Localisation Réseau" }),
        () => console.log("Météo chargée sur la ville par défaut")
      );
    }
  }, []);

  return {
    heureAffichee,
    dateAffichee,
    meteo
  };
}
