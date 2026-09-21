'use client';

import { useState, useEffect, useRef } from "react";

interface StationFetchResult {
  id: string;
  nom: string;
  frequence: string;
  flux_url: string;
}

export function useRadioPlayerAutonome() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 🎙️ FLUX MAÎTRE INALTÉRABLE DE HAI RADIO
  const HAI_RADIO_FLUX = "http://51.75.120";
  const [fluxUrl, setFluxUrl] = useState<string>(HAI_RADIO_FLUX);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Synchronisation en arrière-plan avec NestJS
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
          if (data.length > 0) station = data as unknown as StationFetchResult;
        } else if (data && typeof data === 'object') {
          station = data as unknown as StationFetchResult;
        }

        if (station && station.flux_url) {
          const urlNettoyee = station.flux_url.trim();
          
          if (
            urlNettoyee === "" || 
            urlNettoyee === "null" || 
            urlNettoyee.includes("51.75.0.120")
          ) {
            setFluxUrl(HAI_RADIO_FLUX);
            return;
          }
          setFluxUrl(urlNettoyee);
        }
      })
      .catch(() => {
        setFluxUrl(HAI_RADIO_FLUX);
      });
  }, []);

  const createAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.src = fluxUrl;
      audio.volume = isMuted ? 0 : volume / 100;
      audio.preload = "none";

      audio.addEventListener("playing", () => {
        setIsLoading(false);
        setIsPlaying(true);
      });

      audio.addEventListener("pause", () => {
        setIsPlaying(false);
        setIsLoading(false);
      });

      audio.addEventListener("error", (event) => {
        console.error("Erreur réseau du flux en direct :", event);
        setIsPlaying(false);
        setIsLoading(false); 
      });

      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const toggleLecture = async () => {
    const audio = createAudio();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      setIsLoading(true);
      if (audio.src !== fluxUrl) audio.src = fluxUrl;
      audio.volume = isMuted ? 0 : volume / 100;
      await audio.play();
    } catch (error) {
      console.error("Lecture impossible :", error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.volume = nextMute ? 0 : volume / 100;
    }
  };

  const handleVolumeSlider = (val: number) => {
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : val / 100;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying,
    isLoading,
    volume,
    isMuted,
    toggleLecture,
    toggleMute,
    handleVolumeSlider
  };
}
