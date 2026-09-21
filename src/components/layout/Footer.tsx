'use client';

import { Mail, MessageSquare } from 'lucide-react';
import { QrCodeGenerator } from '../ui/qrcode-generator';

export default function Footer() {
  const anneeCourante = new Date().getFullYear();

  return (
    <div className="w-full px-4 md:px-8 mt-16 pb-8">
      <footer className="w-full bg-[#0e4366] text-slate-200 py-14 px-8 md:px-16 rounded-[32px] font-['Manrope',_sans-serif] select-none shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* À gauche : Identité Radio & Slogan */}
          <div className="text-center md:text-left space-y-1.5">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase flex items-center justify-center md:justify-start flex-wrap gap-x-3">
              <span>HAI <span className="text-orange-500">RADIO</span></span>
              <span className="text-xs md:text-sm font-bold text-orange-400 normal-case">97.6 MHz &mdash; Fianarantsoa</span>
            </h3>
            <p className="text-xs text-slate-300 font-black tracking-widest uppercase">
              UNE SEULE FRÉQUENCE, DES MILLIERS D'ÉMOTIONS.
            </p>
          </div>

          {/* Au centre : Les 4 icônes (SVG forcés en blanc + Lucide standard) */}
          <div className="flex items-center justify-center gap-4">
            
            {/* 1. Facebook (SVG forcé en blanc) */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-[#0a3552] hover:bg-orange-500 border border-white/10 rounded-full shadow-xs transition-all hover:scale-105 flex items-center justify-center"
              title="Facebook"
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="white">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* 2. Mail (Lucide natif) */}
            <a 
              href="mailto:contact@radiohai.mg" 
              className="p-3 bg-[#0a3552] hover:bg-orange-500 border border-white/10 rounded-full text-white shadow-xs transition-all hover:scale-105 flex items-center justify-center"
              title="Email"
            >
              <Mail className="h-4.5 w-4.5 text-white" />
            </a>

            {/* 3. LinkedIn (SVG forcé en blanc) */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-[#0a3552] hover:bg-orange-500 border border-white/10 rounded-full shadow-xs transition-all hover:scale-105 flex items-center justify-center"
              title="LinkedIn"
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="white">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* 4. Message (Lucide natif) */}
            <a 
              href="#contact" 
              className="p-3 bg-[#0a3552] hover:bg-orange-500 border border-white/10 rounded-full text-white shadow-xs transition-all hover:scale-105 flex items-center justify-center"
              title="Message"
            >
              <MessageSquare className="h-4.5 w-4.5 text-white" />
            </a>
          </div>

          {/* À droite : Copyright & Code QR */}
          <div className="flex items-center gap-5 text-center md:text-right">
            <div className="text-xs text-slate-300 font-bold uppercase tracking-wider space-y-0.5">
              <p>&copy; {anneeCourante} RADIO HAI</p>
              <p className="text-[10px] text-slate-400 font-medium normal-case">Scanner pour le direct</p>
            </div>
            
            {/* QR Code */}
            {typeof window !== 'undefined' && (
              <div className="bg-white p-1.5 rounded-xl shadow-md shrink-0">
                <QrCodeGenerator value={window.location.origin} size={64} />
              </div>
            )}
          </div>

        </div>
      </footer>
    </div>
  );
}
