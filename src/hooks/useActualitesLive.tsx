'use client';

import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../config/api';

export interface Article {
  id: string;
  categorie: 'INFORMATION' | 'MUSIQUE' | 'CULTURE' | 'CITOYENNETÉ' | 'SPORTS';
  titre: string;
  description: string;
  date: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
}

interface ActualiteBD {
  id: string;
  titre: string;
  texte: string;
  imageUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  categorie: string;
}

interface ActualitesChangePayload {
  action: 'CREATION' | 'SUPPRESSION';
  donnee: ActualiteBD | string;
}

export function useActualitesLive() {
  const [dbArticles, setDbArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const mapperArticle = useCallback((art: ActualiteBD): Article => {
    let catSecours: Article['categorie'] = 'INFORMATION';
    let catFormattee = art?.categorie ? art.categorie.toUpperCase() : 'INFORMATION';
    if (catFormattee === 'GENERAL') catFormattee = 'INFORMATION';

    if (['INFORMATION', 'MUSIQUE', 'CULTURE', 'CITOYENNETÉ', 'SPORTS'].includes(catFormattee)) {
      catSecours = catFormattee as Article['categorie'];
    }

    const BASE_SERVEUR = API_URL.replace('/api', '');

    const formaterLienMedia = (cheminFichier: string | null) => {
      if (!cheminFichier || cheminFichier.trim() === '') return null;
      if (cheminFichier.startsWith('http://') || cheminFichier.startsWith('https://')) {
        return cheminFichier;
      }
      if (cheminFichier.startsWith('/uploads/') || cheminFichier.startsWith('uploads/')) {
        const cheminSain = cheminFichier.startsWith('/') ? cheminFichier : `/${cheminFichier}`;
        return `${BASE_SERVEUR}${cheminSain}`;
      }
      return `${BASE_SERVEUR}/uploads/${cheminFichier}`;
    };

    return {
      id: art.id,
      categorie: catSecours,
      titre: art.titre,
      description: art.texte || '',
      date: "Aujourd'hui",
      imageUrl: formaterLienMedia(art.imageUrl),
      videoUrl: formaterLienMedia(art.videoUrl),
      audioUrl: formaterLienMedia(art.audioUrl),
    };
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/articles-multimedia`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);
        return res.json();
      })
      .then((data: unknown) => {
        let tableauArticles: ActualiteBD[] = [];

        if (Array.isArray(data)) {
          tableauArticles = data as ActualiteBD[];
        } else if (data && typeof data === 'object' && 'data' in data) {
          const enveloppe = data as { data: unknown };
          if (Array.isArray(enveloppe.data)) {
            tableauArticles = enveloppe.data as ActualiteBD[];
          }
        }
        
        setDbArticles(tableauArticles.map(mapperArticle));
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Erreur de récupération :", err);
        setLoading(false);
      });

    const urlServeurBrute = API_URL.replace('/api', '');
    
    const socket: Socket = io(urlServeurBrute, {
      transports: ['polling', 'websocket'],
      autoConnect: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on('actualites_change', (payload: ActualitesChangePayload) => {
      if (payload.action === 'CREATION' && typeof payload.donnee !== 'string') {
        const nouvelArt = payload.donnee as ActualiteBD;
        setDbArticles((actuels) => [mapperArticle(nouvelArt), ...actuels]);
      } else if (payload.action === 'SUPPRESSION' && typeof payload.donnee === 'string') {
        const idSupprime = payload.donnee;
        setDbArticles((actuels) => actuels.filter((art) => art.id !== idSupprime));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [mapperArticle]);

  return { dbArticles, loading };
}
