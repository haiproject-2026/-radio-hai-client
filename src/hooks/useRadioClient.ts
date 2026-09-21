import { useState, useEffect } from "react";

export interface Host {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${key} :`, error);
    return defaultValue;
  }
};

export function useRadioClient() {
  // Ajustement des types en tableaux explicites Record<string, unknown>[]
  const [podcasts, setPodcasts] = useState<Record<string, unknown>[]>(() => 
    getLocalStorageItem<Record<string, unknown>[]>("radio_podcasts", [])
  );
  const [events] = useState<Record<string, unknown>[]>(() => 
    getLocalStorageItem<Record<string, unknown>[]>("radio_history_events", [])
  );
  const [hosts, setHosts] = useState<Host[]>(() => 
    getLocalStorageItem<Host[]>("radio_hosts", [])
  );
  const [articles] = useState<Record<string, unknown>[]>(() => 
    getLocalStorageItem<Record<string, unknown>[]>("radio_articles", [])
  );
  const [programmes, setProgrammes] = useState<Record<string, unknown>[]>(() => 
    getLocalStorageItem<Record<string, unknown>[]>("radio_programmes", [])
  );
  const [contactData] = useState<Record<string, unknown>>(() => 
    getLocalStorageItem<Record<string, unknown>>("radio_contact_data", { phone: "", email: "", address: "", facebookUrl: "" })
  );

  useEffect(() => {
    const synchroniserDonneesServeur = async () => {
      try {
        const URL_API = "http://localhost:5000/api";

        // Récupération et synchronisation des émissions
        const resProg = await fetch(`${URL_API}/emissions`);
        if (resProg.ok) {
          const dataProg = (await resProg.json()) as Record<string, unknown>[];
          setProgrammes(dataProg);
          localStorage.setItem("radio_programmes", JSON.stringify(dataProg));
        }

        // Récupération et synchronisation des animateurs
        const resHosts = await fetch(`${URL_API}/animateurs`);
        if (resHosts.ok) {
          const dataHosts = (await resHosts.json()) as Host[];
          setHosts(dataHosts);
          localStorage.setItem("radio_hosts", JSON.stringify(dataHosts));
        }

        // Récupération et synchronisation des podcasts
        const resPodcasts = await fetch(`${URL_API}/podcasts`);
        if (resPodcasts.ok) {
          const dataPodcasts = (await resPodcasts.json()) as Record<string, unknown>[];
          setPodcasts(dataPodcasts);
          localStorage.setItem("radio_podcasts", JSON.stringify(dataPodcasts));
        }
      } catch (error) {
        console.error("Erreur de synchronisation avec le serveur NestJS :", error);
      }
    };

    void synchroniserDonneesServeur();
  }, []);

  return {
    podcasts,
    events,
    hosts,
    articles,
    programmes,
    contactData,
  };
}
