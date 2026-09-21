'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../config/api';
import CarteAnimateur from './CarteAnimateur';

interface Animateur {
  id: string;
  nom: string;
  role: string;
  bio: string;
  photo_url: string;
}

interface AnimateurBackend {
  id: string | number;
  nom?: string;
  name?: string;
  role?: string;
  bio?: string;
  photo_url?: string;
  photo?: string;
  avatar?: string;
}

export default function GrilleAnimateurs() {
  const [animateurs, setAnimateurs] = useState<Animateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/animateurs`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur de réponse du serveur NestJS');
        return res.json();
      })
      .then((data: AnimateurBackend[]) => {
        const animateursMappes: Animateur[] = data.map((item) => ({
          id: String(item.id),
          nom: item.nom ?? item.name ?? 'Membre de l\'équipe',
          role: item.role ?? 'Antenne',
          bio: item.bio ?? '',
          photo_url: item.photo_url ?? item.photo ?? item.avatar ?? ''
        }));

        setAnimateurs(animateursMappes);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Erreur lors du chargement des animateurs:', err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-black font-bold text-sm tracking-wide font-['Manrope',_sans-serif]">
        CHARGEMENT DE L'ÉQUIPE HAI RADIO...
      </div>
    );
  }

  return (
    <div className="w-full font-['Manrope',_sans-serif]">
      {animateurs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {animateurs.map((anim) => {
            const baseServerUrl = API_URL.replace('/api', '');
            let rawPath = anim.photo_url.trim();

            // 1. Si le chemin contient déjà le préfixe complet de l'API, on extrait uniquement le nom du fichier
            if (rawPath.startsWith('http')) {
              const segments = rawPath.split('/');
              rawPath = segments[segments.length - 1];
            }

            // 2. Supprime les préfixes redondants pour éviter les URL mal formées
            rawPath = rawPath.replace(/^\/?(uploads\/)?(animateurs\/)?/, '');

            // 3. Reconstruction propre de l'URL absolue menant à votre sous-dossier physique validé sur VS Code
            const completePhotoUrl = rawPath
              ? `${baseServerUrl}/uploads/animateurs/${rawPath}`
              : '';

            return (
              <CarteAnimateur 
                key={anim.id}
                nom={anim.nom}
                bio={anim.bio}
                avatarUrl={completePhotoUrl}
                emission={anim.role}
                region="fianarantsoa"
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl m-6">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Aucun membre d'antenne n'a été trouvé dans la base de données.
          </p>
        </div>
      )}
    </div>
  );
}
