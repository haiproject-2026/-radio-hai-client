'use client';

import { useState, useEffect, useRef } from "react";

export function useRadioPlayerAutonome() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 🟢 FLUX SÉCURISÉ EN HTTPS (Musique live d'ambiance) POUR GARANTIR LE DÉMARRAGE DU LECTEUR
  const HAI_RADIO_FLUX = "https://radiojar.com";
  const [fluxUrl] = useState<string>(HAI_RADIO_FLUX);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

      audio.addEventListener("error", () => {
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
