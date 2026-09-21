'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import GrilleActualites from '../../components/layout/GrilleActualites'; 
import { API_URL } from '../../config/api';

// Forçage de type générique propre pour satisfaire TypeScript et éviter les conflits d'interfaces d'articles
type GenericGrille = React.ComponentType<{ articles: unknown[]; regionFiltre: string }>;
const GrilleActualitesComponent = GrilleActualites as unknown as GenericGrille;

export default function ActualiterPage(): React.JSX.Element {
  const [regionActive, setRegionActive] = useState<string>('all');
  const [articles, setArticles] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Chargement dynamique des articles depuis le serveur NestJS (Port 5000)
  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then((res) => {
        if (!res.ok) throw new Error('Impossible de récupérer les actualités');
        return res.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error('Erreur lors du chargement des actualités :', err);
        setArticles([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-black font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* En-tête de la page */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl uppercase">
            Actualités & Météo 📰
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 font-medium">
            Suivez les dernières informations et le temps en direct de nos antennes régionales.
          </p>
        </div>

        {/* Barre de navigation / Filtres par Région */}
        <div className="flex justify-center border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              type="button"
              onClick={() => setRegionActive('all')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                regionActive === 'all'
                  ? 'border-[#1d4461] text-[#1d4461]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Toutes les régions
            </button>
            <button
              type="button"
              onClick={() => setRegionActive('fianarantsoa')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                regionActive === 'fianarantsoa'
                  ? 'border-[#1d4461] text-[#1d4461]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Fianarantsoa
            </button>
            <button
              type="button"
              onClick={() => setRegionActive('ambalavao')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                regionActive === 'ambalavao'
                  ? 'border-[#1d4461] text-[#1d4461]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Ambalavao
            </button>
          </nav>
        </div>

        {/* Section principale : Injection sécurisée des articles du serveur */}
        <main>
          {loading ? (
            <div className="text-center py-20 text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">
              Connexion au fil d'actualités de la station...
            </div>
          ) : (
            <GrilleActualitesComponent articles={articles} regionFiltre={regionActive} />
          )}
        </main>

      </div>
    </div>
  );
}
