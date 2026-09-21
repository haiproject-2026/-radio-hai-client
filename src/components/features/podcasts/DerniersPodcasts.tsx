import { useEffect, useState } from 'react';

// 🌟 AJOUT : Définition de la structure d'un Podcast pour TypeScript
interface Podcast {
  id: string;
  titre: string;
  description?: string;
  duree: string;
  datePublication: string;
  nombreEcoutes: number;
}

export function DerniersPodcasts() {
  // 🌟 CORRECTION : On indique à TypeScript que c'est un tableau de Podcasts
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/podcasts/derniers')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPodcasts(data);
        }
      })
      .catch((err) => console.error('Erreur lors du chargement des derniers podcasts:', err));
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
        Derniers Podcasts
      </h2>
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex gap-4 items-center hover:shadow-md transition-shadow">
          <div className="bg-slate-900 text-white rounded-lg w-20 h-16 flex items-center justify-center text-xs font-mono relative">
            📻
            <span className="absolute bottom-1 right-1 text-[9px] bg-black bg-opacity-70 px-1 rounded text-slate-300">
              {podcast.duree}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 mb-1">{podcast.titre}</h3>
            <p className="text-xs text-slate-500 line-clamp-2">{podcast.description || 'Aucune description disponible.'}</p>
            <div className="flex gap-4 text-[10px] text-slate-400 mt-2 font-medium">
              {/* Securisation de la date au cas où elle arrive vide ou mal formatée */}
              <span>📅 {podcast.datePublication ? new Date(podcast.datePublication).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
              <span>•</span>
              <span>⏱️ {podcast.duree}</span>
              <span>•</span>
              <span>🎧 {podcast.nombreEcoutes.toLocaleString('fr-FR')} écoutes</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="text-slate-400 hover:text-slate-600">🔖</button>
            <button type="button" className="text-slate-400 hover:text-slate-600">⋮</button>
          </div>
        </div>
      ))}
    </div>
  );
}
