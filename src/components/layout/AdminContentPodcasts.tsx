'use client';

import { useState } from "react";
import { useApp } from "../../contexts/app"; // Ajustez les "../" si nécessaire selon l'emplacement exact

export default function AdminContentPodcasts() {
  const { ajouterElement } = useApp();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const gererSoumission = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre.trim() || !description.trim() || !audioUrl.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Ajout de l'élément dans la catégorie 'podcasts'
    // Nous passons l'URL audio directement dans la description sous un format lisible ou combiné
    ajouterElement("podcasts", {
      titre: titre,
      description: `URL_AUDIO:${audioUrl}|||${description}`,
      date: new Date().toLocaleDateString("fr-FR")
    });

    setTitre("");
    setDescription("");
    setAudioUrl("");
    alert("Podcast ajouté avec succès à l'espace de réécoute !");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-xs text-left">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ajouter un Podcast / Replay</h2>
        <p className="text-xs text-slate-400 mt-1">Mettez à disposition des auditeurs les enregistrements de vos meilleures émissions.</p>
      </div>

      <form onSubmit={gererSoumission} className="space-y-4">
        {/* Titre du podcast */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Titre de l'enregistrement</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex: Interview du Maire - Édition Spéciale"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Lien du fichier audio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">URL du fichier Audio (MP3 / Lien Stream)</label>
          <input
            type="url"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://votre-serveur.com"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-medium text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Description / Résumé du podcast</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détaillez le contenu, les invités et les sujets abordés lors de cette diffusion..."
            rows={4}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-medium text-slate-700 bg-slate-50/50 resize-y"
          />
        </div>

        {/* Bouton de validation */}
        <button
          type="submit"
          className="w-full h-11 bg-[#1d4461] hover:bg-slate-800 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          Mettre en ligne le Replay
        </button>
      </form>
    </div>
  );
}
