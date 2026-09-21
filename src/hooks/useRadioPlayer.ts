'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const HAI_RADIO_FLUX = 'http://51.75.120.46:8000/ONAIR';

export function useRadioPlayerAutonome() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Ajouté pour gérer le spinner aqua
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();

    // Empêche le préchargement agressif pour économiser la bande passante du serveur
    audio.src = HAI_RADIO_FLUX;
    audio.preload = 'none';
    audio.volume = 0.8;

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false); // Chargement terminé avec succès
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true); // Le flux met du temps à charger des données (mise en mémoire tampon)
    };

    const handleError = () => {
      console.error("Erreur détectée par l'élément audio sur le flux.");
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';

      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);

      audioRef.current = null;
    };
  }, []);

  // Synchronisation du volume et de l'état Muet
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  // Handler propre pour correspondre au curseur linéaire du LecteurLive
  const handleVolumeSlider = useCallback((valeur: number) => {
    setVolume(valeur);
    if (valeur > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Action Play / Pause avec gestion des exceptions asynchrones
  const toggleLecture = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true); // Déclenche l'animation visuelle immédiatement
      try {
        // Optionnel : Re-forcer l'URL originale pour nettoyer les anciens échecs réseau avant le play
        if (!audio.src || audio.src.includes('?')) {
          audio.src = HAI_RADIO_FLUX;
        }
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Impossible de lire le flux de HAI Radio :', error);
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  }, [isPlaying]);

  // Action Muet rapide
  const toggleMute = useCallback(() => {
    setIsMuted((previous) => !previous);
  }, []);

  // Actualiser et forcer la reconnexion au serveur sans cache
  const rafraichirFlux = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsLoading(true);

    // Ajout d'un anti-cache (cache-buster) pour forcer une nouvelle connexion réseau HTTP
    audio.src = `${HAI_RADIO_FLUX}?t=${Date.now()}`;
    audio.load();

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement forcé du flux :', error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, []);

  // Renvoie exactement les propriétés attendues par le composant LecteurLive.tsx
  return {
    audioRef,
    isPlaying,
    isLoading,
    volume,
    isMuted,
    toggleLecture,
    toggleMute,
    handleVolumeSlider,
    rafraichirFlux,
  };
}
