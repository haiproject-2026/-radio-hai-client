import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export interface ProgrammeType {
  id: string;
  title: string;
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

const FALLBACK_EMISSION: ProgrammeType = {
  id: "direct-default",
  title: "LE GRAND DÉBAT",
  hours: "10:00 - 12:00",
  host: "John R.",
  imageUrl: "/radio_haj_micro_webp.webp"
};

export function useDirectRadio() {
  const [emissionDirect, setEmissionDirect] = useState<ProgrammeType>(FALLBACK_EMISSION);

  useEffect(() => {
    fetch(`${API_URL}/programmes`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur backend");
        return res.json();
      })
      .then((data: ProgrammeBD[]) => {
        if (!Array.isArray(data)) return;

        const maintenant = new Date();
        const joursFr = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        const jourActuel = joursFr[maintenant.getDay()];
        
        const heureActuelle = maintenant.getHours();
        const minuteActuelle = maintenant.getMinutes();
        const tempsEnMinutes = heureActuelle * 60 + minuteActuelle;

        const emissionTrouvee = data.find((p) => {
          const tabJours = p.jours ? p.jours.map(j => j.toLowerCase().trim()) : [];
          const correspondAuJour = tabJours.includes(jourActuel) || 
                                   tabJours.some(j => j.includes("tous") || j.includes("touslesjours"));
          
          if (!correspondAuJour || !p.horaire) return false;

          const horaireNettoye = p.horaire.replace(/\s+/g, "").replace(/h/gi, ":");
          const partiesHeures = horaireNettoye.split(/[-–—]/);
          if (partiesHeures.length !== 2) return false;

          // CORRECTION : Sélection explicite des index 0 et 1 du tableau découpé
          const debutBrut = partiesHeures[0] ? partiesHeures[0].trim() : "";
          const finBrut = partiesHeures[1] ? partiesHeures[1].trim() : "";

          const [hDebut, mDebut] = debutBrut.split(":").map(Number);
          const [hFin, mFin] = finBrut.split(":").map(Number);

          const minutesDebut = (hDebut || 0) * 60 + (mDebut || 0);
          const minutesFin = (hFin || 0) * 60 + (mFin || 0);

          return tempsEnMinutes >= minutesDebut && tempsEnMinutes < minutesFin;
        });

        if (emissionTrouvee) {
          setEmissionDirect({
            id: emissionTrouvee.id,
            title: emissionTrouvee.titre,
            hours: emissionTrouvee.horaire,
            host: emissionTrouvee.animateur,
            imageUrl: emissionTrouvee.image_url || ""
          });
        } else {
          setEmissionDirect(FALLBACK_EMISSION);
        }
      })
      .catch((err) => {
        console.error("Erreur de synchronisation du direct :", err);
        setEmissionDirect(FALLBACK_EMISSION);
      });
  }, []);

  return { directActuel: emissionDirect };
}
