'use client';

import { useEffect, useState } from 'react';
import type { JSX } from 'react';

interface Animateur {
  id: string | number;
  nom: string;
  emissionNom: string;
  biographie: string;
  avatarUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}

export default function ListeAnimateurs(): JSX.Element {
  const [membres, setMembres] = useState<Animateur[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/animateurs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMembres(data);
        }
      })
      .catch((err) => console.error('Erreur animateurs:', err));
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {membres.map((user) => (
          <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden mb-4 border-2 border-slate-50 flex items-center justify-center text-slate-400">
              {user.avatarUrl ? <img src={user.avatarUrl} alt={user.nom} className="w-full h-full object-cover" /> : '👤'}
            </div>
            <h3 className="text-sm font-bold text-slate-900">{user.nom}</h3>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full uppercase mt-1 tracking-wide">
              {user.emissionNom}
            </span>
            <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed">
              {user.biographie}
            </p>
            <div className="flex gap-3 mt-4 text-slate-400 text-sm">
              {user.facebookUrl && <a href={user.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600">🌐 FB</a>}
              {user.instagramUrl && <a href={user.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-pink-600">📸 IG</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
