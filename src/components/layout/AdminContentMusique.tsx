'use client';

import { useState } from "react";
import { useApp } from "../../contexts/app"; // Ajustez les "../" si nécessaire selon l'emplacement exact

export default function AdminContentMusique() {
  const { ajouterElement } = useApp();
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");
  const [genre, setGenre] = useState("");
  const [lienEcoute, setLienEcoute] = useState("");

  const gererSoumission = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre.trim() || !artiste.trim() || !genre.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Ajout du morceau dans la catégorie 'musiques'
    ajouterElement("musiques", {
      titre: titre,
      description: `Artiste: ${artiste} | Genre: ${genre} | LIEN:${lienEcoute || "aucun"}`,
      date: new Date().toLocaleDateString("fr-FR")
    });

    setTitre("");
    setArtiste("");
    setGenre("");
    setLienEcoute("");
    alert("Morceau ajouté avec succès à la section Musique !");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-xs text-left">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ajouter un Titre Musical</h2>
        <p className="text-xs text-slate-400 mt-1">Partagez les dernières nouveautés musicales et découvertes locales sur l'antenne.</p>
      </div>

      <form onSubmit={gererSoumission} className="space-y-4">
        {/* Titre du morceau */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Titre du morceau</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex: Tsara clearance"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Nom de l'Artiste */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Artiste / Groupe</label>
          <input
            type="text"
            value={artiste}
            onChange={(e) => setArtiste(e.target.value)}
            placeholder="Ex: Artiste local Madagascar"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Genre Musical */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Genre musical</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Ex: Salegy / Tsapiky / Afrobeat"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Lien d'écoute ou plateforme */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Lien d'écoute externe (Optionnel - YouTube, SoundCloud...)</label>
          <input
            type="url"
            value={lienEcoute}
            onChange={(e) => setLienEcoute(e.target.value)}
            placeholder="https://youtube.com..."
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-medium text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Bouton de validation */}
        <button
          type="submit"
          className="w-full h-11 bg-[#1d4461] hover:bg-slate-800 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          Ajouter à la Hit-List
        </button>
      </form>
    </div>
  );
}
