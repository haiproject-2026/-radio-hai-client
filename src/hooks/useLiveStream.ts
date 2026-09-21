'use client';

import { useState, useEffect, useRef } from 'react';

interface StationFetchResult {
  id: string;
  nom: string;
  frequence: string;
  flux_url: string;
}

export function useLiveStream(isPlaying: boolean) {
  // 🟢 BASE SECURISEE AVEC LE FLUX DIRECT DE HAI RADIO (Format Shoutcast universel)
  const HAI_RADIO_FLUX = "http://51.75.120";
  const [fluxUrl, setFluxUrl] = useState<string>(HAI_RADIO_FLUX);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlayingRef = useRef<boolean>(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const customApiUrl = import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:5000/api";

    fetch(`${customApiUrl}/radio/stations`)
      .then((res) => {
        if (!res.ok) throw new Error("Réponse API invalide");
        return res.json();
      })
      .then((data: unknown) => {
        let station: StationFetchResult | undefined;

        if (Array.isArray(data)) {
          if (data.length > 0) station = data[0] as unknown as StationFetchResult;
        } else if (data && typeof data === 'object') {
          station = data as unknown as StationFetchResult;
        }

        if (station && station.flux_url) {
          const urlNettoyee = station.flux_url.trim();
          
          // Filtrage strict contre les IPs erronées stockées en base de données
          if (
            urlNettoyee === "" || 
            urlNettoyee === "null" || 
            urlNettoyee.includes("51.75.0.120")
          ) {
            setFluxUrl(HAI_RADIO_FLUX);
            return;
          }

          // Force l'extension de streaming propre si l'URL brute de l'API correspond à l'IP serveur
          const urlFinale = urlNettoyee.includes("51.75.120.46:8000/ONAIR") && !urlNettoyee.includes(";stream.mp3")
            ? "http://51.75.120"
            : urlNettoyee;

          setFluxUrl(urlFinale);
          
          if (audioRef.current && audioRef.current.src !== urlFinale) {
            const currentPlaying = isPlayingRef.current;
            audioRef.current.src = urlFinale;
            if (currentPlaying) {
              audioRef.current.load();
              audioRef.current.play().catch((err: unknown) => 
                console.error("Rechargement du flux dynamique échoué:", err)
              );
            }
          }
        }
      })
      .catch(() => {
        setFluxUrl(HAI_RADIO_FLUX);
      });
  }, []);

  return { fluxUrl, audioRef };
}
