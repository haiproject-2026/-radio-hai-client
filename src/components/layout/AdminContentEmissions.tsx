'use client';

import { useState } from "react";
import { useApp } from "../../contexts/app"; // Ajustez les "../" si nécessaire selon l'emplacement exact

export default function AdminContentEmissions() {
  const { ajouterElement } = useApp();
  const [titre, setTitre] = useState("");
  const [animateur, setAnimateur] = useState("");
  const [horaire, setHoraire] = useState("");
  const [description, setDescription] = useState("");

  const gererSoumission = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre.trim() || !animateur.trim() || !horaire.trim() || !description.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Ajout de l'émission dans la catégorie 'emissions'
    ajouterElement("emissions", {
      titre: titre,
      description: `Animateur: ${animateur} | Horaire: ${horaire} \n\n${description}`,
      date: new Date().toLocaleDateString("fr-FR")
    });

    setTitre("");
    setAnimateur("");
    setHoraire("");
    setDescription("");
    alert("Émission ajoutée avec succès au programme public !");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-xs text-left">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ajouter une Émission</h2>
        <p className="text-xs text-slate-400 mt-1">Mettez à jour la grille des programmes de la station.</p>
      </div>

      <form onSubmit={gererSoumission} className="space-y-4">
        {/* Titre de l'émission */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Nom de l'émission</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex: Le Grand Journal Citoyen"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Nom de l'Animateur */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Animateur / Présentateur</label>
          <input
            type="text"
            value={animateur}
            onChange={(e) => setAnimateur(e.target.value)}
            placeholder="Ex: Équipe Radio Hai"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Horaires et Jours */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Créneau Horaire & Jours</label>
          <input
            type="text"
            value={horaire}
            onChange={(e) => setHoraire(e.target.value)}
            placeholder="Ex: Lun au Ven | 12h00 - 14h00"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-semibold text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Description / Contenu du programme */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Description de l'émission</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détaillez les thématiques abordées, rubriques, etc..."
            rows={4}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#ea7333] font-medium text-slate-700 bg-slate-50/50 resize-y"
          />
        </div>

        {/* Bouton de validation */}
        <button
          type="submit"
          className="w-full h-11 bg-[#1d4461] hover:bg-slate-800 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          Enregistrer le programme
        </button>
      </form>
    </div>
  );
}
