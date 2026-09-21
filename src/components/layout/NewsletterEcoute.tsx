'use client';

import { useState } from "react";
import { Radio, Send, Check } from "lucide-react";

export default function NewsletterEcoute() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  return (
    /* BLOC PRINCIPAL : Fin des dégradés sombres. Fond blanc pur et bordure grise fine */
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border border-slate-200 p-8 md:p-10 rounded-3xl text-left relative overflow-hidden">
      
      {/* Section Écoute en Direct */}
      <div className="space-y-4 text-center md:text-left z-10">
        <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight leading-tight">
          ENVIE DE NOUS <span className="underline decoration-[#0070CE] decoration-2 underline-offset-4">ÉCOUTER MAINTENANT ?</span>
        </h3>
        <p className="text-xs text-slate-500 font-medium max-w-md">Rejoignez nos flux en direct, écoutez nos émissions citoyennes et vibrez avec le meilleur son.</p>
        <div className="pt-2 flex justify-center md:justify-start">
          {/* BOUTON LIVE : Remplacement de l'orange par le bleu roi officiel */}
          <button type="button" className="flex items-center gap-2 bg-[#0070CE] hover:bg-[#005bb5] text-white font-black uppercase tracking-wider text-[11px] px-6 py-4 rounded-xl transition-all cursor-pointer">
            <Radio className="h-4 w-4 animate-pulse" /> 
            <span>Écouter en direct (97.6 FM)</span>
          </button>
        </div>
      </div>

      {/* Section Newsletter / Lettre d'information */}
      <div className="space-y-4 z-10 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
        <div className="text-center md:text-left">
          {/* Badge textuel en noir absolu */}
          <h4 className="text-xs font-black uppercase text-black tracking-wider">Lettre d'information</h4>
          <p className="text-[11px] text-slate-500 mt-1">Abonnez-vous pour recevoir les podcasts exclusifs et les actualités d'Ambalavao.</p>
        </div>
        
        <form onSubmit={handleSubscribe} className="relative flex items-center">
          {/* CHAMP DE SAISIE : Fond blanc pur, bordures et textes discrets adaptés au thème clair */}
          <input 
            type="email" 
            required
            placeholder="Votre adresse email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
            className="w-full bg-white border border-slate-200 focus:border-[#0070CE] rounded-xl py-3.5 pl-4 pr-12 text-xs text-black placeholder-slate-400 outline-none transition-all font-medium disabled:opacity-60"
          />
          {/* BOUTON D'ENVOI : Couleur calquée sur le bleu officiel */}
          <button 
            type="submit" 
            className={`absolute right-2 p-2 rounded-lg transition-all cursor-pointer text-white ${
              subscribed ? "bg-emerald-500" : "bg-[#0070CE] hover:bg-[#005bb5]"
            }`}
          >
            {subscribed ? <Check className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
          </button>
        </form>
        
        {subscribed && (
          <p className="text-[10px] text-emerald-600 font-bold text-center md:text-left">
            ✓ Inscription validée ! Merci pour votre confiance.
          </p>
        )}
      </div>
    </div>
  );
}
