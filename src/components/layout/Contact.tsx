'use client';

import { Mail, Phone, Clock } from "lucide-react";
import FormulaireSms from "./FormulaireSms";
import CarteContact from "./CarteContact";
import ReseauxSociauxContact from "./ReseauxSociauxContact";

interface ContactProps {
  contactData?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export default function Contact({ contactData }: ContactProps): React.JSX.Element {
  return (
    <div className="w-full font-['Manrope',_sans-serif] space-y-12 select-none antialiased box-border">
      
      {/* GRANDE BANNIÈRE DU HAUT */}
      <section className="w-full bg-[#05192c] text-white rounded-3xl overflow-hidden relative shadow-2xl flex flex-col lg:flex-row items-stretch">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(13,68,105,0.4)_0%,_transparent_70%)] pointer-events-none" />
        
        {/* TEXTES DE GAUCHE */}
        <div className="flex-1 py-12 px-6 md:px-12 space-y-4 text-left relative z-10 box-border">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            CONTACTEZ-NOUS
          </h1>
          <h2 className="text-lg md:text-xl font-extrabold text-[#7cb7f1] uppercase tracking-wide">
            NOUS SOMMES À VOTRE ÉCOUTE !
          </h2>
          
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            Une question, une suggestion d'émission ou un projet de partenariat ? 
            N'hésitez pas à nous laisser un message, notre équipe vous répondra dans les plus brefs délais.
          </p>

          <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-300 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#7cb7f1]" />
              <span>{contactData?.email || "contact@hairadio.mg"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#7cb7f1]" />
              <span>{contactData?.phone || "+261 34 12 345 67"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#7cb7f1]" />
              <span>Lun - Ven : 08h - 18h</span>
            </div>
          </div>
        </div>

        {/* IMAGE DU MICROPHONE REVENUE A SA PLACE ACCESSIBLE */}
        <div className="w-full lg:w-[40%] h-64 lg:h-auto relative overflow-hidden bg-gradient-to-r from-transparent to-[#05192c]/50 shrink-0">
          <img 
            src="/radio_haj_micro_webp.webp" 
            alt="Radio Hai Microphone et Casque" 
            className="w-full h-full object-cover object-center lg:object-right"
          />
        </div>
      </section>

      {/* DISPOSITION EN DEUX COLONNES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left box-border">
        <div className="lg:col-span-7 w-full box-border">
          <FormulaireSms />
        </div>
        <div className="lg:col-span-5 space-y-6 w-full box-border">
          <CarteContact contactData={contactData} />
          <ReseauxSociauxContact />
        </div>
      </section>

    </div>
  );
}
