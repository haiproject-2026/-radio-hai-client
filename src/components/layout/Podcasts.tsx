'use client';

import { useState, useMemo, useEffect } from "react";
import type { JSX, ComponentType } from "react";
import { API_URL } from "../../config/api";
import { PodcastsPopulaires } from "../features/podcasts/PodcastsPopulaires"; 
import { PlusEcoutes } from "../features/podcasts/PlusEcoutes"; 
import PodcastHeader from "../features/podcasts/PodcastHeader";
import CartePodcastItem from "../features/podcasts/CartePodcastItem";
import type { ElementPodcast } from "../features/podcasts/CartePodcastItem";

const PodcastsPopulairesComponent = PodcastsPopulaires as unknown as ComponentType<Record<string, unknown>>;
const PlusEcoutesComponent = PlusEcoutes as unknown as ComponentType<Record<string, unknown>>;

interface PodcastBD {
  id: string;
  titre: string;
  audio_url: string;
  duree: string;
  thematique: string;
  ecoutes: number;
  created_at: string;
}

export default function Podcasts(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [basePodcasts, setBasePodcasts] = useState<ElementPodcast[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [activePodcastId, setActivePodcastId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/podcasts`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur de chargement de la médiathèque');
        return res.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          const formatsReels = (data as PodcastBD[]).map((pod) => {
            const baseServerUrl = API_URL ? API_URL.replace('/api', '') : '';
            let fileRaw = (pod.audio_url || '').trim();

            if (fileRaw.startsWith('http')) {
              const segs = fileRaw.split('/');
              fileRaw = segs[segs.length - 1];
            }
            
            fileRaw = fileRaw.replace(/^\/?(uploads\/)?(podcasts\/)?/, '');
            const localAudioUrl = fileRaw ? `${baseServerUrl}/uploads/podcasts/${fileRaw}` : '';

            return {
              id: pod.id,
              titre: pod.titre,
              description: `Émission thématique ${pod.thematique}. Disponible en réécoute gratuite proposée par Radio Hai.`,
              date: new Date(pod.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
              duree: pod.duree,
              ecoutes: `${pod.ecoutes} écoutes`,
              // 🌟 APPLICATION DU NOUVEAU LOGO WEB P
              image: "/logo-radio-hai.webp",
              categorie: pod.thematique.toUpperCase(),
              audioUrl: localAudioUrl
            };
          });
          setBasePodcasts(formatsReels);
        } else {
          setBasePodcasts([]);
        }
        
        if (loading) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur de récupération des podcasts :", err);
        setBasePodcasts([]);
        setLoading(false);
      });
  }, [loading]);

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  const handleTogglePlay = (id: string) => {
    const cible = basePodcasts.find(p => p.id === id);
    const urlAudio = cible ? cible.audioUrl : "";

    if (activePodcastId === id && currentAudio) {
      if (!currentAudio.paused) {
        currentAudio.pause();
        setActivePodcastId(null);
      } else {
        currentAudio.play().catch(err => console.error("Erreur de lecture :", err));
        setActivePodcastId(id);
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
    }

    if (!urlAudio) {
      alert("Lien audio introuvable ou incorrect pour ce podcast.");
      return;
    }

    const audio = new Audio(urlAudio);
    audio.play()
      .then(() => {
        setCurrentAudio(audio);
        setActivePodcastId(id);
      })
      .catch((err) => {
        console.error("Échec du chargement du fichier audio :", err);
        alert("Impossible de lire ce fichier audio.");
      });

    audio.onended = () => {
      setActivePodcastId(null);
    };
  };

  const listeFiltree = useMemo(() => {
    return basePodcasts.filter((pod) => {
      return pod.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
             pod.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, basePodcasts]);

  if (loading) {
    return <div className="text-center py-20 text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Chargement de la médiathèque...</div>;
  }

  return (
    <div className="w-full font-['Manrope',_sans-serif] space-y-8 select-none antialiased text-left pb-20 text-black">
      
      <PodcastHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        <div className="lg:col-span-8 space-y-12">
          
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#05192c] uppercase tracking-wider">PODCASTS POPULAIRES</h3>
            <PodcastsPopulairesComponent activeId={activePodcastId} onTogglePlay={handleTogglePlay} />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-[#05192c] uppercase tracking-wider">DERNIERS PODCASTS</h3>
            </div>
            
            <div className="space-y-4">
              {listeFiltree.length > 0 ? (
                listeFiltree.map((pod) => (
                  <CartePodcastItem 
                    key={pod.id}
                    pod={pod}
                    activePodcastId={activePodcastId}
                    onTogglePlay={handleTogglePlay}
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Aucun podcast trouvé pour cette recherche.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 w-full">
          <PlusEcoutesComponent activeId={activePodcastId} onTogglePlay={handleTogglePlay} />
        </div>
      </div>

    </div>
  );
}
