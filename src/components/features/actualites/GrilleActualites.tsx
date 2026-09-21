import { useEffect, useState } from 'react';

// Définition de la structure des données reçues de votre API
interface Article {
  id: string | number;
  titre: string;
  contenu: string;
  categorie?: string;
  imageUrl?: string;
  datePublication: string;
}

export function GrilleActualites() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Le proxy configuré dans votre fichier vite.config.ts intercepte '/actualites'
    // et redirige la requête vers votre serveur backend (ex: port 5000)
    fetch('/actualites')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur serveur : ${res.status}`);
        }
        return res.json();
      })
      .then((data: Article[]) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.error('Erreur actus:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // ⏳ Squelette de chargement (Skeleton) au style shadcn/ui
  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 animate-pulse">
            <div className="h-44 bg-slate-100 rounded-xl" />
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-100 rounded" />
              <div className="h-3 bg-slate-100 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ⚠️ Gestion des erreurs d'affichage
  if (error) {
    return (
      <div className="p-8 text-center text-sm text-red-500 bg-red-50/50 rounded-2xl border border-red-100 max-w-md mx-auto my-6">
        <p className="font-semibold">Impossible de charger les actualités</p>
        <p className="text-xs text-red-400 mt-1">Détail : {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div 
            key={art.id} 
            className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
          >
            {/* Image de l'article */}
            <div className="h-44 bg-slate-50 relative flex items-center justify-center text-slate-400 overflow-hidden border-b border-slate-100">
              {art.imageUrl ? (
                <img 
                  src={art.imageUrl} 
                  alt={art.titre} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              ) : (
                <span className="text-xs font-medium text-slate-400">📷 Pas d'image</span>
              )}
              <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider shadow-sm">
                {art.categorie || 'Général'}
              </span>
            </div>

            {/* Contenu textuel */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <span>📅</span> 
                  {art.datePublication && !isNaN(Date.parse(art.datePublication)) 
                    ? new Date(art.datePublication).toLocaleDateString('fr-FR') 
                    : 'Date inconnue'}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug tracking-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {art.titre}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.contenu}
                </p>
              </div>

              {/* Bouton d'action */}
              <button className="inline-flex items-center text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors w-fit pt-2">
                Lire la suite <span className="ml-1 text-[10px] transition-transform group-hover:translate-x-0.5">❯</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
