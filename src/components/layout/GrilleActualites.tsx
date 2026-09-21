'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Globe } from 'lucide-react';
import { useActualitesLive } from '../../hooks/useActualitesLive';
import CarteActualite from './CarteActualite';

export interface Article {
  id: string;
  categorie: 'INFORMATION' | 'MUSIQUE' | 'CULTURE' | 'CITOYENNETÉ' | 'SPORTS' | 'MONDE';
  titre: string;
  description: string;
  date: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
}

interface GrilleActualitesProps {
  articles?: Article[];
  isAccueilView?: boolean;
  searchTerm?: string;
  regionFiltre?: string;
}

export default function GrilleActualites({ 
  articles: propsArticles, 
  isAccueilView = false,
  searchTerm = ""
}: GrilleActualitesProps): React.JSX.Element {
  const [categorieActive, setCategorieActive] = useState<string>('TOUS');
  const [articlesMondiaux, setArticlesMondiaux] = useState<Article[]>([]);
  const [loadingMonde, setLoadingMonde] = useState<boolean>(false);
  const { dbArticles, loading } = useActualitesLive();

  const win = typeof window !== 'undefined' ? (window as unknown as Record<string, { env?: Record<string, string> }>) : {};
  const API_URL = win.process?.env?.NEXT_PUBLIC_API_URL
    ? win.process.env.NEXT_PUBLIC_API_URL + "/api"
    : "http://localhost:5000/api";

  // 🚀 CORRECTION : Utilisation d'une fonction interne pour éviter l'appel synchrone direct à setState
  useEffect(() => {
    let ignore = false;

    const chargerFluxMondial = async () => {
      if (categorieActive !== 'MONDE' || articlesMondiaux.length > 0) return;
      
      setLoadingMonde(true);
      try {
        const res = await fetch(`${API_URL}/articles-multimedia/monde`);
        if (!res.ok) throw new Error();
        const data = await res.json() as Article[];
        
        if (!ignore) {
          setArticlesMondiaux(data);
        }
      } catch (err) {
        console.error("Erreur de chargement du flux mondial :", err);
      } finally {
        if (!ignore) {
          setLoadingMonde(false);
        }
      }
    };

    chargerFluxMondial();

    return () => {
      ignore = true;
    };
  }, [categorieActive, articlesMondiaux.length, API_URL]);

  const listeVraie = categorieActive === 'MONDE' 
    ? articlesMondiaux 
    : (dbArticles && dbArticles.length > 0 ? dbArticles : (Array.isArray(propsArticles) ? propsArticles : []));

  const articlesFiltres = listeVraie.filter((art) => {
    if (!art) return false;
    const correspondCategorie = isAccueilView || categorieActive === 'TOUS' || categorieActive === 'MONDE' || art.categorie === categorieActive;
    
    const chaineRecherche = searchTerm ? searchTerm.toLowerCase().trim() : "";
    return correspondCategorie && (!chaineRecherche || 
      (art.titre || "").toLowerCase().includes(chaineRecherche) || 
      (art.description || "").toLowerCase().includes(chaineRecherche));
  });

  const articlesAffichesFinaux = isAccueilView ? articlesFiltres.slice(0, 5) : articlesFiltres;

  const handleAdorer = (titreArticle: string) => {
    alert(`Vous adorez l'actualité : "${titreArticle}" !`);
  };

  const handleCommenter = (titreArticle: string) => {
    const commentaire = prompt(`Écrivez votre commentaire pour : "${titreArticle}"`);
    if (commentaire && commentaire.trim() !== "") {
      alert(`Commentaire enregistré avec succès pour :\n"${titreArticle}"`);
    }
  };

  const categories = ['TOUS', 'INFORMATION', 'MUSIQUE', 'CULTURE', 'CITOYENNETÉ', 'SPORTS', 'MONDE'];

  if ((loading && listeVraie.length === 0) || loadingMonde) {
    return (
      <div className="text-center py-12 text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">
        Connexion au fil en direct...
      </div>
    );
  }

  return (
    <div className={`w-full font-['Manrope',_sans-serif] box-border ${
      isAccueilView ? 'space-y-0 px-0' : 'space-y-10 px-4 max-w-7xl mx-auto'
    }`}>
      
      {!isAccueilView && (
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 mb-1">
              <Sparkles className="h-3 w-3 text-black animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-black">En direct</span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">
              Le Fil <span className="text-[#1b75bc]">d'Actualités</span>
            </h2>
            <p className="text-black text-xs font-bold max-w-md leading-relaxed">
              Les reportages, articles locaux et dépêches du monde de la rédaction de Hai Radio.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorieActive(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center gap-1.5 ${
                  categorieActive === cat
                    ? 'bg-[#1b75bc] text-white border-[#1b75bc]'
                    : 'bg-white text-black border-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat === 'MONDE' && <Globe className="h-3.5 w-3.5" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {articlesFiltres.length === 0 ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 uppercase tracking-wider space-y-2 bg-white rounded-2xl border border-slate-200/60 shadow-xs">
          <FileText className="h-8 w-8 mx-auto text-slate-300" />
          <p>Aucun article trouvé pour cette recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full box-border">
          {articlesAffichesFinaux.map((article) => (
            <CarteActualite
              key={article.id}
              id={article.id}
              categorie={article.categorie}
              titre={article.titre}
              description={article.description}
              date={article.date}
              imageUrl={article.imageUrl || undefined}
              onAdorer={handleAdorer}
              onCommenter={handleCommenter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
