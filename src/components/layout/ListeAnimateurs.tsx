'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../../config/api';

interface Animateur {
  id: string;
  nom: string;
  emissionNom: string;
  biographie: string;
  avatarUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}

// Interface de secours si l'API renvoie les anciennes clés (role, bio, photo_url)
interface AnimateurBackend {
  id: string | number;
  nom?: string;
  name?: string;
  role?: string;
  emissionNom?: string;
  bio?: string;
  biographie?: string;
  photo_url?: string;
  photo?: string;
  avatar?: string;
  avatarUrl?: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}

export default function ListeAnimateurs() {
  const [users, setUsers] = useState<Animateur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utilisation de la variable de configuration globale sur le port 5000
    fetch(`${API_URL}/animateurs`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur de communication avec NestJS');
        return res.json();
      })
      .then((data: AnimateurBackend[]) => {
        if (Array.isArray(data)) {
          // Mapping de sécurité pour harmoniser les clés de PostgreSQL vers React
          const mappedUsers: Animateur[] = data.map((user) => ({
            id: String(user.id),
            nom: user.nom ?? user.name ?? 'Membre de l\'équipe',
            emissionNom: user.emissionNom ?? user.role ?? 'Antenne',
            biographie: user.biographie ?? user.bio ?? '',
            avatarUrl: user.avatarUrl ?? user.photo_url ?? user.photo ?? user.avatar ?? null,
            facebookUrl: user.facebookUrl ?? null,
            instagramUrl: user.instagramUrl ?? null,
          }));
          setUsers(mappedUsers);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des animateurs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-black font-bold text-sm tracking-wide font-['Manrope',_sans-serif]">
        CHARGEMENT DES ANIMATEURS...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 font-['Manrope',_sans-serif]">
      {users.length > 0 ? (
        users.map((user) => {
          // Reconstruction stricte de l'URL absolue de l'image statique
          const completeAvatarUrl = user.avatarUrl
            ? user.avatarUrl.startsWith('http')
              ? user.avatarUrl
              : `${API_URL.replace('/api', '')}${user.avatarUrl.startsWith('/') ? user.avatarUrl : `/${user.avatarUrl}`}`
            : null;

          return (
            <div key={user.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 mb-3 border border-slate-200 transition-colors group-hover:border-cyan-400">
                {completeAvatarUrl ? (
                  <img src={completeAvatarUrl} alt={user.nom} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl bg-slate-50 text-slate-400">👤</div>
                )}
              </div>
              
              <h3 className="text-sm font-black text-black">{user.nom}</h3>
              <p className="text-xs text-cyan-500 font-extrabold uppercase tracking-wide mb-2">{user.emissionNom}</p>
              <p className="text-xs text-slate-700 font-normal leading-relaxed line-clamp-3 px-2">{user.biographie}</p>
              
              <div className="flex gap-3 mt-4 text-xs font-bold">
                {user.facebookUrl && (
                  <a href={user.facebookUrl} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-700 uppercase tracking-wider">
                    🌐 FB
                  </a>
                )}
                {user.instagramUrl && (
                  <a href={user.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-700 uppercase tracking-wider">
                    📸 IG
                  </a>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12 text-sm font-bold text-slate-500 uppercase tracking-wider">
          Aucun animateur trouvé.
        </div>
      )}
    </div>
  );
}
