'use client';

import { useEffect, useState, useMemo } from 'react';
import { Play, Pause, Clock, Calendar, Headphones } from 'lucide-react';
import { API_URL } from '../../../config/api';

interface Podcast {
  id: string;
  titre: string;
  audio_url: string;
  duree: string;
  thematique: string;
  description?: string;
  created_at: string;
  ecoutes: number;
}

export function ListePodcastsInteractive() {
  const [basePodcasts, setBasePodcasts] = useState<Podcast[]>([]);
  const [selectedEmission, setSelectedEmission] = useState('TOUS');
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Liste textuelle stricte basée sur les valeurs exactes de votre admin
  const categoriesMenu = [
    { id: 'TOUS', label: 'Tout voir' },
    { id: 'TALK SHOW / LIBRE ANTENNE', label: 'TALK SHOW / LIBRE ANTENNE' },
    { id: 'ACTUALITÉ', label: 'ACTUALITÉ' },
    { id: 'SOCIÉTÉ', label: 'SOCIÉTÉ' },
    { id: 'CULTURE', label: 'CULTURE' },
    { id: 'MUSIQUE', label: 'MUSIQUE' },
    { id: 'SPORT', label: 'SPORT' },
    { id: 'ÉCONOMIE', label: 'ÉCONOMIE' }
  ];

  useEffect(() => {
    fetch(`${API_URL}/podcasts`)
      .then((res) => res.json())
      .then((data) => {
        setBasePodcasts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur récupération podcasts:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (currentAudio) currentAudio.pause();
    };
  }, [currentAudio]);

  // Filtrage strict par correspondance directe de chaîne de caractères (sans émojis parasites)
  const listeFiltree = useMemo(() => {
    if (selectedEmission === 'TOUS') return basePodcasts;
    return basePodcasts.filter((pod) => {
      const cleanThematique = pod.thematique.trim().toUpperCase();
      const cleanSelected = selectedEmission.trim().toUpperCase();
      return cleanThematique === cleanSelected;
    });
  }, [selectedEmission, basePodcasts]);

  const handlePlayPodcast = (pod: Podcast) => {
    if (playingId === pod.id && currentAudio) {
      if (!currentAudio.paused) {
        currentAudio.pause();
        setPlayingId(null);
      } else {
        currentAudio.play().catch((e) => console.error(e));
        setPlayingId(pod.id);
      }
      return;
    }

    if (currentAudio) currentAudio.pause();

    const audio = new Audio(pod.audio_url);
    audio.play()
      .then(() => {
        setCurrentAudio(audio);
        setPlayingId(pod.id);
      })
      .catch((err) => {
        console.error(err);
        alert("Impossible de charger le fichier audio.");
      });

    audio.onended = () => {
      setPlayingId(null);
    };
  };

  if (loading) {
    return <div className="text-center py-10 text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Alignement avec les catégories admin...</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full box-border">
      
      {/* BARRE DE FILTRAGE PAR TEXTE UNIQUE SANS ÉMOJI */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {categoriesMenu.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedEmission(cat.id)}
              className={`text-[10px] font-black px-3 py-2 rounded-lg uppercase tracking-wide transition-all cursor-pointer border ${
                selectedEmission === cat.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* COMPOSANT DE RENDU DES CARTES COMPATIBLES AUDIO */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider text-left">
          {selectedEmission === 'TOUS' ? 'Derniers Podcasts En Ligne' : `Catégorie : ${selectedEmission}`}
        </h2>

        {listeFiltree.length === 0 ? (
          <div className="text-center p-10 bg-white border border-slate-100 rounded-xl text-slate-400 text-xs font-medium">
            Aucun podcast publié sous cette thématique.
          </div>
        ) : (
          listeFiltree.map((pod) => {
            const isPlaying = playingId === pod.id;
            return (
              <div 
                key={pod.id} 
                className={`bg-white border p-4 rounded-xl shadow-sm flex gap-5 items-center hover:shadow-md transition-all text-left ${
                  isPlaying ? 'border-blue-500 bg-blue-50/20' : 'border-slate-100'
                }`}
              >
                <div 
                  onClick={() => handlePlayPodcast(pod)}
                  className="w-24 h-16 bg-[#05192c] rounded-lg overflow-hidden shrink-0 flex items-center justify-center relative cursor-pointer group shadow-inner"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-white fill-white animate-pulse" />
                    ) : (
                      <Play className="h-5 w-5 text-white fill-white group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <span className="absolute bottom-1 right-1 text-[8px] bg-black/70 text-slate-200 px-1 py-0.5 rounded font-bold flex items-center gap-0.5">
                    <Clock className="h-2 w-2" /> {pod.duree}
                  </span>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider block">
                    {pod.thematique}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 truncate uppercase leading-none">
                    {pod.titre}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                    {pod.description || 'Émission audio proposée par Radio Hai.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-300" /> 
                      {new Date(pod.created_at).toLocaleDateString('fr-FR')}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Headphones className="h-3 w-3 text-slate-300" /> 
                      {pod.ecoutes} écoutes
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
