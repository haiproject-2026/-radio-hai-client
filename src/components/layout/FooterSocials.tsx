'use client';

import React from "react";
import { Mail, MessageSquare } from 'lucide-react';

export default function FooterSocials(): React.JSX.Element {
  return (
    <div className="flex items-center gap-3.5">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Suivez-nous</span>
      <div className="flex items-center gap-2">
        
        {/* Facebook */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 bg-[#1b537a] hover:bg-orange-500 rounded-full border border-white/5 text-white transition-all hover:scale-105 flex items-center justify-center" 
          title="Facebook"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>

        {/* Mail */}
        <a 
          href="mailto:contact@radiohaj.mg" 
          className="p-2 bg-[#1b537a] hover:bg-orange-500 rounded-full border border-white/5 text-white transition-all hover:scale-105 flex items-center justify-center" 
          title="Email"
        >
          <Mail className="h-3.5 w-3.5 text-white" />
        </a>

        {/* LinkedIn */}
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 bg-[#1b537a] hover:bg-orange-500 rounded-full border border-white/5 text-white transition-all hover:scale-105 flex items-center justify-center" 
          title="LinkedIn"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>

        {/* Message */}
        <a 
          href="#contact" 
          className="p-2 bg-[#1b537a] hover:bg-orange-500 rounded-full border border-white/5 text-white transition-all hover:scale-105 flex items-center justify-center" 
          title="Message"
        >
          <MessageSquare className="h-3.5 w-3.5 text-white" />
        </a>

      </div>
    </div>
  );
}
