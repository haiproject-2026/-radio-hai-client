import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export interface ProgrammeType {
  titre: string;
  heure: string;
  desc: string;
  imageUrl?: string;
}

// Interface temporaire calquée sur les clés renvoyées par votre contrôleur backend d'origine
interface BackendProgramme {
  id?: string;
  nomEmission?: string;
  description?: string;
  horaire?: string;
  heureDebut?: string;
  heureFin?: string;
  jour?: string;
  jours?: string[];
  animateur?: string;
}

export function useProgrammesAvenir() {
  const [programmesAvenir, setProgrammesAvenir] = useState<ProgrammeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        // L'état loading est géré par défaut au montage, mais on le sécurise ici
        setLoading(true);
        setError(null);
        
        // 🛠️ FIX 404 : On interroge la route '/programmes' existante sur le serveur NestJS
        const response = await axios.get<BackendProgramme[]>(`${API_URL}/programmes`);
        const donneesBrutes = response.data || [];

        // Récupération automatique du jour actuel en français (ex: "MARDI")
        const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const jourActuelNom = joursSemaine[new Date().getDay()].toUpperCase();

        // Filtrage local basé sur le jour d'aujourd'hui et reformatage propre des propriétés
        const programmesFiltres: ProgrammeType[] = donneesBrutes
          .filter((prog) => {
            let listeJours: string[] = [];
            if (Array.isArray(prog.jours)) {
              listeJours = prog.jours.map((j) => String(j).toUpperCase());
            } else if (typeof prog.jour === 'string') {
              listeJours = [prog.jour.toUpperCase()];
            }
            return listeJours.includes(jourActuelNom);
          })
          .map((prog) => ({
            titre: prog.nomEmission || 'Émission sans titre',
            heure: prog.heureDebut || prog.horaire || '00:00',
            desc: prog.description || 'Aucune description fournie.',
            imageUrl: '' // Ajoutez le champ d'image si votre backend le propose plus tard
          }));

        setProgrammesAvenir(programmesFiltres);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erreur lors de la récupération des programmes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  return { programmesAvenir, loading, error };
}
