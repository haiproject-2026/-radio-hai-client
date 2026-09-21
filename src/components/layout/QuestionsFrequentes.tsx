'use client';

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function QuestionsFrequentes() {
  const [faqOuverte, setFaqOuverte] = useState<number | null>(null);

  const faqData = [
    { q: "Comment contacter un animateur ?", a: "Vous pouvez appeler directement le studio pendant les émissions en direct au numéro affiché ou envoyer un message via notre formulaire." },
    { q: "Comment proposer une musique ?", a: "Envoyez vos maquettes ou suggestions musicales par email avec l'objet 'Programmation Musicale'." },
    { q: "Comment devenir partenaire ?", a: "Contactez notre service administratif via la section Partenariat ou venez nous rendre visite au studio." },
    { q: "Comment faire de la publicité sur la radio ?", a: "Nous proposons des espaces publicitaires adaptés. Envoyez-nous un message pour recevoir notre grille tarifaire." },
    { q: "Comment proposer une émission ?", a: "Déposez votre dossier de projet directement à notre adresse ou envoyez un résumé complet par email." }
  ];

  return (
    <div className="space-y-6 text-left w-full">
      {/* Titre principal adapté en Bleu Pétrole avec soulignement Orange du logo */}
      <h3 className="text-sm font-black text-[#0B4063] uppercase tracking-wider">
        Questions <span className="underline decoration-[#E66E26] decoration-2 underline-offset-4">fréquentes</span>
      </h3>
      
      <div className="space-y-3.5">
        {faqData.map((faq, idx) => {
          const isOpen = faqOuverte === idx;
          return (
            /* BLOCS : Bordure contrastée en Bleu Pétrole au survol et à l'ouverture */
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${
                isOpen ? "border-[#0B4063]" : "border-slate-200 hover:border-[#0B4063]/50"
              }`}
            >
              <button 
                type="button"
                onClick={() => setFaqOuverte(isOpen ? null : idx)}
                className="w-full px-5 py-4 flex justify-between items-center text-left text-xs font-black transition-colors cursor-pointer group"
              >
                {/* Texte des questions en Bleu Marine pour une charte forte et lisible */}
                <span className={`transition-colors ${isOpen ? "text-[#0B4063]" : "text-[#1A537A] group-hover:text-[#0B4063]"}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#0B4063]" : "text-slate-400 group-hover:text-[#1A537A]"}`} />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 border-t border-slate-100" : "max-h-0"}`}>
                {/* Texte des réponses en gris ardoise contrasté et net sur fond doux mat */}
                <p className="p-5 text-[11px] text-[#475569] leading-relaxed font-bold bg-[#F1F5F9]/50">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Lien vers toutes les questions habillé avec l'Orange dynamique du logo */}
      <button 
        type="button" 
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E66E26] hover:underline pt-2 cursor-pointer group"
      >
        <span>Voir toutes les questions</span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
