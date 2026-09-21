'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/layout/header/Header';
import LecteurSidebar from './components/layout/LecteurSidebar';
import Footer from './components/layout/Footer';
import Accueil from './components/layout/Accueil';
import Historique from './components/layout/Historique';
import Musique from './components/layout/Musique';
import Contact from './components/layout/Contact';
import GrilleActualites from './components/layout/GrilleActualites';
import Emissions from './components/layout/Emissions';
import Podcasts from './components/layout/Podcasts'; 
import BottomNav from './components/layout/BottomNav';
import type { Article } from './hooks/useActualitesLive'; 
import { useRadioClient } from './hooks/useRadioClient';

// Forçage de type générique propre et sécurisé pour satisfaire ESLint et TypeScript
type GenericView = React.ComponentType<Record<string, unknown>>;

const AccueilComponent = Accueil as unknown as GenericView;
const HistoriqueComponent = Historique as unknown as GenericView;
const ContactComponent = Contact as unknown as GenericView;
const EmissionsComponent = Emissions as unknown as GenericView;
const PodcastsComponent = Podcasts as unknown as GenericView; 

export default function App(): React.JSX.Element {
  const [regionFiltre, setRegionFiltre] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [vueActive, setVueActive] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace('/', '');
      return path || 'accueil';
    }
    return 'accueil';
  });

  const clientStore = useRadioClient();

  const store = useMemo(() => ({
    events: clientStore?.events || [],
    articles: (clientStore?.articles || []) as unknown as Article[],
    podcasts: clientStore?.podcasts || [],
    programmes: clientStore?.programmes || [],
    contactData: clientStore?.contactData || null,
    hosts: clientStore?.hosts || []
  }), [clientStore]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "HAI RADIO | La Voix du Développement Durable";

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 'Écoutez HAI RADIO en direct sur 97.6 MHz. Retrouvez toutes nos actualités, émissions, podcasts exclusifs et la culture du développement durable 24h/24.');

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', 'radio en direct, HAI RADIO, développement durable, podcasts, actualités locales, émissions radio');
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.replace('/', '');
        setVueActive(path || 'accueil');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const naviguerVersVue = (vue: string) => {
    setVueActive(vue);
    setRegionFiltre('all');
    if (typeof window !== 'undefined') {
      const path = vue === 'accueil' ? '/' : `/${vue}`;
      window.history.pushState(null, '', path);
    }
  };

  const articlesAffiches = useMemo(() => {
    return store.articles.filter((art: Article) => {
      if (!regionFiltre || regionFiltre === 'all') return true;
      const titreMappe = (art.titre || '').toLowerCase();
      const descMappe = (art.description || '').toLowerCase();
      const rechercheNormalisee = regionFiltre.toLowerCase();
      return titreMappe.includes(rechercheNormalisee) || descMappe.includes(rechercheNormalisee);
    });
  }, [store.articles, regionFiltre]);

  const renduContenuPrincipal = () => {
    switch (vueActive) {
      case 'accueil':
        return (
          <AccueilComponent 
            activeTab={vueActive} 
            setActiveTab={naviguerVersVue} 
            regionFiltre={regionFiltre}
            articles={store.articles}
            hosts={store.hosts}
          />
        );
        
      case 'apropos':
      case 'historique':
        return <HistoriqueComponent events={store.events} />;
        
      case 'actualites':
        return (
          <div className="space-y-4 w-full">
            {regionFiltre && regionFiltre !== 'all' && (
              <div className="flex items-center justify-between bg-cyan-50 border border-cyan-200 px-4 py-2.5 rounded-xl mb-4">
                <p className="text-sm font-bold text-black">
                  Résultats pour : <span className="underline">"{regionFiltre}"</span> ({articlesAffiches.length} trouvé(s))
                </p>
                <button 
                  type="button"
                  onClick={() => setRegionFiltre('all')}
                  className="text-xs text-red-600 hover:text-red-700 font-black uppercase tracking-wider cursor-pointer"
                >
                  Effacer
                </button>
              </div>
            )}
            <GrilleActualites articles={articlesAffiches} regionFiltre={regionFiltre} />
          </div>
        );
        
      case 'emissions':
      case 'emission':
        return (
          <EmissionsComponent 
            programmes={store.programmes} 
            hosts={store.hosts} 
            podcasts={store.podcasts}
          />
        );

      case 'podcasts':
      case 'podcast':
        return (
          <PodcastsComponent 
            podcasts={store.podcasts} 
          />
        );
        
      case 'musique':
        return <Musique />;
        
      case 'contact':
        return <ContactComponent contactData={store.contactData} />;
        
      default:
        return (
          <AccueilComponent 
            activeTab={vueActive} 
            setActiveTab={naviguerVersVue} 
            regionFiltre={regionFiltre}
            articles={store.articles}
            hosts={store.hosts}
          />
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 flex flex-col pb-16 md:pb-0 overflow-x-hidden w-screen max-w-full text-black font-sans"
      style={{ width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}
    >
      <Header 
        onNavigate={naviguerVersVue}
        vueActive={vueActive}
        setRegionFiltre={setRegionFiltre}
        onToggleSidebar={handleToggleSidebar}
      />

      <main 
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden"
        style={{ maxWidth: '100%' }}
      >
        {renduContenuPrincipal()}
      </main>

      <LecteurSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      <Footer />

      <BottomNav activeTab={vueActive} changeTab={naviguerVersVue} />
    </div>
  );
}
