'use client';

interface ReseauItem {
  nom: string;
  icone: React.JSX.Element;
  couleur: string;
  lien: string;
}

export default function ReseauxSociauxContact(): React.JSX.Element {
  const reseaux: ReseauItem[] = [
    { 
      nom: "Facebook",
      icone: (
        <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
        </svg>
      ), 
      couleur: "bg-[#1877F2] hover:bg-[#166FE5]", 
      lien: "https://facebook.com" 
    },
    { 
      nom: "X / Twitter",
      icone: (
        <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      couleur: "bg-black hover:bg-slate-900", 
      lien: "https://x.com" 
    },
    { 
      nom: "Instagram",
      icone: (
        <svg className="h-4 w-4 text-white fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ), 
      couleur: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-95", 
      lien: "https://instagram.com" 
    },
    { 
      nom: "Youtube",
      icone: (
        <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      couleur: "bg-[#FF0000] hover:bg-[#CC0000]", 
      lien: "https://youtube.com" 
    }
  ];

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3 text-left w-full select-none antialiased font-['Manrope',_sans-serif]">
      <h3 className="text-[11px] font-black text-[#05192c] uppercase tracking-wider">
        SUIVEZ-NOUS
      </h3>
      <p className="text-[10px] font-bold text-slate-400 tracking-tight leading-none uppercase">
        Rejoignez notre communauté en ligne.
      </p>
      <div className="flex items-center gap-2.5 pt-1">
        {reseaux.map((r, idx) => (
          <a
            key={idx}
            href={r.lien}
            title={r.nom}
            aria-label={r.nom}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${r.couleur}`}
          >
            {r.icone}
          </a>
        ))}
      </div>
    </div>
  );
}
