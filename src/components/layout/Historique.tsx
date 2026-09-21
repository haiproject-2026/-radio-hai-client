'use client';

import { Radio, Award, Users, Milestone } from "lucide-react";

export default function Historique() {
  const jalons = [
    {
      icon: <Radio className="h-4 w-4" />,
      title: "Première Onde & Fondations",
      desc: "Lancement officiel de Radio Hai sur la fréquence 97.6 FM à Ambalavao. Notre studio citoyen diffuse ses premières minutes d'émotions, de partage et d'engagement local au cœur de la Haute Matsiatra."
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Engagement Citoyen & Proximité",
      desc: "Création des premiers programmes interactifs et débats publics. Les auditeurs prennent directement la parole à l'antenne pour co-construire l'information et dynamiser la vie de la communauté."
    },
    {
      icon: <Award className="h-4 w-4" />,
      title: "Reconnaissance Régionale",
      desc: "Radio Hai s'impose comme une voix citoyenne incontournable à Fianarantsoa. Notre action est reconnue pour ses initiatives culturelles et son soutien constant au développement social régional."
    },
    {
      icon: <Milestone className="h-4 w-4" />,
      title: "Déploiement Numérique & Replay",
      desc: "Mise en place de notre plateforme moderne de podcasts. La communauté peut désormais écouter, archiver et partager toutes nos émissions citoyennes à tout moment, sans barrière géographique."
    }
  ];

  return (
    /* BLOC PRINCIPAL : Force la police Manrope sur tout le composant */
    <div className="w-full max-w-4xl mx-auto space-y-12 text-left py-12 px-4 md:px-0 font-['Manrope',_sans-serif] antialiased">
      
      {/* En-tête de section avec contrastes maximisés */}
      <div className="text-center space-y-3">
        <h2 className="text-base font-black tracking-wider text-[#0B4063] uppercase">
          Notre <span className="underline decoration-[#E66E26] decoration-2 underline-offset-4">Histoire</span>
        </h2>
        {/* Changement de couleur pour une visibilité totale */}
        <p className="text-xs text-[#1E293B] max-w-xl mx-auto font-extrabold">
          Découvrez les grandes étapes et l'évolution de Radio Hai, votre fréquence citoyenne au cœur de Madagascar.
        </p>
      </div>

      {/* Ligne du temps verticale textuelle */}
      <div className="relative border-l-2 border-slate-300 ml-4 md:ml-6 space-y-8">
        {jalons.map((jalon, idx) => (
          <div key={idx} className="relative pl-8 group">
            
            {/* Puce d'icône Orange sur fond gris-bleu mat doux */}
            <div className="absolute -left-[17px] top-1 p-2 rounded-full bg-[#F1F5F9] text-[#E66E26] border-2 border-white shadow-xs group-hover:bg-[#0B4063] group-hover:text-white transition-all duration-200">
              {jalon.icon}
            </div>

            {/* Carte de contenu historique : Fond blanc pur pour détacher les textes */}
            <div className="space-y-2 bg-white p-6 rounded-2xl border border-slate-300 shadow-xs group-hover:border-[#0B4063] transition-colors duration-200">
              
              {/* Titre de l'étape : Bleu Pétrole très foncé et très visible */}
              <h4 className="text-sm font-black uppercase text-[#0B4063] tracking-wide">
                {jalon.title}
              </h4>
              
              {/* CORRECTION LISIBILITÉ : Texte passé en Noir Mat avec une graisse épaisse (font-bold) */}
              <p className="text-xs text-[#1E293B] leading-relaxed font-bold tracking-normal">
                {jalon.desc}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
